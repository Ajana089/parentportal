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
  selector: 'app-other-additional-charges-add',
  templateUrl: './other-additional-charges-add.component.html',
  styleUrl: './other-additional-charges-add.component.css'
})
export class OtherAdditionalChargesAddComponent implements OnInit {
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
         ProdTypeCode: ['', Validators.required],
         Code: ['', Validators.required],
         EquipmentRental: ['', Validators.required],
         Name: ['', Validators.required],
         SortID: ['', Validators.required],
         MinimumQuantity:['',Validators.required],
         SellingPrice: ['', Validators.required],
         MinimumCharge: ['', Validators.required],
         MinTerm: ['', Validators.required],
         UOMType: ['', Validators.required],
         InvoiceQuantityType: ['', Validators.required],
         PumpApplicable:['',Validators.required],
         
       });
     }
   
     ngOnInit(): void {
       this.loggedInUser = this.authService.getLoggedInUser();
       if (this.request_id) {
         this.service
           .getDivisionMasterByID(this.request_id)
           .subscribe((data: any) => {
             this.productForm.patchValue({
               DivisionName: data.DivisionName,
               DivisionCode: data.DivisionCode,
               CostCenterCode: data.CostCenterCode,
               OracleSegmentID: data.OracleSegmentID,
               ManagerEmail: data.ManagerEmail,
               Status: data.Status,
               BusinessUnitID: data.BusinessUnitID,
             
             });
           });
       }
       this.getAllbusinessId();
     }
     getAllbusinessId(){
     this.service.GetAllBusinessUnits().subscribe((res: any) => {
       if(res){
         this.businessid=res;
       }
      })
   
   }
     onSave() {
       if (!this.productForm.valid) {
         return;
       }
   
       var request = {
         ...this.productForm.value,
         ID: this.request_id || 0,
         CreatedBy: this.loggedInUser.ID.toString(),
         UpdatedBy: this.loggedInUser.ID.toString(),
        };
   
       var _this = this;
       this.loading = true;
   
       this.service.saveDivisionMaster(request).subscribe((res: any) => {
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
             _this.dialogRef.close('created');
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
   