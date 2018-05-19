// import {createUser, getPageURL} from "./domGenerator";
// import {makeErrorPage} from "./errorGenerator";

import store from "../index";

function getPageURL(name) {
    return 'https://api.github.com/users/' + name;
}

let func = (userLogin)=>{
        fetch(getPageURL(userLogin))
        .then(function (response) {
            if (response.status > 100 && response.status <= 400)
                return response.json();
            else if (response.status === 404) {
                throw new Error("NOT FOUND");
            }
            else if (response.status > 400 && response.status < 500) {
                throw new Error("SOME CLIENT ERROR");
            }
            else if (response.status > 500 && response.status < 600) {
                throw new Error("SOME SERVER ERROR");
            }
            else {
                throw new Error("UNEXPECTED STATE");
            }
        })
        .then(responseJSON=>{
            store.dispatch({
                type: "FETCH",
                user: responseJSON
            });

        });
}

//document.getElementById("btnSubmit").addEventListener("click", func);

export {func};