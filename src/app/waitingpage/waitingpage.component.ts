import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenpdateService } from '../tokenpdate.service';
@Component({
  selector: 'app-waitingpage',
  imports: [CommonModule],
  templateUrl: './waitingpage.component.html',
  styleUrl: './waitingpage.component.css'
})
export class WaitingpageComponent implements OnInit{

    sdetails: any = {};
      detailarray: any = {};
    showtoken: string ='';
    token:string='';
    parentname='';
    childname='';
    mobnumber='';
    state='';
    flag=true;
    parent='';
    child='';
    waitingtoken='';
    mob='';
    completed:any={};
    noTokens: number = 0;  
    serve=true;
    completebutton=false;
    nextbutton=true;
    found={};
     now = new Date();
     time = this.now.toLocaleTimeString();
     completedtime=''
     
   
     servingtoken:any=[];
     storingtoken:any=[];
     registerdtokens:any=[];
    completedtoken=false;

    constructor(private tokenService: TokenpdateService){

    }
    ngOnInit(): void {

  //    this.tokenService.serving$.subscribe(tokens => {
  //   this.servingtoken = tokens;
  // });
     this.detailarray= JSON.parse(localStorage.getItem('saveddetails') || '[]');
    
     this.sdetails=this.detailarray.filter((obj :any)=> obj.state === 'waiting');


    this.registerdtokens = [...this.sdetails];
    this.noTokens=this.sdetails.length;
  //  console.log(this.sdetails)
     this.parentname='';
     this.token='';
     this.childname='';
     this.mobnumber='';
   
     
    //this.complete()
     
    }

     complete(){
      this.serve=true;
      this.completedtoken=true;
      console.log(this.storingtoken)
    
     this.servingtoken = [ ...this.storingtoken] ;
    // this.tokenService.updateServingTokens(this.servingtoken);
      this.completebutton=false;
      this.nextbutton=true;
    
   
     const user = this.registerdtokens.find((u: any) => u.token === this.token);

  if (user) {
    user.state = 'complete';
    console.log('Token completed:', user);
  } else {
    console.log('Token not found');
  }
    localStorage.setItem('saveddetails', JSON.stringify(this.registerdtokens));
      this.completedtime= this.now.toLocaleTimeString();
     // this.tokenService.updateTokens(this.registerdtokens)
    }
     next(){
     // localStorage.setItem('saveddetails', JSON.stringify(this.sdetails));
      this.serve=false;
      if (this.sdetails && this.sdetails.length > 0)
       {
      this.parentname=this.sdetails[0].parent;
      this.token=this.sdetails[0].token;
      this.childname=this.sdetails[0].child;
      this.mobnumber=this.sdetails[0].mobile;
     
      const user = this.registerdtokens.find((u: any) => u.token === this.sdetails[0].token);
    if (user) {
      user.state = 'serving';
      
    }
     
        if (this.sdetails.length > 0) {
          this.storingtoken.push(this.sdetails[0])
        }
    
      this.sdetails.splice(0,1);
      console.log(this.registerdtokens)
      localStorage.setItem('saveddetails', JSON.stringify(this.registerdtokens));
     }
     this.completebutton=true;
     this.nextbutton=false;
    //  this.tokenService.updateTokens(this.registerdtokens)
     
     }
     
     
}
