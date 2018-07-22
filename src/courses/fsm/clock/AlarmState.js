import State from './State';
import ClockState from './ClockState';

export default class extends State {
  constructor(clock) {
    super(clock, 'alarm');
  }

  clickH() {
    if (this.alarmClock.alarmHour + 1 === 24) {
      this.alarmClock.alarmHour = 0;
    } else {
      this.alarmClock.alarmHour += 1;
    }
  }

  clickM() {
    if (this.alarmClock.alarmMinute + 1 === 60) {
      this.alarmClock.alarmMinute = 0;
    } else {
      this.alarmClock.alarmMinute += 1;
    }
  }

  clickMode() {
    this.alarmClock.setState(ClockState);
  }
}
