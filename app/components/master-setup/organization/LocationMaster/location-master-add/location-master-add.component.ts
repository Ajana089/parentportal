import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { User } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../auth/services/auth.service';
import { MasterSetupService } from '../../../services/master-setup.service';

@Component({
  selector: 'app-location-master-add',
  templateUrl: './location-master-add.component.html',
  styleUrl: './location-master-add.component.css'
})
export class LocationMasterAddComponent {

   loading = false;
    loggedInUser: User;
    productForm: FormGroup;
    request_id: number = 0;
    isDisabled = false;
    approverHistory: any[] = [];
    is_approver = false;
    approverComment = '';
    request: any = {};
    request_status = '';
    showErrorMessage = false;
    collapsedCards: { [key: string]: boolean } = {};
    businessid: any[] = [];
    divisionid: any[] = [];
    locationcode: any[] = [];
    emiratescode: any[] = [];
    constructor(
      public dialogRef: MatDialogRef<any>,
      public dialog: MatDialog,
      private fb: FormBuilder,
      private authService: AuthService,
      private service: MasterSetupService,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
      this.request_id = data.id;
  
      this.productForm = this.fb.group({
        EmirateID:['',[Validators.required, Validators.pattern('^[0-9]+$')]],
        Emirate: ['', Validators.required],
        StationNo: ['', Validators.required],
        StationName: ['', Validators.required],
        LocationName:  ['', Validators.required],
        LocationCodeID: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        Status: [true],
        LocationCode: ['', Validators.required],
        BusinessUnitID:['',Validators.required],
        Division:['',Validators.required],
        Distance: ['', Validators.required],
        ReadymixTripRate: ['', Validators.required],
        BlockTrailerRate: ['', Validators.required],
        PumpSurcharge: ['', Validators.required],
        // CreatedOn: ['', Validators.required],
        // UpdatedOn: ['', Validators.required],
       
      });
    }
  
      ngOnInit(): void {
      this.loggedInUser = this.authService.getLoggedInUser();
     
      if (this.request_id) {
        this.service
          .GetLocationMasterByID(this.request_id)
          .subscribe((data: any) => {
            if(data){
             const divisionArray = data.Division.split(',').map(Number);
            
             this.productForm.patchValue({
              BusinessUnitID: data.BusinessUnitID,
              Division: divisionArray,
              LocationCodeID: data.LocationCodeID,
              EmirateID: data.EmirateID,
              LocationCode: data.LocationCode,
              Status: data.Status,
              LocationName: data.LocationName,
              Emirate: data.Emirate,
              StationNo: data.StationNo,
              StationName: data.StationName,
              Distance: data.Distance,
              ReadymixTripRate: data.ReadymixTripRate,
              BlockTrailerRate: data.BlockTrailerRate,
              PumpSurcharge: data.PumpSurcharge,
              
            });
           
           }
          });

      }
          this.getAllbusinessId();
          this.getAllDivisionId();
          this.getAllEmiratesMaster();
          this.getAllLocationCode();
      
    }
    getAllbusinessId(){
    this.service.GetAllBusinessUnits().subscribe((res: any) => {
      if(res){
        this.businessid=res;
      }
     })
  
  }
  getAllDivisionId(){
  this.service.GetAllDivisionMasters().subscribe((res: any) => {
      if(res){
        this.divisionid=res;
      }
     })
  }
  getAllLocationCode(){
    this.service.GetAllLocationCode().subscribe((res: any) => {
      if(res){
        this.locationcode=res;
         const id = this.productForm.get('LocationCodeID')?.value;
        if (id) {
        this.onCodeChange(id);
  }
      }
     })
}
  getAllEmiratesMaster(){
  this.service.GetAllEmiratesMaster().subscribe((res: any) => {
      if(res){
        this.emiratescode=res;
        const id = this.productForm.get('EmirateID')?.value;
       if (id) {
      this.onEmirateChange(id);
    }
      }
     })
  }
  onCodeChange(id: any) {
  const selected = this.locationcode.find((x: any) => x.ID === id);
   
  if (selected) {
    this.productForm.patchValue({
      LocationName: selected.LocationName,
      LocationCode: selected.LocationCode

    });
  }
}
onEmirateChange(id:any){
const selected = this.emiratescode.find((x: any) => x.ID === id);
   
  if (selected) {
    this.productForm.patchValue({
      Emirate: selected.Emirate,
      EmirateID: selected.ID
     });
  }
}

    onSave() {
      if (!this.productForm.valid) {
        return;
      }
    
    const divisionarray=this.productForm.value.Division;
    const divisionString = divisionarray.join(',');
    this.productForm.value.Division=divisionString;
    const now = new Date().toISOString();
    var request = {
        ...this.productForm.value,
        ID: this.request_id || 0,
        CreatedBy: this.loggedInUser.ID.toString(),
        UpdatedBy: this.loggedInUser.ID.toString(),
        BusinessUnit :'',
        CreatedOn : now,    
        UpdatedOn: now     
      };
     console.log(request)
      var _this = this;
      this.loading = true;
  
       this.service.saveLocationMaster(request).subscribe((res: any) => {
        var result = res;
        this.loading = false;
        if (result && result > 0) {
          var title =
            _this.request_id > 0
              ? 'Request updated successfully!'
              : 'Request submitted successfully!';
  
          Swal.fire({
            title: title,
            text: '',
            icon: 'success',
          }).then(function () {
            _this.dialogRef.close(
              // 'closed'
              request,
            );
          });
        } else {
          Swal.fire({
            title: 'Some Error!',
            text: '',
            icon: 'error',
          }).then(function () {});
        }
      });
    }
    toggleCard(id: string): void {
      this.collapsedCards[id] = !this.collapsedCards[id];
    }
  }
  
