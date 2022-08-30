import './style.css';
import popup from './modules/popup.js';
import showPopup from './modules/getElements.js';

document.addEventListener('DOMContentLoaded', () => {
  showPopup.addEventListener('click', () => {
    popup();
  });
});
