import { Injectable } from '@angular/core';
import { Course } from './course';
import { COURSES } from './courses-list-mock';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  courses: Array<Course>;

  constructor() {
    this.courses = COURSES;
  }

  getCourses(): Array<Course> {
    return this.courses;
  }

  getCourse( i: number ): Course {
    return this.courses[i];
  }

  addCourse( courseToAdd: Course ): void {
    this.courses.push(courseToAdd);
  }

  deleteCourse( courseToDelete: Course ): void {
    const i: number = this.courses.indexOf(courseToDelete);
    this.courses.splice(i, 1);
  }

  rateCourse( course: Course, rating: number): void {
    course.ratingSum = course.ratingSum + rating;
    course.ratingNo = course.ratingNo + 1;
    console.log(rating);
  }
}
