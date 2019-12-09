import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../course';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      courseName: ['', Validators.required],
      courseEcts: ['', [Validators.required, Validators.pattern( /^[0-9]+$/), Validators.min(1), Validators.max(10)]],
      courseTerm: ['', [Validators.required, Validators.pattern( /^[0-9]+$/), Validators.min(1), Validators.max(7)]],
      courseCapacity: ['', [Validators.required, Validators.pattern( /^[0-9]+$/), Validators.min(1), Validators.max(1000)]],
      courseType: ['', Validators.required],
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
  createCourse(courseName: string, ects: string, term: string, capacity: string, coursePictureUrl: string) {
    // tslint:disable-next-line: radix
    const courseEcts = parseInt(ects);
    // tslint:disable-next-line: radix
    const courseTerm = parseInt(term);
    // tslint:disable-next-line: radix
    const courseCapacity = parseInt(capacity);
    // console.log(new Course(courseName, courseEcts, courseTerm, courseCapacity, coursePictureUrl).name);
    this.createdCourse.emit(new Course(courseName, courseEcts, courseTerm, courseCapacity, coursePictureUrl));
  }
}
