const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const movieContainer = document.getElementById("movieContainer");
//my api 
const API_KEY = "e749d7b5";

// Search button 
searchBtn.addEventListener('click', () => {
    let query = searchInput.value.trim();
    if (query) {
        fetchMovies(query);
    }
});

// Fetch 
async function fetchMovies(query) {
    try {
        const res = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`);
        const data = await res.json();
        if (data.Search) {
            displayMovies(data.Search);
        } else {
            movieContainer.innerHTML = "<p>No results found.</p>";
        }
    } catch (err) {
        console.error(err);
        movieContainer.innerHTML = "<p>Something went wrong. Try again.</p>";
    }
}

// Display !! do it ueoda
function displayMovies(movies) {
    movieContainer.innerHTML = movies.map(movie => `
        <div class="movie-card">
            <img src="${movie.Poster !== "N/A" ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        </div>
    `).join('');
}

// Dark mode toggle
document.getElementById('darkModeBtn').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('dark', document.body.classList.contains('dark'));
});

// Keep dark mode on page 
if (localStorage.getItem('dark') === 'true') {
    document.body.classList.add('dark');
}
