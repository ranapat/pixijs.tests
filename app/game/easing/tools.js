const TO_DEGREES = 180 / Math.PI;

export default class Tools {
  static angleBetweenPoints(a, b) {
    return Math.atan2(b.y - a.y, b.x - a.x) * TO_DEGREES;
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
}
