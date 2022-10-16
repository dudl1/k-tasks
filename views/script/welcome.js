const welcome = document.querySelector("welcome-w");
setTimeout(() => {
    welcome.classList.add("wAnim");

    setTimeout(() => {
        welcome.classList.add("ready");

        const textHealth = document.querySelector(".textHealth");
        const forms = document.querySelector(".forms");

        textHealth.style.opacity = `1`;
        forms.style.opacity = `1`;
    }, 600);
}, 2 * 1400);

const form1 = document.querySelector(".form1");
const form2 = document.querySelector(".form2");
const form1Input = document.querySelector(".form1>input");
const form2Input = document.querySelector(".form2>input");
const btnStep1 = document.querySelector(".step1");
const btnStep2 = document.querySelector(".step2");

btnStep1.addEventListener("click", ()=>
{
    if (form1Input.value.length)
    {
        form1.style.top = `280px`;
        form1.style.opacity = `0`;
        form1.style.zIndex = `-99`;

        btnStep1.style.opacity = `0`;
        btnStep1.style.zIndex = `-99999`;

        form2.style.top = `285px`;
        form2.style.opacity = `1`;
        form2.style.zIndex = `9`;
    } else {
        return false;
    }
})

form1Input.addEventListener("focus", ()=>
{
    document.querySelector(".step1").style.display = `none`;
    document.querySelector(".step2").style.display = `none`;
})

form1Input.addEventListener("focusout", ()=>
{
    document.querySelector(".step1").style.display = `block`;
    document.querySelector(".step2").style.display = `block`;
})

async function userPhoto(event)
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
            document.querySelector(".prePhoto").classList.add("okPhoto");
            document.querySelector(".prePhoto").style.display = `block`;
            document.querySelector(".prePhoto").setAttribute("src", `${reader.result}`);
        }
    } catch (error) {
        return false;
    }
}

btnStep2.addEventListener("click", ()=>
{
    if (document.querySelector(".prePhoto").classList.contains("okPhoto"))
    {
        localStorage.setItem('userData', JSON.stringify
        ([{
            name: form1Input.value,
            photo: document.querySelector(".prePhoto").getAttribute("src")
        }]));

        welcome.classList.add("finishW");
        document.body.style. overflowY = "scroll";

        setTimeout(() => {
            const userData = JSON.parse(localStorage.userData)[0];
            document.querySelector(".photoCurrent").setAttribute("src", `${userData.photo}`);
        }, 100);
        setTimeout(() => {
            document.querySelector("welcome-w").remove();
        }, 1000);
    } else {
        return false;
    }
})