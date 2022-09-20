const textBox = document.querySelectorAll(".text-box");

setTimeout(() => {
    for (let i = 0; i < textBox.length; i++)
    {
        let widthChildren = textBox[i].childNodes[0].offsetWidth;
        textBox[i].style.cssText = `width:${widthChildren}px`;
    }
}, 80);