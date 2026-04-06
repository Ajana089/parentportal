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
  selector: 'app-inventory-organization-add',
  templateUrl: './inventory-organization-add.component.html',
  styleUrl: './inventory-organization-add.component.css',
})
export class InventoryOrganizationAddComponent {
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
      OrgName: ['', Validators.required],
      OracleOrgCode: ['', Validators.required],
      OracleOrgID: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      ParentBUID: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      Status: [true],
      LocationCode: ['', Validators.required],
      BusinessUnitID:['',Validators.required],
      Division:['',Validators.required],
    });
  }
  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUser();
    if (this.request_id) {
      this.service
        .GetOrganizationMasterByID(this.request_id)
        .subscribe((data: any) => {
          if(data){
           const divisionArray = data.Division.split(',').map(Number);
         
          this.productForm.patchValue({
            OrgName: data.OrgName,
            OracleOrgCode: data.OracleOrgCode,
            OracleOrgID: data.OracleOrgID,
            ParentBUID: data.ParentBUID,
            LocationCode: data.LocationCode,
            Status: data.Status,
            BusinessUnitID: data.BusinessUnitID,
            Division: divisionArray
          });
        }
        });
    }
    this.getAllbusinessId();
    this.getAllDivisionId();
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
  onSave() {
    if (!this.productForm.valid) {
      return;
    }
  
  const divisionarray=this.productForm.value.Division;
  const divisionString = divisionarray.join(',');
  this.productForm.value.Division=divisionString;

  var request = {
      ...this.productForm.value,
      ID: this.request_id || 0,
      CreatedBy: this.loggedInUser.ID.toString(),
      UpdatedBy: this.loggedInUser.ID.toString(),
      BusinessUnit :''
    };
   
    var _this = this;
    this.loading = true;

     this.service.saveOrganizationMaster(request).subscribe((res: any) => {
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
