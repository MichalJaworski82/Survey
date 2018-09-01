import {BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';

import { NgModule } from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { SurveyManagerComponent } from './survey-manager/survey-manager.component';
import { SurveyClientComponent } from './survey-client/survey-client.component';
import { SurveyChartComponent } from './survey-chart/survey-chart.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule }   from '@angular/forms';

import {RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    SurveyManagerComponent,
    SurveyClientComponent,
    SurveyChartComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    HttpClientModule, 
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    MatListModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCheckboxModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    RouterModule.forRoot([
      {path:'', component:SurveyClientComponent},
      {path:'admin', component:SurveyManagerComponent},
      {path:'charts', component:SurveyChartComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
