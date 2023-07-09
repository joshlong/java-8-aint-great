window.addEventListener('load', (event) => {


    const html = `
    <div id="container">
        <div id="left-door" class="door"></div>
        <div id="right-door" class="door"></div>
    </div>
    ` ;
    

    // the following is for start.spring.io today
    function defend (){
        window.alert ('idiot alert!!! idiot alert!!')
    }

    const javaChoicesContainer = document.querySelector(
        "#main > form > div.colset.colset-main > div.left > div > div:nth-child(3) > div > div:nth-child(7) > div");
    const last = javaChoicesContainer.childNodes.item(javaChoicesContainer.childNodes.length - 1);
    last.addEventListener('click', (e) => defend())

});