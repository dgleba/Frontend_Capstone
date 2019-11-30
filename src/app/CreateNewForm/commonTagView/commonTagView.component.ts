import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilityServiceService } from '../../Service/utility-service.service';
import { QualityTagData } from 'src/app/Model/qualtiyTagData';
import { RestAPIService } from 'src/app/Service/restAPIService/rest-apiservice.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-commontagview',
  templateUrl: './commonTagView.component.html',
  styleUrls: ['./commonTagView.component.css']
})
export class CommonTagView implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.utilityService.setTagData('');
  }
  public internalTagData: QualityTagData;
  public isSentEmail: boolean = false;
  constructor(public utilityService: UtilityServiceService, public restAPIService: RestAPIService, private router: Router) { }

  ngOnInit() {
    this.internalTagData = new QualityTagData();
    this.internalTagData.ProblemType = 'IN';
    this.utilityService.setTagData(this.internalTagData);
    console.log("qta in comman", this.utilityService.getTagData());
  }
  setEmailBoolean() {
    this.isSentEmail = !this.isSentEmail;
    this.submitForm();
  }
  //validation 
  submitForm() {
    if (this.validateData) {
      this.internalTagData.Date = this.utilityService.getTodaysDate().toString();
      //api call
      this.createTagApiCall();
    }
  }
  //validate data
  validateData() {
    if (this.internalTagData.PartID) {
      if (this.internalTagData.Reason) {
        if (this.internalTagData.Issuedby) {
          return true;
        } else {
          alert("Enter Issued by");
          return false;
        }
      } else {
        alert("Select Reason");
        return false;
      }
    } else {
      alert("Select Part Number");
      return false;
    }
  }
  // api to create tag
  createTagApiCall() {
    this.restAPIService.createTag(this.internalTagData).subscribe((data: any) => {
      this.utilityService.setTagData('');
      this.restAPIService.setApiSuccessmessage("Tag created successfully")
      if (this.internalTagData.picture1 || this.internalTagData.picture2 || this.internalTagData.document) {
        this.uploadImage(data.id);
      }
      if (this.isSentEmail) {
        this.sendEmail(data.id);
      }
      this.router.navigate(['/getTag'])
    }, error => {
      this.restAPIService.setApiErrorResponse(error)
    })
  }
  // api to send email
  sendEmail(id) {
    this.restAPIService.sendEmail(id).subscribe((data: any) => {
      console.log(data);
    }, error => {
      this.restAPIService.setApiErrorResponse(error)
    });
  }
  // api call to upload image
  uploadImage(id) {
    console.log("id in image upload", id);
    this.restAPIService.uploadImage(this.internalTagData.picture1, this.internalTagData.picture2, this.internalTagData.document, id).subscribe((data: any) => {
      console.log(data);
    }, error => {
      this.restAPIService.setApiErrorResponse(error)
    });
  }
}
