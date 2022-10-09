/*
    / When you click on the chat menu,
    / the transition to the choice of "calendar" or "gallery"
*/

const menuChat = document.querySelectorAll(".menuChat");
for (let i = 0; i < menuChat.length; i++)
{
    const elem = menuChat[i];
    const crSelectMenu = document.createElement("select-menu");
    const inputCurrentDate = elem.nextSibling;
    const inputCurrentPhoto = 0;

    elem.addEventListener("click", function()
    {
        const svgMenuChat  = elem;
        const cardMask = elem.parentElement.parentElement;
        const inputActive = elem.previousSibling.childNodes[0];

        svgMenuChat.classList.add("activeInputMenu"),
        cardMask.classList.add("activeInputMenu"),
        inputActive.classList.add("activeInputMenu");

        const selectMenu = document.querySelector("[data-func=selectMenu]");

        selectMenu.animate([
            { marginTop: '60px', opacity: '0' },
            { marginTop: '0', opacity: '1'  },
            { marginTop: '0', opacity: '1'  }
        ], {
            duration: 350,
            iterations: 1,
        });

        crSelectMenu.insertAdjacentElement("afterbegin", selectMenu);
        elem.parentNode.append(crSelectMenu);

        document.querySelectorAll(".groupCalendar").forEach(e=>
        {
            e.onclick = ()=>
            {
                svgMenuChat.classList.remove("activeInputMenu"),
                cardMask.classList.remove("activeInputMenu"),
                inputActive.classList.remove("activeInputMenu");
                funcElem.append(selectMenu);

                document.querySelector(".mbsc-popup-button-primary").onclick = ()=>
                {
                    const inputDateNum = document.querySelector("#input-picker");
                    inputCurrentDate.innerHTML = inputDateNum.__mbscInst._oldValueText;
                }

            }
        })
    })
}