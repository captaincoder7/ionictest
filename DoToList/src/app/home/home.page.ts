import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AddPage } from '../add/add.page';
import { PhPService } from '../ph-p.service';
import { ToOrganisePage } from '../to-organise/to-organise.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public router:Router,public php:PhPService,public alertController:AlertController,public modalController:ModalController) {}
  veriler;


  ngOnInit() {
    this.listele();

  }
  



   async listele() {


    let user = await this.php.getObject();


    this.php.presentLoading();
    this.php.veriGetir('mesajlar/'+user.user_id).subscribe(sonuc=> {
      //console.log(sonuc);
      this.veriler = sonuc;
      this.php.dismissAllLoaders();
    }, hata=>{
      console.log(hata.erorr.error.text);
      this.php.dismissAllLoaders();
    });

  }
  async duzenle(mesaj, id) {
    const user = await this.php.getObject();
    if (user==null)
      this.router.navigateByUrl('home');
    else
    {

    let userData = {'username':'', 'feed':'' ,'token':''};

    userData.username = user.username;
    userData.token = user.token;
    userData.feed = mesaj;

    const modal = await this.modalController.create({
      component:ToOrganisePage,
      swipeToClose:true,
      initialBreakpoint:1,
      breakpoints:[0.1 ,0.5, 1 ],
      componentProps: {
        'duzeltilen':userData,
        'id':id
      }
    });

    modal.onDidDismiss().then(sonuc=>{this.listele()});

    //modal açmak için tıklandığında sliding item'ın açık kalmaması için
    const slidingItem = document.getElementById('slidingItem'+id) as HTMLIonItemSlidingElement;
    slidingItem.close();

    return await modal.present();
  }
  }
  zamanDonustur(zaman)
  {
    let a = new Date(zaman*1000).toLocaleDateString();
    return a;
  }

  logout()
  {
    this.php.removeItem();
    this.router.navigateByUrl('login');
  }
  async sil(id) {

    this.silOnay(id);

    //modal açmak için tıklandığında sliding item'ın açık kalmaması için
    const slidingItem = document.getElementById('slidingItem'+id) as HTMLIonItemSlidingElement;
    slidingItem.close();

  }
  async ekle() {
    const user = await this.php.getObject();
    if (user==null)
      this.router.navigateByUrl('home');
    else
    {

    let userData = {'username':'','token':''};

    userData.username = user.username;
    userData.token = user.token;

    const modal = await this.modalController.create({
      component:AddPage,
      swipeToClose:true,
      initialBreakpoint:1,
      breakpoints:[0.1 ,0.5, 1 ],
      componentProps: {
        'eklenen':userData,
      }
    });

    modal.onDidDismiss().then(sonuc=>{this.listele()});

    return await modal.present();
  }
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
            this.php.veriGonder('sil/'+id,userData).subscribe((sonuc:any)=>{this.php.mesaj(sonuc.text); this.listele();}, hata=>{console.log(hata);});
          }
        }
      ]
    });

    await alert.present();

}
}
