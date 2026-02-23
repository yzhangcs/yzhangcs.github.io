// Back to bottom button functionality
document.addEventListener('DOMContentLoaded', function() {
  const btn = document.createElement('div');
  btn.id = 'back-to-bottom';
  btn.textContent = 'To Bottom';
  document.body.appendChild(btn);
  
  btn.addEventListener('click', function() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  });
  
  // Show/hide based on scroll position
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    // Show when near top, hide when near bottom
    if (scrollTop < 200 && scrollHeight > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });
  
  // Initial check
  window.dispatchEvent(new Event('scroll'));
});
