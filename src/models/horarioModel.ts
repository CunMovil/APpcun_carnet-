export class HorarioModel {

  constructor(fields: any) {
    // Quick and dirty extend/assign fields to this model
    for (const f in fields) {
      // @ts-ignore
      this[f] = fields[f];
    }
  }

}

export interface HorarioModel {
  dia:string,
  imagen:string
  [prop: string]: any;
}
