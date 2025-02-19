// script.js
const searchInput = document.getElementById("searchInput");
const animeList = document.getElementById("animeList");
const animeDetails = document.getElementById("animeDetails");
const animeTitle = document.getElementById("animeTitle");
const animeImage = document.getElementById("animeImage");
const animeDescription = document.getElementById("animeDescription");
const episodeList = document.getElementById("episodeList");
const closeDetailsButton = document.getElementById("closeDetails");

// Fetch anime data
async function fetchAnime(query) {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=6`);
    const data = await response.json();
    displayAnimeList(data.data);
}

// Display Anime List
function displayAnimeList(animes) {
    animeList.innerHTML = "";
    animes.forEach(anime => {
        const card = document.createElement("div");
        card.classList.add("animeCard");
        card.innerHTML = `
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            <h3>${anime.title}</h3>
        `;
        card.addEventListener("click", () => showAnimeDetails(anime.mal_id));
        animeList.appendChild(card);
    });
}

// Show Anime Details
async function showAnimeDetails(id) {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    const data = await response.json();
    const anime = data.data;

    animeTitle.textContent = anime.title;
    animeImage.src = anime.images.jpg.image_url;
    animeDescription.textContent = anime.synopsis;

    // Display episodes
    episodeList.innerHTML = "";
    anime.episodes.forEach((episode, index) => {
        const li = document.createElement("li");
        li.textContent = episode.title;
        li.addEventListener("click", () => toggleWatched(episode));
        episodeList.appendChild(li);
    });

    animeDetails.classList.remove("hidden");
}

// Toggle Watched Status
function toggleWatched(episode) {
    episode.classList.toggle("watched");
}

// Close Details
closeDetailsButton.addEventListener("click", () => {
    animeDetails.classList.add("hidden");
});

// Search for Anime
searchInput.addEventListener("input", (event) => {
    const query = event.target.value;
    if (query.length > 2) {
        fetchAnime(query);
    } else {
        animeList.innerHTML = "";
    }
});
