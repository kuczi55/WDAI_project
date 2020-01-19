import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../course';
import { ActivatedRoute, Router} from '@angular/router';
import { CoursesService } from '../courses.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-display-details',
  templateUrl: './display-details.component.html',
  styleUrls: ['./display-details.component.css']
})
export class DisplayDetailsComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  course: Course;
  route: ActivatedRoute;
  router: Router;
  coursesService: CoursesService;

  @Output() ratingCourse = new EventEmitter<{course: Course, rating: number}>();

  constructor(service: CoursesService, route: ActivatedRoute, router: Router, private auth: AuthenticationService) {
    this.coursesService = service;
    this.route = route;
    this.router = router;
   }

  ngOnInit() {
    let id: string = (this.route.snapshot.paramMap.get('id'));
    this.course = this.coursesService.getCourse(id);
    // tslint:disable-next-line: triple-equals
    if (this.course == undefined) {
      this.router.navigate(['/list/']);
    }
  }

  rateCourse(rating: string) {
    // tslint:disable-next-line: radix
    let rat: number = parseInt(rating);
    if (rat > 0 && this.isEnrolled()) {
      this.coursesService.rateCourse(this.course, rat, this.auth.getUser().email);
    }
  }
  hasRated(): boolean {
    if (this.auth.getUser() == null) { return false; }
    return this.coursesService.hasRated(this.course, this.auth.getUser().email);
  }

  isProperRating(rating: string) {
    // tslint:disable-next-line: radix
    let ratg: number = parseInt(rating);
    return (ratg > 0 && ratg <= 5);
  }

  isEnrolled(): boolean {
    if (this.auth.getUser() == null) { return false; }
    return this.coursesService.isEnrolled(this.course, this.auth.getUser().email);
  }

  isAllowedToEnroll(): boolean {
    return (!this.isEnrolled() && this.freeNumber() > 0);
  }

  freeNumber(): number {
    return this.coursesService.freeNumber(this.course);
  }

  enroll() {
    if (this.auth.getUser() == null) { return; }
    this.coursesService.enrollCourse(this.course, this.auth.getUser().email);
  }

  courseType() {
    switch (this.course.type) {
      case 'classes': return 'Ćwiczenia audytoryjne';
      case 'lab': return 'Ćwiczenia laboratoryjne';
      case 'lecture': return 'Wykład';
      case 'project': return 'Zajęcia projektowe';
      default: return 'Nieznany typ';
    }
  }
}
