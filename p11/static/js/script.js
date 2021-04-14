const news = [
    {
        bg:"https://www.dansendeberen.be/wp-content/uploads/rsz_social-gf19.jpg",
        title:"Drie eeuwen grafische industrie",
        date:"23/07",
        description:"De tentoonstelling “drie eeuwen grafische industrie” in het Industriemuseum dompelt je onder in de drukkerijen van weleer, van 1750 tot nu. Je krijgt er fascinerende foto’s, imposante drukpersen en knap drukwerk te zien."
    },
    {
        bg:"https://www.dansendeberen.be/wp-content/uploads/rsz_social-gf19.jpg",
        title:"Dit jaar heel wat jarigen op de Gentse Feesten",
        date:"25/07",
        description:"Trefpunt zit aan 50 edities, Ons Luisterplein mag 10 kaarsjes uitblazen en blueslegende Roland, die 75 jaar wordt, heeft nog op de allereerste editie van de Gentse Feesten aan Trefpunt gespeeld. Reden genoeg om ze even in de bloemetjes te zetten."
    },
    {
        bg:"https://www.dansendeberen.be/wp-content/uploads/rsz_social-gf19.jpg",
        title:"Gratis muziek op woensdag",
        date:"24/07",
        description:"Heel wat keuzestress want het belooft een topavond te worden.Blankenberge Blankenberge, wonderschone stad, maar toch moet je vanavond op de Kouter zijn want Clement Peerens Explosition speelt gegarandeerd Boomtown plat (22.30 uur)."
    }
];

const getDataEvents = 'https://www.pgm.gent/data/gentsefeesten/events.json';
const getDataCategories = 'https://www.pgm.gent/data/gentsefeesten/categories.json';
const bg = [
    'head1','head2','head3','head4','head5','head6','head7','head8','head9'
];
const app = {
    init: function(){
        this.generateRandomBackground();
        this.mobileMenu();
        this.hideSubMenu();
        this.getDataAPICategories();
        const newsCard = document.querySelector('.news-cards');
        if (newsCard){
            this.generateNews();
        }                
    },
    getDataAPICategories() {
        fetch(getDataCategories)
            .then((response)=>response.json())
            .then((json)=>{
                this.categories = json;
                this.generateFilters(this.categories);
                this.getDataAPIEvents();  
            })
            .catch((e)=>console.log(e));
    },
    getDataAPIEvents() {
        fetch(getDataEvents)
            .then((response)=>response.json())
            .then((json)=>{
                this.events = json ;
                this.updateEventsHome(this.events);
                this.getUniqueDays(this.events);
                this.changeProductContent(this.events,this.categories);
                this.changeDetailContent(this.events);
                this.extraDetails(this.events); 
            })
            .catch((e)=>console.log(e));
    },

    generateFilters(categories){
        const listFilters = document.querySelector('.filters-items');
        let str = '';
        if(listFilters){
            categories.forEach((e)=>{
                str+=`
                <li><a href = "#${e}">${e}</a></li>
                `;
            });
            listFilters.innerHTML = str;
        }
    },
    getUniqueDays(events){
        days = events.map(d => d.day).filter((val, index, self) => { return self.indexOf(val) === index && +val >= 19 && +val <= 28; }).sort().reverse();
        shortDates = days.map(d => { return {
                "weekDay": new Date(`2019-07-${d}`).toLocaleString('nl-NL', {weekday:'short'}),
                "day": d
            };
        });
        longDates = days.map(d => { return {
                "weekDay": new Date(`2019-07-${d}`).toLocaleString('nl-NL', {weekday:'long'}),
                "day": d
            };
        });
        const longDatesList = document.querySelector(".program-menu");
        longDates.forEach(ld => {
            const liRaw = `<a class = "js-list-day" data-day="${ld.day}" href = "dag.html?day=${ld.day}">${ld.weekDay} ${ld.day} juli</a>`;
            const li = document.createElement("li");
            li.innerHTML = liRaw;
            longDatesList.prepend(li);
        });
        const daysLinksBig = document.querySelector('.days-links-big');
        if (daysLinksBig){
            shortDates.forEach((e)=>{
                const liRaw = ` 
                <a class = "js-list-day" data-day="${e.day}" href="dag.html?day=${e.day}">
                    <span class = "day-big">${e.weekDay}</span><br>
                    <span class = "nr-big">${e.day} jul</span>
                </a>`;
                const li = document.createElement("li");
                li.innerHTML = liRaw;
                daysLinksBig.prepend(li);
            });
        }
        const daysLinks = document.querySelector('.days-links');
        if (daysLinks){
            shortDates.forEach((e)=>{
                const liRaw = `
                <a class = "js-list-day d-wrapper" data-day="${e.day}" href = "dag.html?day=${e.day}">
                    <span class = "day">${e.weekDay}</span><br>
                    <span class = "nr">${e.day} jul</span>
                </a> 
                    `;
                const li = document.createElement("li");
                li.innerHTML = liRaw;
                daysLinks.prepend(li);
            });
        }
        const daysLinksNorm = document.querySelector('.days-links-norm');
        if (daysLinksNorm){
            shortDates.forEach((e)=>{
                const liRaw = `
                <a class = "js-list-day d-wrapper-norm" data-day="${e.day}" href = "dag.html?day=${e.day}">
                    <span class = "day-norm">${e.weekDay}</span><br>
                    <span class = "nr-norm">${e.day} jul</span>
                </a> 
                    `;
                const li = document.createElement("li");
                li.innerHTML = liRaw;
                daysLinksNorm.prepend(li);
            });
        }
    },
    updateEventsHome: function(events){
        const homeEvents = document.querySelector('.home-events');
        const evArr = [];
        while(evArr.length<3){
            random = Math.floor(Math.random()*events.length);
            const item = events[random];
            if(item && item.image && item.image.thumb && item.url){
                if(evArr.indexOf(item)==-1){
                     evArr.push(item);
                }
            }
            if (evArr.length === 3) {
                break;
              } 
        }
        console.log(evArr);
        let str = "";
        if (homeEvents){
            for(let e = 0;e < evArr.length;e++) {
                const currentItem = evArr[e];                
                if(currentItem && currentItem.image && currentItem.image.thumb && currentItem.url) {
                    const d = new Date(`2019-07-${currentItem.day}`).toLocaleString('nl-NL', {weekday:'short'});
                    str += `
                    <a class="events__link js-detail " date-type=${currentItem.id} data-day="${currentItem.day}" data-slug="${currentItem.slug}" href="detail.html?day=${currentItem.day}&slug=${currentItem.slug}">
                        <div class="evPic" style="background-image: url(${currentItem.image.thumb})">
                            <div class = "evDate">
                                <span class="evDay">${d} ${currentItem.day} Jul </span>
                                <span  class="evStart">${currentItem.start} u.</span> 
                            </div>
                        </div>    
                        <div class="events__content">
                            <h2>${currentItem.title}</h2>
                            <div class="place">${currentItem.location}</div>
                        </div>
                    </a>`;
                }
            }
            homeEvents.innerHTML = str;
        }
    },
    generateRandomBackground: function(){
        const headerBackground = document.querySelector('.header-back');
        selectBG = bg[Math.floor(Math.random() * bg.length)];
        headerBackground.style.background = `url('static/media/${selectBG}.jpg')center center / cover no-repeat rgb(0, 0, 0)`;
    },
    mobileMenu: function(){
        const modal = document.querySelector('.modal');
        const openModalBTN = document.querySelector('.toggle-btn');
        const closeModalBTN = document.querySelector('.close');
        const closeIcon = document.querySelector('.close-icon');
        openModalBTN.addEventListener('click',(()=>{
            modal.classList.toggle('show');
        }));
        closeModalBTN.addEventListener('click',(()=>{
            modal.classList.toggle('show');
        }));
    },
    hideSubMenu: function(){
        const expendMoreBtn = document.querySelector('.expend-more');
        const expendLessBtn = document.querySelector('.expend-less');
        const moreLessBtn = document.querySelector('.li-wrapper');
        const subMenu = document.querySelector('.program-menu');
        moreLessBtn.addEventListener('click',(()=>{
            if(subMenu.style.display === 'none'){
                subMenu.style.display = 'block';
                expendMoreBtn.style.display = 'none';
                expendLessBtn.style.display = 'block';
            }else{
                subMenu.style.display = 'none';
                expendLessBtn.style.display = 'none';
                expendMoreBtn.style.display = 'block';
            }
        }));
    },
    generateNews(){
        let str = '';
        const newsCard = document.querySelector('.news-cards');
            news.forEach((card)=>{
                str += `
                <a class="news__link hover-link" href="#">
                    <div class = "news-wrapper">
                        <div class="newsPic" style="background-image: url(${card.bg});">
                            <div class = "newsDate">
                                <span>${card.date}</span>
                            </div>
                        </div>    
                        <div class="news__content">
                            <h2 class = "newsTitle">${card.title}</h2>
                            <p class="newsDesc">${card.description}</p>
                            <span class = "symbol"><img src = "static/media/know-more.svg"></span>
                        </div>
                    </div>
                </a>`;
            });
        newsCard.innerHTML = str;
    },
    changeProductContent(events, categories){
        const urls = new URLSearchParams(window.location.search);
        const myUrl = urls.get('day');
        let rawArr = [];
        if(myUrl) {
            rawArr = events.filter(e => e.day === myUrl);
            const dayEvents = document.querySelector('.events-day');
            const evArrDay = [];
            while(evArrDay.length<3){
                const random = Math.floor(Math.random()*rawArr.length);
                const item = rawArr[random];
                if(item.image && item.image.thumb && item.url && !evArrDay.includes(item.id)){
                    if(evArrDay.indexOf(item)==-1){
                         evArrDay.push(item);
                    }
                }
            }
            evArrDay.sort(function (a, b) {
                return a.start.localeCompare(b.start);
              });
            let str = "";
            if (dayEvents){
                for(let e = 0;e < evArrDay.length;e++) {
                    const currentItem = evArrDay[e];                
                    if(currentItem && currentItem.image && currentItem.image.thumb && currentItem.url) {
                        const d = new Date(`2019-07-${currentItem.day}`).toLocaleString('nl-NL', {weekday:'short'});
                        str += `
                        <a class="events__link js-detail" date-type=${currentItem.id} data-day="${currentItem.day}" data-slug="${currentItem.slug}" href="detail.html?day=${currentItem.day}&slug=${currentItem.slug}">
                            <div class="evPic" style="background-image: url(${currentItem.image.thumb})">
                                <div class = "evDate">
                                    <span  class="evStart">${currentItem.start} u.</span> 
                                </div>
                            </div>    
                            <div class="events__content">
                                <h2>${currentItem.title}</h2>
                                <div class="place">${currentItem.location}</div>
                            </div>
                        </a>`;
                    }
                }
                dayEvents.innerHTML = str;
            }
            const catgs = document.querySelector('.filter-categories');
            if (catgs){
                const c = categories.map((category)=>{
                    const ev = events.filter((event)=>{
                        if(event && event.image && event.image.thumb && event.url && event.day === myUrl && event.category.indexOf(category) > -1 ){
                            return event;
                        }
                    });
                    const sortedEv = ev.sort(function (a, b) {
                        return a.start.localeCompare(b.start);
                    });
                    const unique = sortedEv.filter((item, pos, self) => self.findIndex(x => x.id === item.id) === pos);
                    const listFilters = unique.map((v)=>{
                        return  `
                        <a class="events__link js-detail js-invalid" date-type="${v.id}" data-day="${v.day}" data-slug="${v.slug}" data-invalid="${v.wheelchair_accessible}" href="detail.html?day=${v.day}&slug=${v.slug}">
                            <div class="evPic detail-pic" style="background-image: url(${v.image.thumb})">
                                <div class = "evDate detail-date">
                                    <span  class="evStart">${v.start} u.</span> 
                                </div>
                            </div>    
                            <div class="events__content detail-content">
                                <div class = "start-wrapper">
                                    <span  class="evStart detail-start">${v.start} u.</span>
                                </div>
                                <div class="title-wrapper">
                                    <h2>${v.title}</h2>
                                </div>
                                <div class="place-wrapper">
                                    <div class="place detail-place">${v.location}</div>
                                </div>
                                
                            </div>
                        </a>`;
                    }).join("");
                    return `
                        <div class = "catgsFilters" id="${category}">
                            <h2 class = "catTitle">${category}<span class = "toTop"><a href ="#evd"><img src="static/media/arrow-up.svg"></a></span></h2>
                            <div class = "full-day js-full ">
                               ${listFilters} 
                            </div>
                        </div>`;
                    }).join("");
                    catgs.innerHTML = c;
            }
        } 
        const buttonList = document.querySelector('.js-list-button');
        const buttonCatg = document.querySelector('.js-pics-button');
        const detailPic = document.querySelectorAll('.detail-pic');
        const detailStart = document.querySelectorAll('.detail-start');
        const detailContent = document.querySelectorAll('.detail-content');
        const detailFull = document.querySelectorAll('.js-full');
        if(buttonList){
            buttonList.addEventListener('click',(()=>{
                buttonCatg.classList.remove('activated');
                buttonList.classList.add('activated');
                detailPic.forEach((p)=>{
                    p.style.display = 'none';
                });
                detailStart.forEach((s)=>{
                    s.style.display = 'block';
                });
                detailContent.forEach((c)=>{
                    c.classList.add('dc');
    
                });
                detailFull.forEach((f)=>{
                    f.classList.remove('full-day');
                    f.classList.add('dayFull');
    
                });
            }));
        }
        if(buttonCatg){
            buttonCatg.addEventListener('click',(()=>{
                buttonCatg.classList.add('activated');
                buttonList.classList.remove('activated');
                detailPic.forEach((p)=>{
                    p.style.display = 'block';
                });
                detailStart.forEach((s)=>{
                    s.style.display = 'none';
                });
                detailContent.forEach((c)=>{
                    c.classList.remove('dc');
                    
                });
                detailFull.forEach((f)=>{
                    f.classList.add('full-day');
                    f.classList.remove('dayFull');
    
                });
            }));
        }
    },
    changeDetailContent(events){
        const urlDetail = new URLSearchParams(window.location.search);
        const myUrlDetailDay = urlDetail.get('day');
        const myUrlDetailSlug = urlDetail.get('slug');
        const infoDetail = document.querySelector('.info-event');
        
        const detArr = [];
        if (myUrlDetailDay && myUrlDetailSlug){
            events.forEach((e)=>{
                if(e.day === myUrlDetailDay && e.slug === myUrlDetailSlug && e.image && e.image.thumb && e.image.full){
                    detArr.push(e);
                }
            });
            let detailArr = [detArr[0]];
            console.log(detailArr);
            const detialResult = detailArr.map((event)=>{
                return `
                <div class = "detail-info-event" style="margin-top:2rem;" data-ev-loc = "${event.location}">
                    <div class = "detail-info-wrapper">
                        <div class = "larg-pic-flex"><img src="${event.image.full}"></div>
                        <div class = "d-wrapper">
                            <div class = "titleDetail">
                                <h2>${event.title}</h2>
                            </div>
                            <div class = "locDetail">
                                <h6>
                                    <img src="static/media/marker.svg" style="margin-right:.5rem;padding-top:.5rem;">
                                        ${event.location}
                                </h6>
                            </div>
                            <div class = "dateDetail">
                                <span class = "info-date">
                                    <span>${event.day_of_week} ${event.day} juli - ${event.start}u. > ${event.end}u.</span>
                                </span>
                            </div>
                            <div class = "picDetail">
                                <img src="${event.image.full}" style="display:block;margin:2rem auto;">
                            </div>
                            <p class = "detail-text">
                                ${event.description}
                            </p>
                            <div class = "contact" style="margin:2rem 0;width:100%;">
                                <div class = "contact-info"style="display:flex;flex-direction: column;">
                                    <div class="site"style="margin-bottom:.5rem;">
                                        <span style="font-family: Raleway Bold;width:100%;padding-right:.75rem;">website:</span>
                                    </div>
                                <div class = "url" >
                                    <a  href = "${event.url}" style="color:black;font-size:.8rem;">
                                        ${event.url}<img src="static/media/external-link.svg" style="margin-left:.2rem;">
                                    </a>
                                </div>
                            </div>
                            <div class = "contact-info"style="display:flex;flex-direction: column;; margin-top:1rem;">
                                <div class="organ"style="margin-bottom:.5rem;">
                                    <span class = "organizer"style="font-family: Raleway Bold;padding-right:.75rem;width:40%;">
                                        organisator:
                                    </span>
                                </div>
                                <div class = "organ-content"style="color:black;font-size:.8rem;display:flex;">
                                    ${event.organizer}
                                </div>
                            </div>
                            <div class = "contact-info"style="display:flex;flex-direction: column;;margin-top:1rem;">
                            <div class="organ"style="margin-bottom:.5rem;">
                                <span class = "organizer"style="font-family: Raleway Bold;width:40%;padding-right:.75rem;">
                                    categories :
                                </span>
                            </div>
                            <div class = "organ-content"style="color:black;font-size:.8rem;display:flex;">
                                ${event.category}
                            </div>
                        </div>
                        <div class = 'invalid' style="margin-top:2rem;"><img src = "static/media/av.svg"></div>
                        <div class = "d-soc">
                            <div class = "tt bcg">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                <title>twitter</title>
                                <path d="M12.973 24c7.17 0 11.093-5.77 11.093-10.773 0-0.164-0.003-0.328-0.013-0.49 0.765-0.54 1.411-1.19 1.93-1.935l0.017-0.025c-0.653 0.288-1.41 0.498-2.202 0.591l-0.038 0.004c0.801-0.468 1.407-1.197 1.706-2.068l0.008-0.027c-0.714 0.419-1.544 0.739-2.427 0.912l-0.050 0.008c-1.473-1.526-3.942-1.603-5.512-0.172-0.755 0.684-1.228 1.668-1.232 2.761v0.001c0 0.29 0.035 0.58 0.103 0.863-3.134-0.153-6.055-1.59-8.036-3.956-1.032 1.73-0.504 3.942 1.208 5.054-0.65-0.019-1.255-0.192-1.787-0.483l0.021 0.010v0.048c0 1.802 1.307 3.355 3.125 3.712-0.308 0.085-0.662 0.133-1.027 0.133-0.259 0-0.513-0.025-0.758-0.071l0.025 0.004c0.512 1.541 1.975 2.598 3.642 2.63-1.321 1.011-2.996 1.62-4.814 1.62-0.009 0-0.018 0-0.027-0h0.001c-0.31 0-0.62-0.017-0.929-0.053 1.69 1.068 3.747 1.702 5.953 1.702 0.007 0 0.014 0 0.022-0h-0.001"></path>
                                </svg>
                            </div>
                            <div class = "fb bcg">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="black">
                                    <title>facebook</title>
                                    <path d="M17.49 25v-8.21h2.95l0.44-3.2h-3.39v-2.043c0-0.927 0.276-1.558 1.697-1.558l1.813-0.001v-2.862c-0.766-0.080-1.655-0.126-2.555-0.126-0.030 0-0.061 0-0.091 0h0.005c-2.614 0-4.403 1.491-4.403 4.23v2.36h-2.956v3.2h2.956v8.21h3.535z"></path>
                                </svg>
                            </div>
                            <div class = "pi bcg">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                    <title>pinterest</title>
                                    <path d="M8.625 13.486c0 1.396 0.614 3.464 2.234 3.911 0.057 0 0.112 0.057 0.224 0.057 0.392 0 0.615-1.006 0.615-1.286 0-0.335-0.895-1.062-0.895-2.402 0-2.906 2.347-4.917 5.42-4.917 2.627 0 4.582 1.397 4.582 3.911 0 1.9-0.838 5.475-3.464 5.475-0.95 0-1.788-0.67-1.788-1.563 0-1.341 1.006-2.682 1.006-4.079 0-0.838-0.503-1.564-1.509-1.564-1.341 0-2.124 1.396-2.124 2.458 0 0.614 0.057 1.285 0.392 1.844-0.559 2.124-1.62 5.308-1.62 7.487 0 0.671 0.111 1.341 0.167 2.012v0.112l0.168-0.056c1.956-2.459 1.844-2.962 2.738-6.203 0.447 0.838 1.676 1.285 2.682 1.285 4.079 0 5.923-3.688 5.923-7.040 0-3.52-3.297-5.867-6.929-5.867-3.911-0.001-7.822 2.458-7.822 6.425z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            }).join('');
            
            infoDetail.innerHTML= detialResult;
            const $invalid = document.querySelector('.invalid');
            detailArr.map((e)=>{
                if(e.wheelchair_accessible === true){
                    $invalid.style.display='block';
                }else{
                    $invalid.style.display='none';
                }
            }); 
        }
    },
    extraDetails(events){
        const extraDetailsEvents = document.querySelector('.extra-details-events');
        const urlDetail = new URLSearchParams(window.location.search);
        const myUrlDetailDay = urlDetail.get('day');
        const myUrlDetailSlug = urlDetail.get('slug');
        const loc = document.querySelector('.locDetail');
        const extraDetailsArr = [];
        if(!extraDetailsEvents){
            return;
        }
        const filteredEvents = events.filter(item => item.image && item.image.thumb && item.day === myUrlDetailDay && item.slug !== myUrlDetailSlug && item.location && item.location.trim().toLowerCase() === loc.innerText.trim().toLowerCase());
        if(extraDetailsEvents && myUrlDetailDay && myUrlDetailSlug){
            while(extraDetailsArr.length < filteredEvents.length){
                random = Math.floor(Math.random()*filteredEvents.length);
                const item = filteredEvents[random];
                if(extraDetailsArr.indexOf(item)==-1){
                    extraDetailsArr.push(item);
                }
                
            }
            const sortedDet = extraDetailsArr.sort(function (a, b) {
                return a.start.localeCompare(b.start);
            });
            const unique = sortedDet.filter((item, pos, self) => self.findIndex(x => x.id === item.id) === pos);
            const links = unique.map(v => `<a class = "js-detail"  href="detail.html?day=${v.day}&slug=${v.slug}"><div class="events__content detail-content x dc">
            <div class = "start-wrapper">
                <span  class="evStart detail-start dst">${v.start} u.</span>
            </div>
            <div class="title-wrapper">
                <h2>${v.title}</h2>
            </div>
            <div class="place-wrapper">
                <div class="place detail-place">${v.location}</div>
            </div>
            
        </div></a>`).join("");
            extraDetailsEvents.innerHTML += links;
        }
       
        const html = document.querySelector('.head-extra');
        const n = document.querySelector('.detail-info-event');
        const $loc = n.getAttribute('data-ev-loc');
        let str = `<h2>Andere evenementen van ${$loc}</h2>`;
        const x = document.querySelector('.x');
        if(x){
            html.innerHTML = str;
        }
        
    },
};
void (() => {
    console.log("App started!");
    app.init();
})();