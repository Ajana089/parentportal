import { Component } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormControl,Validators } from '@angular/forms';
import { RouterOutlet,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {


  details: any[] = [];
  flag:boolean=true;
  showtoken: string ='';
  token:string='';
  tokenparent='';
  tokenchild='';
  tokenmob='';
  loginError: boolean = false;
  username1="welcome"
  password1="2026"
  count: number = 0;

    LoginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    
  });

  get username() { return this.LoginForm.get('username')!; }
  get password() { return this.LoginForm.get('password')!; }
  

  constructor(private router: Router){

  }

  ngOnInit(){
    this.flag;

  }

  onSubmit() {


  let user = this.details.find(user =>
  user.username === this.LoginForm.value.username &&
  user.password === this.LoginForm.value.password
);

    localStorage.setItem('user', JSON.stringify(user));
    if(user ){
         this.loginError = false;
         this.router.navigateByUrl('/registration');
      }

      else{
        this.loginError = true; 
      }
       this.LoginForm.reset();
   
  }
  onRegister(){
  
    this.details.push(this.LoginForm.value);
    console.log(this.details)
    this.flag=true;
     this.LoginForm.reset();

}

 changeAction(){
    this.flag=!this.flag;
  }
}
