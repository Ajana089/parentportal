import { Component,OnInit } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormControl,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterOutlet,RouterLink } from '@angular/router';
import { TokenpdateService } from '../tokenpdate.service';

@Component({
  selector: 'app-regidtration-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './regidtration-form.component.html',
  styleUrls: ['./regidtration-form.component.css']
})


export class RegidtrationFormComponent  implements OnInit{
  details: any[] = [];
  flag:boolean=true;
  showtoken: string ='';
  token='';
  tokenparent='';
  tokenchild='';
  tokenmob='';
  count: number = 0;




   registrationForm = new FormGroup({
    parentname: new FormControl('', Validators.required),
    childname: new FormControl('', Validators.required),
    mobnumber: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d{9}$/)])
  });

  get parentname() { return this.registrationForm.get('parentname')!; }
  get childname() { return this.registrationForm.get('childname')!; }
  get mobnumber() { return this.registrationForm.get('mobnumber')!; }

  constructor(private router: Router,private tokenservice:TokenpdateService){

  }

  ngOnInit(): void {

   

  }
 

  onSubmit() {
    if (this.registrationForm.valid) {
   
      if (this.registrationForm.value.parentname && this.registrationForm.value.childname && this.registrationForm.value.mobnumber) {
     let firstTwo = this.registrationForm.value.parentname.slice(0, 2);
     let cname=this.registrationForm.value.childname.slice(0, 2);
     let no=this.registrationForm.value.mobnumber.toString()
     let number=no.slice(0, 2);
     this.count++;   

     this.showtoken=`CAN-${this.count}`
     this.token=this.showtoken;
     this.tokenparent=this.registrationForm.value.parentname;
     this.tokenchild=this.registrationForm.value.childname;
     this.tokenmob=this.registrationForm.value.mobnumber;
  
     this.details.push({
     token: this.token,
     parent: this.registrationForm.value.parentname,
     child: this.registrationForm.value.childname,
     mobile: this.registrationForm.value.mobnumber,
     state:'waiting'
});
    
    localStorage.setItem('saveddetails', JSON.stringify(this.details));
     //this.tokenservice.updateTokens(this.details);
    this.flag=false;
    this.registrationForm.reset();
    }
  }
  
   
  }
  closeToken() {
  this.flag = true;   
}
}



