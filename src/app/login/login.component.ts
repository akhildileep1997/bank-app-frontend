import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // for holding error message
  loginError:string='';
  // variable to hold lofin success
  loginSuccess:boolean= false;
  constructor(private fb:FormBuilder,private api:ApiService,private loginRouter:Router){}

 
 loginForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-z0-9]*'),]]
  })
  login(){
    if(this.loginForm.valid){
      console.log(this.loginForm);
      console.log(this.loginForm.value);
      let acno=this.loginForm.value.acno
      let password=this.loginForm.value.password
      console.log(acno,password);
      this.api.login(acno,password).subscribe((response:any)=>{
       console.log(response);
       console.log(response.currentUser);
       console.log(response.balance);

         // to store username from above response
        localStorage.setItem('currentUser',response.currentUser)
        //to store balance in localStorage
        localStorage.setItem('balance',response.balance)
        // to store  currentAcno from token
        localStorage.setItem('currentAcno',response.currentAcno)
        // to store token into local storage
        localStorage.setItem('token',response.token)

      
        // success
        this.loginSuccess=true;
        setTimeout(()=>{
          this.loginRouter.navigateByUrl('/dashboard')  
        },2000)
        alert("logged in successfully")
       
      },
      // error message
      (response:any)=>{
         this.loginError=response.error.message
         setTimeout(()=>{
          this.loginForm.reset();
          this.loginError='';
         },2000)
      }
      )
    }else{
      alert("login denied")
    }
    

    
    
    
  }

}
