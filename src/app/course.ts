export class Course {
    id: string;
    name: string;
    ECTS: number;
    term: number;
    type: string;
    capacity: number;
    ratingSum: number;
    pictureUrl: string;
    enrolledEmails: Array<string>;
    ratedEmails: Array<string>;
}
