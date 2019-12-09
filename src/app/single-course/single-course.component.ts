import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../course';

@Component({
  selector: 'app-single-course',
  templateUrl: './single-course.component.html',
  styleUrls: ['./single-course.component.css']
})
export class SingleCourseComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('course') course: Course;

  // tslint:disable-next-line: no-input-rename
  @Input('isE') isEven: boolean;

  @Output() deletedCourse = new EventEmitter<Course>();
  @Output() ratedCourse = new EventEmitter<{course: Course, rating: number}>();

  constructor() { }

  ngOnInit() {
  }

  deleteCourse() {
    this.deletedCourse.emit(this.course);
  }

  giveRating(course: Course, r: string) {
    // tslint:disable-next-line: radix
    const rating: number = parseInt(r);
    if (rating > 0) {
      this.ratedCourse.emit({course, rating});
    }
  }

  toggle(course) {
    course.hide = !course.hide;
  }

}
