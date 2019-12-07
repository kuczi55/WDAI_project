import {CourseType} from './course-type';

export class Course {
    id: number;
    name: string;
    ECTS: number;
    term: number;
    type: CourseType;
    capacity: number;
    rating: number;
    pictureUrl: string;
}
