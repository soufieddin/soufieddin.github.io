// IMPORTS START -->
import { JSON_PATH } from './constant.js';
import * as dr from './dragEvents.js';
import { shuffle } from './helpers.js';
// <-- IMPORTS END


// APP FUNCTIONALITY
const app = {
  init() {
    this.animalData = [];
    this.cacheElements();
    this.registerListeners();
    this.fetchData();
  },
  cacheElements() {
    this.$animalContainer = document.querySelector('#animals');
    this.$dropzone = document.querySelector('#dropzone');
  },
  registerListeners() {
    this.$animalContainer.addEventListener('dragstart', dr.onDragStart);
    this.$dropzone.addEventListener('dragenter',dr.onDragEnter);
    this.$dropzone.addEventListener('dragover',dr.onDragOver);
    this.$dropzone.addEventListener('dragleave',dr.onDragLeave);
    this.$dropzone.addEventListener('drop',dr.onDrop);
  },
  async fetchData() {
    const response = await fetch(JSON_PATH);
    this.animalData = await response.json();
    console.log(this.animalData);
    this.createIcons();
    this.createDropzone();
  },
  createIcons() {
    let iconElements = [];
    for(const type of this.animalData.animals){
      const icons = type.icons.map(icon => `
        <img data-type = '${type.type}' data-id ='${icon}' src = './icons/${icon}.png' alt = '${icon}' />
      `);
      iconElements.push(...icons);
    }
    shuffle(iconElements);
    iconElements = iconElements.slice(0,16);
    this.$animalContainer.innerHTML = iconElements.join('');
  },
  createDropzone() {
    let types = this.animalData.animals.map(typeObj => typeObj.type);
    const dropContainers = types.map(type => {
      return `<div data-type = ${type}><h2>${type}</h2></div>`;
    });
    this.$dropzone.innerHTML = dropContainers.join('');
  },
};

// BEAM ME UP SCOTTY
app.init();
