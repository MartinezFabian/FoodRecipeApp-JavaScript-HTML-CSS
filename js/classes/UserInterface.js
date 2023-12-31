import { results, containerModal, favorites, favoritesHeading } from "../utils/selectors.js";
import {
  fetchRecipeByID,
  addToFavorites,
  removeFromFavorites,
  existsInFavorites,
  getFavorites,
} from "../utils/functions.js";

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
      btn.onclick = function () {
        fetchRecipeByID(id);
      };

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

  static showModal(recipe) {
    const {
      idMeal,
      strMeal: name,
      strMealThumb: urlImg,
      strInstructions: text,
      strYoutube,
    } = recipe;

    containerModal.innerHTML = `
      <div class="modal" id="modal">
        <div class="modal__card">
          <div class="modal__content">
            <header class="modal__header">
              <h2 class="modal__title">${name}</h2>
            </header>
            <main class="modal__body">
              <img class="modal__image" src="${urlImg}" alt="${name} image" />
              <h3 class="modal__title">Instrucciones</h3>
              <p class="modal__text">${text}</p>
              <h3 class="modal__title">Ingredientes y Cantidades</h3>
              <ul id="modal-list" class="modal__list"></ul>
              <h3 class="modal__title">Video</h3>
              <a href="${strYoutube}" target="_blank">¡Ve el video en YouTube!</a>
            </main>
            <footer id="modal-footer" class="modal__footer"></footer>
          </div>
        </div>
      </div>
    `;

    const modalList = containerModal.querySelector("#modal-list");

    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];

      if (ingredient && measure) {
        const li = document.createElement("li");
        li.classList.add("modal__list-item");
        li.textContent = `${ingredient} - ${measure}`;

        modalList.appendChild(li);
      }
    }

    const modalFooter = containerModal.querySelector("#modal-footer");

    const buttonAddFavorite = document.createElement("button");
    buttonAddFavorite.classList.add("button", "button--favorite");

    if (existsInFavorites(idMeal)) {
      buttonAddFavorite.textContent = "Eliminar de Favoritos";
    } else {
      buttonAddFavorite.textContent = "Agregar a Favoritos";
    }

    buttonAddFavorite.onclick = function () {
      if (existsInFavorites(idMeal)) {
        removeFromFavorites(idMeal);
        UserInterface.showAlert("Receta eliminada de favoritos", "remove");
        buttonAddFavorite.textContent = "Agregar a Favoritos";

        // si estamos en favorites.html donde existe favorites
        if (favorites) {
          getFavorites();
        }
      } else {
        addToFavorites({
          idMeal: idMeal,
          strMeal: name,
          strMealThumb: urlImg,
        });

        // si estamos en favorites.html donde existe favorites
        if (favorites) {
          getFavorites();
        }

        UserInterface.showAlert("¡Receta agregada a favoritos!", "success");

        buttonAddFavorite.textContent = "Eliminar de Favoritos";
      }
    };

    const buttonClose = document.createElement("button");
    buttonClose.classList.add("button", "button--close");
    buttonClose.textContent = "Cerrar";
    buttonClose.onclick = function () {
      UserInterface.clearHTML(containerModal);
    };

    modalFooter.appendChild(buttonAddFavorite);
    modalFooter.appendChild(buttonClose);
  }

  static showAlert(message, type) {
    const exist = document.querySelector(".alert");

    if (exist) return;

    const alert = document.createElement("div");
    alert.textContent = message;
    alert.classList.add("alert");

    if (type === "success") {
      alert.classList.add("alert--success");
    } else if (type === "remove") {
      alert.classList.add("alert--remove");
    }

    const container = document.querySelector(".modal__header");
    container.appendChild(alert);

    setTimeout(() => {
      alert.remove();
    }, 2000);
  }

  static setFavoriteHeadingInitialText() {
    // limpiar el HTML previo dentro de results
    UserInterface.clearHTML(results);

    favoritesHeading.textContent = "Las recetas que agregues a favoritos las veras aquí";
  }
}

export default UserInterface;
