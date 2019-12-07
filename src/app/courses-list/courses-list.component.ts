import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { COURSES } from '../courses-list-mock';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  courses: Array<Course>;

  constructor() {
      this.courses = COURSES;
   }

  ngOnInit() {
  }

}
