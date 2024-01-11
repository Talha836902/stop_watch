
const minute = document.getElementById("minute")
const second = document.getElementById("second");
const milisecond = document.getElementById("milisecond")
const startbtn = document.getElementById("start")
const pausebtn = document.getElementById("pause")
const resetbtn = document.getElementById("reset")
const bulb = document.getElementById("bulb")

const itos = (number) => {
    let str = "";
    if (number <= 9) {
        str = "0" + String(number)
    }
    else str = String(number);
    return str;
}

const colors = {
    stop: "#FF91AB",
    paused: "orangered",
    running: "lightgreen"
}
let status = {
    started: false,
    paused: false,

}
let timer = null;
let time = {
    prevTime: 0,
    startTime: 0
}
const start = () => {
    status.started = true;
    time.startTime = (new Date()).getTime();
    time.prevTime = 0;
    updateUI();
    startTimer();
}

const pause = () => {
    if (status.paused === true) {
        time.startTime = (new Date()).getTime();
        startTimer();
        status.paused = false;
    }
    else {
        stopTimer();
        time.prevTime = time.prevTime + (new Date()).getTime() - time.startTime;
        time.startTime = 0;
        status.paused = true;
    }
    updateUI();
}

const resume = () => {
    time.startTime = (new Date()).getTime();
    updateUI();
}

const reset = () => {
    status.started = false;
    status.paused = false;
    time = {
        prevTime: 0,
        startTime: 0
    };
    stopTimer();
    minute.innerText = "00";
    second.innerText = "00";
    milisecond.innerText = "00";
    updateUI();
}

const updateUI = () => {
    console.log(status)
    if (status.started === true) {
        startbtn.disabled = true;
        pausebtn.disabled = false;
        resetbtn.disabled = false;
        if (status.paused === true) {
            bulb.style.backgroundColor = colors.paused;
            bulb.style.boxShadow = "0 0 5px " + colors.paused;
        }
        else {

            bulb.style.backgroundColor = colors.running;
            bulb.style.boxShadow = "0 0 5px " + colors.running;
        }
    }
    else {
        startbtn.disabled = false;
        pausebtn.disabled = true;
        resetbtn.disabled = true;
        bulb.style.backgroundColor = colors.stop;
        bulb.style.boxShadow = "0 0 5px " + colors.stop;
    }
    if (status.paused === true) {
        pausebtn.innerText = "Resume"
    }
    else {
        pausebtn.innerText = "Pause"
    }

}
const startTimer = () => {
    timer = setInterval(updateTimer, 100);
}
const stopTimer = () => {
    clearInterval(timer)
}

const updateTimer = () => {
    let _time = time.prevTime + (new Date()).getTime() - time.startTime;
    let ms = _time % 1000;
    ms = Math.floor(ms / 100);
    milisecond.innerText = itos(ms);
    _time = Math.floor(_time / 1000);
    let ss = _time % 60;
    second.innerText = itos(ss);

    _time = Math.floor(_time / 60);
    minute.innerText = itos(_time);
}
updateUI();
startbtn.onclick = start;
pausebtn.onclick = pause;
resetbtn.onclick = reset