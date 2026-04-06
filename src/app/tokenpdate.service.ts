import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenpdateService {

  private tokenSource = new BehaviorSubject<any[]>([]);
  tokens$ = this.tokenSource.asObservable();

  constructor() {}

  updateTokens(newTokens: any[]) {
    console.log(newTokens);
    this.tokenSource.next([newTokens,...newTokens]);  
  }

  getCurrentTokens() {
    console.log(this.tokens$)
    return this.tokens$; 
  }

   private servingSource = new BehaviorSubject<any[]>(JSON.parse(localStorage.getItem('servingtoken') || '[]'));
  serving$ = this.servingSource.asObservable();

  updateServingTokens(tokens: any[]) {
    this.servingSource.next([...tokens]);
    //localStorage.setItem('servingtoken', JSON.stringify(tokens)); // optional persistence
  }
}