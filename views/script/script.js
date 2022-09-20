const public = document.getElementById("public");
const card = document.querySelectorAll(".card-wrap");

for (let i = 0; i < card.length; i++)
{
    const elem = card[i];
    let parentElem = elem.parentNode;
    let link = parentElem.attributes[1].nodeValue;

    const positionElem = parentElem.getBoundingClientRect().top + 10;
    parentElem.style.cssText = `top:${positionElem}px;`;

    elem.addEventListener("click", function(e)
    {
        e.preventDefault();

        window.history.pushState({}, "", window.location.pathname + link);

        parentElem.classList.add("active");
        parentElem.style.zIndex = `9999`;
        setTimeout(() => {public.style.overflow = `hidden`;}, 300);
        $('html, body').animate({scrollTop: $("body").offset().top}, 300);

        $.post(link,
            {},
            function (data, status)
            {
                console.log(data);
            }
        );
    })

    addEventListener("popstate", ()=>
    {
        parentElem.classList.remove("active");
        setTimeout(() => {parentElem.style.zIndex = `0`;}, 300);
        public.style = ``;
    })
}