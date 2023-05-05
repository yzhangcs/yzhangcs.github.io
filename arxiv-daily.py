# -*- coding: utf-8 -*-

import re
from datetime import datetime, timedelta
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
    'gaussian', 'generation', 'grammar', 'gumbel', 'gumbel-softmax',
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
    'Jason Eisner', 'Justin T. Chiu',
    'Kevin Gimpel',
    'Lifu Tu', 'Lingpeng Kong',
    'Mathieu Blondel', 'Michael Collins', 'Mirella Lapata',
    'Noah A. Smith',
    'Percy Liang'
    'Ryan Cotterell',
    'Shay B. Cohen', 'Songlin Yang',
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


papers = dict()
for name in CLASSES:
    search = arxiv.Search(query=name, sort_by=arxiv.SortCriterion.LastUpdatedDate)
    for paper in search.results():
        if paper.title in papers:
            continue
        if paper.updated < datetime.now(paper.updated.tzinfo) - timedelta(3):
            break
        title, _ = match(paper.title, KEYS)
        authors, _ = match(', '.join([f"{author}" for author in paper.authors]), AUTHORS)
        abstract, matched = match(paper.summary, KEYS)
        comments, _ = match(paper.comment or '', CONFS)
        categories = '    '.join([code(c, 'gray') for c in paper.categories if c in CLASSES])
        papers[paper.title] = f'* **{title}** <br>\n'
        papers[paper.title] += f'{code("[AUTHORS]")}{authors} <br>\n'
        if matched:
            papers[paper.title] += f'{code("[ABSTRACT]")}{abstract} <br>\n'
        if comments:
            papers[paper.title] += f'{code("[COMMENTS]")}{comments} <br>\n'
        papers[paper.title] += f'{code("[LINK]")}{link(paper.entry_id)} <br>\n'
        papers[paper.title] += f'{code("[DATE]")}{paper.updated} <br>\n'
        papers[paper.title] += f'{code("[CATEGORIES]")}{categories} <br>\n'

with open('arxiv.md', 'w') as f:
    f.write('---\nlayout: default\n---\n\n')
    f.write('<style type="text/css"> code { width: 120px; display: inline-block;} </style>')
    for title, paper in papers.items():
        f.write(paper + '\n\n')
