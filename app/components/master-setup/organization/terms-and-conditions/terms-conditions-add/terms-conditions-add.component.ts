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
  selector: 'app-terms-conditions-add',
  templateUrl: './terms-conditions-add.component.html',
  styleUrl: './terms-conditions-add.component.css'
})
export class TermsConditionsAddComponent implements OnInit {
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
  termForm!: FormGroup;
  // termsList: TermConfig[] = [];
  isEdit = false;
  selectedId!: number;
  categories = ['Payment', 'Delivery', 'Testing'];
  printPositions = ['Main Body', 'Annexure A'];
  appLogicOptions = ['Always Apply', 'Conditional', 'Manual'];
  enforcementOptions = ['Locked', 'Standard', 'Optional'];
  buDivisions = ['Finance', 'Sales', 'Operations'];
  organizations = ['JAFZA', 'Dubai Free Zone', 'Abu Dhabi'];
  businessid: any[] = [];
  divisionid: any[] = [];
  organizationid: any[] = [];
  constructor(public dialogRef: MatDialogRef<any>,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private authService: AuthService,
    private service: MasterSetupService,
    @Inject(MAT_DIALOG_DATA) public data: any,) {

    this.request_id = data.id;

    this.termForm = this.fb.group({

      TermCode: ['', Validators.required],
      Category: ['', Validators.required],
      Description: ['', Validators.required],
      PrintPosition: ['', Validators.required],
      AppLogic: ['', Validators.required],
      Enforcement: ['', Validators.required],
      BusinessUnitID: ['', Validators.required],
      Division: [[], Validators.required],
      Organization: [[]],
      Status: [true],
    });
  }

  ngOnInit(): void {

    this.loggedInUser = this.authService.getLoggedInUser();
    if (this.request_id) {
      this.service
        .GetTermsAndConditionsByID(this.request_id)
        .subscribe((data: any) => {
          if (data) {
            const divisionArray = data.Division.split(',').map(Number);
            const organization = data.Organization.split(',').map(Number);
            this.termForm.patchValue({
              TermCode: data.TermCode,
              Category: data.Category,
              Description: data.Description,
              PrintPosition: data.PrintPosition,
              AppLogic: data.AppLogic,
              Enforcement: data.Enforcement,
              BusinessUnitID: data.BusinessUnitID,
              Division: divisionArray,
              Organization: organization,
              Status: data.Status
            });
          }
        });
    }
    this.getAllbusinessId();
    this.getAllOrganizations();
    this.getAllDivisionId();
  }

  getAllbusinessId() {
    this.service.GetAllBusinessUnits().subscribe((res: any) => {
      if (res) {
        this.businessid = res;
      }
    })

  }
  getAllDivisionId() {
    this.service.GetAllDivisionMasters().subscribe((res: any) => {
      if (res) {
        this.divisionid = res;
      }
    })
  }
  getAllOrganizations() {
    this.service.GetAllOrganizationMasters().subscribe((res: any) => {
      if (res) {
        this.organizationid = res;
      }
    })
  }

  onSave() {
    if (!this.termForm.valid) {
      return;
    }
    const divisionarray = this.termForm.value.Division;
    const divisionString = divisionarray.join(',');
    const organizationarray = this.termForm.value.Organization;
    const organizationString = organizationarray.join(',');
    var request = {
      ...this.termForm.value,
      ID: this.request_id || 0,
      BusinessUnit: '',
      Division: divisionString,
      Organization: organizationString,
      CreatedBy: this.loggedInUser.ID,
      UpdatedBy: this.loggedInUser.ID,
    };

    var _this = this;
    this.loading = true;
    console.log(request)
    this.service.saveTermsAndConditions(request).subscribe((res: any) => {
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
        }).then(function () { });
      }
    });
  }
  toggleCard(id: string): void {
    this.collapsedCards[id] = !this.collapsedCards[id];
  }

}
