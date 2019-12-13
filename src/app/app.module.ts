/**
 * @ngdoc directive
 * @name App Module
 * @element  parent of all the components in the application
 * @description
 * App Module is the starting point of the application which contains all the imports, providers, dependencies.
 **/

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule ,HTTP_INTERCEPTORS} from "@angular/common/http";
import { AutosizeModule } from "ngx-autosize";
import { AutocompleteLibModule } from "angular-ng-autocomplete";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CommonTagView } from "./CreateNewForm/commonTagView/commonTagView.component";
import { HomeComponent } from "./home/home.component";
import { HoldtagComponent } from "./CreateNewForm/holdtag/holdtag.component";
import { TpctagComponent } from "./CreateNewForm/tpctag/tpctag.component";
import { SpecialInstructionComponent } from "./CreateNewForm/special-instruction/special-instruction.component";
import { SidemenuComponent } from "./CreateNewForm/sidemenu/sidemenu.component";
import { QualityalertinComponent } from "./CreateNewForm/qualityalertin/qualityalertin.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { LoginComponent } from "./login/login.component";
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
import { NgxSpinnerModule } from "ngx-spinner";
import {Interceptor} from 'src/app/interceptors';



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
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AutosizeModule,
    AutocompleteLibModule,
    NgxSpinnerModule
  
  ],
  providers: [AuthGuardService, DatePipe, { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
