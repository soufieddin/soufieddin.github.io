
(() => {
  const app = {
    initialize () {
      this.cacheElements();
      this.registerEventListeners();

      this.showModalWindow();
    },
    cacheElements () {
      
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
