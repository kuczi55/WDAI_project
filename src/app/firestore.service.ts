import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Course } from './course';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  dbcourses;

  constructor(private db: AngularFirestore) {
    this.dbcourses = db.collection<Course>('courses');
   }

  getCourses() {
    return this.db.collection('courses').snapshotChanges();
  }

  createData(course: Course) {
    this.dbcourses.add(course);
    }

  updateData(course: Course) {
    return this.db.doc('courses/' + course.id).update(course);
  }

  deleteData(course: Course) {
    return this.db.doc('courses/' + course.id).delete();
  }
}
