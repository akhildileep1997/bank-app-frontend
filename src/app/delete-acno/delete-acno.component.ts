import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-delete-acno',
  templateUrl: './delete-acno.component.html',
  styleUrls: ['./delete-acno.component.css']
})
export class DeleteAcnoComponent {
  constructor(private api:ApiService){}
@Input() deleteAcno:any // 1
//user defined event // name of event is onCancel
@Output() onCancel= new EventEmitter(); //new eventemitter helps us to create a new user defined event
@Output() onDelete = new EventEmitter() //new eventemitter helps us to create a new user defined event
cancel(){
this.onCancel.emit()//Emits an event containing a given value.
}
deleteFromChild(){
  this.onDelete.emit()// emits an event containing a given valuue
}
}
