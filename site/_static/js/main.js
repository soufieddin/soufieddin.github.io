const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoibWFycnlzIiwiYSI6ImNrbGdsdWF6azA0c2Iyb3Jydm9xcG1qMzYifQ.PTJcG6qfqXf1uK1F43FrSA"; // fill in your personal mapbox acces token here
const LATITUDE = 51.028810;
const LONGTITUDE = 3.799770;
(() => {
  const app = {
    initialize () {
      this.cacheElements();
      this.registerEventListeners();
      if(this.map) {
        this.showMap ();
      }
      this.showModalWindow();
    },
    cacheElements () {
      this.map = document.getElementById('map');
      this.btnToTopElement = document.querySelector('.button--toTop');
      this.myModal = document.getElementById('myModal');
      this.myInput = document.getElementById('myInput');
    },
    registerEventListeners () {
      if (this.btnToTopElement !== null) {
        this.btnToTopElement.addEventListener('click', (ev) => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        });
      }
    },
    showMap () {
      mapboxgl.accessToken = 'pk.eyJ1IjoibWFycnlzIiwiYSI6ImNrbGdsdWF6azA0c2Iyb3Jydm9xcG1qMzYifQ.PTJcG6qfqXf1uK1F43FrSA';
      var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [3.799770,  51.028810], // starting position [lng, lat]
      zoom: 9 // starting zoom
      });
      var marker = new mapboxgl.Marker()
      .setLngLat([3.799770, 51.028810])
      .addTo(map);
    },
    showModalWindow() {
      const burger = document.querySelector('.button--burger');
      const modalWindow = document.querySelector('.my-modal');
      const close = document.querySelector('.button--close');
      burger.addEventListener('click', function() {
          modalWindow.style.display = 'block';
      });
      close.addEventListener('click', function() {
          close.style.transform = 'rotate(180deg)';
          setTimeout(function() {
              modalWindow.style.display = 'none';
          }, 1000);
      });
      
  },
  };
  app.initialize();
})();
