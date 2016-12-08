const TO_DEGREES = 180 / Math.PI;

export default class Tools {
  static angleBetweenPoints(a, b) {
    return Math.atan2(b.y - a.y, b.x - a.x) * TO_DEGREES;
  }
}
