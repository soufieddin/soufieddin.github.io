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
      let url = `https://www.bing.com/maps/embed?h=800&w=800&cp=${LONGTITUDE}~${LONGTITUDE}&lvl=16&typ=d&sty=r&src=SHELL&FORM=MBEDV8`;

        const iframe = `
        <iframe src="${url}" title=""Bing Maps" width="800" height="800"></iframe>
        `;
        document.body.querySelector('#map').innerHTML = iframe;
      // navigator.geolocation.getCurrentPosition(
      //   (position) => {
      //     const latitude = position.coords.latitude;
      //     const longitude = position.coords.longitude;
      //     console.log(latitude, longitude);
      //     // adres uit de geocoding api halen
      //     getAddress([longitude, latitude]);
      //     mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
      //     var map = new mapboxgl.Map({
      //     container: 'map', // container ID
      //     style: 'mapbox://styles/mapbox/streets-v11', // style URL
      //     center: [longitude, latitude], // starting position [lng, lat]
      //     zoom: 15// starting zoom
      //     });
      //     var el = document.createElement("div");
      //     el.className = "marker";
      //     el.style.backgroundImage = 'url("../static/icons/marker.png")';
    
      //     var marker = new mapboxgl.Marker(el).setLngLat([longitude, latitude]).addTo(map);
      //   },
      //   (error) => {
      //     // oh boy oh boy another error -_-
      //     console.log(error);
      //   }
      // );
      // mapboxgl.accessToken = 'pk.eyJ1IjoibWFycnlzIiwiYSI6ImNrbGdsdWF6azA0c2Iyb3Jydm9xcG1qMzYifQ.PTJcG6qfqXf1uK1F43FrSA';
      //    var map = new mapboxgl.Map({
      //    container: 'map', // container id
      //    style: 'mapbox://styles/mapbox/streets-v11', // style URL
      //    center: [3.799770, 51.028810], // starting position [lng, lat]
      //    zoom: 9 // starting zoom

    },
    async getAddress (coords) {
      const API_URL = `${MAPBOX_GEOCODING_API}${coords.join(",")}.json?types=address&access_token=${MAPBOX_ACCESS_TOKEN}`;
    
      const response = await fetch(API_URL);
      const data = await response.json();
    
      if (data.features[0]) {
        const address = data.features[0].place_name;
        document.querySelector("h1").innerText += " " + address;
      }
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