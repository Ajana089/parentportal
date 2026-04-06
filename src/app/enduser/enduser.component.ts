import { Component,OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";

import { FormsModule } from "@angular/forms";

import { AgGridAngular } from "ag-grid-angular";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule } from 'ag-grid-community';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);
import {
  ModuleRegistry,
  themeAlpine,
  themeBalham,
  themeMaterial,
  themeQuartz,
} from "ag-grid-community";

import { UserService } from '../user.service';



@Component({
  selector: 'app-enduser',
  imports: [AgGridAngular, FormsModule, CommonModule],
  templateUrl: './enduser.component.html',
  styleUrl: './enduser.component.css'
})
export class EnduserComponent  implements OnInit {
themes = [
    { label: "themeQuartz", theme: themeQuartz },
    { label: "themeBalham", theme: themeBalham },
    { label: "themeMaterial", theme: themeMaterial },
    { label: "themeAlpine", theme: themeAlpine },
  ];
  theme = themeQuartz;
  sideBar = true;
  columnDefs: ColDef[] = [
     { field: "id"},
        { field: "title"},
        { field: "completed"}
  ];

  defaultColDef: ColDef = {
    editable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
  };
  rowData: any;
 constructor(private userservice:UserService){}
 
 ngOnInit(): void {
  

  this.defaultColDef = { flex: 1 };

  this.userservice.getTodos().subscribe(data => {
    this.rowData = data;
   console.log(this.rowData)
  });
}
  

 

}
