import { Component, OnInit } from '@angular/core';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { ModalController } from '@ionic/angular';
import { ViewPage } from '../view/view.page';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FunctionsService } from '../services/functions.service';
import { LoadService } from '../services/load.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  categoryCollection: AngularFirestoreCollection<any>;
  category1: Observable<any[]>;
  principal: any = [];
  category: any;
  correctCategory : any;

  constructor(
    private videoPlayer: VideoPlayer, 
    public modalCtrl: ModalController,
    private route: ActivatedRoute,
    public router: Router,
    private loadingController : LoadingController,
    private readonly afs: AngularFirestore,
    public load : LoadService
    ) {
  }



  ngOnInit(): void {
    this.load.present();
    this.getContent();
  }
  playVideoLocal() {
    this.videoPlayer.play('file:///android_asset/www/assets/SampleVideo.mp4').then(() => {
      console.log('video completed');
    }).catch(err => {
      console.log(err);
    });
  }
 
  async viewVideo(video) {
    const modal = await this.modalCtrl.create({
      component: ViewPage,
      componentProps: { url: 'https://www.youtube.com/embed/'+video },
      cssClass: 'viewVideoModal'
    })
    return modal.present();
  }
  
  playVideoHosted() {
    this.videoPlayer.play('https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4').then(() => {
      console.log('video completed');
    }).catch(err => {
      console.log(err);
    });
  }

  getContent(){
    //console.log(category);
    this.categoryCollection = this.afs.collection<any>('video', ref => ref
   // .where('categoryArticle', '==', category)
    .orderBy('dateCreated','desc')
    .where('visible', '==', true));
  this.category = this.categoryCollection.snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as any;
      const id = a.payload.doc.id;
      console.log(data)
      return { id, ...data };

    }))
  );   this.category.subscribe(data => {
        this.principal = data;
        this.load.dismiss();
    

  });



  }
}