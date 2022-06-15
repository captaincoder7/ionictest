import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { PhPService } from '../ph-p.service';

import sha256 from 'crypto-js/sha256';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userData = {'email':'', 'password':''};


  constructor(public php:PhPService,public router:Router,) { }

  ngOnInit() {
  }




  giris()
  {
    // this.userData.password = sha256(this.userData.password).toString();
    //console.log(this.userData.password);

    this.php.veriGonder("giris", this.userData).subscribe(sonuc=>{
      //console.log(sonuc);
      this.php.setItem(sonuc);
      this.router.navigateByUrl('home');
    }, hata=>{
      //console.log(hata.error.error.text);
      this.php.presentAlert(hata.error.error.text);
    })};
  }



