import { OnInit } from '@angular/core';
import { Component, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'survey-manager',
  templateUrl: './survey-manager.component.html',
  styleUrls: ['./survey-manager.component.css'],

})

export class SurveyManagerComponent implements OnInit {

  questions$: Observable<any[]>;
  questionsRef: AngularFireList<any>;

  answers$: Observable<any[]>;
  answersRef: AngularFireList<any>;

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


  addQ(question: HTMLInputElement) {
    this.questionsRef.push({
      name: question.value
    })
    question.value = "";
  }

  deleteQ(question) {

    this.db.object('/questions/' + question.key).remove();
  }

  updateQ(question, questionZ: HTMLInputElement) {
    this.db.object('/questions/' + question.key).set({ name: questionZ.value });
    questionZ.value = "";
  }

  addA(question, answer: HTMLInputElement) {
    this.answersRef.push({
      name: answer.value,
      questionkey: question.key,
      count: 0
    })
    answer.value = "";
  }

  deleteA(answer) {
    this.db.object('/answers/' + answer.key).remove();
  }


}
