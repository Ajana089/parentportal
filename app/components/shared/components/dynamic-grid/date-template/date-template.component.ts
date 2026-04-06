import { Component, OnInit } from '@angular/core';
import { IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-date-template',
  templateUrl: './date-template.component.html',
  styleUrls: ['./date-template.component.scss']
})
export class DateTemplateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  afterGuiAttached(params?: IAfterGuiAttachedParams): void {
  }

}
