const TO_RADIANS = Math.PI / 180;

export default class Tools {
  static angleBetweenPoints(a, b) {
    return Math.atan2(b.y - a.y, b.x - a.x);
  }

  static rotatePoint(point, angle) {
    const sin = Math.sin(angle * TO_RADIANS);
    const cos = Math.cos(angle * TO_RADIANS);

    const x = (point.x * cos) - (point.y * sin);
    const y = (point.y * cos) + (point.x * sin);

    return { x, y };
  }

  static sumPoints(a, b) {
    return { x: a.x + b.x, y: a.y + b.y };
  }

  static shiftWithStep(initial, destination, step) {
    let result;

    const distance = Math.hypot(destination.x - initial.x, destination.y - initial.y);

    if (distance > step) {
      const x = ((step * (destination.x - initial.x)) + (distance * initial.x)) / distance;
      const y = ((step * (destination.y - initial.y)) + (distance * initial.y)) / distance;

      result = { x, y };
    } else {
      result = destination;
    }

    return result;
  }

  static offsetWithStep(initial, angle, step) {
    const x = (Math.cos(angle * TO_RADIANS) * step) + initial.x;
    const y = (Math.sin(angle * TO_RADIANS) * step) + initial.y;

    return { x, y };
  }

  static randomInt(min, max) {
    const minInt = Math.ceil(min);
    const maxInt = Math.floor(max);
    return Math.floor(Math.random() * (maxInt - minInt)) + minInt;
  }
}
