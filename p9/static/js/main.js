void(()=>{
    const app = {
        init(){
            this.toTop();
            this.catchElements();
            this.getStudioItems();
            this.getStudioItemsForHome();
            this.getArtItems();
            this.getPressItems();
            this.toggleSubscribe();
            this.check();
        },
        check(){
            const wid = document.documentElement.offsetWidth;
            [].forEach.call(
                document.querySelectorAll('*'),
                function(e){
                    if (e.offsetWidth > wid){
                        console.log(e);
                    }
                }
            );
        },
        toTop(){
            function detect(){
                const h = window.pageYOffset;
                const c = document.documentElement;
                const $toTop = document.querySelector('.to-top');
                if (h > 30) {
                    $toTop.style.display = 'block';
                    $toTop.addEventListener('click',(()=>{
                        c.scrollTo({
                            top:0,
                            behavior:"smooth"
                        });
                    }));
                }
                if (h < 30) {
                    $toTop.style.display = 'none';
                }
            }
            window.addEventListener('scroll', detect);
        },
        toggleSubscribe(){
            const emailInput = document.getElementById("email");
            const submitBtn = document.getElementById("submitBtn");
            if(emailInput && submitBtn){
                emailInput.addEventListener("focus", () => {
                    submitBtn.style.display = "block";
                });
                emailInput.addEventListener("blur", () => {
                    submitBtn.style.display = "none";
                });
            }
        },
        catchElements(){
            this.$studioList = document.querySelector('.js-studio');
            this.$artList = document.querySelector('.js-art');
            this.$atelierList = document.querySelector('.js-atelier');
            this.$archive = document.querySelector('.js-press-archive');
            this.$press = document.querySelector('.js-press');
            this.$categories = document.querySelector('.js-categories');
            this.$years = document.querySelector('.js-years');
            this.$content = document.querySelector('.js-content');
        },
        async getStudioItems(){
            if(!this.$studioList && !this.$atelierList){
                return;
            }
            try{
                const response = await fetch("../data/atelier.json");
                const data = await response.json();
                
                this.updateStudio(data);
            }catch(error){
                console.error(error);
            }
        },
        async getStudioItemsForHome(){
            if(!this.$studioList && !this.$atelierList){
                return;
            }
            try{
                const response = await fetch("./data/atelier.json");
                const data = await response.json();
                this.updateStudioSectionHome(data);
                
            }catch(error){
                console.error(error);
            }
        },
        updateStudioSectionHome(data){
            const elements = data.items;
            const threeItems = [];
            elements.forEach((e)=>{
                if(!threeItems.includes(e) && threeItems.length < 3){
                    threeItems.push(e);
                }
            });
            let str = '';
            threeItems.forEach((e)=>{
                str += `
            <li>
                <a href="atelier-studio/visiting-mons-again/index.html">
                    <img src="static/img/${e.img}" alt="" loading='lazy'>
                </a>
                <div class="item-description">
                    <h3>${e.subtitle}</h3>
                    <h2>${e.title}</h2>
                    <p class="descr">${e.description}</p>
                    <p><a href="atelier-studio/visiting-mons-again/index.html" class = "is-link">Learn more</a></p>
                </div>
            </li>`;
                
            });
            if(!this.$studioList){
                return;
            }
            this.$studioList.innerHTML = str;
        },
        updateStudio(data){
            const items = data.items;
            let str = "";
            items.forEach((e)=>{
                str +=`
                <li class = "atelier-item">
                    <a href="visiting-mons-again/index.html">
                        <img src="../static/img/${e.img}" alt="" loading='lazy'>
                    </a>
                    <div class="item-description">
                        <h3>${e.subtitle}</h3>
                        <h2>${e.title}</h2>
                        <p class="descr">${e.description}</p>
                        <p><a href="visiting-mons-again/index.html" class = "is-link">Learn more</a></p>
                    </div>
                </li>
                `;
            });
            if(this.$atelierList){
                this.$atelierList.innerHTML = str;
            }
        },
        async getArtItems(){
            if(!this.$artList && !this.$categories && !this.$years && !this.$content){
                return;
            }
            try{
                const response = await fetch("https://www.pgm.gent/data/arnequinze/art.json");
                const data = await response.json();
                this.updateArtSectionHome(data);
                this.buildCategoriesFilters(data);
                let years = [];
                let uniqueYears = [];
                if(this.$years || this.$content){
                    data.forEach((e)=>{
                        years.push(e.year);
                    });
                    years.forEach((e)=>{
                        if(!uniqueYears.includes(e)){
                            uniqueYears.push(e);
                        }
                    });
                }
                this.buildYearsFilters(uniqueYears);
                this.updateArt(data, uniqueYears);
            }catch(error){
                console.error(error);
            }
        },
        updateArtSectionHome(data){

            const threeItems = [];
            data.forEach((e)=>{
                if(!threeItems.includes(e) && threeItems.length < 3 && e.highlight == true){
                    threeItems.push(e);
                }
            });
            let str = '';
            threeItems.forEach((e)=>{
                str += `
            <li>
                <a href="art-and-exhibitions/in-dialogue-with-calatrava/index.html">
                    <img src="static/img/pics/${e.cover}" loading='lazy' alt="">
                </a>
                <div class="item-description">
                    <h3>${e.tags} — ${e.location}</h3>
                    <h2>${e.title}</h2>
                    <p class = "descr">${e.description}</p>
                    <p><a href="art-and-exhibitions/in-dialogue-with-calatrava/index.html" class = "is-link">Learn more</a></p>
                </div>
            </li>`;
                
            });
            if(this.$artList){
                this.$artList.innerHTML = str;
            }
            
        },
        buildCategoriesFilters(data){
            const urls = new URLSearchParams(window.location.search);
            const myUrl = urls.get('category');
            const myYear =urls.get('year');
            if(this.$categories){
                let tags = [];
                let catgs = [];
                data.forEach((e)=>{
                    tags.push(e.tags);
                });
                tags = tags.flat();
                tags.forEach((e)=>{
                    if(!catgs.includes(e) && e !== "" && e !== "Atelier, Sint-Martens-Latem, Belgium" && e !== "Kunsthal Rotterdam, the Netherlands" ){
                        catgs.push(e);
                    }
                    
                });
                catgs = catgs.sort();
                let str = `<li><a class = "showAllCats" href = "index.html${myYear ? `?year=${myYear}` : ""}">Show all</a></li>`;
                catgs.forEach((e)=>{
                    str+=`<li><a class ="cat" href = "index.html${ myYear? `?category=${e}&year=${myYear}` : `?category=${e}`}">${e}</a></li>`;
                });
                this.$categories.innerHTML = str;
                const cats = document.querySelectorAll('.cat');
                const all = document.querySelector('.showAllCats');
                if(myUrl){
                    cats.forEach((e)=>{
                        if(e.innerHTML === myUrl){
                            e.classList.add('is-active');
                        }
                        else if (e.innerHTML !== myUrl){
                            e.classList.remove('is-active');
                        }
                    });
                }
                else if (!myUrl){
                    all.classList.add('is-active');
                }
            }
        },
        buildYearsFilters(uniqueYears){
            const urls = new URLSearchParams(window.location.search);
            const myUrl = urls.get('category');
            const myYear =urls.get('year');
            if(this.$years){                
                let tempStr = `<li><a class = "showAllYrs" href = "index.html${myUrl? `?category=${myUrl}`  : ""}">Show all</a></li>`;
                uniqueYears.forEach((e)=>{
                    tempStr+=`<li><a class = "yr" href = "index.html${myUrl? `?category=${myUrl}&year=${e}` : `?year=${e}`}">${e}</a></li>`;
                });
                this.$years.innerHTML = tempStr;
                const yrs = document.querySelectorAll('.yr');
                const allYrs = document.querySelector('.showAllYrs');
                if(myYear){
                    allYrs.classList.remove('is-active');
                    yrs.forEach((e)=>{
                        if(e.innerHTML === myYear){
                            e.classList.add('is-active');
                        }
                        else if (e.innerHTML !== myYear){
                            e.classList.remove('is-active');
                        }
                    });
                }
                else if (!myYear){
                    allYrs.classList.add('is-active');
                }
            }
        },
        updateArt(data, uniqueYears){
            const urls = new URLSearchParams(window.location.search);
            const myUrl = urls.get('category');
            const myYear =urls.get('year');
            if(this.$content){                
                const y = uniqueYears.filter(year => {
                    return myYear ? year === myYear : year;
                }).map(year => {
                    const listFilters = data
                    .filter((i)=>{
                        return i && i.year && i.tags && i.year === year && (!myUrl || i.tags.includes(myUrl));
                    })
                    .sort(function (a, b) {
                        return b.year.localeCompare(a.year);
                    })
                    .map((v)=>{
                        const pics = v.images;
                        const res = pics.map((e)=>{
                            return `<li><a href = "in-dialogue-with-calatrava/index.html"><img loading = "lazy" src = "../static/img/pics/${e}"></a></li>`;
                        }).join("");
                        return  `
                        <li class = "art-item">
                            <div class = "item-info-wrapper">
                                <h2><a href = "in-dialogue-with-calatrava/index.html">${v.title}</a></h2>
                                <h4>${v.subtitle}</h4>
                                <h3><span class = "t">${v.tags}</span><span class = "l"> — ${v.location}</span></h3>
                            </div>
                            <div class = "art-item-pics">
                                <ul class = "list-pics-art">${res}</ul>
                            </div>
                        </li>
                        `;
                    })
                    .join("");
                    return listFilters && `
                        <div>
                            <h2 class = "itemTitle list-year" id="${year}">${year}</h2>
                            <ul>
                                ${listFilters} 
                            </ul>
                        </div>`;
                })
                .filter(r => !!r)
                .join("");
                this.$content.innerHTML = y;
            } 
            const $t = document.querySelectorAll('.t');
            $t.forEach((e)=>{
                e.innerText = e.innerText.replace(","," / ");
            });
            const $l = document.querySelectorAll('.l');
            $l.forEach((e)=>{
                e.innerText = e.innerText.replace(" — null","");

            });
        },
        async getPressItems(){
            if(!this.$archive && !this.$press){
                return;
            }
            try{
                const response = await fetch("../data/press.json");
                const data = await response.json();
                this.updatePress(data);
            }catch(error){
                console.error(error);
            }
        },
        updatePress(data){
            const dataArchive = data.archive;
            const dataPress = data.press;
            let str = '';
            dataArchive.forEach((e)=>{
                str +=`
                <li class = "atelier-item">
                    <a href="my-secret-garden-valencia/index.html">
                        <img src="../static/img/${e.img}" alt="" loading='lazy'>
                    </a>
                    <div class="item-description">
                        <h3>${e.subtitle}</h3>
                        <h2>${e.title}</h2>
                        <p class="descr">${e.description}</p>
                        <p><a href="my-secret-garden-valencia/index.html" class = "is-link">Open press releas</a></p>
                    </div>
                </li>
                `;
            });
            if(this.$archive){
                this.$archive.innerHTML = str;
            }
            let temp = '';
            dataPress.forEach((e)=>{
                temp +=`
                <li class = "atelier-item">
                    <a href="${e.link}"${e.attribute} class = "is-link">
                        <img src="../static/img/${e.img}" alt="" loading='lazy'>
                    </a>
                    <div class="item-description">
                        <h3>${e.subtitle}</h3>
                        <h2>${e.title}</h2>
                        <p class="descr">${e.description}</p>
                        <p><a href="${e.link}"${e.attribute} class = "is-link">${e.next}</a></p>
                    </div>
                </li>
                `;
            });
            if(this.$press){
                this.$press.innerHTML = temp;
            }
            
        },
    };
    app.init();
})();