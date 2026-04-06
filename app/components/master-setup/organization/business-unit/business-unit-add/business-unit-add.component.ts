import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AuthService } from '../../../../auth/services/auth.service';
import { MasterSetupService } from '../../../services/master-setup.service';
import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-business-unit-add',
  templateUrl: './business-unit-add.component.html',
  styleUrl: './business-unit-add.component.css',
})
export class BusinessUnitAddComponent implements OnInit {
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
      BUName: ['', Validators.required],
      OracleBUID: ['', Validators.required],
      DefaultCurrency: ['', Validators.required],
      OracleBUCode: ['', Validators.required],
      Status: [true],
      DefaultLedgerID: ['', Validators.required],
      LegalEntityID: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUser();
    if (this.request_id) {
      this.service
        .getBusinessUnitByID(this.request_id)
        .subscribe((data: any) => {
          this.productForm.patchValue({
            OracleBUID: data.OracleBUID,
            BUName: data.BUName,
            OracleBUCode: data.OracleBUCode,
            DefaultCurrency: data.DefaultCurrency,
            DefaultLedgerID: data.DefaultLedgerID,
            LegalEntityID: data.LegalEntityID,
            Status: data.Status,
          });
        });
    }
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

    this.service.saveBusinessUnit(request).subscribe((res: any) => {
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
