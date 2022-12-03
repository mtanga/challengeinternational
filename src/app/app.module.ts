import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

//import { IonIntlTelInputModule } from 'ion-intl-tel-input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
//import { EmailComposer } from '@ionic-native/email-composer';
// other imports here...
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';

// imports...
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
     IonicModule.forRoot(),
      AppRoutingModule,
      //IonIntlTelInputModule,
      HttpClientModule, // <--- add this
      TranslateModule.forRoot({ // <--- add this
        loader: { // <--- add this 
          provide: TranslateLoader, // <--- add this
          useFactory: (createTranslateLoader),  // <--- add this
          deps: [HttpClient] // <--- add this
        } // <--- add this
      }), // <--- add this
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthModule
    ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    CallNumber,
    VideoPlayer,
     HTTP,
     HttpClient,
    //EmailComposer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})

export class AppModule {}
