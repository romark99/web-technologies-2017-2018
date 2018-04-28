function createUser (user) {
    console.log(JSON.stringify(user));
    document.getElementById("main").setAttribute("class", "shown");
    document.getElementById("p1").innerHTML = user.login;
    document.getElementById("name").innerHTML = user.name;
    document.getElementById("picture").setAttribute("src", user.avatar_url);
    document.getElementById("location").innerHTML = user.location;
    document.getElementById("bio").innerHTML = user.bio;
    document.getElementById("company").innerHTML = user.company;
    document.getElementById("email").innerHTML = user.email;
    (!(user.company) || user.company==="") ? document.getElementById("pCompany").setAttribute("class", "hidden") :  document.getElementById("pCompany").setAttribute("class", "rows");
    (!(user.location) || user.location==="") ? document.getElementById("pLocation").setAttribute("class", "hidden"):  document.getElementById("pLocation").setAttribute("class", "rows");
    (!(user.email) || user.email==="") ? document.getElementById("pEmail").setAttribute("class", "hidden") :  document.getElementById("pEmail").setAttribute("class", "rows");
    (!(user.blog) || user.blog==="") ?  document.getElementById("pBlog").setAttribute("class", "hidden") :  document.getElementById("pBlog").setAttribute("class", "rows");
    document.getElementById("blog").innerHTML = user.blog;
    document.getElementById("blog").setAttribute("href", user.blog);
}

export {createUser}