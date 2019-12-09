import {CourseType} from './course-type';

export class Course {
    id: number;
    name: string;
    ECTS: number;
    term: number;
    type: CourseType;
    capacity: number;
    rating: number;
    ratingSum: number;
    ratingNo: number;
    pictureUrl: string;
    hide: boolean;

    constructor(name: string, ECTS: number, term: number, capacity: number, pictureUrl: string) {
        this.id = 11;
        this.name = name;
        this.ECTS = ECTS;
        this.term = term;
        this.type = CourseType.Lab;
        this.capacity = capacity;
        this.rating = undefined;
        this.ratingSum = 0;
        this.ratingNo = 0;
        this.pictureUrl = pictureUrl;
        this.hide = true;
    }
}
