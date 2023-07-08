window.addEventListener('load', (event) => {


    // the following is for start.spring.io today

    function defend (){
        console.log('idiot alert!!! idiot alert!!')
    }

    const javaChoicesContainer = document.querySelector(
        "#main > form > div.colset.colset-main > div.left > div > div:nth-child(3) > div > div:nth-child(7) > div");
    const last = javaChoicesContainer.childNodes.item(javaChoicesContainer.childNodes.length - 1);
    last.addEventListener('click', (e) => defend())

});