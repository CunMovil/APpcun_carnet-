import { SedesModel } from './../../models/sedesModel';
import { Injectable } from '@angular/core';

@Injectable()
export class SedesProvider {

  items: SedesModel[] = []; 

  constructor() {
    let items = [
                  {
                    nombre:'Sede A',
                    direccion:'CALLE 12B #4-76',
                    telefono:'3078180',
                    horario:'lunes-viernes(8am-8pm)/sabados(8am-1pm)',
                    label:'A',
                    lat:4.598691,
                    lng:-74.072363,
                    },
                    {
                      nombre:'Sede B',
                    direccion:'CALLE 12 # 4-92',
                    telefono:'3078180',
                    horario:'lunes-viernes(8am-8pm)/sabados(8am-1pm)',
                    label:'B',
                    lat:44.597978, 
                    lng:-74.072874,
                    },
                    {
                      nombre:'Sede C',
                      direccion:'CALLE 12B # 3-73',
                      telefono:'3078180',
                      horario:'lunes-viernes(8am-8pm)/sabados(8am-1pm)',
                      label:'C',
                      lat:4.598141,
                      lng: -74.071587
                    },
                    {
                      nombre:'Sede E',
                      direccion:'CRA 5b # 10-35',
                      telefono:'3078180',
                    horario:'lunes-viernes(8am-8pm)/sabados(8am-1pm)',
                      label:'E',
                      lat:4.596597,
                      lng: -74.074004
                    },
                    {
                      nombre:'Sede G',
                      direccion:'CALLE 17 # 4-95',
                      telefono:'3078180',
                      horario:'lunes-viernes(8am-8pm)/sabados(8am-1pm)',
                      label:'G',
                      lat:4.602472, 
                      lng:-74.070876
                    },
                    {
                      nombre:'Sede F-H-P',
                      direccion:'CALLE 12C # 3-99',
                      telefono:'3078180',
                      horario:'lunes-viernes(8am-8pm)/sabados(8am-1pm)',
                      label:'F-H-P',
                      lat:4.599031, 
                      lng:-74.070958
                    },
                    {
                      nombre:'Sede O',
                      direccion:'AV JIMENEZ # 8-29',
                      telefono:'3078180',
                      horario:'lunes-viernes(8am-8pm)/sabados(8am-1pm)',
                      label:'O',
                      lat:4.602132,
                      lng: -74.074546
                    },
                    {
                      nombre:'Sede I',
                      direccion:'CALLE 17 # 4-81',
                      telefono:'3078180',
                    horario:'lunes-viernes(8am-8pm)/sabados(8am-1pm)',
                      label:'I',
                      lat:4.602374, 
                      lng:-74.070683
                    }
                    ,
                    {
                      nombre:'Sede J',
                      direccion:'CALLE 12C # 8-27',
                      telefono:'3078180',
                      horario:'lunes-viernes(8am-8pm)/sabados(8am-1pm)',
                      label:'J',
                      lat:4.601565,
                      lng: -74.074989
                    }
                    ,
                    {
                      nombre:'Sede L',
                      direccion:'CALLE 12B #6-71',
                      telefono:'3078180',
                      horario:'lunes-viernes(8am-8pm)/sabados(8am-1pm)',
                      label:'J',
                      lat:4.599710, 
                      lng:-74.073994
                    }
                    ,
                    {
                      nombre:'Sede N',
                      direccion:'CRA 8 # 12A-13',
                      telefono:'3078180',
                      horario:'lunes-viernes(8am-8pm)/sabados(8am-1pm)',
                      label:'N',
                      lat:4.600242, 
                      lng:-74.075464
                    }
    ];

    for (let item of items) {
      this.items.push(new SedesModel(item));
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

  add(item: SedesModel) {
    this.items.push(item);
  }

  delete(item: SedesModel) {
    this.items.splice(this.items.indexOf(item), 1);
  }

}
