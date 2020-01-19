import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { Course } from '../course';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  courses: Observable<Course[]>;
  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.getCourses();
  }

  getCourses(): void {
    this.courses = this.coursesService.getObservableOfCourses();
  }

}
