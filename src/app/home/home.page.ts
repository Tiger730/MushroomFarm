import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { AnyTxtRecord } from 'dns';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data : any
  timer : any
  constructor(private router: Router, private http:HttpClient) {
    
   }
  ngOnInit() {
    this.fetchData();
    this.timer = setInterval(() => {
      this.fetchData(); 
    }, 8000);
  }
  
ngOnDestroy() {
  if (this.timer) {
    clearInterval(this.timer);
  }
}

gotomushroomhouse(){
  this.router.navigate(['/mushroom-house']);
};

  
  apiesp: string = 'http://139.59.249.192//read/farm1/esp8266';
  fetchData(){ 
      this.http.get(this.apiesp).subscribe(
      res => {
        console.log(res);
        this.data = res
      },
      err => {
        console.log(err);
      }
    );
  }
}
