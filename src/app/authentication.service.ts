import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  roles: AngularFirestoreCollection;
  users: Array<any>;
  userData: Observable<firebase.User>;

  readonly authState$: Observable<User | null> = this.angularFireAuth.authState;

  constructor(private angularFireAuth: AngularFireAuth, private router: Router, private db: AngularFirestore) {
    this.roles = this.db.collection('users');
    this.getArrayOfUserRoles();
   }

   SignInUser(email, password) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
    }

    SignUpUser(email, password) {
      return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
      }

    SignOut() {
      return this.angularFireAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      });
    }

    getUser(): User | null {
      return this.angularFireAuth.auth.currentUser;
    }

    addUserRole(email: string, role: string) {
      this.roles.add({email: email, role: role});
    }

    getUserRole(): string {
      // tslint:disable-next-line: triple-equals
      if (this.users == undefined) { return null; }
      let user = this.getUser();
      if (user == null) { return null; }
      // tslint:disable-next-line: triple-equals
      let tmp = this.users.filter(a => a.email == user.email);
      // tslint:disable-next-line: triple-equals
      if (tmp.length == 0) { return null; } else { return tmp[0].role; }
    }

    getArrayOfUserRoles() {
      this.db.collection('users').snapshotChanges().subscribe(data => {
        this.users = data.map(e => {
          // tslint:disable-next-line: no-shadowed-variable
          let data = e.payload.doc.data() as object;
          return data;
        });
      });
    }
}
