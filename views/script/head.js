addEventListener("DOMContentLoaded", function() {
    document.body.style.contentVisibility = "auto";
    if (localStorage.userData.length)
    {
        document.querySelector("welcome-w").remove();
        document.body.style. overflowY = "scroll";

        const userData = JSON.parse(localStorage.userData)[0];
        document.querySelector(".photoCurrent").setAttribute("src", `${userData.photo}`);
    }
})