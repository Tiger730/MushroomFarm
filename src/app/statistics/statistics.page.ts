import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import {
  CalendarModal,
  CalendarModalOptions,
  DayConfig,
  CalendarResult
} from 'ion2-calendar';




@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;

  lineChart: any;


  data: any = []
  timer: any
  selectdate: string;
  type: 'string';
  statisticdata: any = []
  temp: any = []
  humids: any = []
  time:any = []

  constructor(
    private router: Router, private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    public modalCtrl: ModalController) {
    Chart.register(...registerables);
  }

  farmid;

  ionViewDidEnter() {
    // this.createBarChart();
  }

  async openCalendar() {
    this.temp=[]
    this.humids=[]
    this.time=[]
    const options: CalendarModalOptions = {
      pickMode: 'single',
      title: 'BASIC',
      canBackwardsSelected: true,
      defaultDate: new Date()
    };

    const myCalendar = await this.modalCtrl.create({
      component: CalendarModal,
      componentProps: { options }
    });

    myCalendar.present();

    const event: any = await myCalendar.onDidDismiss();
    const date: CalendarResult = event.data;
    this.selectdate = date.string
    console.log(date.string);
    try {
      this.chart(this.farmid, date.string)
    } catch (error) {

    }
  }
  chart(farmid, date) {
    this.http.get(`http://139.59.249.192/statistic/${farmid}/${date}`).subscribe(
      res => {
        // this.data=res[0]
        console.log(res)
        if (res instanceof Array) {
          res.map(element => {
            this.temp.push(element.temp)
            this.humids.push(element.humid)
            this.time.push(element.time)
            console.log(element.temp)

          });
        }
        console.log(this.temp, "temp")
        console.log(this.humids, "humid")
        this.lineChartMethod()
      }
    )
  }

  ngOnInit() {
    console.log(this.temp.length)
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('farm_id')) {
        this.router.navigate(['/']);
      }
      this.farmid = paramMap.get('farm_id').toString();
      console.log("123", paramMap.get('farm_id'))
      console.log(this.farmid)
      this.fetchData();
      let date = new Date()
      let daynow = date.getFullYear()+"-"+(date.getUTCMonth()+1)+"-"+date.getUTCDate()

      this.chart(this.farmid,daynow)
    });
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  fetchData() {
    this.http.get(`http://139.59.249.192/read/farm/${this.farmid}`).subscribe(
      res => {
        this.data = res[0]
        console.log(res)
      }
    )
  }


  // ngAfterViewInit() {
  //   this.lineChartMethod();
  // }



  lineChartMethod() {
    if (this.lineChart){
      this.lineChart.destroy()
    }
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.time,
        datasets: [
          {
            label: 'Tempreature',
            fill: true,
            // lineTension: 0.1,
            backgroundColor: 'rgba(255,0,0,0.4)',
            borderColor: 'rgba(255,0,0,0.4)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(255,0,0,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(255,0,0,1)',
            pointHoverBorderColor: 'rgba(255,0,0,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.temp,
            spanGaps: false,
          },
          {
            label: 'Humidity',
            fill: true,
            // lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.humids,
            spanGaps: false,
          }
        ],

      },
      options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
    });
  }








  backhome() {
    this.router.navigate(['home']);
  }

}
