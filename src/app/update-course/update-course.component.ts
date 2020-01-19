import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { CoursesService } from '../courses.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {

  course: Course;
  coursesService: CoursesService;
  route: ActivatedRoute;
  router: Router;

  constructor(service: CoursesService, route: ActivatedRoute, router: Router) {
    this.coursesService = service;
    this.route = route;
    this.router = router;
  }

  ngOnInit() {
    const id: string = (this.route.snapshot.paramMap.get('id'));
    this.course = this.coursesService.getCourse(id);
    // tslint:disable-next-line: triple-equals
    if (this.course == undefined) {
      this.router.navigate(['/admin/']);
    }
  }

  courseType(){
    switch (this.course.type) {
      case 'classes': return 'Ćwiczenia audytoryjne';
      case 'lab': return 'Ćwiczenia laboratoryjne';
      case 'lecture': return 'Wykład';
      case 'project': return 'Zajęcia projektowe';
      default: return 'Nieznany typ';
    }
  }

  clearRatings(): void {
    this.course.ratingSum = 0;
    this.course.ratedEmails = [];
    alert('Pomyślnie wyczyszczony oceny');
  }

  updateCourse() {
    this.coursesService.editCourse(this.course);
    alert('Pomyślnie zaktualizowano dane kursu');
  }
}
