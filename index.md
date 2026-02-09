---
layout: default
---

Hi, my name is Yu Zhang ([jy tʃɑŋ], 張宇/张宇 in traditional/simplified Chinese).
I am a researcher at [Moonshot AI](https://www.moonshot.cn/).

I received my Ph.D. degree from Soochow University in 2025, advised by [Prof. Guohong Fu](http://web.suda.edu.cn/ghfu/).
Prior to this, I received my M. Eng. and B. Eng. degrees from Soochow University in 2021 and 2018, respectively.

~~*My early research focused on structured prediction tasks, specifically dependency parsing and constituency parsing.*~~
Currently, my research interests have evolved to focus on developing efficient text generation models.
I am particularly intrigued by the prospect of developing hardware-efficient methods for linear-time sequence modeling.
As a disciple of parallel programming, I am passionate about exploring techniques that harness the power of parallel computing to develop scalable subquadratic models.

## Publications

<div class="pub-links">
  <a href="https://www.semanticscholar.org/author/Yu-Zhang/49890808">Semantic Scholar</a>
  <a href="https://scholar.google.com/citations?user=y3JK-1oAAAAJ">Google Scholar</a>
  <a href="https://dblp.org/pid/50/671-92.html">DBLP</a>
</div>
<p class="pub-note">* denotes equal contributions</p>

<div class="pub-list">

<div class="pub-card">
  <div class="pub-title">Kimi Linear: An Expressive, Eﬀicient Attention Architecture</div>
  <div class="pub-authors"><strong>Yu Zhang</strong>, Zongyu Lin, Xingcheng Yao, Jiaxi Hu, Fanqing Meng, Chengyin Liu, Xin Men, Songlin Yang, Zhiyuan Li, Wentao Li, Enzhe Lu, Weizhou Liu, Yanru Chen, Weixin Xu, Longhui Yu, Yejie Wang, Yu Fan, Longguang Zhong, Enming Yuan, Dehao Zhang, Yizhi Zhang, TY Liu, Haiming Wang, Shengjun Fang, Weiran He, Shaowei Liu, Yiwei Li, Jianlin Su, Jiezhong Qiu, Bo Pang, Junjie Yan, Zhejun Jiang, Weixiao Huang, Bohong Yin, Jiacheng You, Chu Wei, Zhengtao Wang, Chao Hong, Yutian Chen, Guanduo Chen, Yucheng Wang, Huabin Zheng, Feng Wang, Yibo Liu, Mengnan Dong, Zheng Zhang, Siyuan Pan, Wenhao Wu, Yuhao Wu, Longyu Guan, Jiawen Tao, Guohong Fu, Xinran Xu, Yuzhi Wang, Guokun Lai, Yuxin Wu, Xinyu Zhou, Zhilin Yang, Yulun Du</div>
  <div class="pub-venue"><span class="venue-badge preprint">Preprint</span></div>
  <div class="pub-badges">
    <button class="pub-btn btn-paper">abstract</button>
    <button class="pub-btn btn-bib">bib</button>
    <a href="https://arxiv.org/abs/2510.26692" class="pub-btn btn-arxiv">arxiv</a>
    <a href="https://github.com/MoonshotAI/Kimi-Linear" class="pub-btn btn-code">code</a>
    <span class="pub-btn btn-citation" data-paper-id="fc6412d9ec7a6a07ce9ef15273279a0021d09422">citation</span>
  </div>
  <div class="pub-abstract hidden">
    We introduce Kimi Linear, a novel attention architecture that achieves expressive power comparable to softmax attention while maintaining linear time complexity. Our approach combines the delta rule with gated slot attention to enable efficient sequence modeling. Experimental results demonstrate competitive performance on language modeling benchmarks with significantly improved inference efficiency.
  </div>
  <div class="pub-bibtex hidden" data-bib-url="/assets/pubs/techreport/2025/kda.bib"></div>
</div>

<div class="pub-card">
  <div class="pub-title">Gated Slot Attention for Efficient Linear-Time Sequence Modeling</div>
  <div class="pub-authors"><strong>Yu Zhang*</strong>, Songlin Yang*, Ruijie Zhu, Yue Zhang, Leyang Cui, Yiqiao Wang, Bolun Wang, Freda Shi, Bailin Wang, Wei Bi, Peng Zhou, Guohong Fu</div>
  <div class="pub-venue"><span class="venue-badge conf">NeurIPS 2024</span></div>
  <div class="pub-badges">
    <button class="pub-btn btn-paper">abstract</button>
    <button class="pub-btn btn-bib">bib</button>
    <a href="https://arxiv.org/abs/2409.07146" class="pub-btn btn-arxiv">arxiv</a>
    <a href="https://github.com/sustcsonglin/flash-linear-attention" class="pub-btn btn-code">code</a>
    <span class="pub-btn btn-citation" data-paper-id="3d3b13ae755b87aa1425e2294263186bc8723740">citation</span>
  </div>
  <div class="pub-abstract hidden">
    Linear attention has emerged as a promising alternative to softmax attention for its efficient computation and comparable performance. In this work, we propose Gated Slot Attention (GSA), a new linear attention mechanism that combines the benefits of gated linear attention and slot-based memory. GSA achieves strong performance on language modeling tasks while maintaining linear complexity with respect to sequence length.
  </div>
  <div class="pub-bibtex hidden" data-bib-url="/assets/pubs/neurips/2024/gsa.bib"></div>
</div>

<div class="pub-card">
  <div class="pub-title">Parallelizing Linear Transformers with the Delta Rule over Sequence Length</div>
  <div class="pub-authors">Songlin Yang, Bailin Wang, <strong>Yu Zhang</strong>, Yikang Shen, Yoon Kim</div>
  <div class="pub-venue"><span class="venue-badge conf">NeurIPS 2024</span></div>
  <div class="pub-badges">
    <button class="pub-btn btn-paper">abstract</button>
    <button class="pub-btn btn-bib">bib</button>
    <a href="https://arxiv.org/abs/2406.06484" class="pub-btn btn-arxiv">arxiv</a>
    <a href="https://github.com/sustcsonglin/flash-linear-attention" class="pub-btn btn-code">code</a>
    <span class="pub-btn btn-citation" data-paper-id="7afaabb73bec969c0937be46b9f0f757e07c8534">citation</span>
  </div>
  <div class="pub-abstract hidden">
    Linear attention mechanisms offer efficient sequence modeling but lack the expressive power of softmax attention. We propose a novel parallelization scheme for linear transformers using the delta rule, enabling efficient training while maintaining the benefits of linear complexity. Our approach allows for effective modeling of sequential dependencies with significantly reduced computational cost.
  </div>
  <div class="pub-bibtex hidden" data-bib-url="/assets/pubs/neurips/2024/deltanet.bib"></div>
</div>

<div class="pub-card">
  <div class="pub-title">Scalable MatMul-free Language Modeling</div>
  <div class="pub-authors">Ruijie Zhu, <strong>Yu Zhang</strong>, Ethan Sifferman, Tyler Sheaves, Yiqiao Wang, Dustin Richmond, Peng Zhou, Jason K. Eshraghian</div>
  <div class="pub-venue"><span class="venue-badge preprint">Preprint</span></div>
  <div class="pub-badges">
    <button class="pub-btn btn-paper">abstract</button>
    <button class="pub-btn btn-bib">bib</button>
    <a href="https://arxiv.org/abs/2406.02528" class="pub-btn btn-arxiv">arxiv</a>
    <a href="https://github.com/ridgerchu/matmulfreellm/" class="pub-btn btn-code">code</a>
    <span class="pub-btn btn-citation" data-paper-id="401c4147375b016d4758cf2dd859232a8271fdcd">citation</span>
  </div>
  <div class="pub-abstract hidden">
    Matrix multiplication (MatMul) dominates the computational cost of language models. We propose a scalable MatMul-free language modeling approach that eliminates expensive matrix multiplications while maintaining competitive performance. Our method enables efficient deployment on hardware with limited resources.
  </div>
  <div class="pub-bibtex hidden" data-bib-url="/assets/pubs/neurips/2024/mmf.bib"></div>
</div>

<div class="pub-card">
  <div class="pub-title">Non-autoregressive Text Editing with Copy-aware Latent Alignments</div>
  <div class="pub-authors"><strong>Yu Zhang*</strong>, Yue Zhang*, Leyang Cui, Guohong Fu</div>
  <div class="pub-venue"><span class="venue-badge conf">EMNLP 2023</span></div>
  <div class="pub-badges">
    <button class="pub-btn btn-paper">abstract</button>
    <button class="pub-btn btn-bib">bib</button>
    <a href="https://arxiv.org/abs/2310.07821" class="pub-btn btn-arxiv">arxiv</a>
    <a href="https://github.com/yzhangcs/ctc-copy" class="pub-btn btn-code">code</a>
    <span class="pub-btn btn-citation" data-paper-id="116277fd27c97d50bba2d8023d3c590c1ea8187b">citation</span>
  </div>
  <div class="pub-abstract hidden">
    Non-autoregressive text editing models offer efficient text generation by predicting edits rather than tokens. We propose copy-aware latent alignments to improve the accuracy of edit-based models by better handling copy operations. Our approach achieves state-of-the-art results on text editing benchmarks with significantly faster inference.
  </div>
  <div class="pub-bibtex hidden" data-bib-url="/assets/pubs/emnlp/2023/ctc.bib"></div>
</div>

<div class="pub-card">
  <div class="pub-title">Semantic Role Labeling as Dependency Parsing: Exploring Latent Tree Structures Inside Arguments</div>
  <div class="pub-authors"><strong>Yu Zhang</strong>, Qingrong Xia, Shilin Zhou, Yong Jiang, Guohong Fu, Min Zhang</div>
  <div class="pub-venue"><span class="venue-badge conf">COLING 2022</span></div>
  <div class="pub-badges">
    <button class="pub-btn btn-paper">abstract</button>
    <button class="pub-btn btn-bib">bib</button>
    <a href="https://arxiv.org/abs/2110.06865" class="pub-btn btn-arxiv">arxiv</a>
    <a href="https://github.com/yzhangcs/crfsrl" class="pub-btn btn-code">code</a>
    <span class="pub-btn btn-citation" data-paper-id="64332d61dfef5ac685500a238b8a79d75152c164">citation</span>
  </div>
  <div class="pub-abstract hidden">
    Semantic role labeling (SRL) is typically treated as a sequence labeling or span prediction task. We explore an alternative formulation where SRL is cast as dependency parsing, revealing latent tree structures inside semantic arguments. Our approach leverages dependency parsing techniques to capture hierarchical relationships between arguments.
  </div>
  <div class="pub-bibtex hidden" data-bib-url="/assets/pubs/coling/2022/crfsrl.bib"></div>
</div>

<div class="pub-card">
  <div class="pub-title">Fast and Accurate End-to-End Span-based Semantic Role Labeling as Word-based Graph Parsing <span class="award-badge">Best Paper Award</span></div>
  <div class="pub-authors">Shilin Zhou, Qingrong Xia, Zhenghua Li, <strong>Yu Zhang</strong>, Yu Hong, Min Zhang</div>
  <div class="pub-venue"><span class="venue-badge conf">COLING 2022</span></div>
  <div class="pub-badges">
    <button class="pub-btn btn-paper">abstract</button>
    <button class="pub-btn btn-bib">bib</button>
    <a href="https://arxiv.org/abs/2112.02970" class="pub-btn btn-arxiv">arxiv</a>
    <a href="https://github.com/zsLin177/SRL-as-GP" class="pub-btn btn-code">code</a>
    <span class="pub-btn btn-citation" data-paper-id="ea9a2d14672c3cc0ff92510386f46fb2b152570c">citation</span>
  </div>
  <div class="pub-abstract hidden">
    Span-based semantic role labeling has achieved great success but often requires complex pipeline architectures. We reformulate SRL as word-based graph parsing, enabling fast and accurate end-to-end processing. Our approach won the Best Paper Award at COLING 2022 for its elegant formulation and strong empirical results.
  </div>
  <div class="pub-bibtex hidden" data-bib-url="/assets/pubs/coling/2022/graphsrl.bib"></div>
</div>

<div class="pub-card">
  <div class="pub-title">Fast and Accurate Neural CRF Constituency Parsing</div>
  <div class="pub-authors"><strong>Yu Zhang*</strong>, Houquan Zhou*, Zhenghua Li</div>
  <div class="pub-venue"><span class="venue-badge conf">IJCAI 2020</span></div>
  <div class="pub-badges">
    <button class="pub-btn btn-paper">abstract</button>
    <button class="pub-btn btn-bib">bib</button>
    <a href="https://arxiv.org/abs/2008.03736" class="pub-btn btn-arxiv">arxiv</a>
    <a href="https://github.com/yzhangcs/crfpar" class="pub-btn btn-code">code</a>
    <span class="pub-btn btn-citation" data-paper-id="46fe2ae301aeb75b25ebca0bdc26132ca46f5101">citation</span>
  </div>
  <div class="pub-abstract hidden">
    Constituency parsing is a fundamental NLP task requiring both accuracy and efficiency. We propose a fast and accurate neural CRF approach that achieves state-of-the-art results with significantly reduced computational cost. Our method combines neural encoding with efficient CRF inference for optimal performance.
  </div>
  <div class="pub-bibtex hidden" data-bib-url="/assets/pubs/ijcai/2020/crfpar.bib"></div>
</div>

<div class="pub-card">
  <div class="pub-title">Efficient Second-Order TreeCRF for Neural Dependency Parsing</div>
  <div class="pub-authors"><strong>Yu Zhang</strong>, Zhenghua Li, Min Zhang</div>
  <div class="pub-venue"><span class="venue-badge conf">ACL 2020</span></div>
  <div class="pub-badges">
    <button class="pub-btn btn-paper">abstract</button>
    <button class="pub-btn btn-bib">bib</button>
    <a href="https://arxiv.org/abs/2005.00975" class="pub-btn btn-arxiv">arxiv</a>
    <a href="https://github.com/yzhangcs/crfpar" class="pub-btn btn-code">code</a>
    <span class="pub-btn btn-citation" data-paper-id="ce18780963b067a1295fc847e7ab33f2fcbfaca1">citation</span>
  </div>
  <div class="pub-abstract hidden">
    Dependency parsing benefits from structured prediction with TreeCRFs, but second-order models are computationally expensive. We propose efficient algorithms for second-order TreeCRF inference that maintain accuracy while significantly reducing training time. Our approach enables practical use of rich structural features.
  </div>
  <div class="pub-bibtex hidden" data-bib-url="/assets/pubs/acl/2020/crfpar.bib"></div>
</div>

<div class="pub-card">
  <div class="pub-title">Is POS Tagging Necessary or Even Helpful for Neural Dependency Parsing? <span class="award-badge">Best Paper Award</span></div>
  <div class="pub-authors">Houquan Zhou*, <strong>Yu Zhang*</strong>, Zhenghua Li, Min Zhang</div>
  <div class="pub-venue"><span class="venue-badge conf">NLPCC 2020</span></div>
  <div class="pub-badges">
    <button class="pub-btn btn-paper">abstract</button>
    <button class="pub-btn btn-bib">bib</button>
    <a href="https://arxiv.org/abs/2003.03204" class="pub-btn btn-arxiv">arxiv</a>
    <a href="https://github.com/Jacob-Zhou/stack-parser" class="pub-btn btn-code">code</a>
    <span class="pub-btn btn-citation" data-paper-id="3bb577d87ae8e0d45a223f65db24ab479fbda174">citation</span>
  </div>
  <div class="pub-abstract hidden">
    Part-of-speech (POS) tagging has long been considered essential for dependency parsing. We investigate whether POS tagging is still necessary in the era of neural networks, providing empirical analysis on the contribution of POS tags to parsing performance. Our findings challenge conventional wisdom and won the Best Paper Award at NLPCC 2020.
  </div>
  <div class="pub-bibtex hidden" data-bib-url="/assets/pubs/nlpcc/2020/posdep.bib"></div>
</div>

<div class="pub-card">
  <div class="pub-title">HLT@SUDA at SemEval-2019 Task 1: UCCA Graph Parsing as Constituent Tree Parsing</div>
  <div class="pub-authors">Wei Jiang, Zhenghua Li, <strong>Yu Zhang</strong>, Min Zhang</div>
  <div class="pub-venue"><span class="venue-badge conf">SemEval 2019</span></div>
  <div class="pub-badges">
    <button class="pub-btn btn-paper">abstract</button>
    <button class="pub-btn btn-bib">bib</button>
    <a href="https://arxiv.org/abs/1903.04153" class="pub-btn btn-arxiv">arxiv</a>
    <a href="https://github.com/SUDA-LA/ucca-parser" class="pub-btn btn-code">code</a>
    <span class="pub-btn btn-citation" data-paper-id="6c690b828a508635506018ddbd03d63d4e08a380">citation</span>
  </div>
  <div class="pub-abstract hidden">
    Universal Conceptual Cognitive Annotation (UCCA) provides a cross-lingual semantic representation. We approach UCCA graph parsing by reducing it to constituent tree parsing, leveraging existing parsing techniques for tree structures. Our system achieved competitive results at the SemEval-2019 shared task.
  </div>
  <div class="pub-bibtex hidden" data-bib-url="/assets/pubs/semeval/2019/const.bib"></div>
</div>

</div>

## Projects

<div class="project-list">

<div class="project-card">
  <div class="project-header">
    <span class="project-name">FLA</span>
    <div class="project-badges">
      <a href="https://github.com/fla-org/flash-linear-attention">
        <img src="https://img.shields.io/badge/code-orange?style=flat-square&logo=github" alt="code">
      </a>
      <a href="https://github.com/fla-org/flash-linear-attention/releases">
        <img src="https://img.shields.io/github/v/release/fla-org/flash-linear-attention?style=flat-square" alt="release">
      </a>
    </div>
  </div>
  <div class="project-desc">A Triton-Based Library for Hardware-Efficient Implementations of Linear Attention Mechanism</div>
</div>

<div class="project-card">
  <div class="project-header">
    <span class="project-name">SuPar</span>
    <div class="project-badges">
      <a href="https://github.com/yzhangcs/parser">
        <img src="https://img.shields.io/badge/code-orange?style=flat-square&logo=github" alt="code">
      </a>
      <a href="https://github.com/yzhangcs/parser/releases">
        <img src="https://img.shields.io/github/v/release/yzhangcs/parser?style=flat-square" alt="release">
      </a>
    </div>
  </div>
  <div class="project-desc">State-of-the-art syntactic/semantic parsers. A Python package designed for structured prediction, including reproductions of many state-of-the-art syntactic/semantic parsers (with pretrained models for more than 19 languages), and highly-parallelized implementations of several well-known structured prediction algorithms.</div>
</div>

</div>

## Experience

<div class="exp-list">

<div class="exp-card">
  <div class="exp-date">2025 - present</div>
  <div class="exp-title">AI Researcher at Moonshot AI</div>
</div>

<div class="exp-card">
  <div class="exp-date">2024 - 2025</div>
  <div class="exp-title">Research Intern at Shanghai AI Lab</div>
  <div class="exp-mentor">mentored by <a href="https://scholar.google.com/citations?user=ZyqFanQAAAAJ">Peng Gao</a></div>
</div>

<div class="exp-card">
  <div class="exp-date">2023 - 2024</div>
  <div class="exp-title">Research Intern at Tencent AI Lab</div>
  <div class="exp-mentor">mentored by <a href="https://scholar.google.com/citations?user=aSJcgQMAAAAJ">Wei Bi</a></div>
</div>

<div class="exp-card">
  <div class="exp-date">2020 - 2021</div>
  <div class="exp-title">Research Intern at Alibaba DAMO Academy</div>
  <div class="exp-mentor">mentored by <a href="http://jiangyong.site">Yong Jiang</a></div>
</div>

</div>
