import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


const options = {
  headers:new HttpHeaders
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  // crete an api cll for registering

  register(username:any,acno:any,password:any){
        const body={
          username,
          acno,
          password
        }
        return this.http.post('http://localhost:5000/register',body)
  }

  // create api call for login 
  login(acno:any,password:any){
    const body={
      acno,
      password
    }
   return this.http.post('http://localhost:5000/login',body)
  }

  // append token to the header
  appendToken(){
    // get token from localStorage
   let token = localStorage.getItem('token')
   // create httpHeader
   let headers = new HttpHeaders()

   if(token){
    headers = headers.append('verify-token',token)
    options.headers=headers
   }
   return options
  }

  // call for getting balance
  getBalance(acno:any){
    return this.http.get('http://localhost:5000/getbalance/'+acno,this.appendToken())
  }

  // funf transffer api creating
  fundTransfer(toAcno:any,password:any,amount:any){
    const body={
      toAcno,
      password,
      amount
    }
   return this.http.post('http://localhost:5000/fundtransfer',body,this.appendToken())
  }

  // api call for transcation history
  transactionHistory(){
    return this.http.get('http://localhost:5000/transactions',this.appendToken());
  }

  //api for deleting account from db
  deleteAccount(){
    return this.http.delete('http://localhost:5000/deleteAccount',this.appendToken())
  }

  }



