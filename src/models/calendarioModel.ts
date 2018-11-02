export class CalendarioModel {

  constructor(fields: any) {
    // Quick and dirty extend/assign fields to this model
    for (const f in fields) {
      // @ts-ignore
      this[f] = fields[f];
    }
  }
 
 }
 
 export interface CalendarioModel {
  nombreEvento:string,
  descripcion:string,
  hora:string,
  fecha:Date,
  sede:string,
  area:string
  [prop: string]: any;
 }
