const apiKey = "wPzVZTgOLWuNazA3XFP7dt33T9K7MN3SlpWl0zxA";


const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const currentImageContainer = document.getElementById('current-image-container');
const searchHistory = document.getElementById('search-history');

let searches = JSON.parse(localStorage.getItem('searches')) || [];

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const selectedDate = searchInput.value;

  getImageOfTheDay(selectedDate);

  saveSearch(selectedDate);
  addSearchToHistory();
});

async function getImageOfTheDay(date) {
  let heading = document.getElementById("Heading");
  heading.innerHTML = `Picture on ${date}`;
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
 
  

  try {
    const response = await fetch(url);
    const data = await response.json();

    currentImageContainer.innerHTML = `
      <h2>${data.title}</h2>
      <p>${data.explanation}</p>
      <img src="${data.url}" alt="${data.title}">
    `;
  } catch (error) {
    console.error(error);
    currentImageContainer.innerHTML = 'An error occurred while fetching the data.';
  }
}

async function getCurrentImageOfTheDay() {
  const currentDate = new Date().toISOString().split('T')[0];

  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`;
 
  

  try {
    const response = await fetch(url);
    const data = await response.json();

    currentImageContainer.innerHTML = `
      <h2>${data.title}</h2>
      <p>${data.explanation}</p>
      <img src="${data.url}" alt="${data.title}">
    `;
  } catch (error) {
    console.error(error);
    currentImageContainer.innerHTML = 'An error occurred while fetching the data.';
  }
}

getCurrentImageOfTheDay();

function saveSearch(date) {
  searches.push(date);

  localStorage.setItem('searches', JSON.stringify(searches));
}

function addSearchToHistory() {
  searches = JSON.parse(localStorage.getItem('searches')) || [];

  const searchHistoryHTML = searches
    .map((search) => `<li>${search}</li>`)
    .join('');

  searchHistory.innerHTML = searchHistoryHTML;

  searchHistory.querySelectorAll('li').forEach((li) => {
    li.addEventListener('click', () => {
      const selectedDate = li.textContent;
      getImageOfTheDay(selectedDate);
    });
  });
}

addSearchToHistory();