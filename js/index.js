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

//LOGIN/SIGN UP MODAL
const signInTabs = document.querySelectorAll(".modal__signIn-tab")
const modalSignInSignUp = document.querySelector(".modal-container")
const modalSignInContent = document.querySelector(".modal__signIn")
const signUpTabs = document.querySelectorAll(".modal__signUp-tab")
const modalSignUpContent = document.querySelector(".modal__signUp")
const darkOverlay = document.querySelector(".dark-overlay")
const modalForgotPassword = document.querySelector(".modal__forgot-password")
const forgotPasswordLink = document.querySelector("[data-js='forgot-password-link']")

signInTabs.forEach(signInTab => {
    signInTab.addEventListener("click", () => {
        if (!modalSignInContent.classList.contains("is-showing")) modalSignInContent.classList += " is-showing"
        modalSignUpContent.classList.remove("is-showing")
        signInTabs.forEach(tab => {
            if (!tab.classList.contains("is-active")) tab.classList += " is-active"
        })

        signUpTabs.forEach(signUpTab => {
            signUpTab.classList.remove("is-active")
        })
        modalForgotPassword.classList.remove("is-showing")
    })
})
signUpTabs.forEach(signUpTab => {
    signUpTab.addEventListener("click", () => {
        if (!modalSignUpContent.classList.contains("is-showing")) modalSignUpContent.classList += " is-showing"
        modalSignInContent.classList.remove("is-showing")
        signUpTabs.forEach(tab => {
            if (!tab.classList.contains("is-active")) tab.classList += " is-active"
        })

        signInTabs.forEach(signInTab => {
            signInTab.classList.remove("is-active")
        })
        modalForgotPassword.classList.remove("is-showing")
    })
})
const modalTopContentMobileTabs = document.querySelector(".modal-top-content-mobile__tabs")
forgotPasswordLink.addEventListener("click", () => {
    if (!modalForgotPassword.classList.contains("is-showing")) modalForgotPassword.classList += " is-showing"
    modalSignInContent.classList.remove("is-showing")
    modalSignUpContent.classList.remove("is-showing")
    signInTabs.forEach(signInTab => {
        signInTab.classList.remove("is-active")
    })
})


const modalCloseBtns = document.querySelectorAll(".modal__close")
modalCloseBtns.forEach(modalClose => {
    modalClose.addEventListener("click", () => {
        modalSignInSignUp.classList.remove("is-showing")
        darkOverlay.classList.remove("is-showing")
    })
})
const modalForgotPasswordBackBtn = document.querySelector(".modal-forgot-password__back")
modalForgotPasswordBackBtn.addEventListener("click", () => {
    modalForgotPassword.classList.remove("is-showing")
    if (!modalSignInContent.classList.contains("is-showing")) modalSignInContent.classList += " is-showing"
    signInTabs.forEach(tab => {
        if (!tab.classList.contains("is-active")) tab.classList += " is-active"
    })
})

const showModalButtons = document.querySelectorAll(".show-signIn-signUp-modal")
showModalButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (!darkOverlay.classList.contains("is-showing")) darkOverlay.classList += " is-showing"

        if (!modalSignInSignUp.classList.contains("is-showing")) modalSignInSignUp.classList += " is-showing"

        if (btn.classList.contains("show-signIn")) {
            if (!modalSignInContent.classList.contains("is-showing")) modalSignInContent.classList += " is-showing"
            modalSignUpContent.classList.remove("is-showing")
            signInTabs.forEach(signInTab => {
                if (!signInTab.classList.contains("is-active")) signInTab.classList += " is-active"
            })
            signUpTabs.forEach(signUpTab => {
                signUpTab.classList.remove("is-active")
            })
        } else if (btn.classList.contains("show-signUp")) {
            if (!modalSignUpContent.classList.contains("is-showing")) modalSignUpContent.classList += " is-showing"
            modalSignInContent.classList.remove("is-showing")
            signUpTabs.forEach(signUpTab => {
                if (!signUpTab.classList.contains("is-active")) signUpTab.classList += " is-active"
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
    // let clickedOnVideoModal = false;
    e.path.forEach(elem => {
        if (elem.classList && elem.classList.contains("modal-signIn-signUp")) {
            clickedOnForm = true;
        }

    })
    if (!clickedOnForm) {
        modalSignInSignUp.classList.remove("is-showing")
        darkOverlay.classList.remove("is-showing")
        modalForgotPassword.classList.remove("is-showing")
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

//the user is not on the landing page, redirect to index when clicking links in navbar
if (!sectionTutorial) {
    linksTutorial.forEach(linkTutorial => {
        linkTutorial.addEventListener("click", () => {
            window.location.href = '/';
        })
    })
    linksAbout.forEach(linkAbout => {
        linkAbout.addEventListener("click", () => {
            window.location.href = '/';
        })
    })

    linksContact.forEach(linkContact => {
        linkContact.addEventListener("click", () => {
            window.location.href = '/';
        })
    })
}
//the user is on the landing page, scroll to section position when clicking navbar links
else {
    linksTutorial.forEach(linkTutorial => {
        linkTutorial.addEventListener("click", () => {
            scrollToElement(sectionTutorial.offsetTop)
        })
    })
    linksAbout.forEach(linkAbout => {
        linkAbout.addEventListener("click", () => {
            scrollToElement(sectionAbout.offsetTop)
        })
    })

    linksContact.forEach(linkContact => {
        linkContact.addEventListener("click", () => {
            scrollToElement(sectionContact.offsetTop)
        })
    })
}


//tutorial section
const tutorialVideos = document.querySelectorAll(".tutorial-video")
const stepsMobile = document.querySelectorAll(".step-mobile")
const stepsDesktop = document.querySelectorAll(".step")
const dots = document.querySelectorAll(".dot")

if (dots) {
    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            for (let j = 0; j < dots.length; j++) {
                if (j === i) {
                    dots[j].classList += " is-active"
                } else {
                    dots[j].classList.remove("is-active")
                }
            }

            for (let k = 0; k < tutorialVideos.length; k++) {
                if (k === i) {
                    tutorialVideos[k].classList += " is-showing"
                } else {
                    tutorialVideos[k].classList.remove("is-showing")
                }
            }

            for (let l = 0; l < stepsMobile.length; l++) {
                if (l === i) {
                    stepsMobile[l].classList += " is-showing"
                } else {
                    stepsMobile[l].classList.remove("is-showing")
                }
            }
        })
    })
}

if (stepsDesktop) {
    stepsDesktop.forEach((step, i) => {
        step.addEventListener("mouseover", () => {
            stepsDesktop.forEach(stepToInActivate => {
                stepToInActivate.classList.remove("is-active")
            })
            if (!step.classList.contains("is-active")) step.classList += " is-active"
            for (let j = 0; j < dots.length; j++) {
                if (j === i) {
                    dots[j].classList += " is-active"
                } else {
                    dots[j].classList.remove("is-active")
                }
            }

            for (let k = 0; k < tutorialVideos.length; k++) {
                if (k === i) {
                    tutorialVideos[k].classList += " is-showing"
                } else {
                    tutorialVideos[k].classList.remove("is-showing")
                }
            }

            for (let l = 0; l < stepsMobile.length; l++) {
                if (l === i) {
                    stepsMobile[l].classList += " is-showing"
                } else {
                    stepsMobile[l].classList.remove("is-showing")
                }
            }
        })
    })
}


const fileExtensions = ["txt", "csv", "xls", "xlsx", "docx", "pdf", "sas", "spss", "stata", "htm", "html", "php", "asp"];
let extensionIndex = 0;
const extensionElement = document.querySelector(".file-extension")
//used to occupy same space as the absolute extension element
const extensionDummyElement = document.querySelector(".file-extension-dummy")

if (extensionElement) {
    const swapExtension = setInterval(function () {
        extensionElement.classList.remove("swap-out")
        extensionElement.classList += " swap-in"
        extensionElement.textContent = fileExtensions[extensionIndex];
        extensionDummyElement.textContent = fileExtensions[extensionIndex];
        if (extensionIndex === fileExtensions.length - 1) extensionIndex = 0;
        else extensionIndex++;
        setTimeout(() => {
            extensionElement.classList.remove("swap-in")
            extensionElement.classList += " swap-out"
        }, 1200);
    }, 1800);
}

//notifications on page fade out, remove
const notifications = document.querySelectorAll(".notification")
notifications.forEach(notification => {
    console.log("found notification")
    setTimeout(() => {
        notification.classList += " hide"
    }, 3000);
    setTimeout(() => {
        notification.remove()
    }, 3500);
})


