const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const cocktailDetails = document.getElementById('cocktailDetails');

function fetchCocktailDetails(cocktailName) {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
}

function displayCocktailDetails(cocktail) {
  if (cocktail) {
    const cocktailName = cocktail.strDrink;
    const instructions = cocktail.strInstructions;
    const imageUrl = cocktail.strDrinkThumb;

    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktail['strIngredient' + i];
      const measure = cocktail['strMeasure' + i];
      if (ingredient && measure) {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }

    cocktailDetails.innerHTML = `
      <h2>${cocktailName}</h2>
      <img src="${imageUrl}" alt="${cocktailName}" class="cocktail-image">
      <h3>Ingredients:</h3>
      <ul>
        ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
      </ul>
      <h3>Instructions:</h3>
      <p>${instructions}</p>
    `;
  } else {
    cocktailDetails.innerHTML = 'Cocktail not found.';
  }
}

function searchAndDisplayCocktail() {
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    fetchCocktailDetails(searchTerm)
      .then(data => {
        const cocktail = data.drinks[0];
        displayCocktailDetails(cocktail);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
}

// Search and display a cocktail when the button is clicked
searchButton.addEventListener('click', searchAndDisplayCocktail);

// Allow pressing Enter key to trigger search
searchInput.addEventListener('keyup', event => {
  if (event.key === 'Enter') {
    searchAndDisplayCocktail();
  }
});