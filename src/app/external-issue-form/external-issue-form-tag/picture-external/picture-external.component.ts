import { Component, OnInit } from '@angular/core';
import {UtilityServiceService} from '../../../Service/utility-service.service';
import { RestAPIService } from '../../../Service/restAPIService/rest-apiservice.service';
import { Router } from '@angular/router';
import { ExternalTagData } from '../../../Model/externalTagData';

@Component({
  selector: 'app-picture-external',
  templateUrl: './picture-external.component.html',
  styleUrls: ['./picture-external.component.css']
})
export class PictureExternalComponent implements OnInit {constructor(private restAPIService: RestAPIService, public utilityService: UtilityServiceService, private router: Router) { }
public externalTagData:ExternalTagData;
public imagePath;
imgURL: any;
imgURL1: any;
document: Array<File> = [];
picture1: File;
picture2: File;
public message: string;
 ngOnInit() {  
  this.externalTagData=this.utilityService.getExternalTagData();
  this.externalTagData.isPictureComponent=true;
  console.log("add pic part",this.externalTagData);
} 

//validation 
submitForm() {
  console.log(this.externalTagData, "okdby malti");
  if (this.externalTagData.PartID) {
    if (this.externalTagData.Reason) {
      if (this.externalTagData.Issuedby) {
        this.externalTagData.Date = this.utilityService.getTodaysDate().toString();
        //api call
        this.createTagApiCall();
      } else {
        alert("Enter Issued by");
      }
    } else {
      alert("Select Reason");
    }
  } else {
    alert("Select Part Number");
  }
}

createTagApiCall() {
  this.restAPIService.createTag(this.externalTagData).subscribe((data: any) => {
    this.utilityService.setInternalTagData('');
    this.restAPIService.setApiSuccessmessage("Tag created successfully")
    this.uploadImage(data.id);
    this.router.navigate(['/getTag'])
  },error=>{
    this.restAPIService.setApiErrorResponse(error)
   })
}
// api call to upload image
uploadImage(id) {
  console.log("id in image upload",id);
  this.restAPIService.uploadImage(this.picture1, this.picture2, this.document, id).subscribe((data: any) => {
    console.log(data);
  },error=>{
    this.restAPIService.setApiErrorResponse(error)
   });
}
// get document list of files
getDocument(event){
  if (event.length === 0)
  return;
 this.document=event.target.files;  
}

// set the preview for image
preview(event, imageNo: number) {
  if (event.length === 0)
    return;
  var mimeType;
  var reader = new FileReader();
  if (imageNo == 1) {
    this.picture1 = event.target.files[0];
    console.log("picture1", this.picture1);
    mimeType = this.picture1.type;
    this.validateMimeType(mimeType);
    reader.readAsDataURL(this.picture1);
  } else {
    this.picture2 = event.target.files[0];
    mimeType = this.picture2.type;
    this.validateMimeType(mimeType);
    reader.readAsDataURL(this.picture2);
  }
  reader.onload = (_event) => {
    if (imageNo == 1) {
      this.imgURL = reader.result;
    } else {
      this.imgURL1 = reader.result;
    }
  }
}
// validate the mime type of picture
validateMimeType(mimeType) {
  if (mimeType.match(/image\/*/) == null) {
    this.message = "Only images are supported.";
    return;
  }
}
}
