import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import '../css/common.css';

const buttonStart = document.querySelector('button[data-start]');
let inputTextEl = document.querySelector('#datetime-picker');
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0])

    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      buttonStart.setAttribute('disabled', true);
      return intervalId;
    } else {
      buttonStart.removeAttribute('disabled', '');
      buttonStart.addEventListener('click', () => {
        buttonStart.setAttribute('disabled', '');
        inputTextEl.setAttribute('disabled', '');
        inputTextEl = setInterval(timeOut, 1000);
      });
      function timeOut() {
        const getTimeComponents = selectedDates[0] - new Date();

        if (getTimeComponents <= 0) {
          Notiflix.Notify.success('Timer is Over!');
          clearInterval(inputTextEl);
          return;
        }
        
        const { days, hours, minutes, seconds } = convertMs(getTimeComponents);

        document.querySelector('span[data-days]').textContent = pad(days);
        document.querySelector('span[data-hours]').textContent = pad(hours);
        document.querySelector('span[data-minutes]').textContent = pad(minutes);
        document.querySelector('span[data-seconds]').textContent = pad(seconds);     
      }
    }
  },
};

function pad(value) {
  return String(value).padStart(2, 0);
};

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

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

flatpickr('input#datetime-picker', options);









