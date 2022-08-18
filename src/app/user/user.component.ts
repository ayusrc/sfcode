import {Component, OnInit} from '@angular/core';
import {User} from '../user';
import {ApiService} from '../api.service';

declare var Chart: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User;
  loggedIn: boolean;
  hist: number[] = [];
  timeline: number[];

  constructor(private dataService: ApiService) {
  }

  ngOnInit(): void {
    this.dataService.getLoggedInState.subscribe(state => this.changeState(state));
    this.loggedIn = this.dataService.isLoggedIn();
    this.user = JSON.parse(this.dataService.getToken());

    (() => {
      this.timeline = JSON.parse(this.user.correct_timeline);
      console.log(this.timeline);
      let sum = 0;
      this.timeline.forEach(element => {
        sum += element;
        this.hist.push(sum);
      });
    })();

    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontColor = '#888';

    const ctx = (document.getElementById('myChart') as HTMLCanvasElement).getContext('2d');

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from(this.timeline.keys()),
        datasets: [{
          label: 'Total Accepted',
          data: this.hist,
          fill: true,
          backgroundColor: '#0f08'
        },
          {
            label: 'Total Incorrect',
            data: Array.from(this.timeline.keys()),
            fill: true,
            backgroundColor: '#f008'
          }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          point: {
            radius: 0
          }
        },
        layout: {
          padding: {
            bottom: -10,
            left: -10
          }
        },
        legend: {
          labels: {
            fontSize: 15
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              display: false
            },
            gridLines: {
              color: 'transparent'
            }
          }],
          yAxes: [{
            ticks: {
              display: false
            },
            gridLines: {
              color: 'transparent'
            }
          }]
        }
      }
    });
  }

  logout(): void {
    this.dataService.deleteToken();
  }

  private changeState(state: boolean): void {
    this.loggedIn = state;
  }

}
