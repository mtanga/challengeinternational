import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'; // 1
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  language: string = this.translateService.currentLang; // 2 
  texting : any = {};


   constructor(
    public router: Router,
    private translateService: TranslateService,
  ) {
    
  }

  ngOnInit() {
    let foo = this.translateService.get('chaines').subscribe((data:any)=> {
      console.log(data);
      this.texting = data;
     });
  }

  mont(){
     this.router.navigate(['/transfer']);
  }

  cred(){
     this.router.navigate(['/airtime']);
  }

  charge(){
     this.router.navigate(['/recharge']);
  }

  ask(){
     this.router.navigate(['/ask']);
  }

  depot(){
     this.router.navigate(['/depot']);
  }


  wallet(){
     this.router.navigate(['/notifications']);
  }

  notification(){
    this.router.navigate(['/notification']);
  }
}
