export default class {
  constructor(clock, mode) {
    this.alarmClock = clock;
    this.mode = mode;
  }

  curentMode() {
    return this.mode;
  }
}
