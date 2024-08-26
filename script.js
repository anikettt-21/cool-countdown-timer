let countdownInterval;
let totalTime;
let timeLeft;

document.getElementById('startBtn').addEventListener('click', function() {
    let minutes = parseInt(document.getElementById('minutes').value);
    let seconds = parseInt(document.getElementById('seconds').value);

    if (isNaN(minutes)) minutes = 0;
    if (isNaN(seconds)) seconds = 0;

    totalTime = timeLeft = minutes * 60 + seconds;

    startCountdown();
});

document.getElementById('pauseBtn').addEventListener('click', function() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    } else {
        startCountdown();
    }
});

document.getElementById('resetBtn').addEventListener('click', function() {
    clearInterval(countdownInterval);
    countdownInterval = null;
    document.getElementById('countdown').innerHTML = "00:00";
    document.querySelector('.progress').style.width = '0%';
    document.body.style.background = 'linear-gradient(135deg, #ff5f6d, #ffc371)';
});

function startCountdown() {
    countdownInterval = setInterval(function() {
        let minutesLeft = Math.floor(timeLeft / 60);
        let secondsLeft = timeLeft % 60;

        if (secondsLeft < 10) secondsLeft = '0' + secondsLeft;

        document.getElementById('countdown').innerHTML = `${minutesLeft}:${secondsLeft}`;

        let progressPercent = ((totalTime - timeLeft) / totalTime) * 100;
        document.querySelector('.progress').style.width = `${progressPercent}%`;

        // Change background color based on time left
        let color1 = `hsl(${(1 - progressPercent / 100) * 120}, 100%, 50%)`;
        let color2 = `hsl(${progressPercent * 1.2}, 100%, 50%)`;
        document.body.style.background = `linear-gradient(135deg, ${color1}, ${color2})`;

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = "Time's up!";
            document.getElementById('alarmSound').play();
        }

        timeLeft--;
    }, 1000);
}
