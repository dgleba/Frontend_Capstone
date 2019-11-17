import { Component, OnInit } from '@angular/core';
import { RestAPIService } from 'src/app/Service/restAPIService/rest-apiservice.service';


@Component({
  selector: 'app-add-picture',
  templateUrl: './add-picture.component.html',
  styleUrls: ['./add-picture.component.css']
})
export class AddPictureComponent implements OnInit {
  public imagePath;
  imgURL: any;
  imgURL1: any;
 file:File;
  public message: string;
  
 
  constructor(private restAPIService: RestAPIService) { }
  ngOnInit() {
  }
  uploadImage(id){
    this.restAPIService.uploadImage(this.file,id).subscribe((data: any)=>{
      console.log(data);
    });

  }
  
  preview(event,imageNo:number) {
    this.file=event.target.files[0];
    if (event.length === 0)
      return; 
    var mimeType = this.file.type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    } 
    var reader = new FileReader();
    reader.readAsDataURL(this.file); 
    reader.onload = (_event) => { 
      if(imageNo==1){       
        this.imgURL = reader.result;
      }else{       
        this.imgURL1 = reader.result;
      }     
    }
  }

}
