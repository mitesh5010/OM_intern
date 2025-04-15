document.addEventListener('DOMContentLoaded',()=>{

  const navButtons = document.querySelectorAll('.nav-btn');

  function setActiveButton(clickedButton) {
    navButtons.forEach(btn => btn.classList.remove('active'));
    clickedButton.classList.add('active');
  }

  //Navigation btn
  document.getElementById('worldclock').addEventListener('click',(e)=>{
    setActiveButton(e.target);
    document.getElementById('worldClockSection').style.display = 'block';
    document.getElementById('timerSection').style.display = 'none';
    document.getElementById('stopwatchSection').style.display = 'none';
    document.getElementById('alarmSection').style.display = 'none';
    showWorldClock();
  });

  document.getElementById('timer').addEventListener('click',(e)=>{
    setActiveButton(e.target);
    document.getElementById('worldClockSection').style.display = 'none';
    document.getElementById('timerSection').style.display = 'block';
    document.getElementById('stopwatchSection').style.display = 'none';
    document.getElementById('alarmSection').style.display = 'none';
  });

  document.getElementById('stopwatch').addEventListener('click',(e)=>{
    setActiveButton(e.target);
    document.getElementById('worldClockSection').style.display = 'none';
    document.getElementById('timerSection').style.display = 'none';
    document.getElementById('stopwatchSection').style.display = 'block';
    document.getElementById('alarmSection').style.display = 'none';
  });

  document.getElementById('alarm').addEventListener('click',(e)=>{
    setActiveButton(e.target);
    document.getElementById('worldClockSection').style.display = 'none';
    document.getElementById('timerSection').style.display = 'none';
    document.getElementById('stopwatchSection').style.display = 'none';
    document.getElementById('alarmSection').style.display = 'block';
  });

  document.getElementById('worldclock').click();

//WorldClock code start...

function showWorldClock() {
  const countries = [
    { name: 'New York', timezone: 'America/New_York' },
    { name: 'London', timezone: 'Europe/London' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo' },
    { name: 'Sydney', timezone: 'Australia/Sydney' },
    { name: 'Paris', timezone: 'Europe/Paris' }
  ];

  const worldClockContainer = document.getElementById('worldClockTimes');
  worldClockContainer.innerHTML = '';

  countries.forEach(country => {
    const countryDiv = document.createElement('div');
    countryDiv.classList.add('country-time');
    countryDiv.innerHTML = `<strong>${country.name}:</strong> <span id="time-${country.name}">Loading...</span>`;
    worldClockContainer.appendChild(countryDiv);
    updateTime(country.timezone, country.name);
  });

  setInterval(() => {
    countries.forEach(country => {
      updateTime(country.timezone, country.name);
    });
  }, 1000);
}

function updateTime(timezone, country) {
  const timeElement = document.getElementById(`time-${country}`);
  const options = { timeZone: timezone, hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const time = new Date().toLocaleTimeString('en-US', options);
  timeElement.textContent = time;
}

// world clock time code End

// Timer Code Start ...

function populateSelect(id, max) {
  const select = document.getElementById(id);
  for (let i = 0; i <= max; i++) {
      const option = document.createElement('option');
      option.value = i.toString().padStart(2, '0'); 
      option.textContent = i.toString().padStart(2, '0');
      select.appendChild(option);
  }
}

populateSelect('hourSelect', 23); 
populateSelect('minSelect', 59); 
populateSelect('secSelect', 59); 

let timer;
let timeLeft = { hours: 0, minutes: 0, seconds: 0 };
let isRunning = false;

function updateDisplay() {
    document.getElementById('hourSelect').value = timeLeft.hours.toString().padStart(2, '0');
    document.getElementById('minSelect').value = timeLeft.minutes.toString().padStart(2, '0');
    document.getElementById('secSelect').value = timeLeft.seconds.toString().padStart(2, '0');
}

function startTimer() {
    if (isRunning) return;

    timeLeft.hours = parseInt(document.getElementById('hourSelect').value);
    timeLeft.minutes = parseInt(document.getElementById('minSelect').value);
    timeLeft.seconds = parseInt(document.getElementById('secSelect').value);

    if (timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
        alert("Please set a time greater than 0!");
        return;
    }

    isRunning = true;
    timer = setInterval(() => {
        if (timeLeft.seconds > 0) {
            timeLeft.seconds--;
        } else if (timeLeft.minutes > 0) {
            timeLeft.minutes--;
            timeLeft.seconds = 59;
        } else if (timeLeft.hours > 0) {
            timeLeft.hours--;
            timeLeft.minutes = 59;
            timeLeft.seconds = 59;
        }

        updateDisplay();

        if (timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
            clearInterval(timer);
            isRunning = false;
            alert("Timer finished!");
        }
    }, 1000);

}

function pauseTimer() {
  if (isRunning) {
      clearInterval(timer);
      isRunning = false;
      document.getElementById('pause').textContent = 'Resume';
  }else{
    startTimer();
    document.getElementById('pause').textContent = 'Pause';
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = { hours: 0, minutes: 0, seconds: 0 };
  updateDisplay();
  
  document.getElementById('hourSelect').value = '00';
  document.getElementById('minSelect').value = '00';
  document.getElementById('secSelect').value = '00';
}

updateDisplay();

document.querySelector('#start').addEventListener('click', startTimer);
document.querySelector('#pause').addEventListener('click',pauseTimer);
document.querySelector('#reset').addEventListener('click',resetTimer);
  
//Timer Code Ends...

//stopwatch code start....
function stopStopwatch() {
  

    let startTime;
    let elapsedTime = 0;
    let timerInterval;
    let lapCounter = 1;

    function updateDisplay() {
      const time = new Date(elapsedTime);
      const hours = time.getUTCHours().toString().padStart(2, '0');
      const minutes = time.getUTCMinutes().toString().padStart(2, '0');
      const seconds = time.getUTCSeconds().toString().padStart(2, '0');
      document.getElementById('display').textContent = `${hours}:${minutes}:${seconds}`;
    }
    function start() {
      startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
          elapsedTime = Date.now() - startTime;
          updateDisplay();
        }, 1000);
    }

    document.getElementById('startStopBtn').addEventListener('click', () => {
      if (!timerInterval) {
        start();
      }
    });

    document.getElementById('pauseBtn').addEventListener('click', () => {
      if(timerInterval){
      clearInterval(timerInterval);
      timerInterval = null;
      document.getElementById('pauseBtn').textContent = 'Resume';
    }else{
        document.getElementById('pauseBtn').textContent = 'Pause';
        start();
      }
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
      clearInterval(timerInterval);
      timerInterval = null;
      elapsedTime = 0;
      lapCounter = 1;
      updateDisplay();
      document.getElementById('laps').innerHTML = '';
      document.getElementById('pauseBtn').textContent = 'Pause';
    });

    document.getElementById('lapBtn').addEventListener('click', () => {
      if (timerInterval) {
        const time = new Date(elapsedTime);
        const hours = time.getUTCHours().toString().padStart(2, '0');
        const minutes = time.getUTCMinutes().toString().padStart(2, '0');
        const seconds = time.getUTCSeconds().toString().padStart(2, '0');
        const lapTime = `${hours}:${minutes}:${seconds}`;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        document.getElementById('laps').appendChild(lapItem);
        lapCounter++;
      }
    });
  }
  stopStopwatch();
  //stopwatch code End///

  //Alarm Code Start
  function alarmSetup() {
    let alarmTime = null;
    let alarmTimeout = null;

    function updateTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const currentTimeStr = `${hours}:${minutes}:${seconds}`;
      document.getElementById('currentTime').textContent = currentTimeStr;

      if (alarmTime === `${hours}:${minutes}`) {
        alert("Alarm! It's time!");
        clearTimeout(alarmTimeout);
        alarmTime = null;
        document.getElementById('alarmStatus').textContent = '';
      }
    }

    document.getElementById('setAlarmBtn').addEventListener('click', () => {
      const input = document.getElementById('alarmTime').value;
      if (!input) {
        alert('Please select a valid time for the alarm.');
        return;
      }
      alarmTime = input;
      document.getElementById('alarmStatus').textContent = `Alarm set for ${alarmTime}`;
    });

    document.getElementById('cancelAlarmBtn').addEventListener('click', () => {
      alarmTime = null;
      document.getElementById('alarmStatus').textContent = 'Alarm canceled.';
    });

    // Update time every second
    setInterval(updateTime, 1000);
    updateTime(); 
  }
  alarmSetup();
});



