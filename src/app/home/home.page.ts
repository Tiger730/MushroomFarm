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
  userID: any
  constructor(private router: Router, private http: HttpClient, private navCtrl: NavController, private storage: Storage, public loadingController: LoadingController) {

  }
  go(farm_id) {
    this.navCtrl.navigateForward("/mushroom-house/" + farm_id)
    console.log(farm_id)
  }
  gostatistics(farm_id) {
    this.navCtrl.navigateForward("/statistics/" + farm_id)
    console.log(farm_id)
  }


  async ngOnInit() {
    await this.storage.create();
    await this.getUserData()

    this.fetchData();
    this.timer = setInterval(() => {
      this.fetchData();

    }, 4000);

    console.log(this.data)
  }


  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }


  async getUserData() {
    const data = await this.storage.get('userData');
    const pareData = JSON.parse(data)
    this.userID = pareData.user_id
  }


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
