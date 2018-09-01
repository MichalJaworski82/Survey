import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import * as Chart from 'chart.js'
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'survey-chart',
  templateUrl: './survey-chart.component.html',
  styleUrls: ['./survey-chart.component.css']
})
export class SurveyChartComponent implements OnInit {
  PieChart: any;
  BarChart: any;
  answers$: Observable<any[]>;
  answersRef: AngularFireList<any>;

  questions$: Observable<any[]>;
  questionsRef: AngularFireList<any>;

  colors = ['Red', 'Green', 'Blue', 'Yellow', 'Brown', 'Cyan', 'Grey'];

  items = [];
  counts = [];
  labels = [];


  itemsB = [];
  countsB = [];
  labelsB = [];

  isPie = true;

  constructor(private db: AngularFireDatabase) {
  }



  getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }



  ngOnInit() {
    for (let i = 0; i < 100; i++) {
      this.colors.push(this.getRandomColor());
    }

    this.questionsRef = this.db.list('questions');
    this.questions$ = this.questionsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    this.PieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: this.labels,
        datasets: [{
          data: [1],
          borderWidth: 1,
          backgroundColor: ['grey']

        }]
      },
      options: {
        title: {
          text: "Choose question",
          display: true
        },
        legend: {
          position: 'bottom'
        }
      }
    })

  }



  drawChart(key, name) {
    document.getElementById('pieChart').remove();
    let newChart = document.createElement("canvas");
    document.getElementById('pieChartContainer').appendChild(newChart);
    newChart.setAttribute("id", "pieChart");

    this.items = [];
    this.counts = [];
    this.labels = [];

    this.db.list('/answers/', ref => ref.orderByChild('questionkey').equalTo(key)).valueChanges()
      .subscribe(res => {
        for (let i = 0; i < res.length; i++) {
          this.items.push(res[i]);
        }

        for (let item of this.items) {
          this.counts.push(item.count);
          this.labels.push(item.name);
        }

        this.PieChart = new Chart('pieChart', {
          type: 'pie',
          data: {
            labels: this.labels,
            datasets: [{
              data: this.counts,
              borderWidth: 1,
              backgroundColor: this.colors

            }]
          },
          options: {
            title: {
              text: name,
              display: true
            },
            legend: {
              position: 'bottom'
            },

          }

        })

      });

  }

  drawBarChart(key, name) {
    document.getElementById('barChart').remove();
    let newBarChart = document.createElement("canvas");
    document.getElementById('barChartContainer').appendChild(newBarChart);
    newBarChart.setAttribute("id", "barChart");


    this.itemsB = [];
    this.countsB = [];
    this.labelsB = [];


    this.db.list('/answers/', ref => ref.orderByChild('questionkey').equalTo(key)).valueChanges()
      .subscribe(res => {
        for (let i = 0; i < res.length; i++) {
          this.itemsB.push(res[i]);
        }

        for (let item of this.itemsB) {
          this.countsB.push(item.count);
          this.labelsB.push(item.name);
        }

        this.BarChart = new Chart('barChart', {
          type: 'bar',
          data: {
            labels: this.labelsB,
            datasets: [{
              data: this.countsB,
              borderWidth: 1,
              backgroundColor: this.colors

            }]
          },
          options: {
            title: {
              text: name,
              display: true
            },
            legend: {
              display: false
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }

          }

        })

      });

  }

  drawCharts(key, name) {
    this.drawChart(key, name);
    this.drawBarChart(key, name);

  }

  changeToBarChart() {
    this.isPie = false;
  }

  changeToPieChart() {
    this.isPie = true;
  }

}
