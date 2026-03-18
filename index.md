---
layout: default
---
~~*My early research focused on structured prediction tasks, specifically dependency parsing and constituency parsing.*~~
Currently, my research interests have evolved to focus on developing efficient text generation models.
I am particularly intrigued by the prospect of developing hardware-efficient methods for linear-time sequence modeling.
As a disciple of parallel programming, I am passionate about exploring techniques that harness the power of parallel computing to develop scalable subquadratic models.

## Publications

<div class="pub-links">
  <a href="https://www.semanticscholar.org/author/Yu-Zhang/49890808"><i class="ai ai-semantic-scholar"></i> Semantic Scholar</a>
  <a href="https://scholar.google.com/citations?user=y3JK-1oAAAAJ"><i class="ai ai-google-scholar"></i> Google Scholar</a>
  <a href="https://dblp.org/pid/50/671-92.html"><i class="ai ai-dblp"></i> DBLP</a>
</div>
<p class="pub-note">* denotes equal contributions</p>

<div class="pub-list">

<div class="pub-card">
  <div class="pub-title">Attention Residuals</div>
  <div class="pub-authors"><a href="https://nathanchen.me/">Guangyu Chen*</a>, <strong>Yu Zhang*</strong>, <a href="https://jianlin.su">Jianlin Su*</a>, Weixin Xu, Siyuan Pan, Yaoyu Wang, Yucheng Wang, Guanduo Chen, Bohong Yin, Yutian Chen, Junjie Yan, Ming Wei, Fanqing Meng, Chao Hong, Xiaotong Xie, Shaowei Liu, Enzhe Lu, Yunpeng Tai, Yanru Chen, Xin Men, Haiqing Guo, Haoyu Lu, Lin Sui, Jinguo Zhu, Zaida Zhou, Weiran He, Weixiao Huang, Xinran Xu, Yuzhi Wang, Guokun Lai, Yulun Du, Yuxin Wu, Zhilin Yang, Xinyu Zhou</div>
  <div class="pub-venue"><a href="./assets/pubs/techreport/2026/attnres.pdf" class="venue-badge preprint">Preprint</a></div>
  <div class="pub-badges">
    <button class="pub-btn btn-paper">abstract</button>
    <button class="pub-btn btn-bib">bib</button>
    <a href="https://arxiv.org/abs/2603.15031" class="pub-btn btn-arxiv">arxiv</a>
    <a href="https://github.com/MoonshotAI/Attention-Residuals/" class="pub-btn btn-code">code</a>
    <a href="https://www.semanticscholar.org/paper/101549ed507f18e10044d127c99a495bb176956f" class="pub-btn btn-citation" data-paper-id="101549ed507f18e10044d127c99a495bb176956f" target="_blank">citation</a>
  </div>
  <div class="pub-abstract hidden">
    Residual connections with PreNorm are standard in modern LLMs, yet they accumulate all layer outputs with fixed unit weights. This uniform aggregation causes uncontrolled hidden-state growth with depth, progressively diluting each layer's contribution. We propose Attention Residuals (AttnRes), which replaces this fixed accumulation with softmax attention over preceding layer outputs, allowing each layer to selectively aggregate earlier representations with learned, input-dependent weights. To address the memory and communication overhead of attending over all preceding layer outputs for large-scale model training, we introduce Block AttnRes, which partitions layers into blocks and attends over block-level representations, reducing the memory footprint while preserving most of the gains of full AttnRes. Combined with cache-based pipeline communication and a two-phase computation strategy, Block AttnRes becomes a practical drop-in replacement for standard residual connections with minimal overhead. Scaling law experiments confirm that the improvement is consistent across model sizes, and ablations validate the benefit of content-dependent depth-wise selection. We further integrate AttnRes into the Kimi Linear architecture (48B total / 3B activated parameters) and pre-train on 1.4T tokens, where AttnRes mitigates PreNorm dilution, yielding more uniform output magnitudes and gradient distribution across depth, and improves downstream performance across all evaluated tasks.
  </div>
  <div class="pub-bibtex hidden" data-bib-url="/assets/pubs/techreport/2026/attnres.bib"><pre><code class="language-bibtex"></code></pre></div>
</div>

<div class="pub-card">
  <div class="pub-title">Kimi Linear: An Expressive, Eﬀicient Attention Architecture</div>
  <div class="pub-authors"><strong>Yu Zhang</strong>, <a href="https://rafa-zy.github.io">Zongyu Lin</a>, <a href="https://yaoxingcheng.github.io">Xingcheng Yao</a>, Jiaxi Hu, Fanqing Meng, Chengyin Liu, Xin Men, <a href="https://sustcsonglin.github.io">Songlin Yang</a>, Zhiyuan Li, Wentao Li, Enzhe Lu, Weizhou Liu, Yanru Chen, Weixin Xu, Longhui Yu, Yejie Wang, Yu Fan, Longguang Zhong, Enming Yuan, Dehao Zhang, Yizhi Zhang, TY Liu, Haiming Wang, Shengjun Fang, Weiran He, Shaowei Liu, Yiwei Li, <a href="https://jianlin.su">Jianlin Su</a>, Jiezhong Qiu, Bo Pang, Junjie Yan, Zhejun Jiang, Weixiao Huang, Bohong Yin, Jiacheng You, Chu Wei, Zhengtao Wang, Chao Hong, Yutian Chen, Guanduo Chen, Yucheng Wang, Huabin Zheng, Feng Wang, Yibo Liu, Mengnan Dong, Zheng Zhang, Siyuan Pan, Wenhao Wu, Yuhao Wu, Longyu Guan, Jiawen Tao, Guohong Fu, Xinran Xu, Yuzhi Wang, Guokun Lai, Yuxin Wu, Xinyu Zhou, Zhilin Yang, Yulun Du</div>
  <div class="pub-venue"><a href="./assets/pubs/techreport/2025/kda.pdf" class="venue-badge preprint">Preprint</a></div>
  <div class="pub-badges">
    <button class="pub-btn btn-paper">abstract</button>
    <button class="pub-btn btn-bib">bib</button>
    <a href="https://arxiv.org/abs/2510.26692" class="pub-btn btn-arxiv">arxiv</a>
    <a href="https://github.com/MoonshotAI/Kimi-Linear" class="pub-btn btn-code">code</a>
    <a href="https://www.semanticscholar.org/paper/fc6412d9ec7a6a07ce9ef15273279a0021d09422" class="pub-btn btn-citation" data-paper-id="fc6412d9ec7a6a07ce9ef15273279a0021d09422" target="_blank">citation</a>
  </div>
  <div class="pub-abstract hidden">
    We introduce Kimi Linear, a hybrid linear attention architecture that, for the first time, outperforms full attention under fair comparisons across various scenarios -- including short-context, long-context, and reinforcement learning (RL) scaling regimes. At its core lies Kimi Delta Attention (KDA), an expressive linear attention module that extends Gated DeltaNet with a finer-grained gating mechanism, enabling more effective use of limited finite-state RNN memory. Our bespoke chunkwise algorithm achieves high hardware efficiency through a specialized variant of the Diagonal-Plus-Low-Rank (DPLR) transition matrices, which substantially reduces computation compared to the general DPLR formulation while remaining more consistent with the classical delta rule. We pretrain a Kimi Linear model with 3B activated parameters and 48B total parameters, based on a layerwise hybrid of KDA and Multi-Head Latent Attention (MLA). Our experiments show that with an identical training recipe, Kimi Linear outperforms full MLA with a sizeable margin across all evaluated tasks, while reducing KV cache usage by up to 75% and achieving up to 6 times decoding throughput for a 1M context. These results demonstrate that Kimi Linear can be a drop-in replacement for full attention architectures with superior performance and efficiency, including tasks with longer input and output lengths. To support further research, we open-source the KDA kernel and vLLM implementations, and release the pre-trained and instruction-tuned model checkpoints.
  </div>
  <div class="pub-bibtex hidden" data-bib-url="/assets/pubs/techreport/2025/kda.bib"><pre><code class="language-bibtex"></code></pre></div>
</div>

<div class="pub-card">
  <div class="pub-title">Gated Slot Attention for Efficient Linear-Time Sequence Modeling</div>
  <div class="pub-authors"><strong>Yu Zhang*</strong>, <a href="https://sustcsonglin.github.io">Songlin Yang*</a>, <a href="https://ruijie-zhu.github.io">Ruijie Zhu</a>, <a href="https://hillzhang1999.github.io">Yue Zhang</a>, <a href="https://nealcly.github.io">Leyang Cui</a>, Yiqiao Wang, Bolun Wang, <a href="https://home.ttic.edu/~freda">Freda Shi</a>, <a href="https://berlino.github.io/">Bailin Wang</a>, Wei Bi, Peng Zhou, Guohong Fu</div>
  <div class="pub-venue"><a href="./assets/pubs/neurips/2024/gsa.pdf" class="venue-badge conf">NeurIPS 2024</a></div>
  <div class="pub-badges">
    <button class="pub-btn btn-paper">abstract</button>
    <button class="pub-btn btn-bib">bib</button>
    <a href="https://arxiv.org/abs/2409.07146" class="pub-btn btn-arxiv">arxiv</a>
    <a href="https://github.com/sustcsonglin/flash-linear-attention" class="pub-btn btn-code">code</a>
    <a href="https://www.semanticscholar.org/paper/3d3b13ae755b87aa1425e2294263186bc8723740" class="pub-btn btn-citation" data-paper-id="3d3b13ae755b87aa1425e2294263186bc8723740" target="_blank">citation</a>
  </div>
  <div class="pub-abstract hidden">
    Linear attention Transformers and their gated variants, celebrated for enabling parallel training and efficient recurrent inference, still fall short in recall-intensive tasks compared to traditional Transformers and demand significant resources for training from scratch. This paper introduces Gated Slot Attention (GSA), which enhances Attention with Bounded-memory-Control (ABC) by incorporating a gating mechanism inspired by Gated Linear Attention (GLA). Essentially, GSA comprises a two-layer GLA linked via softmax, utilizing context-aware memory reading and adaptive forgetting to improve memory capacity while maintaining compact recurrent state size. This design greatly enhances both training and inference efficiency through GLA's hardware-efficient training algorithm and reduced state size. Additionally, retaining the softmax operation is particularly beneficial in "finetuning pretrained Transformers to RNNs" (T2R) settings, reducing the need for extensive training from scratch. Extensive experiments confirm GSA's superior performance in scenarios requiring in-context recall and in T2R settings.
  </div>
  <div class="pub-bibtex hidden" data-bib-url="/assets/pubs/neurips/2024/gsa.bib"><pre><code class="language-bibtex"></code></pre></div>
</div>

<div class="pub-card">
  <div class="pub-title">Parallelizing Linear Transformers with the Delta Rule over Sequence Length</div>
  <div class="pub-authors"><a href="https://sustcsonglin.github.io">Songlin Yang</a>, <a href="https://berlino.github.io/">Bailin Wang</a>, <strong>Yu Zhang</strong>, <a href="https://mitibmwatsonailab.mit.edu/people/yikang-shen">Yikang Shen</a>, <a href="https://people.csail.mit.edu/yoonkim">Yoon Kim</a></div>
  <div class="pub-venue"><a href="./assets/pubs/neurips/2024/deltanet.pdf" class="venue-badge conf">NeurIPS 2024</a></div>
  <div class="pub-badges">
    <button class="pub-btn btn-paper">abstract</button>
    <button class="pub-btn btn-bib">bib</button>
    <a href="https://arxiv.org/abs/2406.06484" class="pub-btn btn-arxiv">arxiv</a>
    <a href="https://github.com/sustcsonglin/flash-linear-attention" class="pub-btn btn-code">code</a>
    <a href="https://www.semanticscholar.org/paper/7afaabb73bec969c0937be46b9f0f757e07c8534" class="pub-btn btn-citation" data-paper-id="7afaabb73bec969c0937be46b9f0f757e07c8534" target="_blank">citation</a>
  </div>
  <div class="pub-abstract hidden">
    Transformers with linear attention (i.e., linear transformers) and state-space models have recently been suggested as a viable linear-time alternative to transformers with softmax attention. However, these models still underperform transformers especially on tasks that require in-context retrieval. While more expressive variants of linear transformers which replace the additive update in linear transformers with the delta rule (DeltaNet) have been found to be more effective at associative recall, existing algorithms for training such models do not parallelize over sequence length and are thus inefficient to train on modern hardware. This work describes a hardware-efficient algorithm for training linear transformers with the delta rule, which exploits a memory-efficient representation for computing products of Householder matrices. This algorithm allows us to scale up DeltaNet to standard language modeling settings. We train a 1.3B model for 100B tokens and find that it outperforms recent linear-time baselines such as Mamba and GLA in terms of perplexity and zero-shot performance on downstream tasks. We also experiment with two hybrid models which combine DeltaNet layers with (1) sliding-window attention layers every other layer or (2) two global attention layers, and find that these hybrids outperform strong transformer baselines.
  </div>
  <div class="pub-bibtex hidden" data-bib-url="/assets/pubs/neurips/2024/deltanet.bib"><pre><code class="language-bibtex"></code></pre></div>
</div>

<div class="pub-card">
  <div class="pub-title">Scalable MatMul-free Language Modeling</div>
  <div class="pub-authors"><a href="https://ruijie-zhu.github.io">Ruijie Zhu</a>, <strong>Yu Zhang</strong>, Ethan Sifferman, Tyler Sheaves, Yiqiao Wang, Dustin Richmond, Peng Zhou, Jason K. Eshraghian</div>
  <div class="pub-venue"><a href="./assets/pubs/neurips/2024/mmf.pdf" class="venue-badge preprint">Preprint</a></div>
  <div class="pub-badges">
    <button class="pub-btn btn-paper">abstract</button>
    <button class="pub-btn btn-bib">bib</button>
    <a href="https://arxiv.org/abs/2406.02528" class="pub-btn btn-arxiv">arxiv</a>
    <a href="https://github.com/ridgerchu/matmulfreellm/" class="pub-btn btn-code">code</a>
    <a href="https://www.semanticscholar.org/paper/401c4147375b016d4758cf2dd859232a8271fdcd" class="pub-btn btn-citation" data-paper-id="401c4147375b016d4758cf2dd859232a8271fdcd" target="_blank">citation</a>
  </div>
  <div class="pub-abstract hidden">
    Large Language Models (LLMs) have fundamentally altered how we approach scaling in machine learning. However, these models pose substantial computational and memory challenges, primarily due to the reliance on matrix multiplication (MatMul) within their attention and feed-forward (FFN) layers. We demonstrate that MatMul operations can be eliminated from LLMs while maintaining strong performance, even at billion-parameter scales. Our MatMul-free models, tested on models up to 2.7B parameters, are comparable to state-of-the-art pre-trained Transformers, and the performance gap narrows as model size increases. Our approach yields significant memory savings: a GPU-efficient implementation reduces memory consumption by up to 61% during training and over 10x during inference. When adapted for a multi-chip neuromorphic system, the model leverages asynchronous processing to achieve 4x higher throughput with 10x less energy than edge GPUs.
  </div>
  <div class="pub-bibtex hidden" data-bib-url="/assets/pubs/neurips/2024/mmf.bib"><pre><code class="language-bibtex"></code></pre></div>
</div>

<div class="pub-card">
  <div class="pub-title">Non-autoregressive Text Editing with Copy-aware Latent Alignments</div>
  <div class="pub-authors"><strong>Yu Zhang*</strong>, <a href="https://hillzhang1999.github.io">Yue Zhang*</a>, <a href="https://nealcly.github.io">Leyang Cui</a>, Guohong Fu</div>
  <div class="pub-venue"><a href="./assets/pubs/emnlp/2023/ctc.pdf" class="venue-badge conf">EMNLP 2023</a></div>
  <div class="pub-badges">
    <button class="pub-btn btn-paper">abstract</button>
    <button class="pub-btn btn-bib">bib</button>
    <a href="https://arxiv.org/abs/2310.07821" class="pub-btn btn-arxiv">arxiv</a>
    <a href="https://github.com/yzhangcs/ctc-copy" class="pub-btn btn-code">code</a>
    <a href="https://www.semanticscholar.org/paper/116277fd27c97d50bba2d8023d3c590c1ea8187b" class="pub-btn btn-citation" data-paper-id="116277fd27c97d50bba2d8023d3c590c1ea8187b" target="_blank">citation</a>
  </div>
  <div class="pub-abstract hidden">
    Recent work has witnessed a paradigm shift from Seq2Seq to Seq2Edit in the field of text editing, with the aim of addressing the slow autoregressive inference problem posed by the former. Despite promising results, Seq2Edit approaches still face several challenges such as inflexibility in generation and difficulty in generalizing to other languages. In this work, we propose a novel non-autoregressive text editing method to circumvent the above issues, by modeling the edit process with latent CTC alignments. We make a crucial extension to CTC by introducing the copy operation into the edit space, thus enabling more efficient management of textual overlap in editing. We conduct extensive experiments on GEC and sentence fusion tasks, showing that our proposed method significantly outperforms existing Seq2Edit models and achieves similar or even better results than Seq2Seq with over 4x speedup. Moreover, it demonstrates good generalizability on German and Russian. In-depth analyses reveal the strengths of our method in terms of the robustness under various scenarios and generating fluent and flexible outputs.
  </div>
  <div class="pub-bibtex hidden" data-bib-url="/assets/pubs/emnlp/2023/ctc.bib"><pre><code class="language-bibtex"></code></pre></div>
</div>

<div class="pub-card">
  <div class="pub-title">Semantic Role Labeling as Dependency Parsing: Exploring Latent Tree Structures Inside Arguments</div>
  <div class="pub-authors"><strong>Yu Zhang</strong>, Qingrong Xia, Shilin Zhou, <a href="https://jiangyong.site">Yong Jiang</a>, Guohong Fu, Min Zhang</div>
  <div class="pub-venue"><a href="./assets/pubs/coling/2022/crfsrl.pdf" class="venue-badge conf">COLING 2022</a></div>
  <div class="pub-badges">
    <button class="pub-btn btn-paper">abstract</button>
    <button class="pub-btn btn-bib">bib</button>
    <a href="https://arxiv.org/abs/2110.06865" class="pub-btn btn-arxiv">arxiv</a>
    <a href="https://github.com/yzhangcs/crfsrl" class="pub-btn btn-code">code</a>
    <a href="https://www.semanticscholar.org/paper/64332d61dfef5ac685500a238b8a79d75152c164" class="pub-btn btn-citation" data-paper-id="64332d61dfef5ac685500a238b8a79d75152c164" target="_blank">citation</a>
  </div>
  <div class="pub-abstract hidden">
    Semantic role labeling (SRL) is a fundamental yet challenging task in the NLP community. Recent works of SRL mainly fall into two lines: 1) BIO-based; 2) span-based. Despite ubiquity, they share some intrinsic drawbacks of not considering internal argument structures, potentially hindering the model's expressiveness. The key challenge is arguments are flat structures, and there are no determined subtree realizations for words inside arguments. To remedy this, in this paper, we propose to regard flat argument spans as latent subtrees, accordingly reducing SRL to a tree parsing task. In particular, we equip our formulation with a novel span-constrained TreeCRF to make tree structures span-aware and further extend it to the second-order case. We conduct extensive experiments on CoNLL05 and CoNLL12 benchmarks. Results reveal that our methods perform favorably better than all previous syntax-agnostic works, achieving new state-of-the-art under both end-to-end and w/ gold predicates settings.
  </div>
  <div class="pub-bibtex hidden" data-bib-url="/assets/pubs/coling/2022/crfsrl.bib"><pre><code class="language-bibtex"></code></pre></div>
</div>

<div class="pub-card">
  <div class="pub-title">Fast and Accurate End-to-End Span-based Semantic Role Labeling as Word-based Graph Parsing <span class="award-badge">Best Paper Award</span></div>
  <div class="pub-authors">Shilin Zhou, Qingrong Xia, Zhenghua Li, <strong>Yu Zhang</strong>, Yu Hong, Min Zhang</div>
  <div class="pub-venue"><a href="./assets/pubs/coling/2022/graphsrl.pdf" class="venue-badge conf">COLING 2022</a></div>
  <div class="pub-badges">
    <button class="pub-btn btn-paper">abstract</button>
    <button class="pub-btn btn-bib">bib</button>
    <a href="https://arxiv.org/abs/2112.02970" class="pub-btn btn-arxiv">arxiv</a>
    <a href="https://github.com/zsLin177/SRL-as-GP" class="pub-btn btn-code">code</a>
    <a href="https://www.semanticscholar.org/paper/ea9a2d14672c3cc0ff92510386f46fb2b152570c" class="pub-btn btn-citation" data-paper-id="ea9a2d14672c3cc0ff92510386f46fb2b152570c" target="_blank">citation</a>
  </div>
  <div class="pub-abstract hidden">
    This paper proposes to cast end-to-end span-based SRL as a word-based graph parsing task. The major challenge is how to represent spans at the word level. Borrowing ideas from research on Chinese word segmentation and named entity recognition, we propose and compare four different schemata of graph representation, i.e., BES, BE, BIES, and BII, among which we find that the BES schema performs the best. We further gain interesting insights through detailed analysis. Moreover, we propose a simple constrained Viterbi procedure to ensure the legality of the output graph according to the constraints of the SRL structure. We conduct experiments on two widely used benchmark datasets, i.e., CoNLL05 and CoNLL12. Results show that our word-based graph parsing approach achieves consistently better performance than previous results, under all settings of end-to-end and predicate-given, without and with pre-trained language models (PLMs). More importantly, our model can parse 669/252 sentences per second, without and with PLMs respectively.
  </div>
  <div class="pub-bibtex hidden" data-bib-url="/assets/pubs/coling/2022/graphsrl.bib"><pre><code class="language-bibtex"></code></pre></div>
</div>

<div class="pub-card">
  <div class="pub-title">Fast and Accurate Neural CRF Constituency Parsing</div>
  <div class="pub-authors"><strong>Yu Zhang*</strong>, <a href="https://cv.hqzhou.com">Houquan Zhou*</a>, Zhenghua Li</div>
  <div class="pub-venue"><a href="./assets/pubs/ijcai/2020/crfpar.pdf" class="venue-badge conf">IJCAI 2020</a></div>
  <div class="pub-badges">
    <button class="pub-btn btn-paper">abstract</button>
    <button class="pub-btn btn-bib">bib</button>
    <a href="https://arxiv.org/abs/2008.03736" class="pub-btn btn-arxiv">arxiv</a>
    <a href="https://github.com/yzhangcs/crfpar" class="pub-btn btn-code">code</a>
    <a href="https://www.semanticscholar.org/paper/46fe2ae301aeb75b25ebca0bdc26132ca46f5101" class="pub-btn btn-citation" data-paper-id="46fe2ae301aeb75b25ebca0bdc26132ca46f5101" target="_blank">citation</a>
  </div>
  <div class="pub-abstract hidden">
    Estimating probability distribution is one of the core issues in the NLP field. However, in both deep learning (DL) and pre-DL eras, unlike the vast applications of linear-chain CRF in sequence labeling tasks, very few works have applied tree-structure CRF to constituency parsing, mainly due to the complexity and inefficiency of the inside-outside algorithm. This work presents a fast and accurate neural CRF constituency parser. The key idea is to batchify the inside algorithm for loss computation by direct large tensor operations on GPU, and meanwhile avoid the outside algorithm for gradient computation via efficient back-propagation. We also propose a simple two-stage bracketing-then-labeling parsing approach to improve efficiency further. To improve the parsing performance, inspired by recent progress in dependency parsing, we introduce a new scoring architecture based on boundary representation and biaffine attention, and a beneficial dropout strategy. Experiments on PTB, CTB5.1, and CTB7 show that our two-stage CRF parser achieves new state-of-the-art performance on both settings of w/o and w/ BERT, and can parse over 1,000 sentences per second.
  </div>
  <div class="pub-bibtex hidden" data-bib-url="/assets/pubs/ijcai/2020/crfpar.bib"><pre><code class="language-bibtex"></code></pre></div>
</div>

<div class="pub-card">
  <div class="pub-title">Efficient Second-Order TreeCRF for Neural Dependency Parsing</div>
  <div class="pub-authors"><strong>Yu Zhang</strong>, Zhenghua Li, Min Zhang</div>
  <div class="pub-venue"><a href="./assets/pubs/acl/2020/crfpar.pdf" class="venue-badge conf">ACL 2020</a></div>
  <div class="pub-badges">
    <button class="pub-btn btn-paper">abstract</button>
    <button class="pub-btn btn-bib">bib</button>
    <a href="https://arxiv.org/abs/2005.00975" class="pub-btn btn-arxiv">arxiv</a>
    <a href="https://github.com/yzhangcs/crfpar" class="pub-btn btn-code">code</a>
    <a href="https://www.semanticscholar.org/paper/ce18780963b067a1295fc847e7ab33f2fcbfaca1" class="pub-btn btn-citation" data-paper-id="ce18780963b067a1295fc847e7ab33f2fcbfaca1" target="_blank">citation</a>
  </div>
  <div class="pub-abstract hidden">
    In the deep learning (DL) era, parsing models are extremely simplified with little hurt on performance, thanks to the remarkable capability of multi-layer BiLSTMs in context representation. As the most popular graph-based dependency parser due to its high efficiency and performance, the biaffine parser directly scores single dependencies under the arc-factorization assumption, and adopts a very simple local token-wise cross-entropy training loss. This paper for the first time presents a second-order TreeCRF extension to the biaffine parser. For a long time, the complexity and inefficiency of the inside-outside algorithm hinder the popularity of TreeCRF. To address this issue, we propose an effective way to batchify the inside and Viterbi algorithms for direct large matrix operation on GPUs, and to avoid the complex outside algorithm via efficient back-propagation. Experiments and analysis on 27 datasets from 13 languages clearly show that techniques developed before the DL era, such as structural learning (global TreeCRF loss) and high-order modeling are still useful, and can further boost parsing performance over the state-of-the-art biaffine parser, especially for partially annotated training data.
  </div>
  <div class="pub-bibtex hidden" data-bib-url="/assets/pubs/acl/2020/crfpar.bib"><pre><code class="language-bibtex"></code></pre></div>
</div>

<!-- <div class="pub-card">
  <div class="pub-title">Is POS Tagging Necessary or Even Helpful for Neural Dependency Parsing? <span class="award-badge">Best Paper Award</span></div>
  <div class="pub-authors"><a href="https://cv.hqzhou.com">Houquan Zhou*</a>, <strong>Yu Zhang*</strong>, Zhenghua Li, Min Zhang</div>
  <div class="pub-venue"><a href="./assets/pubs/nlpcc/2020/posdep.pdf" class="venue-badge conf">NLPCC 2020</a></div>
  <div class="pub-badges">
    <button class="pub-btn btn-paper">abstract</button>
    <button class="pub-btn btn-bib">bib</button>
    <a href="https://arxiv.org/abs/2003.03204" class="pub-btn btn-arxiv">arxiv</a>
    <a href="https://github.com/Jacob-Zhou/stack-parser" class="pub-btn btn-code">code</a>
    <a href="https://www.semanticscholar.org/paper/3bb577d87ae8e0d45a223f65db24ab479fbda174" class="pub-btn btn-citation" data-paper-id="3bb577d87ae8e0d45a223f65db24ab479fbda174" target="_blank">citation</a>
  </div>
  <div class="pub-abstract hidden">
    Part-of-speech (POS) tagging has long been considered essential for dependency parsing. We investigate whether POS tagging is still necessary in the era of neural networks, providing empirical analysis on the contribution of POS tags to parsing performance. Our findings challenge conventional wisdom and won the Best Paper Award at NLPCC 2020.
  </div>
  <div class="pub-bibtex hidden" data-bib-url="/assets/pubs/nlpcc/2020/posdep.bib"><pre><code class="language-bibtex"></code></pre></div>
</div>

<div class="pub-card">
  <div class="pub-title">HLT@SUDA at SemEval-2019 Task 1: UCCA Graph Parsing as Constituent Tree Parsing</div>
  <div class="pub-authors">Wei Jiang, Zhenghua Li, <strong>Yu Zhang</strong>, Min Zhang</div>
  <div class="pub-venue"><a href="./assets/pubs/semeval/2019/const.pdf" class="venue-badge conf">SemEval 2019</a></div>
  <div class="pub-badges">
    <button class="pub-btn btn-paper">abstract</button>
    <button class="pub-btn btn-bib">bib</button>
    <a href="https://arxiv.org/abs/1903.04153" class="pub-btn btn-arxiv">arxiv</a>
    <a href="https://github.com/SUDA-LA/ucca-parser" class="pub-btn btn-code">code</a>
    <a href="https://www.semanticscholar.org/paper/6c690b828a508635506018ddbd03d63d4e08a380" class="pub-btn btn-citation" data-paper-id="6c690b828a508635506018ddbd03d63d4e08a380" target="_blank">citation</a>
  </div>
  <div class="pub-abstract hidden">
    Universal Conceptual Cognitive Annotation (UCCA) provides a cross-lingual semantic representation. We approach UCCA graph parsing by reducing it to constituent tree parsing, leveraging existing parsing techniques for tree structures. Our system achieved competitive results at the SemEval-2019 shared task.
  </div>
  <div class="pub-bibtex hidden" data-bib-url="/assets/pubs/semeval/2019/const.bib"><pre><code class="language-bibtex"></code></pre></div>
</div> -->

</div>

## Projects

<div class="project-list">

<div class="project-card">
  <div class="project-header">
    <span class="project-name">FLA</span>
    <div class="project-badges">
      <a href="https://github.com/fla-org/flash-linear-attention" class="proj-badge badge-code"><i class="fab fa-github"></i> code</a>
      <a href="https://github.com/fla-org/flash-linear-attention/releases" class="proj-badge badge-ver">v0.4.2</a>
    </div>
  </div>
  <div class="project-desc">A Triton-Based Library for Hardware-Efficient Implementations of Linear Attention Mechanism.</div>
</div>

<div class="project-card">
  <div class="project-header">
    <span class="project-name">SuPar</span>
    <div class="project-badges">
      <a href="https://github.com/yzhangcs/parser" class="proj-badge badge-code"><i class="fab fa-github"></i> code</a>
      <a href="https://github.com/yzhangcs/parser/releases" class="proj-badge badge-ver">v1.1.4</a>
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
