// Game catalog data with your PNG images - USING CORRECT RELATIVE PATHS
const gamesCatalog = [
  { name: "EA Sports FC 25", genre: "Sports", priceBWP: 749, platform: "PS5/XSX/PC", image: "./images/fc25.png" },
  { name: "Elden Ring", genre: "Action RPG", priceBWP: 849, platform: "PS5/PC", image: "./images/elden.png" },
  { name: "Forza Motorsport", genre: "Racing", priceBWP: 699, platform: "Xbox/PC", image: "./images/forza.png" },
  { name: "Call of Duty: MWIII", genre: "FPS", priceBWP: 799, platform: "Multi-platform", image: "./images/cod.png" },
  { name: "Need for Speed", genre: "Racing", priceBWP: 599, platform: "PS5/Xbox/PC", image: "./images/nfs.png" },
  { name: "Tekken 8", genre: "Fighting", priceBWP: 849, platform: "PS5/Xbox/PC", image: "./images/tekken.png" }
];

// Function to render games on the explore page
function renderExploreGames(filterText = "") {
  const container = document.getElementById('games-store-grid');
  if (!container) {
    console.log("Container not found");
    return;
  }
  
  console.log("Rendering games...", gamesCatalog);
  
  const filteredGames = gamesCatalog.filter(game => 
    game.name.toLowerCase().includes(filterText.toLowerCase()) ||
    game.genre.toLowerCase().includes(filterText.toLowerCase()) ||
    game.platform.toLowerCase().includes(filterText.toLowerCase())
  );
  
  if (filteredGames.length === 0) {
    container.innerHTML = '<p style="text-align:center; grid-column:1/-1; padding:40px;">No games found. Try another search!</p>';
    return;
  }
  
  container.innerHTML = '';
  filteredGames.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
      <div class="game-img-placeholder">
        <img src="${game.image}" alt="${game.name}" class="game-thumb" onerror="this.onerror=null; this.src='https://placehold.co/280x180?text=${encodeURIComponent(game.name)}'; console.log('Image failed to load:', '${game.image}')">
      </div>
      <h3>${game.name}</h3>
      <p>${game.genre} | ${game.platform}</p>
      <div class="price">P ${game.priceBWP} <small>BWP</small></div>
      <a href="contact.html" class="btn-outline">Buy Now</a>
    `;
    container.appendChild(card);
  });
}

// Contact form handling
function setupContactForm() {
  const form = document.getElementById('feedbackForm');
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (form.checkValidity()) {
      const feedbackMsg = document.getElementById('formFeedbackMsg');
      feedbackMsg.style.color = '#4ade80';
      feedbackMsg.innerHTML = '✓ Thank you! Your message has been sent. We will get back to you soon.';
      form.reset();
      
      setTimeout(() => {
        feedbackMsg.innerHTML = '';
      }, 5000);
    } else {
      form.reportValidity();
    }
  });
}

// Set active navigation link based on current page
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Search functionality for explore page
function setupSearch() {
  const searchInput = document.getElementById('searchGames');
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      renderExploreGames(e.target.value);
    });
  }
}

// Initialize all functionality
function init() {
  console.log("Initializing website...");
  setActiveNavLink();
  setupContactForm();
  setupSearch();
  
  // Check if we're on explore page and render games
  if (window.location.pathname.includes('explore.html')) {
    console.log("On explore page, loading games...");
    renderExploreGames();
  }
}

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', init);