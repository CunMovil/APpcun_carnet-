import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CunapiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CunapiProvider {
  
  url: string = 'https://6fb23365.ngrok.io';

  constructor ( private http: HttpClient ) {
    
  }


  getUserByEmail(email) {
    let rparams = new HttpParams().set('email',email)
    let options = {
      headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*' 
      },
      params : rparams       
    }
    return this.http.get(this.url+'/estudiantes',options);    
  }

  getUserGrades(ccid) {
    let options = {
      headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*' 
      }   
    }
    return this.http.get(this.url+'/notas/'+ccid, options);    
  }

  getUserlicence(ccid) {
    let options = {
      headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*' 
      }   
    }
    return this.http.get(this.url+'/carne/'+ccid, options);    
  }

  getSchedule(ccid,day) {
    let rparams = new HttpParams().set('day',day)
    let options = {
      headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*' 
      } ,
      params: rparams  
    }
    return this.http.get(this.url+'/horario/'+ccid, options);    
  }

  getVirtualSchedule(ccid) {   
    let options = {
      headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*' 
      } 
    }
    return this.http.get(this.url+'/horario/virtual/'+ccid, options);    
  }
}
