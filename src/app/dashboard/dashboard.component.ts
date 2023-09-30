import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  deleteSucessMessage:string=''//to store success message of delete account
  deleteConfirmStatus:boolean=false // delete confirm content
  acno:any // for parent to child data communcication
 isCollapse:boolean=false; // for readmore read less

 transferSucess:string=''
 transferError:string=''
 logOutSuccess:boolean=false

 user:string='' // to hold localstorage user name
 balance:string=''// to hold localstorage balance
 currentAcno:string=''
 constructor(private fb:FormBuilder,private api:ApiService,private logOutRouter:Router){}
 
  ngOnInit(): void {
  if(localStorage.getItem('currentUser')){
    this.user=localStorage.getItem('currentUser')||''
  }
  if(!localStorage.getItem('token'))
  {
    alert("please login")
    this.logOutRouter.navigateByUrl('')
  }
  // if(localStorage.getItem('balance')){
  //   this.balance=localStorage.getItem('balance')||''
  // }
  if(localStorage.getItem('currentAcno')){
    this.currentAcno = localStorage.getItem('currentAcno')||''
  }
  }


 fundTransferForm = this.fb.group({
  creditAcn:['',[Validators.required,Validators.pattern('[0-9]*')]],
  amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
  password:['',[Validators.required,Validators.pattern('[a-zA-z0-9]*')]]
 })

   // for collapse
 collapse(){
  this.isCollapse=!this.isCollapse
 }
// fund transfer form validation(collapse) and fund transffer
 fundTransfer(){
  // this for form validation
  if(this.fundTransferForm.valid){
    console.log(this.fundTransferForm.value);
    let creditAcn = this.fundTransferForm.value.creditAcn;
    let amount = this.fundTransferForm.value.amount;
    let password= this.fundTransferForm.value.password;
    console.log(creditAcn,amount,password);
    // this for fund transfer
    this.api.fundTransfer(creditAcn,password,amount).subscribe((result:any)=>{
     console.log(result);
     this.transferSucess=result.message;
     },
     (result:any)=>{
      console.log(result.error.message);
      this.transferError=result.error.message 
     })
  }else{
    alert("invalid form")
  }
  // to reset the form,success message and error message after 3 seconds
  setTimeout(()=>{
    this.fundTransferForm.reset(),
    this.transferSucess='',
    this.transferError=''
   },3000)
 }
 // to reset the fund transfer form while clicking the reset button
 reset(){
  this.fundTransferForm.reset()
 }
 

 //get balance
 getBalance(){
   this.api.getBalance(this.currentAcno).subscribe((result:any)=>{
    this.balance=result.balance
   },
   (result:any)=>{
    alert(result.error.message)
   })
 }

 // function for logOut
 logout(){
  localStorage.clear()
  this.logOutSuccess=true
  setTimeout(() => {
    this.logOutRouter.navigateByUrl('')
  },2000);
 }

 // data to be shared with the child componenet
 deleteAccount(){
  this.acno=localStorage.getItem('currentAcno')   
  this.deleteConfirmStatus=true; 
 }

 cancelDeleteConfirm(){
  this.acno=''
  this.deleteConfirmStatus=false;
 }
 deleteFromParent(){
  this.api.deleteAccount().subscribe((result:any)=>{
    localStorage.clear() //to remove the account details from local storage
    this.deleteSucessMessage=result.message //this contains account deleted successfully
    setTimeout(() => {
      this.logOutRouter.navigateByUrl('')// will redirect back to login page if account is deleted
    },3000);
  })
 }
}
        
