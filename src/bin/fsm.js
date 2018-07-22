import AlarmClock from '../courses/fsm/clock/AlarmClock';

const clock = new AlarmClock();

clock.on('PushButtonH', () => { console.log('Push H'); });
clock.on('PushButtonM', () => { console.log('Push M'); });
clock.on('PushButtonMode', () => { console.log('Push Mode'); });
clock.on('PushButtonLongMode', () => { console.log('Push long Mode'); });

for (let i = 0; i < 18 * 60; i += 1) {
  clock.tick();
}

console.log(clock.isAlarmTime());
console.log(clock.getCurrentMode());
// expect(clock.isAlarmTime()).toBe(true);
// expect(clock.getCurrentMode()).toBe('clock');
clock.clickM();
clock.clickH();

clock.tick();
console.log(clock.getCurrentMode());
// expect(clock.getCurrentMode()).toBe('clock');


// console.log(`${clock.hours()}:${clock.minutes()}`);
// console.log(`${clock.alarmHours()}:${clock.alarmMinutes()}`);

// console.log(clock.isAlarmOn());
// clock.longClickMode();
// console.log(clock.isAlarmOn());

// console.log(clock.getCurrentMode());
// console.log(clock.isAlarmTime());
// clock.tick();

// console.log(clock.getCurrentMode());
// console.log(`${clock.hours()}:${clock.minutes()}`);
// console.log(`${clock.alarmHours()}:${clock.alarmMinutes()}`);
// console.log(clock.isAlarmTime());

// clock.tick();
// console.log(`${clock.hours()}:${clock.minutes()}`);
// console.log(`${clock.alarmHours()}:${clock.alarmMinutes()}`);
// console.log(clock.getCurrentMode());
// console.log(clock.isAlarmTime());
