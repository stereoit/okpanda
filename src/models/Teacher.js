var id=0

export default class Teacher {
  constructor(name) {
    this.id = (id++)
    this.name = name
    this.slots = []
    this.lessons = []
  }
}
