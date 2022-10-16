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

        console.log(inputActive)

        svgMenuChat.classList.add("activeInputMenu");
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

        const calendarBtn =  document.querySelector(".calendarBtn");

        document.querySelectorAll(".groupCalendar").forEach(e=>
        {
            e.onclick = ()=>
            {
                svgMenuChat.classList.remove("activeInputMenu"),
                cardMask.classList.remove("activeInputMenu"),
                inputActive.classList.remove("activeInputMenu");
                funcElem.append(selectMenu);
            }
        })

        calendarBtn.onclick = ()=>
        {
            svgMenuChat.classList.remove("activeInputMenu"),
            cardMask.classList.remove("activeInputMenu"),
            inputActive.classList.remove("activeInputMenu");
            funcElem.append(selectMenu);

            document.querySelector(".calendar").classList.add("active");

            setInterval(() => {
                let dayC = document.querySelectorAll(".calendar-day-hover");
                for (let we = 0; we < dayC.length; we++)
                {
                    const elem = dayC[we];
                    elem.onclick = (e)=>
                    {
                        let mounthC = document.querySelector(".month-picker").innerText;
                        let yearC = document.querySelector("#year").innerText;
                        inputCurrentDate.innerHTML = `${e.target.innerText} ${mounthC} ${yearC}`;
                        document.querySelector(".calendar").classList.remove("active");
                    }
                }
            }, 1000);
        }

    })
}

async function handleImageUpload(event)
{
    const imageFile = event.target.files[0];

    const options =
    {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true
    }

    try
    {
        const compressedFile = await imageCompression(imageFile, options);
        var reader = new FileReader();
        reader.readAsDataURL(compressedFile); 
        reader.onloadend = function()
        {
            document.querySelector(".baseimg").innerHTML = reader.result;
        }
    } catch (error) {
        return false;
    }
}