import { categorySelect } from "./selectors.js";
import UserInterface from "../classes/UserInterface.js";

function fetchCategories() {
  const url = "https://www.themealdb.com/api/json/v1/1/categories.php";

  fetch(url)
    .then((response) => {
      //comprobar si la respuesta es exitosa
      if (response.ok) {
        return response.json(); // retornar nueva promise que convierte la respuesta en un obj JavaScript
      } else {
        //lanzar error si la respuesta no fue exitosa
        throw new Error(`Error: ${response.statusText}`);
      }
    })
    .then((data) => {
      if (data.categories.length > 0) {
        showCategories(data.categories);
      } else {
        console.log("Error: no hay categorías disponibles");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function showCategories(categories) {
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.strCategory;
    option.textContent = category.strCategory;

    categorySelect.appendChild(option);
  });
}

function getSelectedCategory(e) {
  const category = e.target.value;

  fetchFoodByCategory(category);
}

function fetchFoodByCategory(category) {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json(); // retornar nueva promise que convierte la respuesta en un obj JavaScript
      } else {
        //lanzar error si la respuesta no fue exitosa
        throw new Error(`Error: ${response.statusText}`);
      }
    })
    .then((data) => {
      if (data.meals.length > 0) {
        UserInterface.showFoodsInHTML(data.meals);
      } else {
        console.log("Error: no se encontraron comidas para la categoría seleccionada");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function fetchRecipeByID(id) {
  const url = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  fetch(url)
    .then((response) => {
      if (response.ok) {
        // retornar nueva promise que convierte la respuesta en un obj JavaScript
        return response.json();
      } else {
        //lanzar error si la respuesta no fue exitosa
        throw new Error(`Error: ${response.statusText}`);
      }
    })
    .then((data) => {
      if (data.meals.length > 0) {
        UserInterface.showModal(data.meals[0]);
      } else {
        console.log("No hay receta para la comida seleccionada");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function addToFavorites(food) {
  console.log(food);
}

export { fetchCategories, getSelectedCategory, fetchRecipeByID, addToFavorites };
