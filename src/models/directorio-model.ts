export class DirectorioModel {

  constructor(fields: any) {
    // Quick and dirty extend/assign fields to this model
    for (const f in fields) {
      // @ts-ignore
      this[f] = fields[f];
    }
  }

}

export interface DirectorioModel {
  nombre:string,
  telefono:string,
  email:string,
  iconcall:string,
  iconmail:string,
  [prop: string]: any;
}
