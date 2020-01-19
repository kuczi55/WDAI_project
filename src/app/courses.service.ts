import { Injectable } from '@angular/core';
import { Course } from './course';
import { COURSES } from './courses-list-mock';
import { FirestoreService } from './firestore.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  courses: Array<Course> = [];

  constructor(private firestore: FirestoreService) {
    this.getArrayOfCourses();
    // this.calculateRatings();
  }

  getArrayOfCourses() {
    this.firestore.getCourses().subscribe(data => {
      this.courses = data.map(e => {
        // tslint:disable-next-line: no-shadowed-variable
        const data = e.payload.doc.data() as object;
        const id = e.payload.doc.id;
        return {id, ...data} as Course;
      });
    });
  }

  getObservableOfCourses() {
    return this.firestore.getCourses().pipe(map( changes => {
      return changes.map(a => {
          const data = a.payload.doc.data() as Course;
          const id = a.payload.doc.id;
          return { id, ...data } as Course;
      });
  }));
}

  getCourses(): Array<Course> {
    return this.courses;
  }

  getCourse(i: string): Course {
    this.getArrayOfCourses();
    // tslint:disable-next-line: triple-equals
    return this.courses.find((el) => el.id == i);
  }

  addCourse( courseToAdd: Course ): void {
    // tslint:disable-next-line: variable-name
    const courses_numb: number = this.courses.length;
    this.courses.push(courseToAdd);
    this.firestore.createData(courseToAdd);
    if (this.courses.length > courses_numb) { alert('Kurs został dodany pomyślnie!'); } else {alert('Wystąpił błąd!'); }
  }

  deleteCourse( courseToDelete: Course ): void {
    // tslint:disable-next-line: variable-name
    const courses_numb: number = this.courses.length;
    const i: number = this.courses.indexOf(courseToDelete);
    this.courses.splice(i, 1);
    this.firestore.deleteData(courseToDelete);
    if (this.courses.length < courses_numb) { alert('Kurs został usunięty pomyślnie!'); } else {alert('Wystąpił błąd!'); }
  }

  rateCourse( course: Course, rating: number, mail: string): void {
    if (rating == null || rating < 0 || rating > 5 || mail == null || this.hasRated(course, mail)) { return; }
    course.ratingSum = course.ratingSum + rating;
    //course.ratingNo = course.ratingNo + 1;
    course.ratedEmails.push(mail);
    //this.calculateRatings();
    this.firestore.updateData(course);
  }

  hasRated(course: Course, mail: string) {
    return course.ratedEmails.includes(mail);
  }

  isEnrolled(course: Course, mail: string) {
    return course.enrolledEmails.includes(mail);
  }

  // calculateRatings(): void {
  //   for (const course of this.courses) {
  //     if (course.ratingNo > 0) {course.rating = course.ratingSum / course.ratingNo; } else { course.rating = undefined; }
  //   }
  // }

  freeNumber(course: Course): number {
    return course.capacity - course.enrolledEmails.length;
  }

  enrollCourse(course: Course, mail: string) {
    if (mail == null || this.freeNumber(course) <= 0) { return; }
    if (!this.isEnrolled(course, mail)) {
      course.enrolledEmails.push(mail);
      this.firestore.updateData(course);
    } else { return; }

  }

  editCourse(updated: Course) {
    this.firestore.updateData(updated);
  }

}
