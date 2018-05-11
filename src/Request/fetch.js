// import {createUser, getPageURL} from "./domGenerator";
// import {makeErrorPage} from "./errorGenerator";

function getPageURL(name) {
    return 'https://api.github.com/users/' + name;
}

function func(userLogin) {
    // let arrMain = document.body.getElementsByTagName("main");
    // if (arrMain.length >0) {
    //     for (let i=0; i<arrMain.length; i++) {
    //         document.body.removeChild(arrMain[i]);
    //     }
    // }
    // let userLogin = document.getElementById("nickname").value;
        return fetch(getPageURL(userLogin))
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
        });
        // .then(user => createUser(user))
        // .catch((e)=>makeErrorPage(e));
}

//document.getElementById("btnSubmit").addEventListener("click", func);

export {func}