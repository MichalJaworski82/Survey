import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyClientComponent } from './survey-client.component';

describe('SurveyClientComponent', () => {
  let component: SurveyClientComponent;
  let fixture: ComponentFixture<SurveyClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
