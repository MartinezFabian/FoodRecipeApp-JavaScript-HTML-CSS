import { fetchCategories, getSelectedCategory, getFavorites } from "../utils/functions.js";
import { categorySelect, favorites } from "../utils/selectors.js";

class App {
  constructor() {
    this.initApp();
  }

  initApp() {
    // si estamos en index.html donde existe categorySelect
    if (categorySelect) {
      fetchCategories(); // obtener categories y agregarlas al <select>

      // "change" se activa cada vez que el usuario selecciona una opción diferente en el elemento <select>
      categorySelect.addEventListener("change", getSelectedCategory);
    }

    // si estamos en favorites.html donde existe favorites
    if (favorites) {
      getFavorites();
    }
  }
}

export default App;
