export default class Slot {
  constructor(dt_from, dt_to) {
    this.from = dt_from.toISOString()
    this.to = dt_to.toISOString()
  }
}
