import { categorySelect } from "./selectors.js";

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
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export { fetchCategories };
