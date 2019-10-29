import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import { NewTagComponent } from './CreateNewForm/new-tag/new-tag.component'
import { HomeComponent } from './home/home.component';
import { HoldtagComponent } from './CreateNewForm/holdtag/holdtag.component';
import { TpctagComponent } from './CreateNewForm/tpctag/tpctag.component';
import { SpecialInstructionComponent } from './CreateNewForm/special-instruction/special-instruction.component';

const appRoutes : Routes = [
 {path: '', component:HomeComponent},
 {path: 'newForm',component : NewTagComponent},
 {path: 'newForm/holdTag',component : HoldtagComponent},
 {path: 'newForm/tpcTag',component : TpctagComponent},
 {path: 'newForm/specialInstruction',component : SpecialInstructionComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewTagComponent,
    HoldtagComponent,
    TpctagComponent,
    SpecialInstructionComponent
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
