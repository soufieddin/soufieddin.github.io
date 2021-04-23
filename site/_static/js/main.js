const MAPBOX_GEOCODING_API = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoibWFycnlzIiwiYSI6ImNrbGdsdWF6azA0c2Iyb3Jydm9xcG1qMzYifQ.PTJcG6qfqXf1uK1F43FrSA"; // fill in your personal mapbox acces token here
const COORDINATES = [];
const LATITUDE = 51.028810;
const LONGTITUDE = 3.799770;
(() => {
  const app = {
    initialize () {
      this.cacheElements();
      this.registerEventListeners();
      this.showMap ();
      
      
    },
    cacheElements () {
      this.btnToTopElement = document.querySelector('.btn-to-top');
      this.map = document.querySelector('#wrapper');
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
    

    }
  };
  app.initialize();
})();
/* <script>
mapboxgl.accessToken = 'pk.eyJ1IjoibWFycnlzIiwiYSI6ImNrbGdsdWF6azA0c2Iyb3Jydm9xcG1qMzYifQ.PTJcG6qfqXf1uK1F43FrSA';
var map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v11', // style URL
center: [-74.5, 40], // starting position [lng, lat]
zoom: 9 // starting zoom
});
</script> */