import { NgModule } from '@angular/core';
import { SpecialInstructionComponent } from './CreateNewForm/special-instruction/special-instruction.component';
import { Routes , RouterModule} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './Service/auth-guard.service';
import { CommonTagView } from './CreateNewForm/commonTagView/commonTagView.component';
import { SidemenuComponent } from './CreateNewForm/sidemenu/sidemenu.component';
import { QualityalertinComponent } from './CreateNewForm/qualityalertin/qualityalertin.component';
import { HoldtagComponent } from './CreateNewForm/holdtag/holdtag.component';
import { TpctagComponent } from './CreateNewForm/tpctag/tpctag.component';
import { AddPictureComponent } from './CreateNewForm/add-picture/add-picture.component';
import { GetTagDataComponent } from './CreateNewForm/get-tag-data/get-tag-data.component';
import { UpdateTagDataComponent } from './CreateNewForm/update-tag-data/update-tag-data.component';
import { ExternalIssueFormComponent } from './external-issue-form/external-issue-form.component';
import { ExternalIssueFormTagComponent } from './external-issue-form/external-issue-form-tag/external-issue-form-tag.component';
import { QualityAlertExternalComponent } from './external-issue-form/external-issue-form-tag/quality-alert-external/quality-alert-external.component';
import { HoldTagExternalComponent } from './external-issue-form/external-issue-form-tag/hold-tag-external/hold-tag-external.component';
import { TpcTagExternalComponent } from './external-issue-form/external-issue-form-tag/tpc-tag-external/tpc-tag-external.component';
import { SpecialInstructionExternalComponent } from './external-issue-form/external-issue-form-tag/special-instruction-external/special-instruction-external.component';
import { PictureExternalComponent } from './external-issue-form/external-issue-form-tag/picture-external/picture-external.component';
import { PartValueCalculatorComponent } from './external-issue-form/part-value-calculator/part-value-calculator.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



const appRoutes: Routes = [
    { path: "", component: LoginComponent },
    { path: "login", component: LoginComponent },
    { path: "home", component: HomeComponent, canActivate: [AuthGuardService] },
    {
      path: "newForm",
      component: CommonTagView,canActivate: [AuthGuardService],
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
    { path: "getTag", component: GetTagDataComponent,canActivate: [AuthGuardService] },
    { path: "updateTag/:id", component: UpdateTagDataComponent ,canActivate: [AuthGuardService]},
    { path: "externalIssueForm", component: ExternalIssueFormComponent,canActivate: [AuthGuardService] },
    { path: "externalIssueTag", 
    component: ExternalIssueFormTagComponent ,canActivate: [AuthGuardService],
    children: [
      {path:"", component:QualityAlertExternalComponent},
     // {path:"qualityAlertExternal", component:QualityAlertExternalComponent},
      {path:"holdTagExternal", component: HoldTagExternalComponent},
      {path:"tpcTagExternal", component: TpcTagExternalComponent},
      {path:"specialInstructionExternal", component:SpecialInstructionExternalComponent},
      {path:"pictureExternal", component:PictureExternalComponent}
    ]
  },
    { path: "partValueCalculator", component: PartValueCalculatorComponent,canActivate: [AuthGuardService] },
  
    { path: "**", component: PageNotFoundComponent }
  ];

  
@NgModule({
imports:[
    RouterModule.forRoot(appRoutes)
],
exports:[RouterModule]
    
})
export class AppRoutingModule{

}