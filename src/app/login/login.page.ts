import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'; // 1
import { Router } from '@angular/router';
import { ToastController, Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  language: string = this.translateService.currentLang; // 2 
  texting : any = {};

  public backgroundImage = '../../assets/img/background/background-5.jpg';
  constructor(
     private translateService: TranslateService,
     private router: Router,
     private alertController : AlertController,
     private toastController : ToastController,
  ) { }

  ngOnInit() {
      let foo = this.translateService.get('chaines').subscribe((data:any)=> {
      console.log(data);
      this.texting = data;
     });
  }


async forgot(){
    const alert = await this.alertController.create({
      header: this.texting.SendMeMail,
      message: this.texting.mailSend,
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder : 'votre@email.com'
        }
      ],
      buttons: [
        {
          text: this.texting.Cancel,
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: this.texting.Validate,
          handler: (data) => {
            console.log('Confirm Ok');
            if(data.email.trim() != ''){
              console.log('email : ' + data.email);
              //this.auth.passwordResetEmail(data.email)
              this.presentToast(this.texting.checksms);
            }
            
          }
        }
      ]
    });
    await alert.present();
}

register(){
  this.router.navigate(['/register']);
}

login(){
  this.router.navigate(['/tabs/tab1']);
}


  /* Function Shows Notifications */
  async presentToast(message : string){
    const toast = await this.toastController.create({
      message: message,
      duration: 6000
    });
    toast.present();
  }

}
