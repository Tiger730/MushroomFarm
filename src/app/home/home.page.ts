import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data : any = []
  timer : any
  constructor(private router: Router, private http:HttpClient,private navCtrl: NavController) {
    
   }
   go(farm_id) {
    this.navCtrl.navigateForward("/mushroom-house/"+farm_id)
    console.log(farm_id)
   }
  ngOnInit() {
    this.fetchData();
    this.timer = setInterval(() => {
      this.fetchData(); 
      
    }, 3000);
    console.log(this.data)

  }
  
ngOnDestroy() {
  if (this.timer) {
    clearInterval(this.timer);
  }
}

  apiesp: string = 'http://139.59.249.192/read/1';
  fetchData(){ 
      this.http.get(this.apiesp).subscribe(
      res => {
        console.log("abc", res);
        this.data = res
      },
      err => {
        console.log("res  ==>", err);
      }
    );
  }
}
