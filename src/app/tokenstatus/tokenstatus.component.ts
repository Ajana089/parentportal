import { Component,OnInit } from '@angular/core';
import { TokenpdateService } from '../tokenpdate.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-tokenstatus',
  imports: [CommonModule],
  templateUrl: './tokenstatus.component.html',
  styleUrl: './tokenstatus.component.css'
})
export class TokenstatusComponent implements OnInit{

 tokenarray:any=[];
  constructor(private tokenservice:TokenpdateService){}

  ngOnInit(): void {

     this.loadTokens();
   
  
}

  loadTokens(){
     this.tokenarray=JSON.parse(localStorage.getItem('saveddetails') || '[]');
  }


}
