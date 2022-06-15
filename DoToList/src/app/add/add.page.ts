import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { HomePage } from '../home/home.page';
import { PhPService } from '../ph-p.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  @Input() eklenen: any;

  constructor(public router:Router,public php:PhPService,public modalController:ModalController) { }

  ngOnInit() {
  }

  kapat()
  {
    this.modalController.dismiss({
      'dissmissed': true
    });
  }
  async ekle() {

    this.php.veriGonder('mesaj_ekle',this.eklenen).subscribe((sonuc:any) =>{this.php.mesaj(sonuc.text); ;},hata =>{console.log(hata)});this.kapat()



  }
}
