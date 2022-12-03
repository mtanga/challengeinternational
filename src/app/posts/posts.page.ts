import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { WordpressService } from '../services/wordpress.service';
import { AuthenticationService } from '../services/authentication.service';
import { Observable, of } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { LoadService } from '../services/load.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { FunctionsService } from '../services/functions.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  posts: Array<any> = new Array<any>();
  loggedInObservable: Observable<any> = this.authenticationService.isLoggedIn();

  categoryId: number;
  categoryTitle: string;

  constructor(
    public loadingController: LoadingController,
    private router: Router,
    private route: ActivatedRoute,
    public wordpressService: WordpressService,
    public authenticationService: AuthenticationService,
    public sanitizer: DomSanitizer,
    public load : LoadService,
    public functions : FunctionsService,
    
  ) {}

  ngOnInit() {
    this.load.present();
    this.authenticationService.loggedUserObservable()
    .subscribe(user => {
      this.loggedInObservable = user == null ? of(false): of(true);
    });

    this.route.data.subscribe(routeData => {
      const data = routeData['data'];

      this.posts = data.posts;
      console.log(this.posts);
      this.categoryId = data.categoryId;
      this.categoryTitle = data.categoryTitle;
    })
    this.load.dismiss();
  
  }


  async invite(post){
     this.functions.share(post);
  }

  presentPopover(){
    console.log('test');
    //his.functions.presentPopover(ev);
  }


  loadData(event: any) {
    const page = (Math.ceil(this.posts.length / 10)) + 1;

    this.wordpressService.getRecentPosts(this.categoryId, page)
    .subscribe((newPagePosts: []) => {
      this.posts.push(...newPagePosts);
      event.target.complete();
    }, err => {
      // there are no more posts available
      event.target.disabled = true;
    })
  }

  logOut(){
    this.authenticationService.logOut()
    .then(
      res => this.router.navigate(['/login']),
      err => console.log('Error logging out')
    )
  }
}
