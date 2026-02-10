// Publication buttons interaction - global single expand
document.addEventListener('DOMContentLoaded', function() {
  // Toggle abstract (for index page with bib support)
  document.querySelectorAll('.btn-paper').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const card = this.closest('.pub-card');
      const abstract = card.querySelector('.pub-abstract');
      const bibContainer = card.querySelector('.pub-bibtex');
      const bibBtn = card.querySelector('.btn-bib');
      
      if (!abstract) return;
      
      const isHidden = abstract.classList.contains('hidden');
      
      if (isHidden) {
        // Open this abstract
        abstract.classList.remove('hidden');
        this.classList.add('active');
      } else {
        // Close this abstract (toggle behavior)
        abstract.classList.add('hidden');
        this.classList.remove('active');
      }
    });
  });

  // Toggle abstract (for arxiv page without bib)
  document.querySelectorAll('.btn-abstract').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const card = this.closest('.pub-card');
      const abstract = card.querySelector('.pub-abstract');
      
      if (!abstract) return;
      
      const isHidden = abstract.classList.contains('hidden');
      
      if (isHidden) {
        // Open this abstract
        abstract.classList.remove('hidden');
        this.classList.add('active');
        this.textContent = 'hide';
      } else {
        // Close this abstract (toggle behavior)
        abstract.classList.add('hidden');
        this.classList.remove('active');
        this.textContent = 'abstract';
      }
    });
  });

  // Toggle expand/collapse abstract full text
  document.querySelectorAll('.btn-expand').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const card = this.closest('.pub-card');
      const abstractText = card.querySelector('.abstract-text');
      const abstractFull = card.querySelector('.abstract-full');
      
      if (!abstractText || !abstractFull) return;
      
      const isFullHidden = abstractFull.classList.contains('hidden');
      
      if (isFullHidden) {
        // Show full abstract
        abstractText.classList.add('hidden');
        abstractFull.classList.remove('hidden');
        this.textContent = 'less';
      } else {
        // Show truncated abstract
        abstractText.classList.remove('hidden');
        abstractFull.classList.add('hidden');
        this.textContent = 'more';
      }
    });
  });

  // Toggle bib
  document.querySelectorAll('.btn-bib').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const card = this.closest('.pub-card');
      const bibContainer = card.querySelector('.pub-bibtex');
      const abstract = card.querySelector('.pub-abstract');
      const paperBtn = card.querySelector('.btn-paper');
      
      if (!bibContainer) return;
      
      const isHidden = bibContainer.classList.contains('hidden');
      
      if (isHidden) {
        // Check if bib content needs to be loaded
        const bibUrl = bibContainer.getAttribute('data-bib-url');
        if (bibUrl && bibContainer.getAttribute('data-loaded') !== 'true') {
          loadBibContent(bibContainer, bibUrl);
        }
        // Open this bib
        bibContainer.classList.remove('hidden');
        this.classList.add('active');
      } else {
        // Close this bib (toggle behavior)
        bibContainer.classList.add('hidden');
        this.classList.remove('active');
      }
    });
  });

  // Load citation counts from Semantic Scholar
  loadCitationCounts();
});

function closeAllExpanded(excludeCard) {
  // Close all abstracts except those in the excluded card
  document.querySelectorAll('.pub-abstract:not(.hidden)').forEach(function(el) {
    if (!excludeCard || !excludeCard.contains(el)) {
      el.classList.add('hidden');
    }
  });
  
  // Close all bibtex except those in the excluded card
  document.querySelectorAll('.pub-bibtex:not(.hidden)').forEach(function(el) {
    if (!excludeCard || !excludeCard.contains(el)) {
      el.classList.add('hidden');
    }
  });
  
  // Remove active class from all buttons except those in the excluded card
  document.querySelectorAll('.pub-btn.active').forEach(function(el) {
    if (!excludeCard || !excludeCard.contains(el)) {
      el.classList.remove('active');
    }
  });
}

function loadBibContent(container, url) {
  container.innerHTML = '<pre><code class="language-bibtex">Loading...</code></pre>';
  
  fetch(url)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Failed to load bib');
      }
      return response.text();
    })
    .then(function(text) {
      container.innerHTML = '<button class="btn-copy" title="Copy to clipboard"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button><pre><code class="language-bibtex"></code></pre>';
      var codeEl = container.querySelector('code');
      codeEl.textContent = text;
      container.setAttribute('data-loaded', 'true');
      // Highlight the code
      if (window.Prism) {
        Prism.highlightElement(codeEl);
      }
      // Add copy functionality
      var copyBtn = container.querySelector('.btn-copy');
      var originalIcon = copyBtn.innerHTML;
      var checkIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
      copyBtn.addEventListener('click', function() {
        navigator.clipboard.writeText(text).then(function() {
          copyBtn.innerHTML = checkIcon;
          copyBtn.classList.add('copied');
          setTimeout(function() {
            copyBtn.innerHTML = originalIcon;
            copyBtn.classList.remove('copied');
          }, 2000);
        }).catch(function(err) {
          console.error('Failed to copy:', err);
        });
      });
    })
    .catch(function(error) {
      console.error('Error loading bib:', error);
      container.innerHTML = '<pre><code class="language-bibtex">Error loading bib file</code></pre>';
    });
}

function loadCitationCounts() {
  // Find all citation buttons that need to be updated
  const citationBtns = document.querySelectorAll('.btn-citation[data-paper-id]');
  
  citationBtns.forEach(function(btn) {
    const paperId = btn.getAttribute('data-paper-id');
    if (paperId) {
      // Set initial loading state
      btn.textContent = 'citation –';
      btn.style.opacity = '0.6';
      
      // Try to fetch with retries
      fetchWithRetry(paperId, 10, function(count) {
        if (count !== null && count >= 0) {
          btn.textContent = 'citation ' + count;
          btn.style.opacity = '1';
        } else {
          // Keep button but show dash if failed after retries
          btn.textContent = 'citation –';
          btn.style.opacity = '0.6';
        }
      });
    } else {
      // No paper ID, show placeholder
      btn.textContent = 'citation –';
      btn.style.opacity = '0.6';
    }
  });
}

function fetchWithRetry(paperId, maxRetries, callback, attempt) {
  attempt = attempt || 1;
  
  fetchSemanticScholarCitation(paperId, function(count) {
    if (count !== null) {
      callback(count);
    } else if (attempt < maxRetries) {
      // Retry after delay (exponential backoff)
      var delay = Math.pow(2, attempt) * 500;
      setTimeout(function() {
        fetchWithRetry(paperId, maxRetries, callback, attempt + 1);
      }, delay);
    } else {
      // All retries failed
      callback(null);
    }
  });
}

function fetchSemanticScholarCitation(paperId, callback) {
  // Semantic Scholar API endpoint
  var url = 'https://api.semanticscholar.org/graph/v1/paper/' + paperId + '?fields=citationCount';
  
  fetch(url)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(function(data) {
      if (data && typeof data.citationCount !== 'undefined') {
        callback(data.citationCount);
      } else {
        callback(null);
      }
    })
    .catch(function(error) {
      callback(null);
    });
}
