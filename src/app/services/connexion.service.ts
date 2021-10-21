import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse,HttpEvent, HttpParams, HttpRequest, HttpHeaders  } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods':'*',
      'Accept': 'application/json, text/plain',
    })
  };
  token: any;
  tokend: any;
  user: string;
  tokens: any;
  constructor(
    private http: HttpClient,
    private ht: HTTP,
    private router : Router,
    private toastController: ToastController,
    private alertController : AlertController,    
    ) {     }

  loging(data:any){
    let ll = environment.url+ "login";
    console.log(ll);
    return  this.http.post(ll, data, this.httpHeader);
  }


  forgot(email : any){
    console.log(email)
    let d ={
      email : email
    }
    let ll = environment.url+ "forgot/password";
    console.log(ll);
    return  this.http.post(ll, d, this.httpHeader);
  }

  register(data:any){
     let ll = environment.url+ "register";
     return  this.http.post(ll, data, this.httpHeader);
   }

   check(url, data:any){
    let ll = environment.url+ url;
    console.log(ll, data, this.httpHeader);
    return  this.http.post(ll, data, this.httpHeader);
  }



  handleError(error: HttpErrorResponse) {
    // this.load.hideLoader();
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      this.presentToast(error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    this.presentToast(error.status);
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }


  //Get if user is connected
  userConnected(){
/*     this.nativeStorage.getItem('myitem')
  .then(data => {
    console.log(data)
    alert(data);
    alert(data.token);
    alert('data.token');
  },
    error => {console.error(error)}
  ); */

    let token = localStorage.getItem('token');
   // alert(token)
    if(token==null || token==undefined){
        return false;
    }
    else{
      return localStorage.getItem('token');
    }
  }

// redirect to login
  async connexion(title, description){
    const alert = await this.alertController.create({
      header: title,
      message: description,
      buttons: [
         {
          text: "Ok",
          handler: (data) => {
           // console.log('Confirm Ok');
            this.router.navigate(['login'])
          }
        }
      ]
    });
    await alert.present();
  }


//Get data
getData(url){
  
  if(this.userConnected()==false){
    this.router.navigate(['login'])
  }
  else{
    let token = this. userConnected();
    console.log(token);
   // alert(token);
   // alert('token');
   // alert(token);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+token
    });
  let ll =environment.url+url;
  console.log(ll,{'headers':headers});
  return this.http.get(ll,{'headers':headers}).pipe( 
    retry(2),
    catchError(this.handleError)
  );
  }
    
}

//Add data
pushData(){
  
}



  recherchetoken(){/*
    this.localStorage.get('user').then((value) => {
      if(value=="" || value==null){
        this.router.navigate(['/login']); 
      }
      else{
        console.log('token22', value)
        this.token = value.data.token;
        console.log('token23', this.token)
       // this.rechercheData(url, this.token)
       return this.token;
        
      }  
    }, (err) => {
      console.log(err); 
      ///this.router.navigate(['/login']); 
  }); 
  console.log('return', this.token)
  //return this.token;*/
  return this.token;
 
  }




  rechercheData(url, token){
  console.log('ici2', this.token)
  console.log('token', token);
  const headers = new HttpHeaders({
      'Authorization': 'Bearer '+this.token
    });
  let ll =environment.url+url;
  console.log(ll,{'headers':headers});
  return this.http.get(ll,{'headers':headers}).pipe( 
    retry(2),
    catchError(this.handleError)
  );
  }



  profile(url, data, token){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+token
    });
  let ll =environment.url+url;
  console.log(ll, data, {'headers':headers});
  return this.http.post(ll, data, {'headers':headers});
  }

  pass(url, data, token){
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Authorization': 'Bearer '+token
    });
  let ll =environment.url+url;
  console.log(ll, data, {'headers':headers});
  return this.http.post(ll, data, {'headers':headers});
  }


  addData(url, data){
    let token = localStorage.getItem('token');
    console.log(token)
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+token
    });
  let ll =environment.url+url;
  console.log(ll, data, {'headers':headers});
  return this.http.post(ll, data, {'headers':headers});
  }
  addDatas(url){
    let token = localStorage.getItem('token');
    console.log(token)
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+token
    });
  let ll =environment.url+url;
  console.log(ll, {'headers':headers});
  return this.http.post(ll, {'headers':headers});
  }

  logout(url){
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+token
    });
    console.log(token)
  let ll =environment.url+url;
  return this.http.post(ll,{'headers':headers}).toPromise();
  }
  
  

  recherche(url){
    let token = localStorage.getItem('token');
    console.log(token)
    //console.log('ici2', this.token)
    //let token = this.recherchetoken();
   console.log('token', token);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+token
    });
  let ll =environment.url+url;
  console.log(ll,{'headers':headers});
  return this.http.get(ll,{'headers':headers}).pipe( 
    retry(2),
    catchError(this.handleError)
  );
  }


}
