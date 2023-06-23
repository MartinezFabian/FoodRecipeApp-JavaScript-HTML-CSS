import { results } from "../utils/selectors.js";

class UserInterface {
  static showFoodsInHTML(foods) {
    // limpiar el HTML previo dentro de results
    UserInterface.clearHTML(results);

    foods.forEach((food) => {
      const { idMeal: id, strMeal: name, strMealThumb: urlImg } = food;

      const foodCard = document.createElement("article");
      foodCard.classList.add("food-card");

      const img = document.createElement("img");
      img.classList.add("food-card__image");
      img.alt = `${name} image`;
      img.src = urlImg;

      foodCard.appendChild(img);

      const cardInformation = document.createElement("div");
      cardInformation.classList.add("food-card__information");

      foodCard.appendChild(cardInformation);

      const foodName = document.createElement("h3");
      foodName.classList.add("food-card__name");
      foodName.textContent = name;

      cardInformation.appendChild(foodName);

      const btn = document.createElement("button");
      btn.classList.add("button");
      btn.textContent = "Ver Receta";

      cardInformation.appendChild(btn);

      results.appendChild(foodCard);
    });
  }

  static clearHTML(element) {
    // mientras el elemento tenga un primer hijo
    while (element.firstChild) {
      //eliminar el primer hijo del elemento
      element.removeChild(element.firstChild);
    }
  }
}

export default UserInterface;
