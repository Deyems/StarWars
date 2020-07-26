// class User{
//     constructor(){

//     }
//     user(singleUser){

//     }
//     getResults(){

//     }
// }

class UserList{
    constructor(){

    }

    /**Selectors to Cause changes */
    user_links = null;
    // user_link = document.querySelectorAll('.users a');
    // close_btns = document.querySelectorAll('.close-btn');
    close_btns = null;

    nav_btn = document.querySelector('.btn-container');
    user_profile = document.querySelectorAll('.user-profile');
    
    /**Selectors to be manipulated on the dom */
    popUpDetails = document.querySelector('.user-details');
    userElem = document.querySelector('.users');

    // <figure>
        // {/* <a href="">
    //         <img src="assets/images/male-silhouette1.jpg" alt="business-man1">
    //         <figcaption>Name Folio</figcaption>
    //     </a>
    // </figure> */}

    run() {
        /**Listening for Events Here */
        const url = "https://swapi.dev/api/people/";
        window.addEventListener("DOMContentloaded",this.getUser(url));
        
        // this.close_btn.addEventListener('click', this.closeDetails);
        // console.log(this.close_btn);
        
        this.nav_btn.addEventListener('click', this.showMobileNav);
        // console.log(this.userElem.firstElementChild);
        // console.log(this.user_link);
        // Array.from(this.user_link).forEach((link) => {
        //     link.addEventListener('click', this.showDetails);
        // });

        // console.log(this.getUser(url));
        
    }

    /**Other Methods needed to be called in the Run method */

    closeDetails = (e) => {
        // console.log(e.target.parentElement.parentElement);
        e.target.parentElement.parentElement.classList.add('hide');
        e.target.parentElement.parentElement.classList.remove('show');
    }

    showDetails = (e) => {
        e.preventDefault();
        // console.log('touching links');
        // console.log(Object.prototype.toString.call(arr));
        let type = '[object HTMLAnchorElement]';
        
        console.log(e.target.parentElement.parentElement.parentElement.children[1]);
        // console.log(Object.prototype.toString.call(e.target.parentElement));

        // let userLinks = Array.from(this.user_links);
        // console.log(userLinks);
        // let userProfiles = Array.from(this.user_profile);
        const len =  Array.from(this.user_links).length;
        
        for(let loop = 0; loop < len; loop++){
            if('[object HTMLAnchorElement]' == Object.prototype.toString.call(e.target.parentElement)){
                // console.log(true);
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
        console.log('touching nav button');
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

                // results.forEach(user => {
                //     console.log(user.name);
                // });
                for(let i = 0; i < results.length; i++){
                    let divFirst = this.createDOMElem("div");
                    let figure = this.createDOMElem("figure");
                    let a = this.createDOMElem("a", [{
                        name: "href", value: "#"}
                        ]);
                    // let img = this.createDOMElem("img", [{name: "src", value: `assets/images/image${i+1}.jpg`},{name: "alt", value: `business-man${i+1}`}]);
                    let figcaption = this.createDOMElem("figcaption");
                    figcaption.innerText = results[i].name;
                    // a.appendChild(img);
                    a.appendChild(figcaption);
                    figure.appendChild(a);

                    // divFirst.appendChild(figure);

                    // let section = this.createDOMElem("section",[{class: "user-details"}]);
                    // let div_btn = this.createDOMElem("div");
                    // let closeBtn = this.createDOMElem("button",[{class: "close-btn"}]);
                    // closeBtn.innerText = "x";
                    // div_btn.appendChild(closeBtn);

                    // let divProfile = this.createDOMElem("div", [{class: "user-profile"}]);
                    // let figProfile = this.createDOMElem("figure");
                    // let imgProfile = this.createDOMElem("img",[{src: `assets/images/image${i}.jpg`},{alt: `business-man${i+1}`}]);
                    // figProfile.appendChild(imgProfile);
                    // let divDetailsContainer = this.createDOMElem("div", [{class: "details-container"}]);
                    // let divDetailstitle = this.createDOMElem("div", [{class: "title-details"}]);
                    // let detailsTitle = this.createDOMElem("h2");
                    // detailsTitle.innerText = `More About Name`;
                    // divDetailstitle.appendChild(detailsTitle);
                    
                    let childToAppend = this.createDOMElem("section",[{name: "class", value: "user-details"}]);
                    // console.log(childToAppend);

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
                                    <p>${results[i].name}</p>
                                </div>
                                <div class="details age">
                                    <p>Age: </p>
                                    <p>${results[i].birth_year}</p>
                                </div>
                                <div class="details height">
                                    <p>Height: </p>
                                    <p>${results[i].height}</p>
                                </div>
                                <div class="details skin-color">
                                    <p>Skin Color </p>
                                    <p>${results[i].skin_color}</p>
                                </div>
                            </div>
                        </div>
                    
                    `
                    divFirst.appendChild(figure);
                    divFirst.appendChild(childToAppend);

                    this.userElem.appendChild(divFirst);

                    // console.log(this.userElem);
                    
                }
                //eND OF for loop to append child

                this.user_links = document.querySelectorAll('.users a');
                console.log(Object.prototype.toString.call(this.user_links));
                //add eventlistener to links created
                Array.from(this.user_links).forEach((link) => {
                    link.addEventListener('click', this.showDetails);
                });
                this.close_btns = document.querySelectorAll('.close-btn');
                //add Event Listener for buttons to close the divs
                Array.from(this.close_btns).forEach((clx) => {
                    // console.log(clx);
                    clx.addEventListener('click', this.closeDetails);
                });
        }catch(e){
            throw e;
        }
        return results;
    }

    

}

let listApp = new UserList();
listApp.run();

    fetch("https://swapi.dev/api/people/")
    .then(res => res.json())
    .then(data => data)
    .catch(console.error);

// console.log(getUser(url));

