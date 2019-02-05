import { NativeStorage } from '@ionic-native/native-storage';
import { Injectable } from '@angular/core';
import { Item } from '../../models/item';
import { TranslateService } from '@ngx-translate/core';

export interface items{
  nombre:string;
  imagen:string;
  page:string;
}

@Injectable()
export class BotonesMenu {

  items: Item[] = [];
  constructor( private translate:TranslateService,nativeStorage:NativeStorage) {
    this.translate.get([
                        "TITLE_MENU_NOTAS",
                        "TITLE_MENU_CARNE",
                        "TITLE_MENU_CALENDARIO",
                        "TITLE_MENU_VIRTUAL",
                        "TITLE_MENU_HORARIO",
                        "TITLE_MENU_CUNMEDIA",
                        "TITLE_MENU_BIBLIOTECA",
                        "TITLE_MENU_CAPSULA",
                        "TITLE_MENU_EMPLEO",
                        "TITLE_MENU_PAGO",
    ]).subscribe(
      (values) => {        
        let items = [
                      {
                        nombre: values.TITLE_MENU_CARNE,
                        imagen: "assets/img/5carne.png",
                        page:   "CarnePage", 
                        cunOnly: true
                      },
                      {
                        nombre:  values.TITLE_MENU_NOTAS,
                        imagen:  "assets/img/4notas.png",
                        page:    "NotasPage", 
                        cunOnly: true
                      },
                      // {
                      //   nombre: values.TITLE_MENU_HORARIO,
                      //   imagen: "assets/img/8horario.png",
                      //   page:   "HorarioPage", 
                      //   cunOnly: true
                      // },
                      {
                        nombre: values.TITLE_MENU_PAGO,
                        imagen: "assets/img/18pagos.png",
                        page:   "MispagosPage",
                        cunOnly: true
                      },
                      // {
                      //   nombre: values.TITLE_MENU_CALENDARIO,
                      //   imagen: "assets/img/6calendario.png",
                      //   page:   "CalendarioPage"
                      // },
                      {
                        nombre: values.TITLE_MENU_BIBLIOTECA,
                        imagen: "assets/img/11biblioteca.png",
                        page:   "BibliotecaPage"
                      },      
                      {
                        nombre: values.TITLE_MENU_VIRTUAL,
                        imagen: "assets/img/7virtual.png",
                        page:   "CunVirtualPage"
                      },
                      {
                        nombre: values.TITLE_MENU_CUNMEDIA,
                        imagen: "assets/img/10media.png",
                        page :"CunMediaPage"
                      },
                      {
                        nombre: values.TITLE_MENU_CAPSULA,
                        imagen: "assets/img/14capsula.png",
                        page:   "CunCapsulaPage"
                      },{
                        nombre: values.TITLE_MENU_EMPLEO,
                        imagen: "assets/img/15empleo.png",
                        page:   "EmpleoPage"
                      }
                      ,{
                        nombre: "¡Tu amig@ 24/7!",
                        imagen: "assets/img/icon-cami.png",
                        page:   "CamiPage"
                      }
        ];                
        for (let item of items) {
          this.items.push(new Item(item));
        }
      }
    )
  }

  query(params?: any) {
    let filterItems =[];
    if (!params) {
      return this.items;
    }
     this.items.filter((item) => {       
      if(item.cunOnly){
       // item.candado =  "assets/img/IconoCandado.png";
        //item.page = 'noCunPage';
        filterItems.push(item)
      } else {
        filterItems.push(item)
      }
    });
    return filterItems
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}