
const searchBtn = document.querySelector("#search-btn")
const searchInput = document.querySelector("#input-value")
const movieList = document.querySelector("#searchMovie")
const movieContainer = document.querySelector("#movieContainer")

function movieSection(movies) {
  return movies.map((movie) => {
    if (movie.poster_path) {
      return `<img src="${imgUrl + movie.poster_path}" data-movie-id=${movie.id}>`
    }
  }).join("")
}

function createMovieList(movies, title = "") {
  const movieElement = document.createElement("div")
  movieElement.setAttribute("class", "movie")
  const movieTemplate = `
        <h2>${title}</h2>
        <div class="content"><p id="contentClose">X</p></div>
        <section class="section">${movieSection(movies)}</section>
  `
  movieElement.innerHTML = movieTemplate
  return movieElement
}

function renderSearchMovie(data) {
  movieList.innerHTML = ""
  const movies = data.results
  const movieBlock = createMovieList(movies)
  movieList.appendChild(movieBlock)
}

function renderMovie(data) {
  const movies = data.results
  const movieBlock = createMovieList(movies, this.title)
  movieContainer.appendChild(movieBlock)
}

function handleError(error) {
  console.log("Error", error)
}

searchBtn.addEventListener("click", event => {
  event.preventDefault()
  const value = searchInput.value
  searchMovie(value)
  searchInput.value = ""
})

function createIframe(video) {
  const iframe = document.createElement("iframe")
  iframe.src = `https://www.youtube.com/embed/${video.key}`
  iframe.allowFullscreen = true
  return iframe
}

function creatVideo(data, content) {
  content.innerHTML = `<p id="contentClose">X</p>`
  const iframeContainer = document.createElement("div")
  iframeContainer.setAttribute("class", "trailerVideo")
  const videos = data.results
  const trailer = videos.find(video => video.type === "Trailer")
  const iframe = createIframe(trailer)
  iframeContainer.appendChild(iframe)
  content.appendChild(iframeContainer)
}

function createIntro(data, content) {
  const intro = document.createElement("div")
  intro.setAttribute("class", "trailerIntro")
  const introTemplate = `
    <h3>Title: ${data.title}</h3>
    <h3>Release Date: ${data.release_date}</h3>
    
  `
  intro.innerHTML = introTemplate
  content.appendChild(intro)
}

document.addEventListener("click", event => {
  const target = event.target
  const movieID = target.dataset.movieId
  const section = target.parentElement
  const content = section.previousElementSibling
  const path = `/movie/${movieID}/videos`
  const pathTwo = `/movie/${movieID}`
  const url = generateUrl(path)
  const urlTwo = generateUrl(pathTwo)

  if (target.tagName.toLowerCase() == "img") {
    content.classList.add("content-display")
    // get video
    fetch(url)
      .then((res) => res.json())
      .then((data) => creatVideo(data, content))
      .catch((error) => {
        console.log("error")
      })

    fetch(urlTwo)
      .then((res) => res.json())
      .then((data) => createIntro(data, content))
      .catch((error) => {
        console.log("error")
      })
  }
  if (target.tagName.toLowerCase() == "p") {
    target.parentElement.classList.remove("content-display")
    target.nextElementSibling.remove()
  }
})

searchMovie("transformers")
upcomingMovie()
nowPlayingMovie()