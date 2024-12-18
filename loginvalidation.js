var isLoggedIn = false;
isLoggedIn = window.localStorage.getItem("isLoggedIn");
var username = window.localStorage.getItem("usernameString");
if(isLoggedIn === false) {
    window.location.href = login;
}
