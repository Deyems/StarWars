class User{
    constructor(user){
        this.user = user;
    }
    get userDetails(){
        //Destructure your Object
        const {name,height, birth_year,skin_color} = this.user;
        return {name, height,birth_year,skin_color};
    }
}

class StarWarriors extends User{
    constructor(user){
        super(user);
    }

    /**Selectors to Cause changes */
    user_links = null;
    close_btns = null;

    nav_btn = document.querySelector('.btn-container');
    user_profile = document.querySelectorAll('.user-profile');
    
    /**Selectors to be manipulated on the dom */
    popUpDetails = document.querySelector('.user-details');
    userElem = document.querySelector('.users');
    mobile_nav = document.querySelector('.nav_menu_mobile');

    // <figure>
        // {/* <a href="">
    //         <figcaption>Name Folio</figcaption>
    //     </a>
    // </figure> */}

    run() {
        /**Listening for Events Here */
        const url = "https://swapi.dev/api/people/";
        window.addEventListener("DOMContentloaded",this.getUser(url));
        
        this.nav_btn.addEventListener('click', this.showMobileNav);
    }

    /**Other Methods needed to be called in the Run method */

    closeDetails = (e) => {
        e.target.parentElement.parentElement.classList.add('hide');
        e.target.parentElement.parentElement.classList.remove('show');
    }

    showDetails = (e) => {
        e.preventDefault();
        let type = '[object HTMLAnchorElement]';
        const len =  Array.from(this.user_links).length;
        
        for(let loop = 0; loop < len; loop++){
            if(type == Object.prototype.toString.call(e.target.parentElement)){
                e.target.parentElement.parentElement.parentElement.children[1].classList.remove('hide');
                e.target.parentElement.parentElement.parentElement.children[1].classList.add('show');
            }
        }
    }

    createDOMElem = (elem,attributes) => {
        let dom = document.createElement(elem);
        if(attributes == undefined) return dom;
        if(attributes.length == 0) return dom;
        attributes.forEach(attribute => {
            dom.setAttribute(attribute.name, attribute.value);
        });
        return dom;
    }
    
    showMobileNav = (e) => {
        this.mobile_nav.classList.toggle('slideDown');
        Array.from(this.mobile_nav.children).forEach(elem => {
            elem.classList.toggle('slideToo');
        });
    }

    async getUser(url){
        let results;
        try{
            results = await fetch(url)
                .then(res => res.json())
                .then(data => {
                    return data.results;
                });
                // console.log(results);

                for(let i = 0; i < results.length; i++){
                    const needed = new StarWarriors(results[i]).userDetails;
                    let divFirst = this.createDOMElem("div");
                    let figure = this.createDOMElem("figure");
                    let a = this.createDOMElem("a", [{
                        name: "href", value: "#"}
                        ]);
                    let figcaption = this.createDOMElem("figcaption");
                    figcaption.innerText = needed.name;
                    a.appendChild(figcaption);
                    figure.appendChild(a);

                    let childToAppend = this.createDOMElem("section",[{name: "class", value: "user-details"}]);
                    
                    childToAppend.innerHTML = `
                        <div><button class="close-btn">x</button></div>
                        <div class="user-profile">
                            <figure>
                                <img src="assets/images/image${i+1}.jpg" alt="business-woman${i+1}">
                            </figure>
                            <div class="details-container">
                                <div class="title-details">
                                    <h2>More About Name</h2>
                                </div>
                                <div class="details name">
                                    <p>Name: </p>
                                    <p>${needed.name}</p>
                                </div>
                                <div class="details age">
                                    <p>Age: </p>
                                    <p>${needed.birth_year}</p>
                                </div>
                                <div class="details height">
                                    <p>Height: </p>
                                    <p>${needed.height}</p>
                                </div>
                                <div class="details skin-color">
                                    <p>Skin Color </p>
                                    <p>${needed.skin_color}</p>
                                </div>
                            </div>
                        </div>
                    `
                    divFirst.appendChild(figure);
                    divFirst.appendChild(childToAppend);
                    this.userElem.appendChild(divFirst);
                }
                //eND OF for loop to append child

                this.user_links = document.querySelectorAll('.users a');
                
                //add eventlistener to links created
                Array.from(this.user_links).forEach((link) => {
                    link.addEventListener('click', this.showDetails);
                });
                this.close_btns = document.querySelectorAll('.close-btn');
                //add Event Listener for buttons to close the divs
                Array.from(this.close_btns).forEach((clx) => {
                    clx.addEventListener('click', this.closeDetails);
                });
        }catch(e){
            throw e;
        }
        return results;
    }

}

let listApp = new StarWarriors();
listApp.run();
