import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { COURSES } from '../courses-list-mock';
import { CoursesService } from '../courses.service';


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  coursesService: CoursesService;

  courses: Array<Course>;

  constructor(serv: CoursesService) {
      this.coursesService = serv;
   }

  ngOnInit() {
    this.getCourses();
  }

  getCourses(): void {
    this.courses = this.coursesService.getCourses();
  }

  deleteCourse(courseToDelete: Course): void {
    this.coursesService.deleteCourse(courseToDelete);
    this.getCourses();
  }

  rateCourse(courseAndRating: {course: Course, rating: number}): void {
    this.coursesService.rateCourse(courseAndRating.course, courseAndRating.rating);
    this.getCourses();
  }

}
