function install() {

    // install html

    function createDivWithAttributes(nodeId, attrs) {
        const d = document.createElement('div')
        d.setAttribute('id', nodeId)
        if (attrs) {
            if (attrs.classList) {
                attrs.classList.forEach(cn => d.classList.add(cn))
            }
        }
        return d;
    }

    document.body.appendChild(createDivWithAttributes('container'))
    document.getElementById('container').appendChild(createDivWithAttributes('left-door', {classList: ['door']}))
    document.getElementById('container').appendChild(createDivWithAttributes('right-door', {classList: ['door']}))

    const leftDoor = document.getElementById('left-door');
    const rightDoor = document.getElementById('right-door');
    const container = document.getElementById('container');

    // install css
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `

                    .red-strobe {
                       animation: strobe 1s infinite;
                    }

                    @keyframes strobe {
                        0%, 100% {
                            background-color: black;
                        }
                        50% {
                            background-color: red;
                        }
                    }

                    #container {
                        z-index: 10000;
                        position: absolute;
                        top: 0;
                        left: 0  ;
                        height : 100vh;
                        width  : 100vw;
                    }

                    .door {
                        position: absolute;
                        width : 50%;
                        height : 100vh;

                    }

                    #right-door {
                        left: 100vw;
                        animation-duration: 3s;
                        animation-name: rightDoorSlide;
                        
                        
                        background-image: url("../images/right-door-w.png");
                        background-repeat: no-repeat;
                        background-position-x: 0px;
                        background-size: 50vw  100vh ;

                    }

                    #left-door {
                        left: -50vw;
                        animation-duration: 3s;
                        animation-name: leftDoorSlide;
                        background-image: url("../images/left-door-w.png");
                        background-repeat: no-repeat;
                        background-position-x: 0px;
                        background-size: 50vw  100vh ;
                    }

                    @keyframes rightDoorSlide {
                        0% {
                            left: 50vw;
                        }
                        10% {
                            left : 55vw;
                        }
                        100% {
                            left: 100vw;
                        }
                    }

                    @keyframes leftDoorSlide {
                        0% {
                            left: 0vw;
                        }
                        10% {
                            left : -5vw;
                        }
                        100% {
                            left: -50vw;
                        }
                    }
            `;
    document.head.appendChild(styleElement);

    container.classList.add('red-strobe')


    setTimeout(function () {
        container.classList.remove('red-strobe');
    }, 5 * 1000);
}

function registerCallbackOnJava(callback) {
    const javaChoicesContainer = document.querySelector(
        "#main > form > div.colset.colset-main > div.left > div > div:nth-child(3) > div > div:nth-child(7) > div");

    console.log('going to install the check, maybe..');
    
    if (javaChoicesContainer) {
        javaChoicesContainer.childNodes.item(javaChoicesContainer.childNodes.length - 1).addEventListener('click', callback) ;
        console.log('installed the java 8 check!')
    }
}

registerCallbackOnJava(install)