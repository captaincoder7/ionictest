import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


// Şifreyi Sha256'ya dönüştürmek için kullanıldı npm i crypto-js komutu ile kurmalısınız
import sha256 from 'crypto-js/sha256';
import { PhPService } from '../ph-p.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  userData = {'name':'', 'email':'', 'username':'', 'password':''};

  constructor(public php:PhPService,public router:Router) { }

  ngOnInit() {
  }

  kayit()
  {
    // this.userData.password = sha256(this.userData.password).toString();

    this.php.veriGonder('kayit', this.userData).subscribe(sonuc=> {
      //console.log(sonuc);

      this.router.navigateByUrl('login');
    }, hata=>{
      //console.log(hata.error.error.text);
      this.php.presentAlert(hata.error.error.text);
    });
  }

}
