const socket = io();

const public = document.getElementById("public");
const card = document.querySelectorAll(".card-wrap");

const HTMLMsgDialog = document.createElement("msg-dialog");

function msgDialog()
{
    setTimeout(() => {
        const msgDiv = document.querySelectorAll(".containerMsg>div");
        for (let sas = 0; sas < msgDiv.length; sas++) {
            const msgClick = msgDiv[sas];

            let link = window.location.pathname.replace(/[^a-zа-яё]/gi, '');
            let id = msgClick.getAttribute("n-msg");

            HTMLMsgDialog.innerHTML = `
                <div>
                    <button class="msgDelete">Удалить</button>
                </div>
            `;

            msgClick.onclick = ()=>
            {
                document.body.append(HTMLMsgDialog);

                document.querySelector(".msgDelete").onclick = ()=>
                {
                    let msgDeleteJSON = {"link": link, "id": id};
                    socket.emit("delete", msgDeleteJSON);
                }

                document.querySelector("msg-dialog>div").onclick = ()=>
                {
                    setTimeout(() => { HTMLMsgDialog.remove(); }, 300);
                }
            }
        }
    }, 500);
}

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

        setTimeout(() => {
            let msgDivStyle = parentElem.childNodes[1].childNodes[2].children;
            for (let i = 0; i < msgDivStyle.length; i++) {
                const msgSize = msgDivStyle[i];
                const windowSize = window.innerWidth;
                const msgNormalWindow = window.innerWidth - 50;

                if (msgSize.offsetWidth + 70 >= windowSize)
                {
                    msgSize.style.width = `${msgSize.offsetWidth - 70}px`;
                }
            }
        }, 450);

        let colorInput = parentElem.childNodes[1].childNodes[0].childNodes[0].getAttribute("fill");
        let input = parentElem.children[1].children[1].children[1].children[0];
        input.style.background = colorInput;

        parentElem.classList.add("active");
        parentElem.style.zIndex = `9999`;
        setTimeout(() => {public.style.overflow = `hidden`;}, 300);
        $('html, body').animate({scrollTop: $("body").offset().top}, 300);

        input.setAttribute("name", link);
        input.setAttribute("autocomplete", "off");

        let calendar = parentElem.children[1].children[1].children[2];

        let form = input.parentNode;
        form.addEventListener("submit", (e)=>
        {
            e.preventDefault();
            e.stopImmediatePropagation();

            const inputData =
            {
                "id": Date.now(),
                "link": link,
                "msg": input.value,
                "typeCalendar": calendar.__mbscInst._oldValueText <= 4 ? 1 : 0,
                "dateTo": calendar.__mbscInst._oldValueText
            };

            if (input.value)
            {
                socket.emit("chat message", inputData);
                input.value = "";

                calendar.__mbscInst._oldValueText = " ";
            }
        })

        msgDialog();
    })

    addEventListener("popstate", ()=>
    {
        parentElem.classList.remove("active");
        setTimeout(() => {parentElem.style.zIndex = `0`;}, 300);
        public.style = ``;

        let input = parentElem.children[1].children[1].children[1].children[0];
        input.style.background = 'white';
        input.value = "";

        input.removeAttribute("name", link);
    })
}

socket.on("message", function(msg)
{
    if (typeof(msg) == "object")
    {
    } else {
        document.querySelector(`[n-msg="${msg}"]`).remove();
    }
    
    const svgCalendar = `<svg width="16" height="18" fill="none"><path d="M13.32 1.776h-.889V.888a.888.888 0 0 0-1.775 0v.888H5.327V.888a.888.888 0 1 0-1.776 0v.888h-.888A2.664 2.664 0 0 0 0 4.44v10.655a2.664 2.664 0 0 0 2.664 2.664h10.655a2.664 2.664 0 0 0 2.664-2.664V4.44a2.664 2.664 0 0 0-2.664-2.664zM2.663 3.552h.888v.888a.888.888 0 1 0 1.776 0v-.888h5.327v.888a.888.888 0 1 0 1.776 0v-.888h.888a.888.888 0 0 1 .888.888v3.552H1.776V4.44a.888.888 0 0 1 .888-.888zm10.655 12.431H2.664a.888.888 0 0 1-.888-.888V9.768h12.431v5.327a.888.888 0 0 1-.888.888z" fill="#333"/><path d="M4.44 13.32a.888.888 0 1 0 0-1.777.888.888 0 0 0 0 1.776zM11.543 11.543H7.992a.888.888 0 1 0 0 1.776h3.551a.888.888 0 0 0 0-1.776z" fill="#333"/></svg>`;

    for (let i = 0; i < card.length; i++)
    {
        const elem = card[i];
        let count = 0;
        elem.addEventListener("click", function _self()
        {
            let path = window.location.pathname.replace(/[^a-zа-яё]/gi, '');
            const msgJSON = msg[`${path}`];

            let containerMsg = elem.parentNode.childNodes[1].childNodes[2];

            Object.values(msgJSON).map(item =>
                containerMsg.insertAdjacentHTML("afterbegin", `
                <div n-msg="${item.id}">${item.msg}
                    <div class="lineMsg" style="${item.typeCalendar == 1 ? "display:none;" : ""}"></div>
                    <div class="dateToMsg" style="${
                            item.typeCalendar == 1 ? "display:none;" : ""
                        }">
                        ${svgCalendar}
                        <span style="margin-left:8px;">${item.dateTo}</span>
                    </div>
                </div>
                `)
            );

            if (++count == 1) elem.removeEventListener("click", _self);
        })
    }

    if (msg.link == undefined)
    {
        return false;
    } else {
        if (msg.typeCalendar == 1)
        {
            document.getElementById(`${msg.link}`)
            .insertAdjacentHTML("afterbegin", `<div n-msg="${msg.id}">${msg.msg}</div>`);
        }

        if (msg.typeCalendar == 0)
        {
            document.getElementById(`${msg.link}`)
            .insertAdjacentHTML("afterbegin", `
            <div n-msg="${msg.id}">${msg.msg}
                <div class="lineMsg"></div>
                <div class="dateToMsg">
                    ${svgCalendar}
                    <span style="margin-left:8px;">${msg.dateTo}</span>
                </div>
            </div>
            `);
        }
    }

    msgDialog();
})