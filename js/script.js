// Auto-typing animation
function initTyping() {
    try {
        const typingText = document.querySelector('.typing-text');
        if (typingText) {
            if (typingText.dataset.initialized) return;
            typingText.dataset.initialized = true;
            const words = ["Web Developer", "Digital Marketer"];
            let wordIndex = 0;
            let charIndex = 0;
            let isDeleting = false;

            function typeEffect() {
                const currentWord = words[wordIndex];
                if (isDeleting) {
                    typingText.textContent = currentWord.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    typingText.textContent = currentWord.substring(0, charIndex + 1);
                    charIndex++;
                }

                let typeSpeed = isDeleting ? 60 : 120;

                if (!isDeleting && charIndex === currentWord.length) {
                    typeSpeed = 1500; // Pause at full word
                    isDeleting = true;
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    typeSpeed = 400; // Pause before next word
                }

                setTimeout(typeEffect, typeSpeed);
            }

            typeEffect();
        }
    } catch (e) {
        console.error("Typing animation error: ", e);
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTyping);
} else {
    initTyping();
}

// toggle icon navbar
let menuIcon=document.querySelector('#menu-icon');
let navbar=document.querySelector('.navbar');

if (menuIcon) {
    menuIcon.onclick=()=>{
        menuIcon.classList.toggle('bx-x');
        if (navbar) navbar.classList.toggle('active'); 
    }
}
var audio = document.getElementById("audioPlayer");
function playpause() {
    let checkbox = document.getElementById("checkboxInput");
    if (checkbox && audio) {
        if (checkbox.checked == false) {
            audio.play();
        } else {
            audio.pause();
        }
    }
}


// var audio = document.getElementById("audioPlayer");
var loader = document.getElementById("preloader");
function hideLoader() {
  if (loader) {
    loader.style.display = "none";
  }
}
window.addEventListener("load", hideLoader);
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(hideLoader, 1000);
});
// Failsafe backup timeout in case load/DOMContentLoaded are delayed
setTimeout(hideLoader, 3000);

// const { animate } = require("framer-motion");

// scroll sections
let sections =document.querySelectorAll('section');
let navlinks=document.querySelectorAll('header nav a');

window.onscroll=()=>{
    sections.forEach(sec=>{
        let top=window.scrollY;
        let offset=sec.offsetTop-150;
        let height=sec.offsetHeight;
        let id =sec.getAttribute('id');

        if(top>=offset && top < offset + height ){
            //active navbar links
            navlinks.forEach(links=>{
                links.classList.remove('active');
            });
            if (id) {
                let activeLink = document.querySelector('header nav a[href*=' + id + ']');
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
            // active sections for animation on scroll
            sec.classList.add('show-animate');
        }
        //if want to use animation that repeats on scroll use this
        else{
            sec.classList.remove('show-animate');
        }
    });


    // sticky header
    let header =document.querySelector('header');
    if (header) {
        header.classList.toggle('sticky',window.scrollY > 100);
    }

    // remove toggle icon and navbar when click navbar links(scroll)
    if (menuIcon) menuIcon.classList.remove('bx-x');
    if (navbar) navbar.classList.remove('active');

//animation footer on scroll
let footer = document.querySelector('footer');
if (footer) {
    let scrollHeight = document.scrollingElement ? document.scrollingElement.scrollHeight : document.body.scrollHeight;
    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= scrollHeight - 10);
}
}

let Pupils = document.getElementsByClassName('footer-pupil');
let pupilsArr = Array.from(Pupils);

let pupilStartPoint = -10;
let pupilRangeX = 20;
let pupilRangeY = 15;

// mouse X 
let mouseXStartPoint = 0;
let mouseXEndPoint = window.innerWidth;
let currentXPosition = 0;
let fracXValue = 0;


// mouse Y position 
let mouseYEndPoint = window.innerHeight;
let currentYPosition = 0;
let fracYValue = 0;

let mouseXRange = mouseXEndPoint - mouseXStartPoint;

const mouseMove = (event) => {
    currentXPosition = event.clientX - mouseXStartPoint;
    fracXValue = currentXPosition / mouseXRange;

    currentYPosition = event.clientY;
    fracYValue = currentYPosition / mouseYEndPoint;
 
    // footer
    let pupilXCurrrentPosition = pupilStartPoint + (fracXValue * pupilRangeX);
    let pupilYCurrrentPosition = pupilStartPoint + (fracYValue * pupilRangeY);

    // footer
    pupilsArr.forEach((curPupil) => {
      curPupil.style.transform= `translate(${pupilXCurrrentPosition}px, ${pupilYCurrrentPosition}px)`;
  })

}

const windowResize = (event) => {
    mouseXEndPoint = window.innerWidth;
    mouseYEndPoint = window.innerHeight;
    mouseXRange = mouseXEndPoint - mouseXStartPoint;
}


window.addEventListener('mousemove', mouseMove);
window.addEventListener('resize', windowResize);


