import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import { CommonTagView } from './CreateNewForm/commonTagView/commonTagView.component'
import { HomeComponent } from './home/home.component';
import { HoldtagComponent } from './CreateNewForm/holdtag/holdtag.component';
import { TpctagComponent } from './CreateNewForm/tpctag/tpctag.component';
import { SpecialInstructionComponent } from './CreateNewForm/special-instruction/special-instruction.component';
import { SidemenuComponent } from './CreateNewForm/sidemenu/sidemenu.component';
import { QualityalertinComponent } from './CreateNewForm/qualityalertin/qualityalertin.component';
import {PageNotFoundComponent}from './page-not-found/page-not-found.component';
import {LoginComponent} from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AddPictureComponent } from './CreateNewForm/add-picture/add-picture.component';
import {AuthGuardService} from './Service/auth-guard.service';
import { GetTagDataComponent } from './CreateNewForm/get-tag-data/get-tag-data.component'


const appRoutes : Routes = [
  {path:'', component:LoginComponent},
  {path:'login', component:LoginComponent},
  {path: 'home', component:HomeComponent,  canActivate: [AuthGuardService],},
  {path: 'newForm',component : CommonTagView , canActivate: [AuthGuardService],
  children:[
  {path:'',outlet:'sidemenu',component:SidemenuComponent},
  {path:'', component : QualityalertinComponent},
  {path:'qualityTag', component : QualityalertinComponent},
  {path: 'holdTag',component : HoldtagComponent},
  {path: 'tpcTag',component : TpctagComponent},
  {path: 'specialInstruction',component : SpecialInstructionComponent},
  {path: 'picture',component : AddPictureComponent}]},
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CommonTagView,
    HoldtagComponent,
    TpctagComponent,
    SpecialInstructionComponent,
    SidemenuComponent,
    QualityalertinComponent,
    LoginComponent,
    AddPictureComponent,
    PageNotFoundComponent,
    GetTagDataComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
