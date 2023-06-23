import { fetchCategories, getSelectedCategory } from "../utils/functions.js";
import { categorySelect } from "../utils/selectors.js";

class App {
  constructor() {
    this.initApp();
  }

  initApp() {
    fetchCategories(); // obtener categories y agregarlas al <select>

    // "change" se activa cada vez que el usuario selecciona una opción diferente en el elemento <select>
    categorySelect.addEventListener("change", getSelectedCategory);
  }
}

export default App;
