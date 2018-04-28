import {createUser} from "./domGenerator";


function func() {
    let userLogin = document.getElementById("nickname").value;
    fetch('https://api.github.com/users/'+userLogin)
        .then(function (response) {
            return response.json();
        })
        .then(user=>createUser(user));
}

document.getElementById("btnSubmit").addEventListener("click", func);

export {func}