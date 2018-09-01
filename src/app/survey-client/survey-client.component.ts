import { OnInit } from '@angular/core';
import { Component, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { equal } from 'assert';
import { fadeIn } from '../animations';



@Component({
  selector: 'survey-client',
  templateUrl: './survey-client.component.html',
  styleUrls: ['./survey-client.component.css'],
  animations: [
    fadeIn
  ]

})
export class SurveyClientComponent implements OnInit {
  test$: Observable<any[]>;
  testRef: AngularFireObject<any>;
  testRef2: AngularFireList<any>;

  questions$: Observable<any[]>;
  questionsRef: AngularFireList<any>;

  answers$: Observable<any[]>;
  answersRef: AngularFireList<any>;

  keysArray = [];
  myMap = new Map();

  answers: any[];
  countZ: any;

  constructor(private db: AngularFireDatabase) {
  }

  ngOnInit() {
    this.questionsRef = this.db.list('questions');
    this.questions$ = this.questionsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    this.answersRef = this.db.list('answers');
    this.answers$ = this.answersRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

  }


  addAKeyACount(key, count) {
    if (this.keysArray.includes(key)) {
      let keyIndex = this.keysArray.indexOf(key);
      this.keysArray.splice(keyIndex, 1);
      this.myMap.delete(key);

    } else {
      this.keysArray.push(key);
      this.myMap.set(key, count);

    }
  }

  submit(f) {
    console.log("submitted!");
    for (let key of this.keysArray) {
      let countPlus = this.myMap.get(key);
      countPlus++;
      this.db.object('/answers/' + key).update({ count: countPlus });
    }
    this.keysArray = [];
    f.controls.hasAgreed = false;
  }




}
