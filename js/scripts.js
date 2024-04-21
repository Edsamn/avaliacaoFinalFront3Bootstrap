let initialPage = 1;
const characterContainer = document.getElementById("contentList");
const searchInput = document.getElementById("searchInput");
let nextPagebtn = document.getElementById("btnNext");
let prevPagebtn = document.getElementById("btnPrev");
const myModal = new bootstrap.Modal("#exampleModal");
const modalTitle = document.getElementById("exampleModalLabel");
const modalBody = document.getElementById("modalBody");

async function getCharacters() {
  try {
    const response = await api.get(`character/?page=${initialPage}`);
    const characters = response.data.results;

    characters.splice(6, 14);

    characters.forEach((character) => {
      renderOnDisplay(character);
    });

    prevPagebtn.disabled = initialPage === 1;
    nextPagebtn.disabled = initialPage === 42;
  } catch (error) {
    console.log(error);
  }
}

async function renderOnDisplay(character) {
  const episodeUrl = character.episode.at(-1);

  const episode = await api.get(episodeUrl);

  const episodeName = episode.data.name;

  const userCard = document.createElement("div");
  const userCardImage = document.createElement("div");
  const userCardText = document.createElement("div");
  userCard.classList.add("userCard");
  userCardImage.classList.add("userCardImage");
  userCardText.classList.add("userCardText");

  userCardImage.innerHTML = `
    <img src='${character.image}' alt=''>
    `;

  if (character.status === "Alive") {
    userCardText.innerHTML = `
    <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal" ><h3 class = "text-white"> ${character.name} </h3></a>
    <div class="d-flex"><span class ="statusAlive"></span><p class = "text-white">${character.status} - ${character.species}</p></div>
    <p class = "text-secondary"> Última localização conhecida </p>
    <p class = "text-white"> ${character.location.name} </p>
    <p class = "text-secondary"> Visto a última vez em: </p>
    <p class = "text-white"> Episódio ${episodeName} </p>
  `;
  } else if (character.status === "Dead") {
    userCardText.innerHTML = `
    <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal"><h3 class = "text-white"> ${character.name} </h3></a>
    <div class="d-flex"><span class ="statusDead"></span><p class = "text-white">${character.status} - ${character.species}</p></div>
    <p class = "text-secondary"> Última localização conhecida </p>
    <p class = "text-white"> ${character.location.name} </p>
    <p class = "text-secondary"> Visto a última vez em: </p>
    <p class = "text-white"> Episódio ${episodeName} </p>
  `;
  } else if (character.status === "unknown") {
    userCardText.innerHTML = `
    <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal"><h3 class = "text-white"> ${character.name} </h3></a>
    <div class="d-flex"><span class ="statusUnknown"></span><p class = "text-white">${character.status} - ${character.species}</p></div>
    <p class = "text-secondary"> Última localização conhecida </p>
    <p class = "text-white"> ${character.location.name} </p>
    <p class = "text-secondary"> Visto a última vez em: </p>
    <p class = "text-white"> Episódio ${episodeName} </p>
  `;
  }

  userCard.appendChild(userCardImage);
  userCard.appendChild(userCardText);
  characterContainer.appendChild(userCard);

  const link = userCardText.querySelector("a");
  link.addEventListener("click", () => {
    showModal(character);
  });
}

async function searchPeopleByName() {
  try {
    const response = await api.get(`character/?name=${searchInput.value}`);
    const characters = response.data.results;

    characters.splice(6, 14);
    characterContainer.innerHTML = "";

    characters.forEach((character) => {
      renderOnDisplay(character);
    });
  } catch (error) {
    console.log(error);
  }
}

getCharacters();

function nextPage() {
  initialPage += 1;

  characterContainer.innerHTML = "";

  getCharacters();
}

function previousPage() {
  if (initialPage > 1) {
    initialPage -= 1;
  }
  characterContainer.innerHTML = "";

  getCharacters();
}

async function showModal(character) {
  const episodeUrl = character.episode.at(-1);

  const episode = await api.get(episodeUrl);

  const episodeName = episode.data.name;

  modalTitle.innerHTML = `
  <h3> ${character.name}</h3>
  `;
  if (character.status === "Alive") {
    modalBody.innerHTML = `
    <img src='${character.image}' alt=''>
    <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal" ><h3 class = "text-white"> ${character.name} </h3></a>
    <div class="d-flex"><span class ="statusAlive"></span><p class = "text-white">${character.status} - ${character.species}</p></div>
    <p class = "text-secondary"> Última localização conhecida </p>
    <p class = "text-white"> ${character.location.name} </p>
    <p class = "text-secondary"> Visto a última vez em: </p>
    <p class = "text-white"> Episódio ${episodeName} </p>
  `;
  } else if (character.status === "Dead") {
    modalBody.innerHTML = `
    <img src='${character.image}' alt=''>
    <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal"><h3 class = "text-white"> ${character.name} </h3></a>
    <div class="d-flex"><span class ="statusDead"></span><p class = "text-white">${character.status} - ${character.species}</p></div>
    <p class = "text-secondary"> Última localização conhecida </p>
    <p class = "text-white"> ${character.location.name} </p>
    <p class = "text-secondary"> Visto a última vez em: </p>
    <p class = "text-white"> Episódio ${episodeName} </p>
  `;
  } else if (character.status === "unknown") {
    modalBody.innerHTML = `
    <img src='${character.image}' alt=''>
    <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal"><h3 class = "text-white"> ${character.name} </h3></a>
    <div class="d-flex"><span class ="statusUnknown"></span><p class = "text-white">${character.status} - ${character.species}</p></div>
    <p class = "text-secondary"> Última localização conhecida </p>
    <p class = "text-white"> ${character.location.name} </p>
    <p class = "text-secondary"> Visto a última vez em: </p>
    <p class = "text-white"> Episódio ${episodeName} </p>
  `;
  }
}
