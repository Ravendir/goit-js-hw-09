import styles from '../css/common.css';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const timeRef = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

function renderTimer(selectedDate, currentDate) {
  const { days, hours, minutes, seconds } = convertMs(selectedDate - currentDate);
  timeRef.days.textContent = addLeadingZero(days);
  timeRef.hours.textContent = addLeadingZero(hours);
  timeRef.minutes.textContent = addLeadingZero(minutes);
  timeRef.seconds.textContent = addLeadingZero(seconds);
  return timeRef;
}

let timerId = null;

function onStartClick() {
  timerId = setInterval(() => {
    if (selectedDate <= new Date()) {
      clearInterval(timerId);
      butStartRef.setAttribute('disabled', true);
      return;
    }

    renderTimer(selectedDate, new Date().getTime());
  }, 1000);
}

function addLeadingZero(int) {
  const value = int.toString();
  if (value.length < 3) {
    return value.padStart(2, 0);
  }
  return value;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

let selectedDate = null;
let currentDate = null;

const butStartRef = document.querySelector('button[data-start]');

butStartRef.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    currentDate = new Date();

    if (selectedDate.getTime() < currentDate.getTime()) {
      butStartRef.setAttribute('disabled', true);
      Notify.failure('Really???? Choose the date in the future!');
      return;
    }

    butStartRef.removeAttribute('disabled');
    renderTimer(selectedDate, currentDate);
    clearInterval(timerId);
  },
};

flatpickr('#datetime-picker', options);

butStartRef.addEventListener('click', onStartClick);
