// Publication buttons interaction - global single expand
document.addEventListener('DOMContentLoaded', function() {
  // Toggle abstract
  document.querySelectorAll('.btn-paper').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const card = this.closest('.pub-card');
      const abstract = card.querySelector('.pub-abstract');
      const bibContainer = card.querySelector('.pub-bibtex');
      const bibBtn = card.querySelector('.btn-bib');
      
      if (!abstract) return;
      
      const isHidden = abstract.classList.contains('hidden');
      
      // Close all other expanded content first
      closeAllExpanded();
      
      if (isHidden) {
        // Open this abstract
        abstract.classList.remove('hidden');
        this.classList.add('active');
      }
      // If already open, just close it (toggle behavior)
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
      
      // Close all other expanded content first
      closeAllExpanded();
      
      if (isHidden) {
        // Check if bib content needs to be loaded
        const bibUrl = bibContainer.getAttribute('data-bib-url');
        if (bibUrl && bibContainer.getAttribute('data-loaded') !== 'true') {
          loadBibContent(bibContainer, bibUrl);
        }
        // Open this bib
        bibContainer.classList.remove('hidden');
        this.classList.add('active');
      }
      // If already open, just close it (toggle behavior)
    });
  });

  // Load citation counts from Semantic Scholar
  loadCitationCounts();
});

function closeAllExpanded() {
  // Close all abstracts with animation
  document.querySelectorAll('.pub-abstract:not(.hidden)').forEach(function(el) {
    el.classList.add('hidden');
  });
  
  // Close all bibtex with animation
  document.querySelectorAll('.pub-bibtex:not(.hidden)').forEach(function(el) {
    el.classList.add('hidden');
  });
  
  // Remove active class from all buttons
  document.querySelectorAll('.pub-btn.active').forEach(function(el) {
    el.classList.remove('active');
  });
}

function loadBibContent(container, url) {
  container.textContent = 'Loading...';
  
  fetch(url)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Failed to load bib');
      }
      return response.text();
    })
    .then(function(text) {
      container.textContent = text;
      container.setAttribute('data-loaded', 'true');
    })
    .catch(function(error) {
      console.error('Error loading bib:', error);
      container.textContent = 'Error loading bib file';
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
