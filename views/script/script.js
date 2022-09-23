const public = document.getElementById("public");
const card = document.querySelectorAll(".card-wrap");
let form = document.querySelectorAll("form");

for (let i = 0; i < card.length; i++)
{
    const elem = card[i];
    let parentElem = elem.parentNode;
    let link = parentElem.attributes[1].nodeValue;

    const positionElem = parentElem.getBoundingClientRect().top + 10;
    parentElem.style.cssText = `top:${positionElem}px;`;

    elem.addEventListener("click", function(e)
    {
        window.history.pushState({}, "", window.location.pathname + link);
        e.preventDefault();

        let colorInput = parentElem.childNodes[1].childNodes[0].childNodes[0].getAttribute("fill");
        let input = parentElem.children[1].children[1].children[1].children[0];
        input.style.background = colorInput;

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
        
        //const form = parentElem.childNodes[1].childNodes[1].childNodes[1];
        input.setAttribute("name", link);
        input.setAttribute("autocomplete", "off");

        input.addEventListener("submit", (e)=>
        {
            e.preventDefault();
            e.stopImmediatePropagation();
    
            let userMsg = input.value;
            $.post(link,
                {userMsg: userMsg},
                function (data, status)
                {
                    console.log(data);
                }
            );
        })
    })

    addEventListener("popstate", ()=>
    {
        parentElem.classList.remove("active");
        setTimeout(() => {parentElem.style.zIndex = `0`;}, 300);
        public.style = ``;

        let input = parentElem.children[1].children[1].children[1].children[0];
        input.style.background = `white`;
        input.value = "";

        input.removeAttribute("name", link);
    })
}

for (let i = 0; i < form.length; i++)
{
    const elem = form[i];
    let input = elem.childNodes[0];

    elem.addEventListener("submit", (e)=>
    {
        e.preventDefault();
        e.stopImmediatePropagation();
        let link = window.location.pathname.replace(/[^a-zа-яё]/gi, '');

        let userMsg = input.value;
        $.post(link,
            {userMsg: userMsg},
            function (data, status)
            {
                console.log(data);
            }
        );
    })
}