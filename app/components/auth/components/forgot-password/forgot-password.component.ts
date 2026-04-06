import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

authenticationForm: FormGroup;
   showPassword: boolean = false;
   showConfirmPassword: boolean = false;
   samePassword = false

  constructor( 
    public dialogRef: MatDialogRef<any>,
    private fb: FormBuilder,
        private router: Router,
        private authService: AuthService,
       public dialog: MatDialog,) {

        this.authenticationForm = this.fb.group({
              company: [''],
              username: ['', Validators.required],
              password: ['', Validators.required],
              confirmPassword: ['', Validators.required],
            });

  }

  closeDialog() {
     this.dialogRef.close();
   }

   forgotPassword(): void {
       if (this.authenticationForm.invalid) {
         Swal.fire({
           title: 'All fields are required.',
           text: '',
           icon: 'error',
         });
         return;
       }
   
       let formValues = this.authenticationForm.value;
       formValues.first_name = '';

       if (formValues.password != formValues.confirmPassword) {
        this.samePassword = true;
        return;
       }

       this.authService.forgotPassword(formValues).subscribe((res: any) => {
         if (res && res > 0) {
           
           this.dialogRef.close();

           Swal.fire({
             title: 'Password changed successfully!',
             text: '',
             icon: 'success',
           });

         } else {
           Swal.fire({
             title: 'Username is incorrect!',
             text: '',
             icon: 'error',
           });
         }
       });
     }

   isShowPassword(){
    this.showPassword = !this.showPassword
  }

   isshowConfirmPassword(){
    this.showConfirmPassword = !this.showConfirmPassword
  }

}

