import State from './State';
import AlarmState from './AlarmState';

export default class extends State {
  constructor(clock) {
    super(clock, 'clock');
  }

  clickH() {
    if (this.alarmClock.hour + 1 === 24) {
      this.alarmClock.hour = 0;
    } else {
      this.alarmClock.hour += 1;
    }
  }

  clickM() {
    if (this.alarmClock.minute + 1 === 60) {
      this.alarmClock.minute = 0;
    } else {
      this.alarmClock.minute += 1;
    }
  }

  clickMode() {
    this.alarmClock.setState(AlarmState);
  }
}
