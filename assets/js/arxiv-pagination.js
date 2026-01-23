(function() {
  'use strict';

  const ITEMS_PER_PAGE = 50;
  let currentPage = 1;
  let totalPages = 1;
  let allItems = [];

  function initPagination() {
    // Only run on arxiv page
    if (!window.location.pathname.includes('arxiv')) {
      return;
    }

    // Get all paper entries (assuming they're in list items or sections)
    const contentContainer = document.querySelector('section');
    if (!contentContainer) return;

    // Find all paper entries - adjust selector based on actual structure
    const papers = contentContainer.querySelectorAll('h3, h4, li.paper, .paper-entry');
    if (papers.length === 0) {
      // Try to find entries by looking for headings with dates
      const allHeadings = Array.from(contentContainer.querySelectorAll('h2, h3, h4'));
      allItems = allHeadings.filter(h => {
        // Check if heading looks like a paper entry (has links, arxiv URLs, etc)
        const nextElement = h.nextElementSibling;
        return nextElement && (
          nextElement.innerHTML.includes('arxiv.org') ||
          nextElement.innerHTML.includes('paper')
        );
      }).map(h => {
        // Group heading with its content
        const content = [];
        let el = h;
        while (el && el.nextElementSibling && !el.nextElementSibling.matches('h2, h3, h4')) {
          el = el.nextElementSibling;
          content.push(el);
        }
        return { heading: h, content: content };
      });
    } else {
      allItems = Array.from(papers);
    }

    if (allItems.length === 0) return;

    totalPages = Math.ceil(allItems.length / ITEMS_PER_PAGE);

    // Create pagination controls
    createPaginationControls(contentContainer);

    // Show first page
    showPage(1);
  }

  function createPaginationControls(container) {
    const paginationDiv = document.createElement('div');
    paginationDiv.id = 'arxiv-pagination';
    paginationDiv.style.cssText = `
      margin: 2rem 0;
      padding: 1.5rem;
      background: #f8f8f8;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
    `;

    const info = document.createElement('div');
    info.id = 'page-info';
    info.style.cssText = 'font-size: 0.95rem; color: #595959;';

    const controls = document.createElement('div');
    controls.style.cssText = 'display: flex; gap: 0.5rem; align-items: center;';

    const firstBtn = createButton('First', () => showPage(1));
    const prevBtn = createButton('← Prev', () => showPage(currentPage - 1));
    const nextBtn = createButton('Next →', () => showPage(currentPage + 1));
    const lastBtn = createButton('Last', () => showPage(totalPages));

    const pageInput = document.createElement('input');
    pageInput.type = 'number';
    pageInput.id = 'page-input';
    pageInput.min = 1;
    pageInput.max = totalPages;
    pageInput.value = currentPage;
    pageInput.style.cssText = `
      width: 60px;
      padding: 0.4rem;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
      text-align: center;
      font-size: 0.9rem;
    `;
    pageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const page = parseInt(pageInput.value);
        if (page >= 1 && page <= totalPages) {
          showPage(page);
        }
      }
    });

    controls.appendChild(firstBtn);
    controls.appendChild(prevBtn);
    controls.appendChild(pageInput);
    controls.appendChild(document.createTextNode(' / ' + totalPages));
    controls.appendChild(nextBtn);
    controls.appendChild(lastBtn);

    paginationDiv.appendChild(info);
    paginationDiv.appendChild(controls);

    // Insert at the top and bottom of content
    container.insertBefore(paginationDiv, container.firstChild);
    container.appendChild(paginationDiv.cloneNode(true));

    // Update buttons in the cloned pagination
    const clonedPagination = container.lastChild;
    clonedPagination.querySelectorAll('button').forEach((btn, idx) => {
      const actions = [
        () => showPage(1),
        () => showPage(currentPage - 1),
        () => showPage(currentPage + 1),
        () => showPage(totalPages)
      ];
      btn.onclick = actions[idx];
    });
  }

  function createButton(text, onClick) {
    const btn = document.createElement('button');
    btn.textContent = text;
    btn.onclick = onClick;
    btn.style.cssText = `
      padding: 0.5rem 1rem;
      background: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.2s ease;
    `;
    btn.onmouseover = () => {
      btn.style.background = '#043361';
      btn.style.color = '#fff';
      btn.style.borderColor = '#043361';
    };
    btn.onmouseout = () => {
      btn.style.background = '#fff';
      btn.style.color = '#000';
      btn.style.borderColor = '#e5e5e5';
    };
    return btn;
  }

  function showPage(page) {
    if (page < 1 || page > totalPages) return;

    currentPage = page;
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    // Hide all items
    allItems.forEach((item, idx) => {
      if (item.heading) {
        // Complex item with heading and content
        item.heading.style.display = (idx >= start && idx < end) ? '' : 'none';
        item.content.forEach(el => {
          el.style.display = (idx >= start && idx < end) ? '' : 'none';
        });
      } else {
        // Simple item
        item.style.display = (idx >= start && idx < end) ? '' : 'none';
      }
    });

    // Update page info
    const infos = document.querySelectorAll('#page-info');
    infos.forEach(info => {
      info.textContent = `Showing ${start + 1}-${Math.min(end, allItems.length)} of ${allItems.length} papers`;
    });

    // Update page inputs
    const inputs = document.querySelectorAll('#page-input');
    inputs.forEach(input => {
      input.value = currentPage;
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPagination);
  } else {
    initPagination();
  }
})();
