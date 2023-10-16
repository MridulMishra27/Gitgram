const APIURL = "https://api.github.com/users/";
    const main = document.querySelector('.box'); 
    const form = document.getElementById("form");
    const search = document.getElementById("search");
    const searchHistory = [];
    const filterSelect = document.getElementById('filter');
  filterSelect.addEventListener('change', displaySearchHistory);
  
  function addToSearchHistory(username) {
    const timestamp = new Date().getTime();
    searchHistory.unshift({ username, timestamp }); 
  }
  
  function displaySearchHistory() {
    const historyList = document.getElementById('history-list');
    const selectedFilter = filterSelect.value;
    searchHistory.sort((a, b) => {
      if (selectedFilter === 'newest') {
        return b.timestamp - a.timestamp;
      } else if (selectedFilter === 'oldest') {
        return a.timestamp - b.timestamp;
      } else if (selectedFilter === 'mostPopular') {
        return b.timestamp - a.timestamp;
      }
    });
  
    historyList.innerHTML = '';
  
    searchHistory.forEach((entry) => {
      const listItem = document.createElement('li');
      const timestamp = new Date(entry.timestamp);
      const timeAgo = timeSince(timestamp);
      listItem.textContent = `${entry.username} - ${timeAgo}`;
      historyList.appendChild(listItem);
    });
  }
  function timeSince(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) {
      return `${seconds} seconds ago`;
    }else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minutes ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(seconds / 86400);
      return `${days} days ago`;
  }}
  
    async function getUser(username) {
      const resp = await fetch(APIURL + username);
      const respData = await resp.json();
      const userBox = document.querySelector(".box");
  userBox.innerHTML = `
    <div>
      <img class="avatar" src="${respData.avatar_url}" alt="${respData.name}" />
    </div>
    <div class="user-info">
      <h2>${respData.name}</h2>
      <p><strong>Bio:</strong> ${respData.bio}</p>
      <p><strong>Followers:</strong> ${respData.followers}</p>
      <p><strong>Following:</strong> ${respData.following}</p>
      <p><strong>Public Repositories:</strong> ${respData.public_repos}</p>
      <p><strong>Location:</strong> ${respData.location}</p>
      <p>
        <strong>Link to GitHub Profile:</strong>
        <a href="${respData.html_url}" target="_blank">${respData.login}</a>
      </p>
    </div>
  `;

      createUserCard(respData);
  
      getRepos(username);
    }
    
    const showHistoryButton = document.getElementById('show-history');
  const searchHistoryCard = document.getElementById('search-history-card');
  
  showHistoryButton.addEventListener('click', () => {
    if (searchHistoryCard.style.display === 'none') {
      searchHistoryCard.style.display = 'block';
    } else {
      searchHistoryCard.style.display = 'none';
    }
  });
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const user = search.value;
  
      if (user) {
        getUser(user);
        addToSearchHistory(user); 
        search.value = "";
        displaySearchHistory(); 
      }
    });
  
    displaySearchHistory();
  
    // Particle configuration
particlesJS('particles-js', {
  particles: {
    number: {
      value: 180, 
    },
    color: {
      value: '#f8ec03', 
    },
    shape: {
      type: 'circle', 
    },
    opacity: {
      value: 0.5, 
    },
    size: {
      value: 4, 
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#ffffff',
      opacity: 0.4,
      width: 1,
    },
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'grab', 
      },
      onclick: {
        enable: true,
        mode: 'pull', 
      },
    },
  },
  retina_detect: true,
});