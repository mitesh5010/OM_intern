document.addEventListener('DOMContentLoaded', function () {
  // Navigation Buttons
  document.getElementById('worldClockBtn').addEventListener('click', function () {
    document.getElementById('worldClockSection').style.display = 'block';
    document.getElementById('alarmSection').style.display = 'none';
    document.getElementById('stopwatchSection').style.display = 'none';
    document.getElementById('timerSection').style.display = 'none';
    showWorldClock();
  });

  document.getElementById('alarmBtn').addEventListener('click', function () {
    document.getElementById('worldClockSection').style.display = 'none';
    document.getElementById('alarmSection').style.display = 'block';
    document.getElementById('stopwatchSection').style.display = 'none';
    document.getElementById('timerSection').style.display = 'none';
  });

  document.getElementById('stopwatchBtn').addEventListener('click', function () {
    document.getElementById('worldClockSection').style.display = 'none';
    document.getElementById('alarmSection').style.display = 'none';
    document.getElementById('stopwatchSection').style.display = 'block';
    document.getElementById('timerSection').style.display = 'none';
  });
  document.getElementById('timerBtn').addEventListener('click', function () {
    document.getElementById('worldClockSection').style.display = 'none';
    document.getElementById('alarmSection').style.display = 'none';
    document.getElementById('stopwatchSection').style.display = 'none';
    document.getElementById('timerSection').style.display = 'block';
  });
  
  

  


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

  // Alarm
  const activeAlarms = [];

  document.getElementById('addAlarmBtn').addEventListener('click', function () {
    addAlarmTime();
  });

  function addAlarmTime() {
    const alarmTimesContainer = document.getElementById('alarmTimes');

    const alarmDiv = document.createElement('div');
    alarmDiv.classList.add('alarm-time');

    alarmDiv.innerHTML = `
      <input type="time" class="alarm-input" />
      <button class="alarm-toggle">On</button>
    `;

    alarmTimesContainer.appendChild(alarmDiv);

    let notification = document.getElementById('alarmNotification');
    if (!notification) {
      notification = document.createElement('div');
      notification.id = 'alarmNotification';
      notification.style.display = 'none';
      notification.style.color = 'green';
      notification.style.fontWeight = 'bold';
      notification.style.marginTop = '10px';
      alarmTimesContainer.appendChild(notification);
    }

    const toggleBtn = alarmDiv.querySelector('.alarm-toggle');
    const input = alarmDiv.querySelector('.alarm-input');

    toggleBtn.addEventListener('click', function () {
      const timeInput = input.value;

      if (!timeInput) {
        alert("Please select a time for the alarm.");
        return;
      }

      if (toggleBtn.textContent === 'On') {
        toggleBtn.textContent = 'Off';
        toggleBtn.style.backgroundColor = 'red';

        const index = activeAlarms.indexOf(timeInput);
        if (index !== -1) activeAlarms.splice(index, 1);
        notification.textContent = '';
      } else {
        toggleBtn.textContent = 'On';
        toggleBtn.style.backgroundColor = '#4CAF50';

        if (!activeAlarms.includes(timeInput)) {
          activeAlarms.push(timeInput);
        }

        notification.textContent = `⏰ Alarm set for ${timeInput}`;
        notification.style.display = 'block';
        setTimeout(() => {
          notification.style.display = 'none';
        }, 3000);
      }
    });
  }

  setInterval(() => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5); 

    if (activeAlarms.includes(currentTime)) {
      alert(`⏰ Alarm ringing for ${currentTime}!`);
      const index = activeAlarms.indexOf(currentTime);
      if (index !== -1) {
        activeAlarms.splice(index, 1);
      }
    }
  }, 1000);

  // Stopwatch //
  let stopwatchInterval;
  let stopwatchTime = 0;
  let isRunning = false;

  document.getElementById('startStopBtn').addEventListener('click', function () {
    if (isRunning) {
      stopStopwatch();
    } else {
      startStopwatch();
    }
  });

  document.getElementById('lapBtn').addEventListener('click', function () {
    recordLap();
  });

  function startStopwatch() {
    stopwatchInterval = setInterval(function () {
      stopwatchTime++;
      displayTime();
    }, 1000);
    document.getElementById('startStopBtn').textContent = 'Stop';
    isRunning = true;
  }

  function stopStopwatch() {
    clearInterval(stopwatchInterval);
    document.getElementById('startStopBtn').textContent = 'Start';
    isRunning = false;
  }

  function displayTime() {
    const hours = Math.floor(stopwatchTime / 3600);
    const minutes = Math.floor((stopwatchTime % 3600) / 60);
    const seconds = stopwatchTime % 60;

    document.getElementById('stopwatchTime').textContent =
      `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

  function pad(number) {
    return number < 10 ? `0${number}` : number;
  }

  function recordLap() {
    const lapTime = stopwatchTime;
    const lapDiv = document.createElement('div');
    lapDiv.classList.add('lap-time');

    const hours = Math.floor(lapTime / 3600);
    const minutes = Math.floor((lapTime % 3600) / 60);
    const seconds = lapTime % 60;

    lapDiv.textContent = `Lap: ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    document.getElementById('laps').appendChild(lapDiv);
  }

 

  document.querySelectorAll('.preset-timer').forEach(button => {
    button.addEventListener('click', function () {
      const minutes = parseInt(this.getAttribute('data-minutes'));
      startTimer(minutes * 60);
    });
  });

  document.getElementById('startCustomTimer').addEventListener('click', function () {
    const customMinutes = parseInt(document.getElementById('customTimer').value);
    if (!isNaN(customMinutes) && customMinutes > 0) {
      startTimer(customMinutes * 60);
    } else {
      alert("Please enter a valid number of minutes.");
    }
  });
});
