let getStartedButton = document.getElementById("scrollToCreateButton")
let createSection = document.getElementById("createSectionBack")
let urlSelection = document.getElementById("urlSectionBack")
let fromDateInput = document.getElementById("fromDateInput")
let toDateInput = document.getElementById("toDateInput")
let messageInput = document.getElementById("messageInput")
let createCountdownButton = document.getElementById("createCountdownButton")
let countdownNameInput = document.getElementById("nameInput")
let countdownAuthorInput = document.getElementById("authorInput")
let copyUrlButton = document.getElementById("copyUrlButton")
let urlOutput = document.getElementById("urlOutput")

const date = new Date();
new ClipboardJS('#copyUrlButton');

// Wait for page to load
window.addEventListener('load', () => {
    // Check if everything is completed
    setInterval(function () {
        if (countdownNameInput.value != "" && toDateInput.value != "") {
            // Enable create button 
            createCountdownButton.disabled = false
        } else {
            // Disable create button 
            createCountdownButton.disabled = true
        }
    }, 50)

    //Add particles to homepage
    particlesJS.load('homeSectionBack', './js/particles.json', function () {
        console.log('callback - particles.js config loaded');
    });

    //Set default fromDate to today
    setCurrentDay()

    //Scroll into view when "Get started" button is pressed
    getStartedButton.addEventListener("click", function () {
        createSection.scrollIntoView();
    })

    //Create countdown 
    createCountdownButton.addEventListener("click", function () {
        createCountdown()
    })

    // copy to clipboard: button feedback only
    copyUrlButton.addEventListener("click", function () {
        copyUrlButton.innerText = "Copied!"

        setTimeout(function () {
            copyUrlButton.innerText = "Copy to clipboard"
        }, 1000)
    })


    /**
     * FUNCTIONS
     */
    function setCurrentDay() {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        fromDateInput.textContent = `${day}/${month}/${year}`
    }

    function createCountdown() {
        let name = countdownNameInput.value
        let author = countdownAuthorInput.value
        let toDate = toDateInput.value
        let message = messageInput.value

        // insert data in a json string
        let data = `
    {
        "n" : "${name}",
        "a" : "${author}",
        "t" : "${toDate}",
        "m" : "${message}"
    }`

        // Encode the data using base64 
        let encodedData = btoa(data)
        urlSelection.style.display = "block"
        urlSelection.scrollIntoView()
        let hostname = window.location.host
        // Check if website is running on github
        if (hostname == "armadio2902.github.io") {
            hostname = "armadio2902.github.io/DaysUntil"
        }
        urlOutput.textContent = "http://" + hostname + "/countdown.html" + "?" + encodedData
    }

});

