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

  filteredCourses: Array<Course>;

  searchText = '';
  searchRating = 0;
  searchTerm = 0;
  searchECTS = 0;

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
    console.log(courseToDelete.name);
    this.coursesService.deleteCourse(courseToDelete);
    this.getCourses();
  }

  rateCourse(courseAndRating: {course: Course, rating: number}): void {
    this.coursesService.rateCourse(courseAndRating.course, courseAndRating.rating);
    this.getCourses();
  }

  createCourse(course: Course): void {
    console.log(course.name);
    this.coursesService.addCourse(course);
    this.getCourses();
  }

  searchByTitle(searchText: string): void {
    this.searchText = searchText;
  }
  searchByRating(searchRating: number): void {
    this.searchRating = searchRating;
  }
  searchByTerm(term: number): void {
    this.searchTerm = term;
  }
  searchByEcts(searchECTS: number): void {
    this.searchECTS = searchECTS;
  }

}
