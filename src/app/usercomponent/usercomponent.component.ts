import { Component,OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient } from "@angular/common/http";
import { CommonModule } from '@angular/common';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

import { AgGridAngular } from "ag-grid-angular";
import {
  ClientSideRowModelModule,
  
 
 
  GridApi,
 ColGroupDef,
 GridOptions,
  GridReadyEvent,
  QuickFilterModule,
  TextFilterModule,
  PaginationModule,
  ValidationModule,
} from "ag-grid-community";
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  TextFilterModule,
   QuickFilterModule,
  ClientSideRowModelModule,
   PaginationModule,
  ]);
ModuleRegistry.registerModules([AllCommunityModule]);

import type { ColDef } from 'ag-grid-community'; 

@Component({
  selector: 'app-usercomponent',
  imports: [AgGridAngular, CommonModule],
  templateUrl: './usercomponent.component.html',
 styleUrl: './usercomponent.component.css'
})
export class UsercomponentComponent implements OnInit {

//defaultColDef:any;
defaultColDef: ColDef = {};

   rtodolist:any;
   private gridApi!: GridApi;
  rowData:any;
  
   colDefs: ColDef[] = [
        // { field:"userId"},
        { field: "id"},
        { field: "title", filter: true,
                          getQuickFilterText: params => params.value,
                         sort: "asc" ,sortable: true 
        },   
        { field: "completed", filter: true,
        },
                          
         
    ];

  
  
    
  constructor(private http: HttpClient,private userservice:UserService){}


ngOnInit(): void {
  

  this.defaultColDef = { flex: 1 };

  this.userservice.getTodos().subscribe(data => {
    this.rowData = data;
   
  });

  this.gridApi.setGridOption('quickFilterText', 'new filter text');

}
onGridReady(params: GridReadyEvent) {

  console.log(params)
    this.gridApi = params.api;
  
    // this.http
    //   .get<any[]>("https://jsonplaceholder.typicode.com/todos")
    //   .subscribe((data) => (this.rowData = data));
    
  
  }
  onFilterTextBoxChanged() {


    this.gridApi.setGridOption(
      "quickFilterText",
      (document.getElementById("filter-text-box") as HTMLInputElement).value,
    );
  }
 
}
