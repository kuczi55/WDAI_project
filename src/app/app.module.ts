import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { SingleCourseComponent } from './single-course/single-course.component';
import { NewCourseComponent } from './new-course/new-course.component';
import { CourseFilterComponent } from './course-filter/course-filter.component';
import { SearchPipe, RatingPipe, TermPipe, EctsPipe, SortPipe } from './pipes';
import { CoursesService } from './courses.service';
import { DisplayDetailsComponent } from './display-details/display-details.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminSingleCourseComponent } from './admin-single-course/admin-single-course.component';
import { UpdateCourseComponent } from './update-course/update-course.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    CoursesListComponent,
    SingleCourseComponent,
    NewCourseComponent,
    CourseFilterComponent,
    SearchPipe,
    RatingPipe,
    TermPipe,
    EctsPipe,
    SortPipe,
    DisplayDetailsComponent,
    LoginComponent,
    RegistrationComponent,
    NavbarComponent,
    AdminPanelComponent,
    AdminSingleCourseComponent,
    UpdateCourseComponent,
    PageNotFoundComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [CoursesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
