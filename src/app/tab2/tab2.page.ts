import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'; // 1
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
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

}
