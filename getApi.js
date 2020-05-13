const key = "cbf93d52fe01fe22ed276db6cb3d40a8"
const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${key}`
const imgUrl = "https://image.tmdb.org/t/p/w500"

function generateUrl(path) {
  const url = `https://api.themoviedb.org/3${path}?api_key=${key}`
  return url
}

function requestMovie(url, complete, error) {
  fetch(url)
    .then((res) => res.json())
    .then(complete)
    .catch(error)
}

function searchMovie(value) {
  const path = `/search/movie`
  const url = `${generateUrl(path)}&query=${value}`
  requestMovie(url, renderSearchMovie, handleError)
}

function upcomingMovie() {
  const path = `/movie/upcoming`
  const url = generateUrl(path)
  const render = renderMovie.bind({ title: "Upcoming Movies" })
  requestMovie(url, render, handleError)
}

function nowPlayingMovie() {
  const path = `/movie/now_playing`
  const url = generateUrl(path)
  const render = renderMovie.bind({ title: "Now playing" })
  requestMovie(url, render, handleError)
}