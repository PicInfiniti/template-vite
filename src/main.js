// main.js
import App from './core/App';
import './assets/sass/main.sass';
const env = import.meta.env;

const app = new App(env);
app.init();
