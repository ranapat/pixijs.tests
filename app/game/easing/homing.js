import Ease from './ease';
import Tools from './tools';

export default class Homing extends Ease {
  constructor(target, actor, step, callback) {
    super(target, callback);

    this.actor = actor;
    this.step = step;
    this.initialDestination = Tools.offsetWithStep(
      this.target.position,
      this.target.angle - this.target.fireAngle,
      200
    );
    this.stepsBeforHoming = 50;
    this.steps = 0;
  }

  get homing() {
    return this.steps >= this.stepsBeforHoming;
  }

  get next() {
    const position = this.homing ? this.actor.position : this.initialDestination;

    return Tools.shiftWithStep(this.target.position, position, this.step);
  }

  get ready() {
    const position = this.actor.position;

    const deltaX = Math.abs(position.x - this.target.x);
    const deltaY = Math.abs(position.y - this.target.y);
    return deltaX < 45 && deltaY < 45;
  }

  get angle() {
    const position = this.homing ? this.actor.position : this.initialDestination;

    return Tools.angleBetweenPoints(this.target, position);
  }

  poke() {
    this.callback(this.target, this.next, this.angle, false);

    this.steps += 1;
  }

  finish() {
    this.callback(this.target, this.actor.position, this.angle, true);
  }
}
