import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-picture',
  templateUrl: './add-picture.component.html',
  styleUrls: ['./add-picture.component.css']
})
export class AddPictureComponent implements OnInit {
  public imagePath;
  imgURL: any;
  imgURL1: any;
  public message: string;
 
  constructor() { }
  ngOnInit() {
  }
  
  preview(files,imageNo:number) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      if(imageNo==1){       
        this.imgURL = reader.result;
      }else{       
        this.imgURL1 = reader.result;
      }
     
    }
  }

}
