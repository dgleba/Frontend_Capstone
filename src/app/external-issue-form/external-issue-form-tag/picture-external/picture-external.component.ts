import { Component, OnInit } from '@angular/core';
import {UtilityServiceService} from '../../../Service/utility-service.service';
import { RestAPIService } from '../../../Service/restAPIService/rest-apiservice.service';
import { Router } from '@angular/router';
import { QualityTagData } from 'src/app/Model/qualtiyTagData';

@Component({
  selector: 'app-picture-external',
  templateUrl: './picture-external.component.html',
  styleUrls: ['./picture-external.component.css']
})
export class PictureExternalComponent implements OnInit {constructor(private restAPIService: RestAPIService, public utilityService: UtilityServiceService, private router: Router) { }
public externalTagData:QualityTagData;
public imagePath;
imgURL: any;
imgURL1: any;
document: Array<File> = [];
picture1: File;
picture2: File;
public message: string;
 ngOnInit() {  
  this.externalTagData=this.utilityService.getTagData();
  this.externalTagData.isPictureComponent=true;
  this.checkIfImageIsSet();
} 
checkIfImageIsSet(){
  var reader1 = new FileReader();
  var reader2 = new FileReader();
  if(this.externalTagData.picture1){
    reader1.readAsDataURL(this.externalTagData.picture1);
    reader1.onload = (_event) => {
      this.imgURL = reader1.result;
    }      
  }
  if(this.externalTagData.picture2){
    reader2.readAsDataURL(this.externalTagData.picture2);
    reader2.onload = (_event) => {
      this.imgURL1 = reader2.result;
    }
  }
  if(this.externalTagData.document){
    this.document=this.externalTagData.document;
  }
}

// get document list of files
getDocument(event){
  if (event.length === 0)
  return;
 this.document=event.target.files; 
 this.externalTagData.document=this.document; 
}

// set the preview for image
preview(event, imageNo: number) {
  if (event.length === 0)
    return;
  var mimeType;
  var reader = new FileReader();
  if (imageNo == 1) {
    this.picture1 = event.target.files[0];
    this.externalTagData.picture1=this.picture1;
    console.log("picture1", this.picture1);
    mimeType = this.picture1.type;
    this.validateMimeType(mimeType);
    reader.readAsDataURL(this.picture1);
  } else {
    this.picture2 = event.target.files[0];
    this.externalTagData.picture2=this.picture2;
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
