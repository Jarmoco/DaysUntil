let cdName = document.getElementById("cdName")
let cdAuthor = document.getElementById("cdAuthor")
let cdMessage = document.getElementById("cdMessage")
let counter = document.getElementById("counter")

window.addEventListener('load', () => {
    // Check if the url has a parameter
    hasQuery()

    function hasQuery() {
        let url = window.location.href;
        var arr = url.split('?');
        if (arr.length > 1 && arr[1] !== '') {
            console.log('params found: decoding string and showing countdown');
            let json = decode(arr[1])
            show(json)
            //Calculate timer every second
            setInterval(function () {
                // Get current date
                let date = new Date();

                // Get current minutes and hours
                let minutes = date.getMinutes();
                let hours = date.getHours();
                
                // Get final date
                let finalDate = json.t
                let finalYear = parseInt(finalDate.slice(0,4));
                let finalMonth = parseInt(finalDate.slice(5,7))
                let finalDay = parseInt(finalDate.slice(8,10))
                // Format the final date (it's needed for the calculations)
                let finalDateFormatted = new Date(`${finalYear}/${finalMonth}/${finalDay}`)

                //Calculate minutes, hours and days left
                let minutesLeft = 60 - minutes
                let hoursLeft
                if (minutes != 0) {
                    hoursLeft = 23 - hours
                } else {
                    hoursLeft = 24 - hours
                }
                let msLeft = Math.abs(finalDateFormatted - date);
                let daysLeft = Math.ceil((msLeft / (1000 * 60 * 60 * 24)) - 1); 
                // Update the countdown
                updateCD(daysLeft, hoursLeft, minutesLeft)
            }, 1000)
        } else {
            console.log('params not found: cannot show countdown')
            counter.textContent = "Error"
            cdMessage.textContent = "Something went wrong"
            document.getElementById("byLabel").style.display = "none"
        }
    }

    function decode(param) {
        let decodedData = atob(param)
        let jsonData = JSON.parse(decodedData)
        return jsonData
    }

    function show(jsonData) {
        if (jsonData.n == "" || jsonData.t == "") {
            counter.textContent = "Error"
            cdMessage.textContent = "Something went wrong"
        }
        cdName.textContent = jsonData.n
        if (jsonData.a != "") {
            cdAuthor.textContent = jsonData.a
        } else {
            document.getElementById("byLabel").style.display = "none"
        }

        if (jsonData.m != "") {
            cdMessage.textContent = "left until " + jsonData.m
        } else {
            cdMessage.textContent = "left"
        }
        
    }

    function updateCD(d, h, m) {
        if (d < 10) {
            d = "0" + d
        }
        if (h < 10) {
            h = "0" + h
        }
        if (m < 10) {
            m = "0" + m
        }
        let countdown = `${d}:${h}:${m}`
        counter.textContent = countdown
    }
})