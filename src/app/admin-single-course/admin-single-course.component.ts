import { Component, OnInit, Input } from '@angular/core';
import {Course} from '../course';

@Component({
  selector: 'app-admin-single-course',
  templateUrl: './admin-single-course.component.html',
  styleUrls: ['./admin-single-course.component.css']
})
export class AdminSingleCourseComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input ('course') course: Course;
  // tslint:disable-next-line: no-input-rename
  @Input ('isE') isEven: boolean;

  constructor() { }

  ngOnInit() {
  }

}
