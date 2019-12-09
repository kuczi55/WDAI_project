import { Component, OnInit, Pipe, PipeTransform, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-filter',
  templateUrl: './course-filter.component.html',
  styleUrls: ['./course-filter.component.css']
})
export class CourseFilterComponent implements OnInit {

  @Output() textToSearch = new EventEmitter<string>();
  @Output() ratingToSearch = new EventEmitter<number>();
  @Output() ECTSToSearch = new EventEmitter<number>();
  @Output() termToSearch = new EventEmitter<number>();

  searchText: string;
  searchRating: number;
  searchECTS: number;
  searchTerm: number;

  constructor() { }

  ngOnInit() {
  }

  textSearch(): void {
    this.textToSearch.emit(this.searchText);
  }

  ratingSearch(): void {
    this.ratingToSearch.emit(this.searchRating);
  }

  termSearch(): void {
    this.termToSearch.emit(this.searchTerm);
  }

  ECTSSearch(): void {
    this.ECTSToSearch.emit(this.searchECTS);
  }

}
