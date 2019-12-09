import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { SingleCourseComponent } from './single-course/single-course.component';
import { NewCourseComponent } from './new-course/new-course.component';
import { CourseFilterComponent } from './course-filter/course-filter.component';
import { SearchPipe, RatingPipe, TermPipe, EctsPipe } from './pipes';
import { CoursesService } from './courses.service';

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
    EctsPipe
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [CoursesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
