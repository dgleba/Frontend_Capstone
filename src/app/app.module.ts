import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import { NewTagComponent } from './CreateNewForm/new-tag/new-tag.component'
import { HomeComponent } from './home/home.component';

const appRoutes : Routes = [
 {path: '', component:HomeComponent},
 {path: 'newForm',component : NewTagComponent}

];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewTagComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
