import { Pipe, PipeTransform } from '@angular/core';
import { Course } from './course';

@Pipe({ name: 'searchPipe' })
export class SearchPipe implements PipeTransform {
  transform(courses: Array<Course>, searchText: string): Array<Course> {
    if (!courses) {
      return [];
    }
    if (!searchText) {
      return courses;
    }
    searchText = searchText.toLowerCase();
    return courses.filter(course => {
      return course.name.toLowerCase().includes(searchText);
    });
  }
}

@Pipe({ name: 'ratingPipe' })
export class RatingPipe implements PipeTransform {
  transform(courses: Array<Course>, minRating: number): Array<Course> {
    if (!courses) {
      return [];
    }
    if (!minRating || minRating <= 0) {
      return courses;
    }
    return courses.filter(course => {
      return course.rating >= minRating;
    });
  }
}

@Pipe({ name: 'termPipe' })
export class TermPipe implements PipeTransform {
  transform(courses: Array<Course>, term: number): Array<Course> {
    if (!courses) {
      return [];
    }
    if (!term || term <= 0 || term > 7) {
      return courses;
    }
    return courses.filter(course => {
      return course.term === term;
    });
  }
}

@Pipe({ name: 'ectsPipe' })
export class EctsPipe implements PipeTransform {
  transform(courses: Array<Course>, ects: number): Array<Course> {
    if (!courses) {
      return [];
    }
    if (!ects || ects <= 0 || ects > 10) {
      return courses;
    }
    return courses.filter(course => {
      return course.ECTS === ects;
    });
  }
}
