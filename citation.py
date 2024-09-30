# -*- coding: utf-8 -*-

import re

from semanticscholar import SemanticScholar

sch = SemanticScholar()
me = sch.get_author(49890808)

lines = []
with open('index.md', 'r') as file:
    lines = file.readlines()
for i, line in enumerate(lines):
    if line.startswith('[![citation]'):
        paper_id = re.search(r'/([a-f0-9]{40})', line.strip()).group(1)
        for paper in me.papers:
            if paper.paperId == paper_id:
                lines[i] = re.sub(r'(citation-)\d+', f'citation-{paper.citationCount}', line)
with open('index.md', 'w') as file:
    file.writelines(lines)
