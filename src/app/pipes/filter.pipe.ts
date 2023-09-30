import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allTransaction:any[],searchTerm:string,propsName:string): any[] {
    const result:any[]=[]
    if(!allTransaction||searchTerm==''||propsName==''){
       return allTransaction
    }
    allTransaction.forEach((trans:any)=>{
      if(trans[propsName].trim().toLowerCase().includes(searchTerm.trim().toLocaleLowerCase()))
      {
        result.push(trans)
      }
    })
    return result;
  }
  
 

}
