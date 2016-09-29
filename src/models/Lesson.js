export default class Lesson {
  constructor(when, to, student, teacher) {
    this.when = when.toISOString()
    this.to = to.toISOString()
    this.student = student.id
    this.teacher = teacher.id
  }
}
