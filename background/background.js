//Initialise easytimer
let timer = new easytimer.Timer();
//Listen for message
chrome.runtime.onMessage.addListener((request,sender,sendResponse) => {
    //If message is "start", then start the timer
    if (request.message == "start") {
        timer.start();
        let timeVal = timer.getTimeValues().toString();
        let minutes = timer.getTimeValues().minutes;
        //button disabled states
        let startBtnDisabled = true;
        //listen for every updated second
        timer.addEventListener('secondsUpdated', (e) =>{
            //set new values on every updated second
            timeVal = timer.getTimeValues().toString();
            minutes = timer.getTimeValues().minutes;
            //check if 20 minutes is up
            if (minutes == 20) {
                timer.stop();
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, { message: "timerFinished" });
                });
                timeVal = timer.getTimeValues().toString();
                startBtnDisabled = false;
            }
            //send values to storage
            chrome.storage.local.set(
                {
                    timeVal: timeVal, 
                    minutes: minutes, 
                    startBtnDisabled: startBtnDisabled, 
                }, () =>{
            })
        })
    } else if(request.message == 'stop'){
        timer.stop();
        timeVal = timer.getTimeValues().toString();
        startBtnDisabled = false;
        chrome.storage.local.set(
            { 
                timeVal: timeVal,
                startBtnDisabled: startBtnDisabled,
            }, () => {
        })
    }
})

