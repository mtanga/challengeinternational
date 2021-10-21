import { Component } from '@angular/core';
// other imports...
import { TranslateService } from '@ngx-translate/core'; // add this
import { Router } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
    language: string = this.translate.currentLang; // 2 

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService, // add this
    private router: Router
  ) {
    this.initializeApp();
  }
  
  initializeApp() {
    this.setl();
  }

  setl(){
    let lang = localStorage.getItem('langi');
    if (lang!=null || lang!=undefined){
        this.translate.setDefaultLang(lang); // add this
       
      }
      else{
        this.translate.setDefaultLang('en'); // add this
      }
      this.set();
  }
  
  set(){
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.getStatus();
    });
  }

  getStatus(){
        let first = localStorage.getItem('primer');
        if (first==null || first==undefined){
            this.router.navigate(['/onboarding']);
          }
/*         else{
           this.router.navigate(['/login']);
            let connected = false;
              if(connected==false ){
                this.router.navigate(['/login']);
                connected = true;
              }
              else{
                  this.router.navigate(['/tabs/tab1']);
              }
        } */
            
      }
  
  
}
