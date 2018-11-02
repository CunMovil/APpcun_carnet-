import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';

/**
 * Generated class for the MispagosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mispagos',
  templateUrl: 'mispagos.html',
})
export class MispagosPage {
  pdfObj = null;
  constructor (
                public  navCtrl: NavController,
                public  navParams: NavParams,
                private inAppBrowser:InAppBrowser,
                private alertCtrl : AlertController,
                private document : DocumentViewer,
                private transfer : FileTransfer,
                private fileOpener: FileOpener,
                private Platform: Platform,
                private File:File
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MispagosPage');
  }

  goHome(){
    this.navCtrl.setRoot('MenuCunPage')
  }

  pagosPecLink() {
    this.inAppBrowser.create("https://botondepago.cun.edu.co:8443/BotonPago","_blank",);
  }

  estadoCuenta() {
    this.inAppBrowser.create("https://plataformas.cun.edu.co/estadocuenta/","_blank",);
  }
}
