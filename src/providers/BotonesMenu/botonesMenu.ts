import { NativeStorage } from '@ionic-native/native-storage';
import { Injectable } from '@angular/core';
import { Item } from '../../models/item';
import { TranslateService } from '@ngx-translate/core';
import { carne } from '../../pages/index';

export interface items{
  nombre:string;
  imagen:string;
  page:string;
}
export interface itemsService{
  nombre:string;
  imagen:string;
  page:string;
}
export interface itemsInfo{
  nombre:string;
  imagen:string;
  page:string;
}

@Injectable()
export class BotonesMenu {

  items: Item[] = [];
  itemsSer: itemsService[] = [];
  itemsInf: itemsInfo[] = [];
  constructor( private translate:TranslateService,nativeStorage:NativeStorage) {
    this.translate.get([
                        
                        "TITLE_MENU_CARNE",
                        "TITLE_MENU_NOTAS",
                        "TITLE_MENU_PAGO",
                        "TITLE_MENU_CAPSULA",                        
                        "TITLE_MENU_CUNMEDIA"
                        
    ]).subscribe(
      (values) => {        
        let items = [
                      {
                        nombre: values.TITLE_MENU_CARNE,
                        imagen: "assets/img/1-carne.png",
                        page:   "CarnePage", 
                      },
                      {
                        nombre:  values.TITLE_MENU_NOTAS,
                        imagen:  "assets/img/2-notas.png",
                        page:    "NotasPage", 
                      },
                      {
                        nombre: values.TITLE_MENU_PAGO,
                        imagen: "assets/img/3-pagos.png",
                        page:   "MispagosPage",
                        cunOnly: true
                      },
                      {
                        nombre: values.TITLE_MENU_CAPSULA,
                        imagen: "assets/img/4-cun-capsula.png",
                        page:   "CunCapsulaPage"
                      },
                      // {
                      //   nombre: values.TITLE_MENU_CUNMEDIA,
                      //   imagen: "assets/img/5-cun-media.png",
                      //   page :"CunMediaPage"
                      // }
                    ];                
        for (let item of items) {
          this.items.push(new Item(item));
        }
      }
    )

    this.translate.get([
      "CAMI_TITLE",                 
      "TITLE_MENU_BIBLIOTECA",
      "TITLE_MENU_VIRTUAL",
      "TITLE_MENU_EMPLEO",
      
    ]).subscribe(
      (values) => {        
        let itemsSer = [
          {
            nombre: "¡Tu amig@ 24/7!",
            imagen: "assets/img/icon-cami.png",
            page:   "CamiPage"
          },
          {
            nombre: values.TITLE_MENU_BIBLIOTECA,
            imagen: "assets/img/11biblioteca.png",
            page:   "BibliotecaPage"
          },
        ];                
        for (let item of itemsSer) {
          this.itemsSer.push(new Item(item));
        }
      }
    )
    this.translate.get([
                        
      "TITLE_MENU_CARNE",
      "TITLE_MENU_AGENDA", 
      "TITLE_MENU_VIRTUAL",
      
    ]).subscribe(
      (values) => {        
        let itemsInf = [
          {
            nombre: values.TITLE_MENU_CARNE,
            imagen: "assets/img/11biblioteca.png",
            page:   "NoticiasPage"
          },
          {
            nombre:  values.TITLE_MENU_AGENDA,
            imagen: "assets/img/icon-cami.png",
            page:   "AgendaPage"
          },
        ];                
        for (let item of itemsInf) {
          this.itemsInf.push(new Item(item));
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
}