const grid = document.querySelector(".grid");
const input = document.querySelector("input");
const btn = document.querySelector("button");
const searchBox = document.querySelector(".search-box");
let podaci;

window.addEventListener("load", function () {
  this.fetch(`http://api.tvmaze.com/shows`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      createGrid(data);
    });
});

function createGrid(shows) {
  shows
    .sort((a, b) => b.rating.average - a.rating.average)
    .filter((el, i) => i < 50)
    .forEach((el) => {
      const showBox = document.createElement("div");
      showBox.classList.add("show-box");
      const showImage = document.createElement("img");
      showImage.classList.add("show-image");
      showImage.setAttribute("src", el.image.medium);
      const title = document.createElement("div");
      title.classList.add("title");
      title.textContent = el.name;
      showBox.addEventListener("click", function () {
        localStorage.setItem("id", el.id);
        window.location.href = "./movieDetails.html";
      });

      showBox.appendChild(showImage);
      showBox.appendChild(title);
      grid.appendChild(showBox);
    });
}

btn.addEventListener("click", showResults);

function showResults() {
  const resultsBox = document.createElement("ul");
  resultsBox.classList.add("results-box");
  fetch(`https://api.tvmaze.com/search/shows?q=${input.value}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.length > 0) {
        data.forEach((el, i) => {
          if (i < 10) {
            const listItem = document.createElement("li");
            listItem.textContent = el.show.name;
            resultsBox.appendChild(listItem);

            listItem.addEventListener("click", function () {
              localStorage.setItem("id", el.show.id);
              window.location.href = "./movieDetails.html";
            });
          }
        });
      } else {
        resultsBox.textContent = "Please try something else :(";
      }
    });
  searchBox.appendChild(resultsBox);
}
