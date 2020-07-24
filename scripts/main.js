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
    user_link = document.querySelectorAll('.users a');
    close_btn = document.querySelector('.close-btn');
    nav_btn = document.querySelector('.btn-container');
    user_profile = document.querySelectorAll('.user-profile');

    /**Selectors to be manipulated on the dom */
    popUpDetails = document.querySelector('.user-details');
    card = document.querySelector('.user-profile');

    run() {
        /**Listening for Events Here */
        this.close_btn.addEventListener('click', this.closeDetails);
        this.nav_btn.addEventListener('click', this.showMobileNav);
        
        Array.from(this.user_link).forEach((link) => {
            // console.log(link);
            link.addEventListener('click', this.showDetails);
        });

        
    }

    /**Other Methods needed to be called in the Run method */

    closeDetails = (e) => {
        // console.log('working');
        this.popUpDetails.classList.add('hide');
        this.popUpDetails.classList.remove('show');
    }

    
    showDetails = (e) => {
        e.preventDefault();
        console.log('touching links');
        // const arr = ['a', 'j'];

        // console.log(Object.prototype.toString.call(arr));
        let type = '[object HTMLAnchorElement]';
        
        console.log(e.target.parentElement);

        // console.log(Object.prototype.toString.call(e.target.parentElement));

        let userLinks = Array.from(this.user_link);
        let userProfiles = Array.from(this.user_profile);
        const len =  Array.from(this.user_link).length;
        
        for(let loop = 0; loop < len; loop++){
            if('[object HTMLAnchorElement]' == Object.prototype.toString.call(e.target.parentElement)){
                // console.log(true);
                this.popUpDetails.classList.remove('hide');
                this.popUpDetails.classList.add('show');
            }
        }
    }
    
    showMobileNav = (e) => {
        console.log('touching nav button');
    }

}

let listApp = new UserList();
listApp.run();

const url = "https://swapi.dev/api/people/";

    fetch("https://swapi.dev/api/people/")
    .then(res => res.json())
    .then(data => data)
    .catch(console.error);

async function getUser(url){
    let result;
    try{
        result = await fetch(url)
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    return data.results;
                    // data.results.forEach(element => {
                    //    return element;
                    // });
                });
                console.log(result);
    }catch(e){
        throw e;
    }
    return result;
}

console.log(getUser(url));

