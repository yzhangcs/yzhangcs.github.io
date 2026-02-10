// Daily pagination for arxiv page - one date per page
(function() {
  'use strict';

  let currentPage = 0;
  let dateGroups = []; // Array of { heading, cards, dateText }

  // Convert "2026 Feb 10, Tue" to "2026-02-10"
  function toISODate(dateText) {
    const match = dateText.match(/(\d{4})\s+(\w{3})\s+(\d{1,2})/);
    if (!match) return dateText;
    const [, year, month, day] = match;
    const monthMap = {
      'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
      'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
      'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
    };
    const monthNum = monthMap[month] || '01';
    const dayNum = day.padStart(2, '0');
    return `${year}-${monthNum}-${dayNum}`;
  }

  function initPagination() {
    if (!window.location.pathname.includes('arxiv')) return;

    const section = document.querySelector('section');
    if (!section) return;

    // Group cards by date heading
    const headings = section.querySelectorAll('.date-heading');
    dateGroups = [];

    headings.forEach(heading => {
      const cards = [];
      let sibling = heading.nextElementSibling;
      while (sibling && sibling.classList.contains('pub-list')) {
        const listCards = sibling.querySelectorAll('.arxiv-card');
        cards.push(...listCards);
        sibling = sibling.nextElementSibling;
      }
      if (cards.length > 0) {
        dateGroups.push({ 
          heading, 
          cards: Array.from(cards),
          dateText: heading.textContent.trim()
        });
      }
    });

    if (dateGroups.length <= 1) return;

    // Show first date, hide others
    updateDisplay();
    createPaginationControls();
  }

  function createPaginationControls() {
    const section = document.querySelector('section');
    if (!section) return;

    // Remove existing pagination
    const existing = section.querySelector('.arxiv-pagination');
    if (existing) existing.remove();

    const prevLabel = currentPage > 0 ? `PREV (${toISODate(dateGroups[currentPage - 1].dateText)})` : 'PREV';
    const nextLabel = currentPage < dateGroups.length - 1 ? `NEXT (${toISODate(dateGroups[currentPage + 1].dateText)})` : 'NEXT';

    const paginationDiv = document.createElement('div');
    paginationDiv.className = 'arxiv-pagination';
    paginationDiv.innerHTML = `
      <button class="pub-btn" id="prev-page" ${currentPage === 0 ? 'disabled' : ''}>${prevLabel}</button>
      <span class="page-info">${currentPage + 1} / ${dateGroups.length}</span>
      <button class="pub-btn" id="next-page" ${currentPage === dateGroups.length - 1 ? 'disabled' : ''}>${nextLabel}</button>
    `;

    // Insert before last-updated
    const lastUpdated = section.querySelector('.last-updated');
    if (lastUpdated) {
      section.insertBefore(paginationDiv, lastUpdated);
    } else {
      section.appendChild(paginationDiv);
    }

    document.getElementById('prev-page').addEventListener('click', () => {
      if (currentPage > 0) {
        currentPage--;
        updateDisplay();
        updateControls();
      }
    });

    document.getElementById('next-page').addEventListener('click', () => {
      if (currentPage < dateGroups.length - 1) {
        currentPage++;
        updateDisplay();
        updateControls();
      }
    });
  }

  function updateDisplay() {
    dateGroups.forEach((group, idx) => {
      const isActive = idx === currentPage;
      // Hide/show heading
      group.heading.style.display = isActive ? '' : 'none';
      // Hide/show the entire pub-list container
      const pubList = group.heading.nextElementSibling;
      if (pubList && pubList.classList.contains('pub-list')) {
        pubList.style.display = isActive ? '' : 'none';
      }
    });

    // Quick scroll to top
    window.scrollTo(0, 0);
  }

  function updateControls() {
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const pageInfo = document.querySelector('.page-info');

    const prevLabel = currentPage > 0 ? `PREV (${toISODate(dateGroups[currentPage - 1].dateText)})` : 'PREV';
    const nextLabel = currentPage < dateGroups.length - 1 ? `NEXT (${toISODate(dateGroups[currentPage + 1].dateText)})` : 'NEXT';

    if (prevBtn) {
      prevBtn.disabled = currentPage === 0;
      prevBtn.textContent = prevLabel;
    }
    if (nextBtn) {
      nextBtn.disabled = currentPage === dateGroups.length - 1;
      nextBtn.textContent = nextLabel;
    }
    if (pageInfo) pageInfo.textContent = `${currentPage + 1} / ${dateGroups.length}`;
  }

  // Handle Jump to Date links
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.date-list a').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetIndex = dateGroups.findIndex(g => {
          const headingId = g.heading.id || g.heading.getAttribute('id');
          return headingId === targetId;
        });
        if (targetIndex !== -1) {
          currentPage = targetIndex;
          updateDisplay();
          updateControls();
          // Scroll to top
          window.scrollTo(0, 0);
        }
      });
    });
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPagination);
  } else {
    initPagination();
  }
})();
