import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../course';
import { AuthenticationService } from '../authentication.service';
import { CoursesService } from '../courses.service';

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
  // @Output() ratedCourse = new EventEmitter<{course: Course, rating: number}>();
 

  constructor(private auth: AuthenticationService, private coursesService: CoursesService) { }

  ngOnInit() {
  }

  deleteCourse(): void{
    if (confirm('Na pewno chcesz usunąć ten kurs?')) {

      this.coursesService.deleteCourse(this.course);
    } else {
    }
  }

  // toggle(course) {
  //   course.hide = !course.hide;
  // }

  // giveRating(courAndRat: {course: Course, rating: number}) {
  //   // tslint:disable-next-line: radix
  //   const course = courAndRat.course;
  //   const rating = courAndRat.rating;
  //   this.ratedCourse.emit({course, rating});
  // }

}
