# -*- coding: utf-8 -*-

import re
from datetime import datetime, timedelta
from typing import Iterable, Tuple

import arxiv

KEYS = ['adversarial', 'algebraic', 'algebratic', 'amr', 'auto-encoding', 'autoencoder', 'autoencoding', 'autoregressive',
        'backward', 'bayesian', 'bayes', 'bethe', 'bilexical', 'bipartite', 'bregman', 'carlo', 'chomsky', 'circuit', 'clique',
        'constituency', 'constituent', 'context-free', 'crf', 'dependency', 'differentiable', 'differential',
        'differentiation', 'discrete', 'discretized', 'duality', 'energy', 'euclidean', 'expectation', 'exponential',
        'fenchel-young', 'filter', 'flow', 'flowseq', 'forest', 'forward', 'frank-wolfe', 'gaussian', 'generation', 'grammar',
        'gumbel', 'gumbel-softmax', 'higher-order', 'hmm', 'hypergraph', 'induction', 'inside', 'invertible', 'lagrangian',
        'latent', 'levenshtein', 'lexicalized', 'low-rank', 'marginal', 'markov', 'masking', 'mcmc', 'mean-field',
        'message-passing', 'monte', 'mutual', 'non-projective', 'normalizing', 'optimal', 'outside', 'parse', 'parser',
        'parsing', 'particle', 'partition', 'pcfg', 'perturb-and-map', 'perturb-and-parse', 'perturbation', 'posterior',
        'probabilistic', 'probabilistically', 'programming', 'projection', 'prototype', 'proximal', 'randomized', 'ranking',
        'rao-blackwell', 'regularization', 'regularized', 'relaxation', 'reorder', 'reparameterization', 'sample', 'sampling',
        'second-order', 'semi-amortized', 'semiring', 'sequence', 'simplex', 'sinkhorn', 'sparse', 'sparsemap', 'sparsemax',
        'stochastic', 'stochasticity', 'struct', 'structural', 'structure', 'structured', 'sum-product', 'syntax',
        'transformer', 'translation', 'transport', 'tree', 'treecrf', 'variational', 'viterbi']

AUTHORS = ['Alexander M. Rush', 'André F. T. Martins', 'Bailin Wang', 'Caio Corro', 'Chris Dyer', 'Daniel Gildea',
           'David Chiang', 'David M. Blei', 'Eduard Hovy', 'Giorgio Satta', 'Graham Neubig', 'Ivan Titov', 'Jason Eisner',
           'Justin T. Chiu', 'Kevin Gimpel', 'Lifu Tu', 'Lingpeng Kong', 'Mathieu Blondel', 'Michael Collins',
           'Mirella Lapata', 'Noah A. Smith', 'Ryan Cotterell', 'Shay B. Cohen', 'Songlin Yang', 'Tim Vieira', 'Vlad Niculae',
           'Xiang Lisa Li', 'Xuezhe Ma', 'Yao Fu', 'Yoon Kim', 'Yuntian Deng', 'Christopher D. Manning', 'Percy Liang']

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


titles = dict()
for name in CLASSES:
    search = arxiv.Search(query=name, max_results=50, sort_by=arxiv.SortCriterion.LastUpdatedDate)
    for paper in search.results():
        if paper.title in titles:
            continue
        if paper.updated >= datetime.now(paper.updated.tzinfo) - timedelta(2):
            title, _ = match(paper.title, KEYS)
            authors, _ = match(', '.join([f"{author}" for author in paper.authors]), AUTHORS)
            abstract, matched = match(paper.summary, KEYS)
            comments, _ = match(paper.comment or '', CONFS)
            categories = '    '.join([code(c, 'gray') for c in paper.categories if c in CLASSES])
            titles[paper.title] = f'* **{title}** <br>\n'
            titles[paper.title] += f'{code("[AUTHORS]")}{authors} <br>\n'
            if matched:
                titles[paper.title] += f'{code("[ABSTRACT]")}{abstract} <br>\n'
            if comments:
                titles[paper.title] += f'{code("[COMMENTS]")}{comments} <br>\n'
            titles[paper.title] += f'{code("[LINK]")}{link(paper.entry_id)} <br>\n'
            titles[paper.title] += f'{code("[DATE]")}{paper.updated} <br>\n'
            titles[paper.title] += f'{code("[CATEGORIES]")}{categories} <br>\n'
with open('arxiv.md', 'w') as f:
    f.write('---\nlayout: default\n---\n\n')
    f.write('<style type="text/css"> code { width: 120px; display: inline-block;} </style>')
    for title, paper in titles.items():
        f.write(paper + '\n\n')
