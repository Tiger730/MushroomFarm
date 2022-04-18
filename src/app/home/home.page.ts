import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  data: any = []
  timer: any
  userID: any     //ID โรงเรือน
  username: any   //ชื่อผู้ใช้

  constructor(private router: Router, private http: HttpClient, private navCtrl: NavController, private storage: Storage, public loadingController: LoadingController) {

  }
  // ฟังก์ชั่นเปลี่ยนหน้าไป MushroomHousePage
  gomushroomhouse(farm_id) { 
    this.navCtrl.navigateForward("/mushroom-house/" + farm_id)
    console.log(farm_id)
  }
  //ฟังก์ชั่นเปลี่ยนหน้าไป statistics
  gostatistics(farm_id) {
    this.navCtrl.navigateForward("/statistics/" + farm_id)
    console.log(farm_id)
  }

  //ฟังก์ชั่นโหลดหน้า
  async ngOnInit() {
    await this.storage.create();
    this.fetchData();
    this.timer = setInterval(() => {
      this.fetchData();

    }, 3000);
  }



  ionViewWillEnter() {
    this.getUserData()
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
  //ฟังก์ชั่นออกจากระบบ
  logout() {
    this.storage.clear()
    this.navCtrl.navigateForward("/login")
  }


  async getUserData() {
    const data = await this.storage.get('userData');
    const pareData = JSON.parse(data)
    console.log('11111',pareData)
    if (data != null) {
      console.log('gett', this.userID)
      this.userID = pareData.user_id
      this.username = pareData.username
    }
    if (data == null) {
      console.log('gett', this.username)
      this.navCtrl.navigateForward("/login")
    }
  }

//ฟังก์ชั่นดึงข้อมูลผ่านทาง api
  fetchData() {
    this.http.get(`http://139.59.249.192/read/${this.userID}`).subscribe(async res => {
      console.log("abc", res);
      this.data = res
    },
      err => {
        console.log("res  ==>", err);
      }
    );
  }
}
