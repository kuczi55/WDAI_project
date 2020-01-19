import {CourseType} from './course-type';

export class Course {
    id: string;
    name: string;
    ECTS: number;
    term: number;
    type: string;
    capacity: number;
    //rating: number;
    ratingSum: number;
    //ratingNo: number;
    pictureUrl: string;
    //hide: boolean;
    enrolledEmails: Array<string>;
    ratedEmails: Array<string>;

    // constructor(name: string, ECTS: number, term: number, capacity: number, pictureUrl: string) {
    //     this.id = '11';
    //     this.name = name;
    //     this.ECTS = ECTS;
    //     this.term = term;
    //     this.type = "ćwiczenia";
    //     this.capacity = capacity;
    //     this.rating = undefined;
    //     this.ratingSum = 0;
    //     this.ratingNo = 0;
    //     this.pictureUrl = pictureUrl;
    //     this.hide = true;
    //     this.ratedEmails = [];
    //     this.enrolledEmails = [];
    // }
}
