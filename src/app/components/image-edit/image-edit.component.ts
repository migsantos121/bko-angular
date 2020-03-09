import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ViewChild, AfterViewInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Annonce } from 'app/models/annonce';
import { Categorie } from 'app/models/categorie';
import { Pays } from 'app/models/pays';
import { Collection } from 'app/models/collection';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';


import * as customType from '../../models/constants';
import { PipesModule } from '../../pipes';

declare var Cropper : any;

@Component({
  selector: 'bo-edit-image',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.css']
})
export class ImageEditComponent implements OnInit {

  @Input() imageUrl : string;
  @Output() cropped = new EventEmitter();
  @Output() close = new EventEmitter();
  @Output() save = new EventEmitter();
  
  cropper : any;
  imageSrc : any;
  prevImageSrc : any;

  constructor(private _http: Http) { }

  ngOnInit() {

    var img = new Image();
    var _SELF = this;

    img.setAttribute('crossOrigin', 'anonymous');

    img.onload = function () {
      var canvas = document.createElement("canvas");
      canvas.width =img.width;
      canvas.height =img.height;

      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      var dataURL = canvas.toDataURL("image/png");

      _SELF.imageSrc = dataURL;
      document.getElementById('cropperimage').setAttribute('src', dataURL);
      _SELF.cropper = new Cropper(document.getElementById('cropperimage'),{
        autoCrop : false,
        dragMode : 'move',
        checkCrossOrigin : false,
        center : true,
        restore : true
      });
    };
    const token = localStorage.getItem('bo::token');
    let headers = new Headers();

    // Force an OPTIONS request to the server before loading the image in order to update the 
    // browser's CORS policies
    headers.append( "Origin", "*");
    headers.append( "x-requested-with", "XMLHttpRequest");
    const options = new RequestOptions({
      method: RequestMethod.Get,
      headers
    });
    this._http.get(this.imageUrl, options ).toPromise().then(r => {
      console.log("image option request");
      console.log(r);
      img.src = this.imageUrl;
    }).catch(this.handleError);

    this.prevImageSrc = null;
  }
  
  handleError(error){
    return Promise.reject(error.messages || error);
  }

	ngAfterViewInit() {

	}

  processCropperAction(mode) {
    // alert(mode);
    switch (mode) {
      case 'crop':
        if ( this.cropper === null ) {
          alert(`You can't edit image in this mode, please press undo and continue editing :)`);
          break;
        }
        this.cropper.setDragMode(mode);
        break;

      case 'rotate-left':
        if ( this.cropper === null ) {
          alert(`You can't edit image in this mode, please press undo and continue editing :)`);
          break;
        }
        this.cropper.rotate(-90);
        break;

      case 'rotate-right':
        if ( this.cropper === null ) {
          alert(`You can't edit image in this mode, please press undo and continue editing :)`);
          break;
        }
        this.cropper.rotate(90);
        break;

      case 'flip-horizontal':
        if ( this.cropper === null ) {
          alert(`You can't edit image in this mode, please press undo and continue editing :)`);
          break;
        }
        this.cropper.scaleX(-this.cropper.getData().scaleX || -1);
        break;

      case 'flip-vertical':
        if ( this.cropper === null ) {
          alert(`You can't edit image in this mode, please press undo and continue editing :)`);
          break;
        }
        this.cropper.scaleY(-this.cropper.getData().scaleY || -1);
        break;

      case 'clear':
        if ( this.cropper === null ) {
          alert(`You can't edit image in this mode, please press undo and continue editing :)`);
          break;
        }
        this.cropper.clear();
        break;

      case 'cropok':
        const cropper = this.cropper;
        this.prevImageSrc = this.imageSrc;
        this.imageSrc = cropper.getCroppedCanvas().toDataURL('image/png');
        this.cropper.setCanvasData(cropper.getCropBoxData());
        this.cropper.destroy();
        this.cropper = null;
        this.cropped.emit(this.imageSrc);
        break;

      case 'undo':
        if(this.prevImageSrc != null) {
          this.imageSrc = this.prevImageSrc;
          this.prevImageSrc = null;
          document.getElementById('cropperimage').setAttribute('src', this.imageSrc);
          this.cropper = new Cropper(document.getElementById('cropperimage'),{
            autoCrop : false,
            dragMode : 'move',
            checkCrossOrigin : false,
            center : true
          });
          this.cropped.emit(this.imageSrc);
          this.cropper
          .crop()
          .setData(null)
          .setCanvasData(null)
          .setCropBoxData(null);
        }
        break;

      case 'save':
        if(this.prevImageSrc != null) {
          this.save.emit(this.imageSrc);
          this.close.emit();
        } else {
          alert("There's no operations to save.");
        }
        break;

      case 'close':
        this.close.emit();
        break;
        
      default:

    }
  }

}
