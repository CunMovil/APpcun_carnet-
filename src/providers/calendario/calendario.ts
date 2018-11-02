
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CalendarioModel } from '../../models/calendarioModel';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CalendarioProvider {
  items: CalendarioModel[] = [];
 private path:string;
 private params:any;
 private calendar:any;
 
  constructor ( 
                private translate:TranslateService,
                public  http: HttpClient
  ){
    this.path = "https://calendario-dcefa.firebaseio.com";
    this.params = {
      "Content-Type": "application/json"     
    }
  }
    
  getcalendar() {
    this.calendar = {
      headers: this.params
    }
    return this.http.get(this.path + "/eventosCun/evento.json",this.calendar)
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    } 
    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }
 
  add(item: CalendarioModel) {
    this.items.push(item);
  }
 
  delete(item: CalendarioModel) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}