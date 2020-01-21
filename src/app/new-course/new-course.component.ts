import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../course';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.css']
})
export class NewCourseComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('course') course: Course;

  @Output() createdCourse = new EventEmitter<Course>();

  modelForm: FormGroup;

  formErrors = {
    courseName: '',
    courseEcts: '',
    courseTerm: '',
    courseCapacity: '',
    courseType: '',
    coursePictureUrl: ''
  // tslint:disable-next-line: semicolon
  }

  private validationMessages = {
    courseName: {
      required: 'Proszę podać nazwę kursu'
    },
    courseEcts: {
      required: 'Proszę podać ilość punktów ECTS',
      pattern: 'Proszę podać cyfrę',
      min: 'Najmniejsza wartość to 1',
      max: 'Największa wartość to 10'
    },
    courseTerm: {
      required: 'Proszę podać semestr, na którym odbywa się kurs',
      pattern: 'Proszę podać cyfrę',
      min: 'Najmniejsza wartość to 1',
      max: 'Największa wartość to 7'
    },
    courseCapacity: {
      required: 'Proszę podać ilość',
      pattern: 'Proszę podać cyfrę',
      min: 'Najmniejsza wartość to 1',
      max: 'Największa wartość to 1000'
    },
    courseType: {
      required: 'Proszę podać typ kursu'
    },
    coursePictureUrl: {
      required: 'Proszę podać ścieżkę do zdjęcia kursu'
    },
  // tslint:disable-next-line: semicolon
  }

  constructor(private formBuilder: FormBuilder, private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.setupForm();
  }

setupForm() {
  this.modelForm = this.formBuilder.group({
    courseName: ['', Validators.required],
    courseEcts: ['', [Validators.required, Validators.pattern( /^[0-9]+$/), Validators.min(1), Validators.max(10)]],
    courseTerm: ['', [Validators.required, Validators.pattern( /^[0-9]+$/), Validators.min(1), Validators.max(7)]],
    courseCapacity: ['', [Validators.required, Validators.pattern( /^[0-9]+$/), Validators.min(1), Validators.max(1000)]],
    courseType: ['lecture', Validators.required],
    coursePictureUrl: ['', Validators.required]
  });

  this.modelForm.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
    this.onControlValueChanged();
  });

  this.onControlValueChanged();
}

onControlValueChanged() {
  const form = this.modelForm;

  // tslint:disable-next-line: forin
  for (const field in this.formErrors) {
    this.formErrors[field] = '';
    const control = form.get(field);

    if (control && control.dirty && !control.valid) {
      const validationMessages = this.validationMessages[field];
      // tslint:disable-next-line: forin
      for (const key in control.errors) {
        this.formErrors[field] += validationMessages[key] + ' ';
      }
    }
  }
}
  createCourse(courseForm: FormGroup) {
    // tslint:disable-next-line: radix
    const formAttr = this.modelForm.value;
    // tslint:disable-next-line: radix
    const newCourse = {} as Course;
    newCourse.name = formAttr.courseName;
    // tslint:disable-next-line: radix
    newCourse.ECTS = parseInt(formAttr.courseEcts);
    // tslint:disable-next-line: radix
    newCourse.term = parseInt(formAttr.courseTerm);
    // tslint:disable-next-line: radix
    newCourse.capacity = parseInt(formAttr.courseCapacity);
    newCourse.type = formAttr.courseType;
    newCourse.pictureUrl = formAttr.coursePictureUrl;
    newCourse.ratingSum = 0;
    newCourse.enrolledEmails = [];
    newCourse.ratedEmails = [];
    this.setupForm();
    this.coursesService.addCourse(newCourse);
  }
}
