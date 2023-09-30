import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import jspdf from 'jspdf';
import 'jspdf-autotable' ; 

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  searchKey:string=''
transactons:any=[];

  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.api.transactionHistory().subscribe((result:any)=>{
      console.log(result); // array  of object kittum
      console.log(result.transactions);
      this.transactons=result.transactions;
      console.log(this.transactons);
    },
    (result:any)=>{
      console.log(result.error.message);
      
    })
  }

      // generate a function for generating pdf
      generatePdf(){
        // 1 create an object for jspdf
        var pdf = new jspdf();
  
        // 2 setup row for the table
        let thead = ['Type','From Account','To Account','Amount']
        let tbody=[]
  
        // 3 setup properties for the table like fontsixe etc
        pdf.setFontSize(16)
        pdf.text('Mini Statements',15,10)
                          
        // 4 to display as table ,we need to convert array of objects into nested array
        for(let item of this.transactons){
          let temp = [item.type,item.fromAcno,item.toAcno,item.amount] //nest array[[] [] []]
          tbody.push(temp)
        }
  
        //5 convert nested array into table structure using jspdf-autotable
        (pdf as any).autoTable(thead,tbody)
  
        //6 to open pdf in another tab
        pdf.output('dataurlnewwindow')
  
        //download or save pdf
        pdf.save('TransactionHistory.pdf')
  
      }

}
