import { Component, OnInit } from '@angular/core';
import { RestAPIService } from 'src/app/Service/restAPIService/rest-apiservice.service';
import { UtilityServiceService } from '../../Service/utility-service.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-picture',
  templateUrl: './add-picture.component.html',
  styleUrls: ['./add-picture.component.css']
})
export class AddPictureComponent implements OnInit {


  constructor(private restAPIService: RestAPIService, public utilityService: UtilityServiceService, private router: Router) { }
  ngOnInit() {
  }
  public internalTagData = this.utilityService.getInternalTagData();
  public imagePath;
  imgURL: any;
  imgURL1: any;
  document: Array<File> = [];
  picture1: File;
  picture2: File;
  public message: string;
  //validation 
  submitForm() {
    console.log(this.internalTagData, "okdby malti");
    if (this.internalTagData.PartID) {
      if (this.internalTagData.Reason) {
        if (this.internalTagData.Issuedby) {
          this.internalTagData.Date = this.utilityService.getTodaysDate().toString();
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
    this.restAPIService.createTag(this.internalTagData).subscribe((data: any) => {
      console.log(data);
      this.uploadImage(data.id);
      //this.router.navigate(['/getTag'])
    })
  }
  // api call to upload image
  uploadImage(id) {
    console.log("id in image upload",id);
    this.restAPIService.uploadImage(this.picture1, this.picture2, this.document, id).subscribe((data: any) => {
      console.log(data);
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
