import EventEmitter from 'events';
import ClockState from './ClockState';
import BellState from './BellState';

export default class extends EventEmitter {
  constructor(minutes = 0, hours = 12, alarmMinutes = 0, alarmHours = 6) {
    super();
    this.minute = minutes;
    this.hour = hours;
    this.alarmMinute = alarmMinutes;
    this.alarmHour = alarmHours;
    this.alarm = false;
    this.setState(ClockState);
  }

  setState(Klass) {
    this.state = new Klass(this);
  }

  clickH() {
    this.emit('PushButtonH');
    this.state.clickH();
  }

  clickM() {
    this.emit('PushButtonM');
    this.state.clickM();
  }

  clickMode() {
    this.emit('PushButtonMode');
    this.state.clickMode();
  }

  longClickMode() {
    this.emit('PushButtonLongMode');
    this.alarm = !this.alarm;
  }

  isAlarmOn() {
    return this.alarm;
  }

  isAlarmTime() {
    return (this.minute === this.alarmMinute && this.hour === this.alarmHour);
  }

  minutes() {
    return this.minute;
  }

  hours() {
    return this.hour;
  }

  alarmMinutes() {
    return this.alarmMinute;
  }

  alarmHours() {
    return this.alarmHour;
  }

  getCurrentMode() {
    return this.state.curentMode();
  }

  tick() {
    if (this.minute + 1 === 60) {
      this.minute = 0;
      if (this.hour + 1 === 24) {
        this.hour = 0;
      } else {
        this.hour += 1;
      }
    } else {
      this.minute += 1;
    }

    if (this.getCurrentMode() === 'bell') {
      this.setState(ClockState);
    }

    if (this.isAlarmTime() && this.alarm) {
      this.setState(BellState);
    }
  }
}
