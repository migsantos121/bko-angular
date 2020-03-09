import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Annonce } from '../../models/annonce';
import { Pays } from '../../models/pays';
import * as customType from '../../models/constants';
import { Categorie } from '../../models/categorie';
import { ResizeOptions } from 'ng2-image-compress';
import { IImage } from 'ng2-image-compress';
import { ImageCompressService } from 'ng2-image-compress';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bo-annonce-form',
  templateUrl: './annonce-form.component.html',
  styleUrls: ['./annonce-form.component.css']
})
export class AnnonceFormComponent {
  @Input() categories: Categorie[];
  @Input() pays: Pays[];
  @Input() annonce: Annonce;
  @Output() onFormSubmit = new EventEmitter();
  @Output() submitImage = new EventEmitter();
  @Output() moderateAd = new EventEmitter();
  daterangeSponsoring: any = {};
  daterange: any = {};
  options: any = {
    locale: { format: 'YYYY-MM-DD' },
    alwaysShowCalendars: false,
  };
  form: FormGroup;
  imageForm: FormGroup;
  customType = customType;
  deal_type: number = null;
  display_updload = 0;
  display_editImage = 0;
  message_moderation = '';
  deal_type_display = 0;
  sponsoring_display = false;
  placeholder = '../../../assets/img/no_image_available.png';

  formErrors = {
    titre: '',
    prix: '',
    description: '',
    categorie: Object,
    type_deal: '',
    type_annonce: '',
    pays: '',
    amount_discount: '',
    start_discount: '',
    end_discount: '',
    user: ''
  };

  validationMessages = {
    titre: {
      required: 'Veuillez donner un titre à l\'annonce.'
    },
    description: {
      required: 'Veuiller saisir le descriptif de l\'annonce'
    }
  };

  constructor() {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes['annonce'] && changes['annonce'].firstChange === false) {
      const annonce = (this.annonce = changes['annonce'].currentValue);
      this.deal_type = this.annonce.deal_type;
      this.form.patchValue({
        id: annonce['id'],
        titre: annonce['titre'],
        deal: annonce['deal'],
        categorie: annonce['categorie'],
        telephone: annonce['telephone'],
        message_moderation: annonce['message_moderation'],
        prix: annonce['prix'],
        description: annonce['description'],
        deal_type: annonce['deal_type'],
        amount_discount: annonce['amount_discount'],
        deal_custom: annonce['deal_custom'],
        etat_annonce: annonce['etat_annonce'],
        deleted: ( annonce['deleted'] === false ) ? 0 : 1,
        etat_produit: annonce['etat_produit'],
        etat: annonce['etat'],
        start_discount: annonce['start_discount'],
        end_discount: annonce['end_discount'],
        homepage_sponsoring: annonce['is_sponsored']
          ? annonce['is_sponsored']
          : false,
        start_sponsoring: annonce['start_sponsoring'],
        end_sponsoring: annonce['end_sponsoring'],
        pays_id:
          typeof annonce['pays'] === 'object'
            ? annonce['pays'].id
            : annonce['pays'],
        localite: annonce['localite'],
        type_annonce: annonce['type_annonce'],
        specialized_ad: annonce['specialized_ad'],
        all_country: annonce['all_country'] ? annonce['all_country'] : false,
        // Immo fields
        floor: annonce['floor'],
        room: annonce['room'],
        all_room: annonce['all_room'],
        surface_unit: annonce['surface_unit'],
        surface: annonce['surface'],
        shower: annonce['shower'],
        type_good: annonce['type_good'],
        // Auto fields
        transmission: annonce['transmission'],
        fuel: annonce['fuel'],
        maker: annonce['maker'],
        model: annonce['model'],
        year: annonce['year'],
        car_model: annonce['car_model'],
        motorbike_model: annonce['motorbike_model'],
        camion_model: annonce['camion_model']
      });
    }
  }

  buildForm(): void {
    this.form = new FormGroup({
      id: new FormControl(''),
      titre: new FormControl('', Validators.required),
      prix: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      categorie: new FormControl('', Validators.required),
      pays_id: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      type_annonce: new FormControl('', Validators.required),
      deal_type: new FormControl('', Validators.required),
      specialized_ad: new FormControl('', Validators.required),
      pays: new FormControl('', Validators.required),
      etat_produit: new FormControl(''),
      etat_annonce: new FormControl(''),
      deal_custom: new FormControl(''),
      etat: new FormControl(''),
      deleted: new FormControl(''),
      all_country: new FormControl(''),
      message_moderation: new FormControl(''),
      amount_discount: new FormControl(''),
      start_discount: new FormControl(''),
      end_discount: new FormControl(''),
      homepage_sponsoring: new FormControl(''),
      start_sponsoring: new FormControl(''),
      end_sponsoring: new FormControl(''),
      // Annonce Immo fields
      locality: new FormControl(''),
      floor: new FormControl(''),
      surface: new FormControl(''),
      surface_unit: new FormControl(''),
      type_good: new FormControl(''),
      shower: new FormControl(''),
      room: new FormControl(''),
      all_room: new FormControl(''),
      // Annonce Auto fields
      maker: new FormControl(''),
      model: new FormControl(''),
      car_model: new FormControl(''),
      motorbike_model: new FormControl(''),
      camion_model: new FormControl(''),
      year: new FormControl(''),
      mileage: new FormControl(''),
      transmission: new FormControl(''),
      fuel: new FormControl('')
    });

    this.imageForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      avatar: new FormControl('')
    });

    this.form.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.form) {
      return;
    }

    const form = this.form;
    this.deal_type_display = form.get('deal_type').value;
    this.sponsoring_display = form.get('homepage_sponsoring').value;

    for (const field of Object.keys(this.formErrors)) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key of Object.keys(control.errors)) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  auto_moto() {
    let valeur = '';
    if (this.annonce) {
      if (
        this.annonce &&
        this.annonce.specialized_ad === 2 ||
        (this.annonce.specialized_ad <= 205 && this.annonce.specialized_ad >= 200)
      ) {
        valeur = 'immo';
      }
      if (
        this.annonce &&
        this.annonce.specialized_ad === 1 ||
        (this.annonce.specialized_ad <= 103 && this.annonce.specialized_ad >= 100)
      ) {
        valeur = 'auto_moto';
      }
    }
    return valeur;
  }

  updateSource(nbre) {
    this.display_updload = nbre;
  }

  editImage(value) {
    this.display_editImage = value;
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageForm.get('id').setValue(this.annonce.id);
        this.imageForm.get('name').setValue('photo' + this.display_updload);
        this.imageForm.get('avatar').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        });
        console.log(this.imageForm.value);
      };
    }
  }


  onImageChange(fileInput: any) {
    const option: ResizeOptions = new ResizeOptions();
    option.Resize_Max_Height = 700;
    option.Resize_Max_Width = 450;
    option.Resize_Quality = 90;
    option.Resize_Type = 'image/png';
    const images: Array<IImage> = [];
    ImageCompressService.filesToCompressedImageSource(
      fileInput.target.files
    ).then(observableImages => {
      observableImages.subscribe(
        image => {
          images.push(image);
          let imgValue = '';
          try {
            imgValue = image.compressedImage.imageDataUrl.split(
              'data:image/jpeg;base64,'
            )[1];
          }
          // tslint:disable-next-line:one-line
          catch (err) {
            imgValue = image.compressedImage.imageDataUrl.split(
              'data:image/png;base64,'
            )[1];
          }
          this.imageForm.get('id').setValue(this.annonce.id);
          this.imageForm.get('name').setValue('photo' + this.display_updload);
          this.imageForm.get('avatar').setValue({
            filename: image.fileName,
            filetype: image.type,
            value: imgValue
          });
          console.log(this.imageForm.value);
        },
        error => {
          console.log('Error while converting');
        }
      );
    });
  }

  moderate(etat) {
    const params = this.form.value;
    params.etat = etat;
    params.etat_type = etat;
    this.onFormSubmit.emit(params);
    // this.moderateAd.emit(params);
  }

  public selectedDate(value: any, datepickerr?: any) {
    this.daterange['start'] = value.start;
    this.daterange['end'] = value.end;
    this.daterange['label'] = value.label;
  }

  public selectedDateSponsoring(value: any, datepicker?: any) {
    this.daterangeSponsoring['start'] = value.start;
    this.daterangeSponsoring['end'] = value.end;
    this.daterangeSponsoring['label'] = value.label;
  }

  submitForm(value) {
    const formValue = value.value;
    formValue.deleted = formValue.deleted === '1' ? true : false;
    console.log(formValue);
    if (formValue.start_discount && formValue.end_discount) {
      formValue.start_discount = this.daterange['start'];
      formValue.end_discount = this.daterange['end'];
    }
    if (formValue.start_sponsoring && formValue.end_sponsoring) {
      formValue.start_sponsoring = this.daterangeSponsoring['start'];
      formValue.end_sponsoring = this.daterangeSponsoring['end'];
    }
    this.onFormSubmit.emit(formValue);
  }

  onImageCropped($event) {
    document.getElementById('photo'+this.display_editImage).setAttribute('src', $event);
  }

  onImageEditClose() {
    this.display_editImage = 0;
  }

  onImageSave($event) {
    this.imageForm.get('id').setValue(this.annonce.id);
    this.imageForm.get('name').setValue('photo' + this.display_editImage);
    // this.imageForm.get('name').setValue('photo1');
    this.imageForm.get('avatar').setValue({
      filename: "editedimage.png",
      filetype: "image/png",
      value: $event.split('data:image/png;base64,')[1]
    });
    console.log('--------------------');
    console.log(this.imageForm.value);
    this.submitImage.emit(this.imageForm.value);
  }
}
