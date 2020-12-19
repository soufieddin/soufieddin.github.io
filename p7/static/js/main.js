const shopItems = [
    {
        name: "Boeket small",
        price:"€ 30/boeket",
        pic: "s.png",
        href:"product.html",
        type:"small"
    },
    {
        name: "Boeket medium",
        price:"€ 40/boeket",
        pic: "m.png",
        href:"product.html",
        type:"medium"
    },
    {
        name: "Boeket large",
        price:"€ 50/boeket",
        pic: "l.png",
        href:"product.html",
        type:"large"
    }
];
const app = {
    init: function () {
        
        this.creatShop();
        this.creatCartModal();
        this.body = document.querySelector('body');
        this.head = document.querySelector('header');
        this.hamburger = document.querySelector(".burger");
        const mod = document.querySelector('.modal');
        this.hamburger.addEventListener('click',(()=>{
            if(mod.classList.contains('hide')){
                mod.classList.remove('hide');
                mod.classList.add('show');
            }
            else{
                mod.classList.remove('show');
                mod.classList.add('hide');
            }
        }));
        mod.addEventListener('click',(()=>{
            console.log('pressed');
            if(mod.classList.contains('show')){
                mod.classList.remove('show');
                mod.classList.add('hide');
            }
        }));
        this.toTop();
        this.hideInvoiceAddress();
        this.changeParam();
        this.changeProductContent();
    },
    creatShop: function(){
        const shopSection = document.querySelector('.shop');
        if (shopSection){
            let str = '';
            shopItems.forEach((e)=>{
                str+= `
                <div class = "shopItem">
                    <div class = "picBack">
                        <img class="itemPic" src="static/media/${e.pic}"/>
                    </div>
                    <div class="itemTex">
                        <a id="${e.type}" class="itemTitle" href = "${e.href}">${e.name}</a>
                        <span class="itemPrice">${e.price}</span>
                    </div>
                </div>
                `;
            });
            shopSection.innerHTML = str;
        }
    },
    toTop: function(){
        function detect(){
            const h = window.pageYOffset;
            const c = document.documentElement;
            const topBtn = document.querySelector('.toTop'); 
            if (h > 30) {
                topBtn.style.display = 'block';
                topBtn.addEventListener('click',(()=>{
                    c.scrollTo({
                        top:0,
                        behavior:"smooth"
                    });
                }));
            }
            if (h < 30) {
                topBtn.style.display = 'none';
            }
        }
        window.addEventListener('scroll', detect);
    },
    changeParam: function(){        
        const links = document.querySelectorAll('.itemTitle');
        console.log(links);
        const p = new URLSearchParams();
        links.forEach((e)=>{
            e.addEventListener('click',((e)=>{
                e.preventDefault();
                p.append('type',e.target.id);
                const qr = p.toString();
                window.location.href = e.target.href + `?${qr}`;
            }));
        });
    },
    changeProductContent: function(){
        const urls = new URLSearchParams(window.location.search);
        const myUrl = urls.get('type');
        if(myUrl) {
            const title = document.querySelector('.title-js');
            const pict = document.querySelector('.pic-js');
            const price = document.querySelector('.price-js');
            const picSRC = shopItems.find((p)=>p.type === myUrl).pic;
            pict.src = "static/media/"+picSRC;
            const pTitle = shopItems.find(p=>p.type === myUrl).name;
            title.innerHTML = pTitle;
            const pPrice = shopItems.find(p=>p.type === myUrl).price;
            price.innerHTML = pPrice;
        }        
    },
    creatCartModal: function(){
        const cart = document.querySelector('.cart-modal');
        const cartBtn = document.querySelector('.js-click');
        const addToCartBtn = document.querySelector('.product-btn');
        const closeModal = document.querySelector('.close-modal');
        console.log(cartBtn);
        cartBtn.addEventListener('click',(()=>{  
            console.log('hi');       
            cart.style.transform = "translateX(0%)";
        }));
        closeModal.addEventListener('click',(()=>{
            cart.style.transform = "translateX(200%)";
        }));
        cart.addEventListener('click',(()=>{
            cart.style.transform = "translateX(200%)";
        }));
        const pushToCart = document.querySelector('.js-push-to-cart');
        if (pushToCart){
            pushToCart.addEventListener('click',(()=>{  
                console.log('hi');       
                cart.style.transform = "translateX(0%)";
            }));
            closeModal.addEventListener('click',(()=>{
                cart.style.transform = "translateX(200%)";
            }));
        }
    },
    hideInvoiceAddress: function(){
        const address = document.querySelector('.js-invoice-ad');
        const checkBtn = document.querySelector("input[name=facAd]");
        if (address && checkBtn){
            checkBtn.addEventListener('change',((event)=>{
                if (checkBtn.checked){
                    address.style.display = "none";
                } else{
                    address.style.display = "block";
                }
            }));
        }  
    },
};
void (() => {
    console.log("App started!");
    app.init();
})();
