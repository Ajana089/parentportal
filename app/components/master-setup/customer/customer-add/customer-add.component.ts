import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../shared/models/user.model';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { AuthService } from '../../../auth/services/auth.service';
import { MasterSetupService } from '../../services/master-setup.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FileHelperService } from '../../../shared/services/file-helper.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrl: './customer-add.component.css',
})
export class CustomerAddComponent implements OnInit {
  loading = false;
  loggedInUser: User;
  customerForm: FormGroup;
  request_id: number = 0;
  isDisabled = false;
  approverHistory: any[] = [];
  is_approver = false;
  approverComment = '';
  request: any = {};
  request_status = '';
  showErrorMessage = false;
  selectedCustomerType: any = '';
  collapsedCards: { [key: string]: boolean } = {};
  defaultDate = new Date();
  allowedExtensions = ['pdf', 'jpg', 'jpeg'];

  constructor(
    public dialogRef: MatDialogRef<any>,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private authService: AuthService,
    private service: MasterSetupService,
    private fileHelper: FileHelperService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log(data);
    this.request_id = data.ID;
    // console.log(data)

    this.customerForm = fb.group({
      OrganizationName: ['', Validators.required],
      CustomerType: ['', Validators.required],
      TaxpayerID: ['', Validators.required],
      DunsNumber: [''],
      PrimaryURL: [''],
      AccountDescription: [''],
      AccountNumber: [''],
      RegistryID: [''],
      TradeLicenseNo: ['', Validators.required],
      TradeLicenseExpiryDate: ['', Validators.required],
      ContactEmailID: ['', Validators.required],
      TradeLicenseFile: ['', Validators.required],
      TradeLicenseFileName: [''],
      VATRegFileName: ['', Validators.required],
      VATRegFile: [''],
    });
  }

  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUser();
    this.request_id = 0;

    //console.log
  }
  toggleCard(id: string): void {
    this.collapsedCards[id] = !this.collapsedCards[id];
  }

  onChangeCustomerType(value) {
    this.selectedCustomerType = value;
  }

  onSave() {
    var TradeLicenseFileName = this.customerForm.get(
      'TradeLicenseFileName',
    )?.value;
    var TradeLicenseFile = this.customerForm.get('TradeLicenseFile')?.value;

    if (TradeLicenseFileName == '' || TradeLicenseFile == '') {
      Swal.fire({
        title: 'Trade License Copy is missing!',
        text: '',
        icon: 'error',
      }).then(function () {});
      return;
    }

    var VATRegFileName = this.customerForm.get('VATRegFileName')?.value;
    var VATRegFile = this.customerForm.get('VATRegFile')?.value;

    if (VATRegFileName == '' || VATRegFile == '') {
      Swal.fire({
        title: 'VAT Registration Certificate is missing!',
        text: '',
        icon: 'error',
      }).then(function () {});
      return;
    }

    if (!this.customerForm.valid) {
      return;
    }

    var request = {
      ...this.customerForm.value,
      ID: this.request_id || 0,
      CreatedBy: this.loggedInUser.ID,
      UpdatedBy: this.loggedInUser.ID,
      TradeLicenseAttachmentName: '',
      TradeLicenseAttachmentPath: '',
      VATRegAttachmentName: '',
      VATRegAttachmentPath: '',
    };

    console.log(request);

    var _this = this;
    this.loading = true;
    try {
      this.service.saveCustomer(request).subscribe((res: any) => {
        var result = res;
        this.loading = false;

        console.log(res);
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
    } catch (error) {
      console.log(error);
    }
  }

  async onFileSelectedCopyTradeLicense(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) return;

    const fileUploaded = input.files[0];
    const fileNameUploaded = fileUploaded.name.toLowerCase();
    const fileExtension = fileNameUploaded.split('.').pop();

    if (!fileExtension || !this.allowedExtensions.includes(fileExtension)) {
      Swal.fire({
        title: 'Invalid file type. ',
        text: '',
        icon: 'error',
      });
      input.value = ''; // reset file input
      return;
    }

    const maxSizeInMB = 5; // example: 5 MB
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    if (fileUploaded.size > maxSizeInBytes) {
      Swal.fire({
        title: 'File too large',
        text: `Maximum allowed size is ${maxSizeInMB} MB`,
        icon: 'warning',
      });
      input.value = '';
      return;
    }

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      this.customerForm.get('TradeLicenseFileName')?.setValue(file.name);
      var uploadedfile: any = await this.fileHelper.toBase64(file);

      this.customerForm
        .get('TradeLicenseFile')
        ?.setValue(uploadedfile.split(',')[1]);
    }
  }

  async onFileSelectedVatRegCert(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) return;

    const fileUploaded = input.files[0];
    const fileNameUploaded = fileUploaded.name.toLowerCase();
    const fileExtension = fileNameUploaded.split('.').pop();

    if (!fileExtension || !this.allowedExtensions.includes(fileExtension)) {
      Swal.fire({
        title: 'Invalid file type. ',
        text: '',
        icon: 'error',
      });
      input.value = ''; // reset file input
      return;
    }

    const maxSizeInMB = 5; // example: 5 MB
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    if (fileUploaded.size > maxSizeInBytes) {
      Swal.fire({
        title: 'File too large',
        text: `Maximum allowed size is ${maxSizeInMB} MB`,
        icon: 'warning',
      });
      input.value = '';
      return;
    }

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      this.customerForm.get('VATRegFileName')?.setValue(file.name);
      var uploadedfile: any = await this.fileHelper.toBase64(file);

      this.customerForm.get('VATRegFile')?.setValue(uploadedfile.split(',')[1]);
    }
  }
}
