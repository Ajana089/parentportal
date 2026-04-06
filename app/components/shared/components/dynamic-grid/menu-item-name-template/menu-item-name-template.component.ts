import { Component, OnInit } from '@angular/core';
import { IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-menu-item-name-template',
  templateUrl: './menu-item-name-template.component.html',
  styleUrls: ['./menu-item-name-template.component.scss']
})
export class MenuItemNameTemplateComponent implements OnInit {

 
  ngOnInit(): void {
  }
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  afterGuiAttached(params?: IAfterGuiAttachedParams): void {
  }
}
