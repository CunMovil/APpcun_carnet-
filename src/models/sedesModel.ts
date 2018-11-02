
export class SedesModel {

  constructor(fields: any) {
    // Quick and dirty extend/assign fields to this model
    for (const f in fields) {
      // @ts-ignore
      this[f] = fields[f];
    }
  }

}

export interface SedesModel {
  nombre:string,
  direccion:string,
  telefono:string,
  horario:string,
  label:string
  lat:number,
  lng:number
  [prop: string]: any;
}
