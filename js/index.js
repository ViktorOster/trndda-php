//START NAVBAR

const navbar = document.querySelector(".navbar")
const navbarMobile = document.querySelector(".navbar-mobile")
const hamburger = document.querySelector("#hamburger")
const mobileLinks = document.querySelector("#navbar-mobile__links")
//mobile nav
hamburger.addEventListener("click", (e) => {
    if (!mobileLinks.classList.contains("is-showing")) {
        mobileLinks.classList += " is-showing"
        hamburger.classList += " is-showing"
    }
    else {
        mobileLinks.classList.remove("is-showing")
        hamburger.classList.remove("is-showing")
    }
})

//show navbar when scrolling up, hide when scrolling down
let oldScrollPosY = 0;
window.addEventListener("scroll", () => {
    setTimeout(() => {
        oldScrollPosY = window.scrollY;
    }, 50);

    if (window.scrollY > oldScrollPosY) { //scrolled down, show/hide navbar, show scroll up btn
        navbar.classList.remove("is-scrolling-up")
        if (!navbar.classList.contains("is-scrolling-down")) {
            navbar.classList += " is-scrolling-down";
        }

        if (!navbarMobile.classList.contains("is-scrolling")) {
            navbarMobile.classList += " is-scrolling";
        }

    }
    if (window.scrollY < oldScrollPosY) { //scrolled up, show navbar
        navbar.classList.remove("is-scrolling-down")
        if (!navbar.classList.contains("is-scrolling-up"))
            navbar.classList += " is-scrolling-up";

    }
    if (window.scrollY <= 16) { //reset navbar if at top
        navbar.classList.remove("is-scrolling-up")
        navbar.classList.remove("is-scrolling-down")
        navbarMobile.classList.remove("is-scrolling")
    }
})

//END NAVBAR

//tutorial section
const tutorialVideos = document.querySelectorAll(".tutorial-video")
const stepsMobile = document.querySelectorAll(".step-mobile")
const stepsDesktop = document.querySelectorAll(".step")
const dots = document.querySelectorAll(".dot")
dots.forEach((dot, i) => {
    dot.addEventListener("click", ()=> {
        for(let j=0; j < dots.length; j++) {
            if(j === i) {
                dots[j].classList += " is-active"
            } else {
                dots[j].classList.remove("is-active")
            }
        }

        for(let k=0; k < tutorialVideos.length; k++) {
            if(k === i) {
                tutorialVideos[k].classList += " is-showing"
            } else {
                tutorialVideos[k].classList.remove("is-showing")
            }
        }

        for(let l=0; l < stepsMobile.length; l++) {
            if(l === i) {
                stepsMobile[l].classList += " is-showing"
            } else {
                stepsMobile[l].classList.remove("is-showing")
            }
        }
    })
})

stepsDesktop.forEach((step, i) => {
    step.addEventListener("mouseover", () => {
        for(let j=0; j < dots.length; j++) {
            if(j === i) {
                dots[j].classList += " is-active"
            } else {
                dots[j].classList.remove("is-active")
            }
        }

        for(let k=0; k < tutorialVideos.length; k++) {
            if(k === i) {
                tutorialVideos[k].classList += " is-showing"
            } else {
                tutorialVideos[k].classList.remove("is-showing")
            }
        }

        for(let l=0; l < stepsMobile.length; l++) {
            if(l === i) {
                stepsMobile[l].classList += " is-showing"
            } else {
                stepsMobile[l].classList.remove("is-showing")
            }
        }
    })
})

const signInTabs = document.querySelectorAll(".modal__signIn-tab")
const modalSignInSignUp = document.querySelector(".modal-container")
const modalSignInContent = document.querySelector(".modal__signIn")
const signUpTabs = document.querySelectorAll(".modal__signUp-tab")
const modalSignUpContent = document.querySelector(".modal__signUp")
const darkOverlay = document.querySelector(".dark-overlay")

signInTabs.forEach(signInTab => {
    signInTab.addEventListener("click", () => {
        if(!modalSignInContent.classList.contains("is-showing")) modalSignInContent.classList += " is-showing"
        modalSignUpContent.classList.remove("is-showing")
        signInTabs.forEach(tab => {
            if(!tab.classList.contains("is-active")) tab.classList += " is-active"
        })
        
        signUpTabs.forEach(signUpTab => {
            signUpTab.classList.remove("is-active")
        })
    })
})
signUpTabs.forEach(signUpTab => {
    signUpTab.addEventListener("click", () => {
        if(!modalSignUpContent.classList.contains("is-showing")) modalSignUpContent.classList += " is-showing"
        modalSignInContent.classList.remove("is-showing")
        signUpTabs.forEach(tab => {
            if(!tab.classList.contains("is-active")) tab.classList += " is-active"
        })
        
        signInTabs.forEach(signInTab => {
            signInTab.classList.remove("is-active")
        })

    })
})

const modalCloseBtns = document.querySelectorAll(".modal__close")
modalCloseBtns.forEach(modalClose => {
    modalClose.addEventListener("click", () => {
        modalSignInSignUp.classList.remove("is-showing")
        darkOverlay.classList.remove("is-showing")
    })
})


const showModalButtons = document.querySelectorAll(".show-signIn-signUp-modal")
showModalButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if(!darkOverlay.classList.contains("is-showing")) darkOverlay.classList += " is-showing"
        
        if(!modalSignInSignUp.classList.contains("is-showing")) modalSignInSignUp.classList += " is-showing"
  
        if(btn.classList.contains("show-signIn")) {
            if(!modalSignInContent.classList.contains("is-showing")) modalSignInContent.classList += " is-showing"
            modalSignUpContent.classList.remove("is-showing")
            signInTabs.forEach(signInTab => {
                if(!signInTab.classList.contains("is-active")) signInTab.classList += " is-active"
            })
            signUpTabs.forEach(signUpTab => {
                signUpTab.classList.remove("is-active")
            })
        } else if(btn.classList.contains("show-signUp")) {
            if(!modalSignUpContent.classList.contains("is-showing")) modalSignUpContent.classList += " is-showing"
            modalSignInContent.classList.remove("is-showing")
            signUpTabs.forEach(signUpTab => {
                if(!signUpTab.classList.contains("is-active")) signUpTab.classList += " is-active"
            })
            signInTabs.forEach(signInTab => {
                signInTab.classList.remove("is-active")
            })
        }

    })
    
})
const modalContainer = document.querySelector(".modal-container-2")
modalContainer.addEventListener("click", (e) => {
    //close modal if clicked outside form 
    let clickedOnForm = false;
    e.path.forEach(elem => {
        if(elem.classList && elem.classList.contains("modal-signIn-signUp")) {
          clickedOnForm = true;
        } 
        
    })
    if(!clickedOnForm) {
        modalSignInSignUp.classList.remove("is-showing")
        darkOverlay.classList.remove("is-showing")
    }
})
function scrollToElement(yPos) {
    window.scrollTo({
        top: yPos,
        behavior: 'smooth'
    })
}
const sectionTutorial = document.querySelector(".tutorial")
const sectionAbout = document.querySelector(".about")
const sectionContact = document.querySelector(".footer")

const linksTutorial = document.querySelectorAll("[data-js='tutorial-link']")
const linksAbout = document.querySelectorAll("[data-js='about-link']")
const linksContact = document.querySelectorAll("[data-js='contact-link']")
linksTutorial.forEach(linkTutorial => {
    linkTutorial.addEventListener("click", () => {
        scrollToElement(sectionTutorial.getBoundingClientRect().top)  
    })
})
linksAbout.forEach(linkAbout => {
    linkAbout.addEventListener("click", () => {
        scrollToElement(sectionAbout.getBoundingClientRect().top)  
    })
})

linksContact.forEach(linkContact => {
    linkContact.addEventListener("click", () => {
        scrollToElement(sectionContact.getBoundingClientRect().top)  
    })
})
