async function fetchData() {
    try {
        const movieTitle = document.getElementById('movieTitle').value.toLowerCase();
        const response = await fetch(`http://www.omdbapi.com/?apikey=f287297b&t=${movieTitle}`);
        
        if (!response.ok) {
            throw new Error("Could not fetch resources");
        }

        const data = await response.json();
        
        // Check if the API returned valid data
        if (data.Response === "False") {
            throw new Error(data.Error);
        }

        // Display movie details
        const movieNameElement = document.getElementById('movieName');
        const releaseYearElement = document.getElementById('releaseYear');
        const genreElement = document.getElementById('genre');
        const imgElement = document.getElementById('MovieImage');
        const movieDetailsElement = document.getElementById('movieDetails');

        // Set movie details
        movieNameElement.innerText = data.Title; 
        releaseYearElement.innerText = `Release Year: ${data.Year}`;
        genreElement.innerText = `Genre: ${data.Genre}`;
        
        const moviePoster = data.Poster;

        // If the movie has a valid poster URL
        if (moviePoster !== "N/A") {
            imgElement.src = moviePoster;
            imgElement.style.display = 'block';
            movieDetailsElement.style.display = 'block';
        } else {
            imgElement.style.display = 'none';
            alert("No poster available for this movie.");
        }
        
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
}
