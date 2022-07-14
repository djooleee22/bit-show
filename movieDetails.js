const id = localStorage.getItem("id");
const image = document.querySelector(".details-img");
const box = document.querySelector(".box");
const title = document.querySelector(".title");
const seasonsH2 = document.querySelector(".seasons");
const seasonsList = document.querySelector(".seasons-list");
const castList = document.querySelector(".cast-list");
const btn = document.querySelector("button");
const input = document.querySelector("input");
const searchBox = document.querySelector(".search-box");
const text = document.querySelector(".details-text");

window.addEventListener("load", function () {
  this.fetch(`https://api.tvmaze.com/shows/${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      title.textContent = data.name;
      image.setAttribute("src", data.image.medium);
      text.innerHTML = data.summary;
    });

  this.fetch(`https://api.tvmaze.com/shows/${id}/seasons`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      seasonsH2.textContent = `Seasons (${data.length})`;
      data.forEach((el) => {
        const listItem = this.document.createElement("li");
        listItem.textContent = `${el.premiereDate} -- ${el.endDate}`;
        seasonsList.appendChild(listItem);
      });
    });

  this.fetch(`https://api.tvmaze.com/shows/${id}/cast`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.forEach((el) => {
        const castItem = this.document.createElement("li");
        castItem.textContent = el.person.name;
        castList.appendChild(castItem);
      });
    });
});

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
            listItem.classList.add("details-li");
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
