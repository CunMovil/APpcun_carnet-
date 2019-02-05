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
  
 private url: string;
 private options : any;
 private TusheadersParams =
 {
     idCliente:"APP_CUN",
     token: "123456",
     correoElectronico: ""
 };
  constructor ( private http: HttpClient ) {
    
    this.url = 'http://52.5.207.2:8080/SeviciosCUN/webresources/Consultas/InformacionAlumno';
  }

   parameters = {
    "Content-Type": "application/json",    
   }

   getUserlicence(email:string){
    this.TusheadersParams.correoElectronico = email
    let options = {
      headers:{
        "Content-Type": "application/json",    
        'Access-Control-Allow-Origin': '*' 
      },
      body: JSON.stringify( this.TusheadersParams) 
        
    }


     return this.http.post(this.url,this.TusheadersParams,options)
     
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

  // getUserlicence(ccid) {
  //   let options = {
  //     headers:{
  //       'Content-Type':'application/x-www-form-urlencoded',
  //       'Access-Control-Allow-Origin': '*' 
  //     }   
  //   }
  //   return this.http.get(this.url+'/carne/'+ccid, options);    
  // }

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
