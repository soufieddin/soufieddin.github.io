let intervalId;
const bodyElement = document.querySelector("body");
const app = {
  init: function () {
    this.pageHeader = document.createElement("header");
    bodyElement.appendChild(this.pageHeader);

    this.headerLogo = document.createElement("div");
    this.headerLogo.classList.add("c-header-logo");
    this.pageHeader.appendChild(this.headerLogo);

    this.headerNav = document.createElement("div");
    this.headerNav.classList.add("c-header-nav");
    this.pageHeader.appendChild(this.headerNav);
    this.listElement = document.createElement("ul");
    this.listElement.classList.add("o-list");
    this.headerNav.appendChild(this.listElement);

    this.containerSort = document.createElement("div");
    this.containerSort.classList.add("c-container");
    bodyElement.appendChild(this.containerSort);

    this.ulSort = document.createElement("ul");
    this.ulSort.classList.add("ul-sort");
    this.containerSort.appendChild(this.ulSort);

    this.conuntdown = document.createElement("div");
    this.conuntdown.classList.add("clock");
    this.containerSort.appendChild(this.conuntdown);

    this.container = document.createElement("div");
    this.container.classList.add("o-container");
    bodyElement.appendChild(this.container);

    this.data = lineUp.sort((a, b) => (a.artist.name > b.artist.name ? 1 : -1));
    this.generateNav();
    this.generateContent();
    this.generateSort();
    this.sortContent();
    this.creatModal();
    this.generateModal();
    this.creatFooter();
    intervalId = setInterval(this.generateCountdown, 1000);
  },
  generateSort: function () {
    let str = `
        <li class = "list-element sorting">Overview A-Z</li>
        `;
    const days = document.querySelectorAll(".date");
    const arr = [];
    let d;
    days.forEach((e) => {
      d = e.innerHTML;
      arr.push(d);
    });
    const array = Array.from(new Set(arr)).sort();
    array.forEach((e) => {
      str += `<li class = "list-element" data-day="${e}">${e}</li>`;
    });
    this.ulSort.innerHTML = str;
    const a = document.querySelectorAll(".list-element");
    a[0].classList.add("selected");
  },
  generateNav: function () {
    let str = "";
    hNav.forEach((e) => {
      str += `<li><a href ='${e.link}' target="_blank">${e.name}</a></li>`;
    });
    this.listElement.innerHTML = str;
    const liElement = document.querySelectorAll("li > a");
    liElement[1].classList.add("is-selected");
    liElement[0].removeAttribute("target");
    liElement[1].removeAttribute("target");
    liElement[8].classList.add("dark");
  },
  generateContent: function () {
    let str = "";
    this.data.forEach((e) => {
      str += `
            <div class="pic" id="${e.id}" data-day="${this.convertMS(
        e.from
      )}" style="background-image:url(${
        e.picture.large
      });position:relative;display:flex;height:22rem;width:32%;margin: 0.5rem ;background-position:50% 50%;
            ">
                <div class = "box-in-pic">
                    <span class = "date">${this.convertMS(e.from)}</span>
                    <span class = "place">${e.place.name}</span>
                    <h3 class = "name">${e.artist.name}</h3>
                </div>
            </div>
            `;
    });
    this.container.innerHTML = str;
  },
  convertMS: function (ms) {
    const d = new Date(ms);
    let day = d.getDay();
    if (day == 0) {
      return "Sunday";
    } else if (day == 1) {
      return "Monday";
    } else if (day == 2) {
      return "Tuesday";
    } else if (day == 3) {
      return "Wednesday";
    } else if (day == 4) {
      return "Thursday";
    } else if (day == 5) {
      return "Friday";
    } else if (day == 6) {
      return "Saturday";
    }
  },
  generateCountdown: function() {
    const goal = new Date(1625148000000);
    const vanaf = new Date();
    const total = goal - vanaf;
    if(total <= 0) {
        clearInterval(intervalId);
    }

    let seconds = Math.floor((total / 1000) % 60);
    if (seconds <= 9) {
      seconds = "0" + seconds;
    }

    let minutes = Math.floor((total / 1000 / 60) % 60);
    if (minutes <= 9) {
      minutes = "0" + minutes;
    }

    let hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    if (hours <= 9) {
      hours = "0" + hours;
    }

    let days = Math.floor(total / (1000 * 60 * 60 * 24));
    if (days <= 9) {
      days = "0" + days;
    }

    const result = `${days} Days ${hours}h ${minutes}m ${seconds}s`;
    let conuntdown = document.querySelector(".clock");
    if (conuntdown) {
        conuntdown.innerText = result;
    }
  },
  sortContent: function () {
    const items = document.querySelectorAll(".ul-sort > li:not(.first-child)");
    console.log(items);
    for (let item of items) {
      item.addEventListener("click", (e) => {
        const q = e.target;
        const selected = document.querySelector(".selected");
        if (selected) {
          selected.classList.toggle("selected");
        }
        q.classList.add("selected");

        let pics = document.querySelectorAll(".pic");
        for (let element of pics) {
          if (
            element.getAttribute("data-day") ===
              item.getAttribute("data-day") ||
            item.getAttribute("data-day") === null
          ) {
            element.style.display = "block";
          } else if (
            element.getAttribute("data-day") !== item.getAttribute("data-day")
          ) {
            element.style.display = "none";
          }
        }
      });
    }
  },
  creatModal: function () {
    this.data.forEach((e) => {
      const modal = document.createElement("div");
      modal.classList.add("modal");
      modal.setAttribute("id", `${e.id}`);
      bodyElement.appendChild(modal);

      const modalContent = document.createElement("div");
      modalContent.classList.add("m-content");
      modalContent.innerHTML = `
            <div class="pi" id="${e.id}" style="background-image:url(${
        e.picture.large
      });position:relative;display:flex;height:42rem;width:100%;margin: 0 auto;background-repeat: no-repeat;
            ">
                <div class = "box-in-pic">
                    <span class = "date">${this.convertMS(e.from)}</span>
                    <span class = "place">${e.place.name}</span>
                    <h3 class = "name">${e.artist.name}</h3>
                </div>
            </div>
            <div class = "mod-container">
                <p class = "synopsis">${e.artist.synopsis}</p>
                <iframe class="yt" src ="${e.media[0].sourceId}"></iframe>
                <h3 class = "km">KNOW MORE?</h3>
                <div class = "soc">
                    <ul class = "ul-soc">
                        <li><a href = "${e.artist.social.website}" class="linkS" target="_blank">${e.artist.social.website}</a></li>
                        <li><a href = "${e.artist.social.facebook}" class="linkS" target="_blank">${e.artist.social.facebook}</a></li>
                        <li><a href = "${e.artist.social.twitter}" class="linkS" target="_blank">${e.artist.social.twitter}</a></li>
                        <li><a href = "${e.artist.social.instagram}" class="linkS" target="_blank">${e.artist.social.instagram}</a></li>
                    </ul>
                </div>
            </div>
            `;
      modal.appendChild(modalContent);
      const closeBtn = document.createElement("span");
      closeBtn.classList.add("btn-close");
      closeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class ="x" viewBox="0 0 24 24" fill="white" width="48px" height="48px"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`;
      modal.appendChild(closeBtn);
    });
  },
  generateModal: function () {
    const pics = document.querySelectorAll(".pic");
    const m = document.querySelectorAll(".modal");
    const closeb = document.querySelectorAll(".btn-close");
    pics.forEach((p) => {
      const pId = p.getAttribute("id");
      p.addEventListener("click", function () {
        m.forEach((e) => {
          const mId = e.getAttribute("id");
          if (pId === mId) {
            e.style.display = "block";
            this.creatContent();
          } else {
            e.style.display = "none";
          }
        });
      });
    });
    closeb.forEach((e) => {
      e.addEventListener("click", () => {
        m.forEach((e) => {
          e.style.display = "none";
        });
      });
    });
    m.forEach((e) => {
      e.addEventListener("click", () => {
        m.forEach((e) => {
          e.style.display = "none";
        });
      });
    });
  },
  creatFooter: function () {
    const footer = document.createElement("footer");
    footer.classList.add("footer");
    const footerContainer = document.createElement("div");
    footerContainer.classList.add("fc");
    footer.appendChild(footerContainer);
    const fSocial = document.createElement("section");
    fSocial.classList.add("fSoc");
    const lsf = document.createElement("ul");
    lsf.classList.add("list-social-footer");
    fSocial.appendChild(lsf);
    let str = "";
    footSocial.forEach((e) => {
      str += `
                <li class = "list-item-footer">
                    <a href = "${e.link}" class="link-soc-foot" target="_blank">
                        ${e.svg}
                    </a>
                </li>
            `;
    });
    lsf.innerHTML = str;
    footerContainer.appendChild(fSocial);
    const fInfo = document.createElement("section");
    fInfo.classList.add("fInfo");
    let tempStr = "";
    footInfo.forEach((e) => {
      tempStr += `
            <div class="info">
                <h4 class="title-info">${e.title}</h4>
            
            <ul class="list-information">
            `;
      e.routs.forEach((e) => {
        tempStr += `
                <li class = "info-elements">
                    <a href="${e.link}" class ="info-links" target="_blank">
                        ${e.name}
                    </a>
                </li>
                `;
      });
      tempStr += `
            </ul>
            </div>
            `;
      fInfo.innerHTML = tempStr;
      const subscribe = document.createElement("div");
      subscribe.classList.add("news");
      subscribe.innerHTML = `
            <h4 class="title-news">NEWSLETTER</h4>
            <p class="ts">Subscribe to our newsletter to stay tuned to the latest news.</p>
            <form name="" method="post" action="/subscribe" class="form" data-action="subscribe">
                <div class ="sub-container">
                    <div class="inp">
                        <input type="email" id="email" name="email" required="required" class="c-input-text" placeholder="Email">
                    </div>
                    <div class="b">
                    <button class="c-button" type="submit">
                        Subscribe
                    </button>
                </div>
            </form>
            `;
      fInfo.appendChild(subscribe);
    });
    footerContainer.appendChild(fInfo);
    bodyElement.appendChild(footer);
  },
};
void (() => {
  console.log("App started!");
  app.init();
})();
