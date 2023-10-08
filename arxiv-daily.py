# -*- coding: utf-8 -*-

import re
from collections import defaultdict
from datetime import datetime, timedelta, timezone
from typing import Iterable, Tuple

import arxiv

KEYS = [
    'adversarial', 'algebraic', 'algebratic', 'amr', 'auto-encoding', 'autoencoder', 'autoencoding',
    'autoregressive',
    'backward', 'bayesian', 'bayes', 'bethe', 'bilexical', 'bipartite', 'bregman',
    'carlo', 'chomsky', 'circuit', 'clique', 'constituency', 'constituent', 'context-free', 'crf', 'ctc',
    'conditional independence', 'conditional-independence',
    'dependency', 'differentiable', 'differential', 'differentiation', 'diffusion', 'discrete', 'discretized',
    'duality',
    'dynamic', 'dynamic programming',
    'energy', 'euclidean', 'expectation', 'exponential',
    'fenchel-young', 'filter', 'flow', 'flowseq', 'forest', 'forward', 'frank-wolfe',
    'gaussian', 'generation', 'grammar', 'grammars', 'gumbel', 'gumbel-softmax',
    'high-order', 'higher-order', 'hmm', 'hsmm', 'hypergraph',
    'induction', 'inside', 'invertible',
    'lagrangian', 'latent', 'levenshtein', 'lexicalized', 'low-rank',
    'marginal', 'markov', 'masking', 'mcmc', 'mean-field', 'message-passing', 'monte', 'monotonic', 'mutual',
    'non-projective', 'normalizing',
    'optimal', 'outside',
    'parse', 'parser', 'parsing', 'particle', 'partition', 'pcfg', 'perturb-and-map', 'perturb-and-parse',
    'perturbation',
    'posterior', 'probabilistic', 'probabilistically', 'programming', 'projection', 'prototype', 'proximal',
    'randomized', 'ranking', 'rao-blackwell', 'regularization', 'regularized', 'relaxation', 'reorder',
    'reparameterization', 're-parameterization', 'rnnt', 'rnn-t',
    'sample', 'sampling', 'scaling', 'second-order', 'semi-amortized', 'semiring', 'semi-markov',
    'seq2seq', 'sequence', 'sequence to sequence', 'sequence-to-sequence',
    'simplex', 'sinkhorn', 'sparse', 'sparsemap', 'sparsemax', 'state-space', 'stochastic',
    'stochasticity', 'struct', 'structural', 'structure', 'structured', 'sum-product', 'syntax',
    'transducer', 'transduction', 'transformer', 'translation', 'transport', 'tree', 'treecrf',
    'variational', 'viterbi'
]

AUTHORS = [
    'Albert Gu', 'Alexander M. Rush', 'André F. T. Martins',
    'Bailin Wang',
    'Caio Corro', 'Chris Dyer', 'Christopher D. Manning', 'Christopher Ré',
    'Daniel Gildea', 'Daniel Y. Fu', 'David Chiang', 'David M. Blei',
    'Eduard Hovy',
    'Fei Huang',
    'Hao Zhou',
    'Giorgio Satta', 'Graham Neubig',
    'Ivan Titov',
    'Jan Buys', 'Jason Eisner', 'Justin T. Chiu',
    'Kevin Gimpel',
    'Lifu Tu', 'Lingpeng Kong',
    'Mathieu Blondel', 'Michael Collins', 'Mirella Lapata',
    'Noah A. Smith',
    'Percy Liang'
    'Ryan Cotterell',
    'Shaolei Zhang', 'Shay B. Cohen', 'Songlin Yang',
    'Tim Vieira', 'Tri Dao',
    'Vlad Niculae',
    'Xiang Lisa Li', 'Xuezhe Ma',
    'Yao Fu', 'Yang Feng', 'Yoon Kim', 'Yuntian Deng'
]

CONFS = ['ACL', 'EMNLP', 'NAACL', 'COLING', 'ICLR', 'NIPS', 'NEURIPS', 'ICML', 'JMLR']
CLASSES = ['cs.CL', 'cs.LG']


def red(t: str) -> str:
    return f'<span style="color:#e74d3c;">{t}</span>'


def code(t: str, color: str = 'green') -> str:
    return f'<code style="color:{color};">{t}</code>'


def link(t: str) -> str:
    return f'[{t}]({t})'


def match(t: str, keys: Iterable) -> Tuple[str, bool]:
    raw = t
    for key in keys:
        t = re.sub(fr'\b{key}\b', lambda m: red(m.group()), t, flags=re.I)
    return t, (raw != t)


def cover_timezones(date: datetime) -> datetime:
    # to UTF+8
    return date.astimezone(timezone(timedelta(hours=8)))


def collect(name: str) -> Iterable:
    try:
        for paper in arxiv.Search(query=name, sort_by=arxiv.SortCriterion.LastUpdatedDate).results():
            yield paper
    except arxiv.arxiv.UnexpectedEmptyPageError:
        pass


max_day, papers = 7, defaultdict(dict)
for name in CLASSES:
    for paper in collect(name):
        date = datetime.now(paper.updated.tzinfo) - timedelta(max_day)
        if paper.updated.date() < date.date():
            break
        date = cover_timezones(paper.updated).strftime("%a, %d %b %Y")
        any_match = False
        title, matched = match(paper.title, KEYS)
        any_match = any_match or matched
        authors, matched = match(', '.join([f"{author}" for author in paper.authors]), AUTHORS)
        any_match = any_match or matched
        abstract, matched = match(paper.summary, KEYS)
        any_match = any_match or matched
        comments, comment_matched = match(paper.comment or '', CONFS)
        any_match = any_match or comment_matched
        if not any_match:
            continue
        papers[date][paper.title] = f'* **{title}** <br>\n'
        papers[date][paper.title] += f'{code("[AUTHORS]")}{authors} <br>\n'
        if matched:
            papers[date][paper.title] += f'{code("[ABSTRACT]")}{abstract} <br>\n'
        if comments:
            papers[date][paper.title] += f'{code("[COMMENTS]")}{comments} <br>\n'
        papers[date][paper.title] += f'{code("[LINK]")}{link(paper.entry_id)} <br>\n'
        papers[date][paper.title] += f'{code("[DATE]")}{cover_timezones(paper.updated)} <br>\n'
        categories = '    '.join([code(c, 'gray') for c in paper.categories if c in CLASSES])
        papers[date][paper.title] += f'{code("[CATEGORIES]")}{categories} <br>\n'

with open('arxiv.md', 'w') as f:
    f.write('---\nlayout: default\n---\n\n')
    f.write('<style type="text/css"> code { width: 120px; display: inline-block;} </style>\n\n')
    f.write('<details><summary>Contents</summary><ul>')
    for date in papers:
        f.write(f'<li><a href="#{date.replace(" ", "-").replace(",", "").lower()}">{date}</a></li>')
    f.write('</ul></details><br>\n\n')
    for date in papers:
        f.write(f'#### {date}\n\n')
        for title, paper in papers[date].items():
            f.write(paper.replace('{', '\{').replace('}', '\}') + '\n\n')
