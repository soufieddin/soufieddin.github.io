const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoibWFycnlzIiwiYSI6ImNrbGdsdWF6azA0c2Iyb3Jydm9xcG1qMzYifQ.PTJcG6qfqXf1uK1F43FrSA"; // fill in your personal mapbox acces token here
const LATITUDE = 51.028810;
const LONGTITUDE = 3.799770;
(() => {
  const app = {
    initialize () {
      this.cacheElements();
      this.registerEventListeners();
      this.showMap ();
      this.showModalWindow();
    },
    cacheElements () {
      this.btnToTopElement = document.querySelector('.button--toTop');
      this.map = document.querySelector('#wrapper');
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
        this.myModal.addEventListener('shown.bs.modal', function () {
        this.myInput.focus()
      })
    }
  };
  app.initialize();
})();
