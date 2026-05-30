// Publication button interactions.
(function() {
  'use strict';

  const BUTTON_SELECTOR = '.btn-paper, .btn-abstract, .btn-expand, .btn-expand-authors, .btn-bib';
  const COPY_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
  const CHECK_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
  const CITATION_PLACEHOLDER = 'citation –';
  const CITATION_RETRIES = 3;

  document.addEventListener('click', handlePublicationClick);
  onReady(loadCitationCounts);

  function handlePublicationClick(event) {
    const btn = event.target.closest && event.target.closest(BUTTON_SELECTOR);
    if (!btn) return;

    const card = btn.closest('.pub-card');
    if (!card) return;

    event.preventDefault();

    if (btn.matches('.btn-paper, .btn-abstract')) {
      togglePanel(card.querySelector('.pub-abstract'), btn);
    } else if (btn.matches('.btn-expand')) {
      toggleFullAbstract(card, btn);
    } else if (btn.matches('.btn-expand-authors')) {
      toggleAuthors(card, btn);
    } else if (btn.matches('.btn-bib')) {
      toggleBib(card, btn);
    }
  }

  function togglePanel(panel, btn) {
    if (!panel) return;

    const shouldShow = panel.classList.contains('hidden');
    panel.classList.toggle('hidden', !shouldShow);
    btn.classList.toggle('active', shouldShow);
  }

  function toggleFullAbstract(card, btn) {
    const abstractText = card.querySelector('.abstract-text');
    const abstractFull = card.querySelector('.abstract-full');
    if (!abstractText || !abstractFull) return;

    const shouldShowFull = abstractFull.classList.contains('hidden');
    abstractText.classList.toggle('hidden', shouldShowFull);
    abstractFull.classList.toggle('hidden', !shouldShowFull);
    btn.textContent = shouldShowFull ? 'less' : 'more';
  }

  function toggleAuthors(card, btn) {
    const authorsText = card.querySelector('.authors-text');
    const authorsFull = card.querySelector('.authors-full');
    if (!authorsText || !authorsFull) return;

    const shouldShowFull = authorsFull.classList.contains('hidden');
    authorsText.classList.toggle('hidden', shouldShowFull);
    authorsFull.classList.toggle('hidden', !shouldShowFull);

    if (shouldShowFull) {
      const match = btn.textContent.match(/\+(\d+)\s+more/);
      btn.dataset.moreCount = match ? match[1] : '';
      btn.textContent = 'collapse';
    } else {
      btn.textContent = btn.dataset.moreCount ? `+${btn.dataset.moreCount} more` : '+more';
    }
  }

  function toggleBib(card, btn) {
    const bibContainer = card.querySelector('.pub-bibtex');
    if (!bibContainer) return;

    const shouldShow = bibContainer.classList.contains('hidden');
    if (shouldShow) {
      const bibUrl = bibContainer.dataset.bibUrl;
      if (bibUrl && bibContainer.dataset.loaded !== 'true') {
        loadBibContent(bibContainer, bibUrl);
      }
    }

    bibContainer.classList.toggle('hidden', !shouldShow);
    btn.classList.toggle('active', shouldShow);
  }

  async function loadBibContent(container, url) {
    container.innerHTML = '<pre><code class="language-bibtex">Loading...</code></pre>';

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to load bib');

      const text = await response.text();
      container.innerHTML = `<button class="btn-copy" title="Copy to clipboard">${COPY_ICON}</button><pre><code class="language-bibtex"></code></pre>`;

      const codeEl = container.querySelector('code');
      codeEl.textContent = text;
      container.dataset.loaded = 'true';

      if (window.Prism) {
        window.Prism.highlightElement(codeEl);
      }

      setupCopyButton(container.querySelector('.btn-copy'), text);
    } catch (error) {
      console.error('Error loading bib:', error);
      container.innerHTML = '<pre><code class="language-bibtex">Error loading bib file</code></pre>';
    }
  }

  function setupCopyButton(copyBtn, text) {
    copyBtn.addEventListener('click', async function() {
      try {
        await navigator.clipboard.writeText(text);
        copyBtn.innerHTML = CHECK_ICON;
        copyBtn.classList.add('copied');
        window.setTimeout(function() {
          copyBtn.innerHTML = COPY_ICON;
          copyBtn.classList.remove('copied');
        }, 2000);
      } catch (error) {
        console.error('Failed to copy:', error);
      }
    });
  }

  function onReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
    } else {
      callback();
    }
  }

  function loadCitationCounts() {
    document.querySelectorAll('.btn-citation[data-paper-id]').forEach(updateCitationButton);
  }

  async function updateCitationButton(btn) {
    setCitationButton(btn);

    const count = await fetchCitationCountWithRetry(btn.dataset.paperId);
    setCitationButton(btn, count);
  }

  function setCitationButton(btn, count) {
    const hasCount = Number.isInteger(count) && count >= 0;
    btn.textContent = hasCount ? `citation ${count}` : CITATION_PLACEHOLDER;
    btn.style.opacity = hasCount ? '1' : '0.6';
  }

  async function fetchCitationCountWithRetry(paperId) {
    for (let attempt = 1; attempt <= CITATION_RETRIES; attempt += 1) {
      const count = await fetchSemanticScholarCitation(paperId);
      if (count !== null) return count;
      if (attempt < CITATION_RETRIES) await delay((2 ** attempt) * 500);
    }
    return null;
  }

  async function fetchSemanticScholarCitation(paperId) {
    try {
      const url = `https://api.semanticscholar.org/graph/v1/paper/${paperId}?fields=citationCount`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      return Number.isInteger(data.citationCount) ? data.citationCount : null;
    } catch (error) {
      return null;
    }
  }

  function delay(ms) {
    return new Promise(function(resolve) {
      window.setTimeout(resolve, ms);
    });
  }
})();
