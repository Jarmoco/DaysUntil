let getStartedButton = document.getElementById("scrollToCreateButton")
let createSection = document.getElementById("createSectionBack")
let fromDateInput = document.getElementById("fromDateInput")

const date = new Date();

// Wait for page to load
window.addEventListener('load', () => {
    //Add particles to homepage
    particlesJS.load('homeSectionBack', './js/particles.json', function () {
        console.log('callback - particles.js config loaded');
    });

    //Scroll into view when "Get started" button is pressed
    getStartedButton.addEventListener("click", function () {
        createSection.scrollIntoView();
    })

    //Set default fromDate to today
    setCurrentDay()
});

// Functions

function setCurrentDay() {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    fromDateInput.value = `${year}-${month}-${day}`
}