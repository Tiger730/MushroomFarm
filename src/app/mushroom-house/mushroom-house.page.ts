import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-mushroom-house',
  templateUrl: './mushroom-house.page.html',
  styleUrls: ['./mushroom-house.page.scss'],
})
export class MushroomHousePage implements OnInit {
  data : any = []
  timer : any
  
  constructor(private router: Router,private http:HttpClient,private activatedRoute: ActivatedRoute) { }
  var1;
  var2;
  var3;
  farmid;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('farm_id')) {
        this.router.navigate(['/']);
      }
      this.farmid = paramMap.get('farm_id').toString();
      console.log("123",paramMap.get('farm_id'))
      console.log(this.farmid)
      this.fetchData();
    });
    
    this.timer = setInterval(() => {
      this.fetchData(); 
      
    }, 1000);
    console.log(this.data)

  }
  
ngOnDestroy() {
  if (this.timer) {
    clearInterval(this.timer);
  }
}

  
  fetchData(){ 
      this.http.get(`http://139.59.249.192/read/farm/${this.farmid}`).subscribe(
      res => {
        console.log("abc", res[0] );
        if (res[0].Automate == 1){
          this.var1=true
        }
        else {
          this.var1=false
        }
        if (res[0].fan_status == 1){
          this.var2=true
        }
        else {
          this.var2=false
        }
        if (res[0].fog_status == 1){
          this.var3=true
        }
        else {
          this.var3=false
        }
        this.data = res[0]
      },
      err => {
        console.log("res  ==>", err);
      }
    );
  }
  sendData(Automate,fix_temp,fix_humid,fan_status,fog_status){
    this.http.get(`http://139.59.249.192/change-option/${this.farmid}/${Automate}/${fix_temp}/${fix_humid}/${fan_status}/${fog_status}`).subscribe(
      res => {
        console.log('res',res);
      },
      err => {
        console.log("res  ==>", err);
      }
    );
  }
plustemp(){
  let temp=this.data.fix_temp + 1
  this.sendData(this.data.Automate,temp,this.data.fix_humid,this.data.fan_status,this.data.fog_status)
}
minustemp(){
  let temp=this.data.fix_temp - 1
  this.sendData(this.data.Automate,temp,this.data.fix_humid,this.data.fan_status,this.data.fog_status)
}
plushumid(){
  let humid=this.data.fix_humid + 1
  this.sendData(this.data.Automate,this.data.fix_temp,humid,this.data.fan_status,this.data.fog_status)
}
minushumid(){
  let humid=this.data.fix_humid - 1
  this.sendData(this.data.Automate,this.data.fix_temp,humid,this.data.fan_status,this.data.fog_status)
}

backhome(){
  this.router.navigate(['home']);
  }
change(even){
  if (even.detail.checked == true){
    this.sendData(1,this.data.fix_temp,this.data.fix_humid,this.data.fan_status,this.data.fog_status)
  }
  else {
    this.sendData(0,this.data.fix_temp,this.data.fix_humid,this.data.fan_status,this.data.fog_status)
  }
  console.log(even.detail.checked)
  console.log(this.data.farm_id)

}
fan(even){
  if (even.detail.checked == true){
    this.sendData(this.data.Automate,this.data.fix_temp,this.data.fix_humid,1,this.data.fog_status)
  }
  else {
    this.sendData(this.data.Automate,this.data.fix_temp,this.data.fix_humid,0,this.data.fog_status)
  }
}
fog(even){
  if (even.detail.checked == true){
    this.sendData(this.data.Automate,this.data.fix_temp,this.data.fix_humid,this.data.fan_status,1)
  }
  else {
    this.sendData(this.data.Automate,this.data.fix_temp,this.data.fix_humid,this.data.fan_status,0)
  }
}
gostatistics(){
  this.router.navigate(['statistics']);
}
}
