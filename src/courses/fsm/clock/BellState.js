import State from './State';
import ClockState from './ClockState';

export default class extends State {
  constructor(clock) {
    super(clock, 'bell');
  }

  clickH() {}; // eslint-disable-line

  clickM() {}; // eslint-disable-line

  clickMode() {
    this.alarmClock.alarm = false;
    this.alarmClock.setState(ClockState);
  }
}
