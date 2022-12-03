import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { LoadingController, ToastController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { LoadService } from '../services/load.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  
  
  categoryCollection: AngularFirestoreCollection<any>;
  category1: Observable<any[]>;
  homeCollection: AngularFirestoreCollection<any>;
  home: Observable<any[]>;
  principal: any = [];
  principal1: any = [];
  category: any;
  correctCategory : any;
  
  slider1: any ={
    value1 : "",
    value2:""
   
  };
  slider2: any ={
    value1 : "",
    value2:""
   
  };
  slider3: any ={
    value1 : "",
    value2:""
   
  };
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private loadingController : LoadingController,
    private readonly afs: AngularFirestore,
    public toastController: ToastController,
    public load : LoadService
  ) {}

  ngOnInit(): void {
    this.load.present();
    this.getContent();
    this.getContentHome();
    this.presentToast(" Balayez l\'écran vers la droite depuis l\'extrémité gauche pour voir toute l\'actualité");
  }
  showSlider1(){
    console.log(this.slider1);
    if ( this.slider1 == 'a'){
      this.router.navigate(['/news-only']);
    }
    if ( this.slider1 == 'b'){
      const cate = "actualites";
      this.router.navigate(['/category', cate]);
    }
  }

  showSlider2(){
    console.log(this.slider2);
    if ( this.slider2 == 'c'){
      this.router.navigate(['/interview']);
    }
    if ( this.slider2 == 'd'){
      this.router.navigate(['/gallery']);
    }
  }

  showSlider3(){
    console.log(this.slider3);
    if ( this.slider3 == 'e'){
      const cate = "soirees";
      this.router.navigate(['/category', cate]);
    }
    if ( this.slider3 == 'f'){
      this.router.navigate(['/kiosque']);
    }
  }



  getContent(){
    const category = "pdgone";
    const category1 = "editorial";
    this.categoryCollection = this.afs.collection<any>('article', ref => ref
    .where('view', '==', category)
    .where('categoryArticle', '==', category1)
    .where('visible', '==', true)
    .orderBy('dateCreated','desc'));
  this.category = this.categoryCollection.snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as any;
      const id = a.payload.doc.id;
      console.log(data)
      return { id, ...data };

    }))
  );   this.category.subscribe(data => {

    this.principal = data;
    console.log(this.principal)
    this.load.dismiss();
    

  });



  }

  getContentHome(){
    const category = "pdg"
    const category1 = "editorial";
    this.homeCollection = this.afs.collection<any>('article', ref => ref
    .where('view', '==', category)
    .where('categoryArticle', '==', category1)
    .where('visible', '==', true)
    .orderBy('dateCreated','desc'));
  this.home = this.homeCollection.snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as any;
      const id = a.payload.doc.id;
      console.log(data)
      return { id, ...data };

    }))
  );   this.home.subscribe(data => {

    this.principal1 = data;
    console.log(this.principal1)
    

  });



  }

  showDetail(article){
    console.log('Good')
    console.log(article)
    this.router.navigate(['/detail' ,article]);
  }

  slideChanged(){
    
   

    
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 8000
    });
    toast.present();
  }



}
