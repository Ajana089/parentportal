import { Component, OnInit } from '@angular/core';
 import { RouterOutlet,RouterLink } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

   users:any= JSON.parse(localStorage.getItem('user') || '[]');

   username=this.users.username;

   constructor(private router: Router){}

   ngOnInit(): void {
    this.users
   }


  logout(){
   
    localStorage.removeItem("user");
    this.users=null;
    this.router.navigateByUrl("login");
  }

}
