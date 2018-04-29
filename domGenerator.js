function createElem(tag, attributes = {}, text="") {
    let elem = document.createElement(tag);
    let arr=Object.getOwnPropertyNames(attributes);
    for (let i=0; i<arr.length; i++) {
        elem.setAttribute(arr[i], attributes[arr[i]]);
    }
    elem.innerHTML = text;
    return elem;
}

function addElem(elem, parent) {
    parent.appendChild(elem);
}

function addDivWithInfo (parent, textTag, id, imgName, text) {
    if (text!=="" && !!text) {
        let div = createElem("div", {"class": "rows"});
        let img = createElem("img", {"src": getImagePath(imgName), "id": getSecondId(id)});
        addElem(img, div);
        let elem = createElem(textTag, {"id": id}, text);
        if (textTag = "a") {
            elem.setAttribute("href", text);
        }
        addElem(elem, div);
        addElem(div, parent);
    }
}

function createUser(user) {
    console.log(JSON.stringify(user));
    let frag = document.createDocumentFragment();

    let main = createElem("main");

    let divMain = createElem("div", {"id":"main"});

    let imgPicture = createElem("img", {"id": "picture", "src": user.avatar_url});
    addElem(imgPicture, divMain);

    let div = createElem("div");

    let divDiv1 = createElem("div");
    let h1Name = createElem("h1", {"id": "name"}, user.name);
    addElem(h1Name, divDiv1);
    let h3P1 = createElem("h3", {"id": "p1"}, user.login);
    addElem(h3P1, divDiv1);
    addElem(divDiv1, div);

    let divDiv2 = createElem("div");
    let pBio = createElem("p", {"id": "bio"}, user.bio);
    addElem(pBio, divDiv2);
    addElem(divDiv2, div);

    addElem(createElem("hr"),div);

    let divDiv3 = createElem("div");
    addDivWithInfo(divDiv3, "span", "company", "people", user.company);
    addDivWithInfo(divDiv3, "span", "location", "location", user.location);
    addDivWithInfo(divDiv3, "span", "email", "mail", user.email);
    addDivWithInfo(divDiv3, "a", "blog", "link", user.blog);
    addElem(divDiv3, div);

    addElem(div, divMain);

    addElem(divMain, main);

    addElem(main, frag);

    document.body.appendChild(frag);
}

function getPageURL(name) {
    return 'https://api.github.com/users/' + name;
}

function getImagePath(name) {
    return "lab3/img/" + name + ".svg";
}

function getSecondId(id) {
    return "p"+id.charAt(0).toUpperCase() + id.slice(1);
}

export {createUser, getPageURL, createElem, addElem}