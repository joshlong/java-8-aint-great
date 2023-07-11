// todo install the html and css and dom structure, but don't _start_ anything. somehow it's got to be possible to decouple the animation from the install


const root = {
    alarmAudio: null,
    video: null,
    rightDoor: null,
    leftDoor: null,
    container: null
};

function installVideo() {

    const html = `
        <video id="video">
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    type="video/mp4"/>
        </video>
    `;

    const htmlDivElement = document.createElement('div')
    htmlDivElement.innerHTML = html;
    root.video = htmlDivElement.childNodes.item(1);
    document.body.appendChild(root.video);
    return root.video
}

function installAudio() {
    const mp3 = 'https://github.com/joshlong/java-8-aint-great-assets/raw/main/audio/alarms_mixdown.mp3'
    const html = `
    <audio controls>
        <source src="${mp3}" type="audio/mpeg">
        Your browser does not support the audio element.
    </audio>
    `;
    const audio = document.createElement('div')
    audio.innerHTML = html
    const audioElement = audio.childNodes.item(1);
    audioElement.style.display = 'none'
    document.body.appendChild(audioElement);
    return audioElement
}

function install() {

    console.log('running installation of the scene')
    // install html

    const rightDoorImage = 'https://github.com/joshlong/java-8-aint-great-assets/blob/main/images/right-door-w.png?raw=true';
    const leftDoorImage = 'https://github.com/joshlong/java-8-aint-great-assets/blob/main/images/left-door-w.png?raw=true';

    [leftDoorImage, rightDoorImage].forEach(url => {
        const link = document.createElement('link')
        link.setAttribute('rel', 'preload')
        link.setAttribute('as', 'image')
        link.setAttribute('href', url)
        document.head.appendChild(link)

        console.log('just added preload image for ' + url)
    })

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
    const container = document.getElementById('container');
    container.appendChild(createDivWithAttributes('left-door', {classList: ['door']}))
    container.appendChild(createDivWithAttributes('right-door', {classList: ['door']}))


    // install css
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `

                    .red-strobe {
                       animation: strobe 1s infinite;
                    }

                    @keyframes strobe {
                        0%, 100% {
                            
                             
                        }
                        50% {
                            
                            background-color: red;
                        }
                    }

                    #container {
                        z-index: 100000;
                        position: absolute;
                        top: 0;
                        left: 0  ;
                        height : 100vh;
                        width  : 100vw;
                        display: none; 
                    }

                    .door {
                        position: absolute;
                        width: 50%;
                        height: 100vh;
                        background-color: yellow;
                    }

                    #right-door {
                        left: 100vw;
                        background-image: url("${rightDoorImage}");
                        background-repeat: no-repeat;
                        background-position-x: 0px;
                        background-size: 50vw  100vh ;
                    }

                    #left-door {
                        left: -50vw;
                        background-image: url("${leftDoorImage}");
                        background-repeat: no-repeat;
                        background-position-x: 0px;
                        background-size: 50vw  100vh ;
                    }
                    
                    .animated-door {
                        animation-duration: 6s;
                    }
                     
                    #left-door.animated-door {
                        animation-name: leftDoorSlide;
                    }
                    
                    #right-door.animated-door {
                        animation-name: rightDoorSlide;
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
                                        
                    #video { 
                        z-index: 500 ;
                        display: none; 
                        position : absolute; 
                        top: 0;
                        left: 0; 
                        width:   100vw; 
                    }
                    
                    
            `;
    document.head.appendChild(styleElement);

    // install the audio file
    root.alarmAudio = installAudio();
    root.rightDoor = document.getElementById('right-door')
    root.leftDoor = document.getElementById('left-door')
    root.container = document.getElementById('container')
    root.video = installVideo()
}


function triggerAlarms() {

    root.alarmAudio.play();
    root.video.style.display = 'block'
    root.video.play();

    [root.rightDoor, root.leftDoor].forEach(door => door.classList.add('animated-door'));

    root.container.style.display = 'block';
    root.container.classList.add('red-strobe');

    setTimeout(function () {
        root.alarmAudio.pause()
        root.container.classList.remove('red-strobe');
    }, 10 * 1000);
}


function registerCallbackOnJava(callback) {
    const javaChoicesContainer = document.querySelector("#main > form > div.colset.colset-main > div.left > div > div:nth-child(3) > div > div:nth-child(7) > div");

    if (javaChoicesContainer) {
        console.log('resolved the java 8 checkbox.')
        javaChoicesContainer.childNodes.item(javaChoicesContainer.childNodes.length - 1).addEventListener('click', callback);
    }
}

window.addEventListener('load', (e) => {
    install()
    registerCallbackOnJava(triggerAlarms)
})
