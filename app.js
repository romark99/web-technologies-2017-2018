import {createUser} from "./domGenerator";


function func() {
    let userLogin = document.getElementById("nickname").value;
    fetch('https://api.github.com/users/' + userLogin)
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
        .then(user => createUser(user))
        .catch((e)=>{
        let h1 = document.createElement("h1");
        h1.innerText = e.toString();
        document.body.appendChild(h1);
    });
}

document.getElementById("btnSubmit").addEventListener("click", func);

export {func}