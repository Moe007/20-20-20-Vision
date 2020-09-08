let firstTime = true;

//Listen for message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message == "timerFinished") {
        console.log('HOORAY')
        if (firstTime === true ) {
            $('body').append("<div class='visionModal'></div>");
            $('.visionModal').append("<div class='visionModal-dialog'></div>");
            $('.visionModal-dialog').append("<h3>Time to look away from the screen</h3>");
            $('.visionModal-dialog').append("<h5>Here are some things you should do:</h5>");
            $('.visionModal-dialog').append("<ul></ul>");
            $('.visionModal-dialog ul').append("<li>Look at an object ,about ,20 feet away for 20 seconds</li>");
            $('.visionModal-dialog ul').append("<li>Slowly blink 20 times</li>");
            $('.visionModal-dialog ul').append("<li>Stand up from your seat and do some mobility exercises</li>");
            $('.visionModal-dialog').append("<button id='visionClose'>Close</button>");
            $('.visionModal-dialog').append("<button id='visionCloseStart'>Close and start timer again</button>");
            firstTime = false;            
        } else {
            $(".hideModal").removeClass("hideModal").addClass("visionModal");
        }
        $('#visionClose').on("click", (e)=>{
            $(".visionModal").removeClass("visionModal").addClass("hideModal");
        })

        $('#visionCloseStart').on("click", (e) => {
            $(".visionModal").removeClass("visionModal").addClass("hideModal");
            chrome.runtime.sendMessage({ message: "start" });
        })

    }
})
