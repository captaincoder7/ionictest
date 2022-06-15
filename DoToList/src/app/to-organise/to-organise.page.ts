import { Component, OnInit ,Input} from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { PhPService } from '../ph-p.service';

@Component({
  selector: 'app-to-organise',
  templateUrl: './to-organise.page.html',
  styleUrls: ['./to-organise.page.scss'],
})
export class ToOrganisePage implements OnInit {

  @Input() duzeltilen: any;
  @Input() id: any;

  constructor(public php:PhPService, public modalController:ModalController,public alertController:AlertController) { }

  ngOnInit() {
  }

  kapat()
  {
    this.modalController.dismiss({
      'dissmissed': true
    });
  }

  duzelt()
  {
    this.php.veriGonder('mesaj/guncelle/'+this.id,this.duzeltilen).subscribe((sonuc:any) =>{this.php.mesaj(sonuc.text); ;},hata =>{console.log(hata)});this.kapat()
  }
  async sil(id) {

    this.silOnay(id);

    //modal açmak için tıklandığında sliding item'ın açık kalmaması için
    const slidingItem = document.getElementById('slidingItem'+id) as HTMLIonItemSlidingElement;
    // slidingItem.close();

  }
  async silOnay(id) {


    let user = await this.php.getObject();

    let userData = {'username':'' ,'token':''};

    userData.username = user.username;
    userData.token = user.token;

    const alert = await this.alertController.create({
      header: 'Uyarı!',
      message: 'Mesajı silmek istediğinize emin misiniz?',
      buttons: [
        {
          text: 'Vazgeç',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sil',
          id: 'confirm-button',
          handler: () => {
            this.php.veriGonder('sil/'+id,userData).subscribe((sonuc:any)=>{this.php.mesaj(sonuc.text); ;}, hata=>{console.log(hata);});this.kapat();
          }

        }
      ]
    });

    await alert.present();


}


}
