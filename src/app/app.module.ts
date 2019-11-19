import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AutosizeModule } from "ngx-autosize";
import { AutocompleteLibModule } from "angular-ng-autocomplete";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { CommonTagView } from "./CreateNewForm/commonTagView/commonTagView.component";
import { HomeComponent } from "./home/home.component";
import { HoldtagComponent } from "./CreateNewForm/holdtag/holdtag.component";
import { TpctagComponent } from "./CreateNewForm/tpctag/tpctag.component";
import { SpecialInstructionComponent } from "./CreateNewForm/special-instruction/special-instruction.component";
import { SidemenuComponent } from "./CreateNewForm/sidemenu/sidemenu.component";
import { QualityalertinComponent } from "./CreateNewForm/qualityalertin/qualityalertin.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { LoginComponent } from "./login/login.component";
import { HttpClientModule } from "@angular/common/http";
import { AddPictureComponent } from "./CreateNewForm/add-picture/add-picture.component";
import { AuthGuardService } from "./Service/auth-guard.service";
import { GetTagDataComponent } from "./CreateNewForm/get-tag-data/get-tag-data.component";
import { DatePipe } from "@angular/common";
import { UpdateTagDataComponent } from "./CreateNewForm/update-tag-data/update-tag-data.component";
import { ExternalIssueFormComponent } from "./external-issue-form/external-issue-form.component";
import { PartValueCalculatorComponent } from "./external-issue-form/part-value-calculator/part-value-calculator.component";
import { ExternalIssueFormTagComponent } from './external-issue-form/external-issue-form-tag/external-issue-form-tag.component';
import { QualityAlertExternalComponent } from './external-issue-form/external-issue-form-tag/quality-alert-external/quality-alert-external.component';
import { HoldTagExternalComponent } from './external-issue-form/external-issue-form-tag/hold-tag-external/hold-tag-external.component';
import { TpcTagExternalComponent } from './external-issue-form/external-issue-form-tag/tpc-tag-external/tpc-tag-external.component';
import { SpecialInstructionExternalComponent } from './external-issue-form/external-issue-form-tag/special-instruction-external/special-instruction-external.component';
import { PictureExternalComponent } from './external-issue-form/external-issue-form-tag/picture-external/picture-external.component';

const appRoutes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent },
  {
    path: "newForm",
    component: CommonTagView,
    children: [
      { path: "", outlet: "sidemenu", component: SidemenuComponent },
      { path: "", component: QualityalertinComponent },
      { path: "qualityTag", component: QualityalertinComponent },
      { path: "holdTag", component: HoldtagComponent },
      { path: "tpcTag", component: TpctagComponent },
      { path: "specialInstruction", component: SpecialInstructionComponent },
      { path: "picture", component: AddPictureComponent }
    ]
  },
  { path: "getTag", component: GetTagDataComponent },
  { path: "updateTag/:id", component: UpdateTagDataComponent },
  { path: "externalIssueForm", component: ExternalIssueFormComponent },
  { path: "externalIssueTag", 
  component: ExternalIssueFormTagComponent ,
  children: [
    {path:"", component:QualityAlertExternalComponent},
    {path:"qualityAlertExternal", component:QualityAlertExternalComponent},
    {path:"holdTagExternal", component: HoldTagExternalComponent},
    {path:"tpcTagExternal", component: TpcTagExternalComponent},
    {path:"specialInstructionExternal", component:SpecialInstructionExternalComponent},
    {path:"pictureExternal", component:PictureExternalComponent}
  ]
},
  { path: "partValueCalculator", component: PartValueCalculatorComponent },

  { path: "**", component: PageNotFoundComponent }
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
    GetTagDataComponent,
    UpdateTagDataComponent,
    ExternalIssueFormComponent,
    PartValueCalculatorComponent,
    ExternalIssueFormTagComponent,
    QualityAlertExternalComponent,
    HoldTagExternalComponent,
    TpcTagExternalComponent,
    SpecialInstructionExternalComponent,
    PictureExternalComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    AutosizeModule,
    AutocompleteLibModule
  ],
  providers: [AuthGuardService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
