/**
 * @ngdoc directive
 * @name Add Picture
 * @element Image View for  Picture1 , Picture2 and Document 
 * @function 
 * @description
 * Add pictures and document in the Add picture tag
 * 
 * 
 * Functions-----------------------
 * 
 * Preview pictures and document,
 * Check if image is set,
 * Get Documents from the html,
 * Validate MIME type.
 *
 * 
 **/

import { Component, OnInit } from '@angular/core';
import { RestAPIService } from 'src/app/Service/restAPIService/rest-apiservice.service';
import { UtilityServiceService } from '../../Service/utility-service.service'
import { Router } from '@angular/router';
import { QualityTagData } from 'src/app/Model/qualtiyTagData';
@Component({
  selector: 'app-add-picture',
  templateUrl: './add-picture.component.html',
  styleUrls: ['./add-picture.component.css']
})
export class AddPictureComponent implements OnInit {
  constructor(private restAPIService: RestAPIService, public utilityService: UtilityServiceService, private router: Router) { }
  public internalTagData:QualityTagData;
  public imagePath;
  imgURL: any;
  imgURL1: any;
  document: Array<File> = [];
  picture1: File;
  picture2: File;
  public message: string;
   ngOnInit() { 
    this.internalTagData=this.utilityService.getTagData();   
    this.checkIfImageIsSet();
  } 
 
  checkIfImageIsSet(){
    var reader1 = new FileReader();
    var reader2 = new FileReader();
    if(this.internalTagData.picture1){
      console.log("pic1 alrdy set",this.internalTagData);
      reader1.readAsDataURL(this.internalTagData.picture1);
      reader1.onload = (_event) => {
        this.imgURL = reader1.result;
      }      
    }
    if(this.internalTagData.picture2){
      reader2.readAsDataURL(this.internalTagData.picture2);
      reader2.onload = (_event) => {
        this.imgURL1 = reader2.result;
      }
    }
    if(this.internalTagData.document){
      this.document=this.internalTagData.document;
    }
  }
  // get document list of files
  getDocument(event){
    if (event.length === 0)
    return;
   this.document=event.target.files; 
   this.internalTagData.document=this.document; 
  }

  // set the preview for image
  preview(event, imageNo: number) {
    if (event.length === 0)
      return;
    var mimeType;
    var reader = new FileReader();
    if (imageNo == 1) {
      this.picture1 = event.target.files[0];
      this.internalTagData.picture1=this.picture1;
      console.log("picture1", this.picture1);
      mimeType = this.picture1.type;
      this.validateMimeType(mimeType);
      reader.readAsDataURL(this.picture1);
      
    } else {
      this.picture2 = event.target.files[0];
      this.internalTagData.picture2=this.picture2;
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
