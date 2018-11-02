import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DirectorioModel } from '../../models/directorio-model';

@Injectable()
export class DirectorioProvider {

  items: DirectorioModel[] = [];

  constructor(public http: HttpClient) {
      let items = [
                    {
                      nombre:  "Línea de atención en Bogotá" ,
                      telefono:  "3078180",
                      email:    "contacto@cun.edu.co",
                      iconcall: "call",
                      iconmail: "mail"    
                    },
                    {
                      nombre: "Línea Gratuita Nacional ",
                      telefono: "018000115411",
                      iconcall: "call"
                    },
                    {
                        nombre:  "Línea de atención en Bogotá" ,
                        telefono:  "3813222",
                        iconcall: "call",
                        iconmail: "mail"
                    }
      ];

      for (let item of items) {
        this.items.push(new DirectorioModel(item));
      }
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
  
    add(item: DirectorioModel) {
      this.items.push(item);
    }
  
    delete(item: DirectorioModel) {
      this.items.splice(this.items.indexOf(item), 1);
    }
}