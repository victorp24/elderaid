import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

export { default as Navigation } from "./components/navigation";
export { default as Home } from "./components/home";
export { default as Contact } from "./components/contact";
export { default as Signup } from "./components/signup";
export { default as Login } from "./components/login";
export { default as Dashboard} from "./components/dashboard";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
