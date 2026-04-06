import { Component, OnInit } from '@angular/core';
import { IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-active-flag-template',
  templateUrl: './active-flag-template.component.html',
  styleUrls: ['./active-flag-template.component.scss']
})
export class ActiveFlagTemplateComponent implements OnInit {

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
