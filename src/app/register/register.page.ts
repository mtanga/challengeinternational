import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'; // 1
import { Router } from '@angular/router';
import { ToastController, Platform, AlertController, LoadingController } from '@ionic/angular';
import { ConnexionService } from '../services/connexion.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  language: string = this.translateService.currentLang; // 2 
  texting : any = {};
  private spinner: any;
  first_name : any;
  last_name : any;
  phone : any;
  email : any;
  password : any;
  repassword : any;



  constructor(
     private translateService: TranslateService,
     private router: Router,
     public con: ConnexionService,
     public loadingCtrl: LoadingController,
     private alertController : AlertController,
     private toastController : ToastController,
  ) { }

  ngOnInit() {
    let foo = this.translateService.get('chaines').subscribe((data:any)=> {
      console.log(data);
      this.texting = data;
     });
  }

  register(){
  if(this.first_name ==null || this.first_name == ""){
    this.presentToast(this.texting.errFirst);
  }
  else if(this.last_name ==null || this.last_name == ""){
    this.presentToast(this.texting.errLast);
  }
  else if(this.phone ==null || this.phone == ""){
    this.presentToast(this.texting.errPhone);
  }
  else if(this.email ==null || this.email == ""){
    this.presentToast(this.texting.errEmail);
  }
  else if(this.password ==null || this.password == ""){
    this.presentToast(this.texting.errPassword);
  }
  else if(this.repassword ==null || this.repassword == ""){
    this.presentToast(this.texting.errPasswordR);
  }
  else if(this.password != this.repassword ){
    this.presentToast(this.texting.errConfirm);
  }
  else{
      let user = {
        first_name : this.first_name,
        last_name   : this.last_name,
        email      : this.email,
        password  : this.password,
        formattedPhone : this.phone,
        carrierCode : "237",
        defaultCountry : "cm",
        role : 2,
        status : 2,
        type : "user",
        phone : this.phone
      }
      this.sigin(user);
  }
  

}
  sigin(user: { first_name: any; last_name: any; email: any; password: any; formattedPhone: any; carrierCode: string; defaultCountry: string; role: number; status: number; type: string; phone: any; }) {
    let datad = { email : user.email};
    this.con.check("registration/duplicate-email-check/", datad).subscribe( async (data:any)=> {
      console.log(data);
      console.log(data.status);
      if(data){
       // this.presentToast();
        
      }
    }, (err) => {
      console.log(err); 
      //this.presentToast();   
  });
  }

  async VerifEmail() {
    this.spinner = await this.loadingCtrl.create({
      message: this.texting.verifSMS + this.email
    });
    await this.spinner.present();
    setTimeout(() => {
      this.spinner.dismiss();
    }, 2000);
    
  }

login(){
  this.router.navigate(['/login']);
}

async presentToast(message) {
  const toast = await this.toastController.create({
    message: message,
    duration: 3000
  });
  toast.present();
}


}
