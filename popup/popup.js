let startBtnDisabled = false;
let stopBtnDisabled = true;
//chech button disabled states
window.onload = ()=>{ 
    chrome.storage.local.get(['startBtnDisabled'], (result) => {
        console.log(result);
        startBtnDisabled = result.startBtnDisabled;
        stopBtnDisabled = !result.startBtnDisabled;
        console.log(startBtnDisabled)
        console.log(stopBtnDisabled)
        $('#start').prop('disabled', startBtnDisabled);
        $('#stop').prop('disabled', stopBtnDisabled);
    })   
}

//When start button is clicked send message to background script
$('#start').click(function () {
    chrome.runtime.sendMessage({message: "start"});
    $('#start').prop('disabled', true);
    $('#stop').prop('disabled', false);
});

//when stop button is clicked send message to background script
$('#stop').click(function () {
    chrome.runtime.sendMessage({ message: "stop" });
    $('#stop').prop('disabled', true);
    $('#start').prop('disabled', false);
});

//listen for value changes in chrome storage
chrome.storage.onChanged.addListener((changes, areaName)=>{
    if (changes.timeVal){
        $('#timerValue').html(changes.timeVal.newValue);
    }
    if (changes.minutes && changes.minutes.newValue == 1){
        $('#stop').prop('disabled', true);
        $('#start').prop('disabled', false);
    }
})
