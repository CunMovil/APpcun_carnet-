import { Injectable } from '@angular/core';
import { HorarioModel } from '../../models/horarioModel';


@Injectable()
export class HorarioProvider {
  items: HorarioModel[] = [];

 

  constructor() {
    let items = [
                  {
                    dia:    "Lunes" ,
                    imagen: "assets/img/lunes.png"
                  },
                  {
                    dia:   "Martes",
                    imagen:"assets/img/martes.png"
                  },
                  {
                    dia:   "Miercoles",
                    imagen:"assets/img/miercoles.png"
                  },
                  {
                    dia:   "Jueves",
                    imagen:"assets/img/jueves.png"
                  },
                  {
                    dia:   "Viernes",
                    imagen:"assets/img/viernes.png"
                  },
                  {
                    dia:   "Sabado",
                    imagen:"assets/img/sabado.png"
                  },
                  {
                    dia:   "Domingo",
                    imagen:"assets/img/virtual.png"
                  }
    ];

    for (let item of items) {
      this.items.push(new HorarioModel(item));
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

  add(item: HorarioModel) {
    this.items.push(item);
  }

  delete(item: HorarioModel) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
