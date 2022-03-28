// import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';





@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {

  @ViewChild('barCanvas') private barCanvas: ElementRef;

  bars: any;
  colorArray: any;
  barChart: any;

  constructor(private router: Router) {
    Chart.register(...registerables);
  }

  ionViewDidEnter() {
    // this.createBarChart();
  }



  ngOnInit() {
  }


  ngAfterViewInit() {
    this.barChartMethod();
  }



  barChartMethod() {
    
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['อุณหภูมิ', 'ความชื้น',],
        datasets: [{
          label: '# of Votes',
          data: [25, 50, ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      
    });
  }








  backmushroom() {
    this.router.navigate(['mushroom-house']);
  }

}
