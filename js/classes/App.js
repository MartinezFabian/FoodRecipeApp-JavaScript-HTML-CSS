import { fetchCategories } from "../utils/functions.js";

class App {
  constructor() {
    this.initApp();
  }

  initApp() {
    fetchCategories();
  }
}

export default App;
