# -*- coding: utf-8 -*-
"""ArXiv daily paper collector with keyword filtering."""

import logging
import re
import warnings
from collections import defaultdict
from datetime import datetime, timedelta, timezone
from typing import Iterable, Tuple

import arxiv

# Workaround: feedparser uses deprecated cgi module (Python 3.11+)
# This is an upstream issue: https://github.com/kurtmckee/feedparser/issues/330
warnings.filterwarnings('ignore', category=DeprecationWarning, module='feedparser')

logging.basicConfig(level=logging.INFO, format='%(message)s')
logger = logging.getLogger(__name__)

KEYS = [
    'attention',
    'auto-encoding', 'autoencoder', 'autoencoding',
    'autoregressive',
    'aux-free',
    'backward', 'bilexical', 'bipartite', 'bregman',
    'circuit', 'clique', 'constituency', 'constituent', 'context-free', 'crf', 'ctc',
    'dependency', 'differentiable', 'differential', 'differentiation', 'diffusion', 'discrete', 'discretized',
    'duality',
    'dynamic', 'dynamic programming',
    'euclidean', 'expectation', 'exponential',
    'fenchel-young', 'filter', 'flash', 'flow', 'flowseq', 'forest', 'forward', 'frank-wolfe',
    'generation', 'grammar', 'grammars', 'gumbel', 'gumbel-softmax',
    'hardware-aware', 'hazyresearch', 'high-order', 'higher-order', 'hmm', 'hsmm', 'hypergraph',
    'induction', 'invertible',
    'latent', 'levenshtein', 'lexicalized', 'linear-attention', 'low-rank',
    'marginal', 'markov', 'masking', 
    'mcmc', 'mean-field', 'message-passing',
    'mixture of expert', 'mixture of experts', 'moe', 'moes', 'muon', 'mutual',
    'non-projective', 'normalizing',
    'optimal',
    'parallel', 'parse', 'parser', 'parsing', 'particle', 'partition', 'pcfg', 'perturb-and-map', 'perturb-and-parse',
    'perturbation',
    'probabilistic', 'probabilistically', 'programming', 'projection', 'prototype', 'proximal',
    'randomized', 'ranking', 'reorder',
    'recurrence', 'recurrent', 'reparameterization', 're-parameterization', 'rnn', 'rnns', 'rnnt', 'rnn-t',
    'scaling',
    'semi-amortized', 'semiring', 'semi-markov',
    'seq2seq', 'sequence', 'sequence to sequence', 'sequence-to-sequence',
    'sinkhorn', 'sparse', 'sparsemap', 'sparsemax', 'state-space', 'stochastic',
    'stochasticity', 'struct', 'structural', 'structure', 'structured', 'sum-product', 'syntax',
    'transducer', 'transduction', 'transformer', 'translation', 'transport', 'tree', 'treecrf',
    'variational', 'viterbi'
]

AUTHORS = [
    'Albert Gu', 'Alexander M. Rush', 'André F. T. Martins',
    'Bailin Wang', 'Beidi Chen',
    'Caio Corro', 'Chris Dyer', 'Christopher D. Manning', 'Christopher Ré',
    'Daniel Gildea', 'Daniel Y. Fu', 'David Chiang', 'David M. Blei',
    'Eduard Hovy',
    'Fei Huang',
    'Hao Zhou',
    'Giorgio Satta', 'Graham Neubig',
    'Imanol Schlag', 'Ivan Titov',
    'Jan Buys', 'Jason Eisner', 'Justin T. Chiu',
    'Kazuki Irie', 'Kevin Gimpel',
    'Li Dong', 'Lifu Tu', 'Lingpeng Kong',
    'Mathieu Blondel', 'Michael Collins', 'Michael Zhang', 'Mirella Lapata',
    'Noah A. Smith',
    'Percy Liang',
    'Ryan Cotterell',
    'Shaolei Zhang', 'Shay B. Cohen', 'Simran Arora', 'Songlin Yang',
    'Tim Vieira', 'Tri Dao',
    'Vlad Niculae',
    'Xiang Lisa Li', 'Xuezhe Ma',
    'Yao Fu', 'Yang Feng', 'Yoon Kim', 'Yuntian Deng',
    'Zhen Qin'
]

CONFS = ['ACL', 'COLING', 'COLM', 'EMNLP', 'ICLR', 'ICML', 'JMLR', 'NAACL', 'NEURIPS', 'NIPS']
CLASSES = ['cs.CL', 'cs.LG']
MAX_RESULTS = 1000
PAGE_SIZE = 100
DELAY_SECONDS = 3.0
NUM_RETRIES = 3
MAX_DAY = 7


def red(t: str) -> str:
    """Highlight matched keywords in red."""
    return f'<span class="match-highlight">{t}</span>'


def match(t: str, keys: Iterable) -> Tuple[str, bool]:
    """Match and highlight keywords in text."""
    raw = t
    for key in keys:
        t = re.sub(fr'\b{re.escape(key)}\b', lambda m: red(m.group()), t, flags=re.I)
    return t, (raw != t)


def cover_timezones(date: datetime) -> datetime:
    """Convert datetime to UTC+8."""
    return date.astimezone(timezone(timedelta(hours=8)))


def format_date(date: datetime) -> str:
    """Format datetime for display."""
    return cover_timezones(date).strftime('%Y %b %d, %a')


def collect(name: str) -> Iterable[arxiv.Result]:
    """Collect papers from arxiv with given query."""
    client = arxiv.Client(
        page_size=PAGE_SIZE,
        delay_seconds=DELAY_SECONDS,
        num_retries=NUM_RETRIES
    )
    search = arxiv.Search(
        query=name,
        sort_by=arxiv.SortCriterion.LastUpdatedDate,
        max_results=MAX_RESULTS
    )
    try:
        yield from client.results(search)
    except arxiv.UnexpectedEmptyPageError:
        pass
    except Exception as exc:  # noqa: BLE001
        logger.warning('Error fetching papers for %s: %s', name, exc)


def truncate_abstract(text: str, max_len: int = 2000) -> str:
    """Truncate abstract to max length."""
    if len(text) <= max_len:
        return text
    return text[:max_len].rsplit(' ', 1)[0] + '...'


class StopIteration:
    """Sentinel class to signal end of iteration."""
    pass


def process_paper(paper: arxiv.Result) -> Tuple[str, dict] | None | type:
    """Process a single paper and return (date, data) if it matches criteria."""
    cutoff = datetime.now(paper.updated.tzinfo) - timedelta(MAX_DAY)
    if paper.updated.date() < cutoff.date():
        return StopIteration  # Signal to stop iterating

    date_str = format_date(paper.updated)
    any_match = False

    title, title_matched = match(paper.title, KEYS)
    any_match |= title_matched

    author_names = ', '.join([a.name for a in paper.authors[:5]])
    if len(paper.authors) > 5:
        author_names += f', +{len(paper.authors) - 5} more'
    authors, author_matched = match(author_names, AUTHORS)
    any_match |= author_matched

    abstract_raw = paper.summary.replace('\n', ' ')
    abstract_truncated = truncate_abstract(abstract_raw)
    abstract_full, abstract_matched = match(abstract_raw, KEYS)
    any_match |= abstract_matched

    comments, comment_matched = match(paper.comment or '', CONFS)
    any_match |= comment_matched

    if not any_match:
        return None  # Paper doesn't match, but continue iterating

    # Extract arxiv ID
    arxiv_id = paper.entry_id.split('/')[-1]

    data = {
        'title': title,
        'authors': authors,
        'abstract_raw': abstract_raw,  # Store raw for truncation check
        'abstract_truncated': abstract_truncated,
        'abstract_full': abstract_full,
        'comments': comments,
        'arxiv_id': arxiv_id,
        'entry_id': paper.entry_id,
        'date': format_date(paper.updated),
        'categories': [c for c in paper.categories if c in CLASSES],
        'primary_category': paper.primary_category,
    }

    return date_str, data


def linkify(text: str) -> str:
    """Convert URLs in text to clickable links with monospace font."""
    import re as re_module
    # Match http/https URLs
    url_pattern = r'https?://[^\s\)\]\>]+'
    
    def replace_url(match: re_module.Match) -> str:
        url = match.group(0)
        # Remove trailing punctuation
        while url[-1] in '.,;:!?)\'\"':
            url = url[:-1]
        return f'<a href="{url}" class="link-mono" target="_blank">{url}</a>'
    
    return re_module.sub(url_pattern, replace_url, text)


def render_paper_card(data: dict) -> str:
    """Render a single paper as a card."""
    categories_html = ''.join(
        [f'<span class="arxiv-cat">{c}</span>' for c in data['categories']]
    )

    # Comments with auto-linked URLs
    comments_html = ''
    if data['comments']:
        linked_comments = linkify(data['comments'])
        comments_html = f'<div class="arxiv-conference">{linked_comments}</div>'

    # Check if abstract is truncated (need to show expand button)
    # Use original raw abstract length to determine if truncation occurred
    ABSTRACT_MAX_LEN = 2000
    abstract_raw = data.get('abstract_raw', '')
    is_truncated = len(abstract_raw) > ABSTRACT_MAX_LEN if abstract_raw else False
    expand_btn = '<button class="pub-btn btn-expand">more</button>' if is_truncated else ''

    return f'''  <div class="pub-card arxiv-card">
    <div class="pub-title">{data['title']}</div>
    <div class="pub-authors">{data['authors']}</div>
    {comments_html}
    <div class="arxiv-meta">
      <a href="{data['entry_id']}" class="arxiv-id" target="_blank">arXiv:{data['arxiv_id']}</a>
      {categories_html}
    </div>
    <div class="pub-badges">
      <button class="pub-btn btn-abstract active">abstract</button>
      <a href="{data['entry_id'].replace('abs', 'pdf')}.pdf" class="pub-btn btn-code" target="_blank">pdf</a>
    </div>
    <div class="pub-abstract">
      <span class="abstract-text">{data['abstract_truncated']}</span>
      <span class="abstract-full hidden">{data['abstract_full']}</span>
      {expand_btn}
    </div>
  </div>
'''


def generate_html(papers: dict) -> str:
    """Generate HTML output from papers dict."""
    lines = [
        '---',
        'layout: default',
        '---',
        '',
        '<div class="arxiv-header">',
        '  <h2>Daily ArXiv Feed</h2>',
        '</div>',
        '',
        '<div class="date-nav">',
        '  <details open>',
        '    <summary>Jump to Date</summary>',
        '    <ul class="date-list">',
    ]

    for date in sorted(papers.keys(), reverse=True):
        anchor = date.replace(' ', '-').replace(',', '').lower()
        lines.append(f'      <li><a href="#{anchor}">{date}</a></li>')

    lines.extend([
        '    </ul>',
        '  </details>',
        '</div>',
        '',
    ])

    for date in sorted(papers.keys(), reverse=True):
        anchor = date.replace(' ', '-').replace(',', '').lower()
        lines.append(f'<h3 id="{anchor}" class="date-heading">{date}</h3>')
        lines.append('<div class="pub-list">')
        for _, data in sorted(papers[date].items()):
            lines.append(render_paper_card(data))
        lines.append('</div>')
        lines.append('')

    # No inline script needed - pub-buttons.js handles the toggle

    return '\n'.join(lines)


def main():
    """Main entry point."""
    papers = defaultdict(dict)

    for name in CLASSES:
        logger.info('Fetching papers for %s...', name)
        for paper in collect(name):
            result = process_paper(paper)
            if result is StopIteration:  # Time cutoff reached
                break
            if result is None:  # Paper doesn't match, continue
                continue
            date_str, data = result
            papers[date_str][paper.title] = data

    logger.info('Writing %d dates to arxiv.md...', len(papers))
    output = generate_html(papers)
    with open('arxiv.md', 'w') as f:
        f.write(output)

    logger.info('Done! Found papers for %d dates.', len(papers))


if __name__ == '__main__':
    main()
