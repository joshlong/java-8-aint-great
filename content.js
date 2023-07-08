window.addEventListener('load', (event)=>{

    console.log ('page loaded');
    const title = document.title ;

    document.getElementByTagName ('body')[0]
        .addEventListener ('click' , (e)=>{
        console.log ('click!');
    })

}); 