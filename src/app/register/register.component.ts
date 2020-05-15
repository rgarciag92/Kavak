import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { CityService } from '../provider/cityService';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  submitted = false;
  phonePattern =  '((\(\d{2}\) ?)|(\d{2}-))?\d{3}-\d{3}-\d{3}';
  City: any = [];

  //City: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan']



  constructor(private formBuilder: FormBuilder, private cityService: CityService, private http: HttpClient) { }

  ngOnInit() {
    this.buildForm();
    this.cityService.getCities().subscribe(cities=> {
      cities.forEach(element => {
        console.log(element.address.city);
        this.City.push(element.address.city);
      });
    })

  }

  private buildForm(){

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      cityName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(this.phonePattern)]]
  });
  }

  changeCity(e) {
    this.cityName.setValue(e.target.value, {
      onlySelf: true
    })
  }

   // Getter method to access formcontrols
   get cityName() {
    return this.registerForm.get('cityName');
  }

  get phone() {
    return this.registerForm.get('username');
} 

  get f() { 

    return this.registerForm.controls; 
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return false;
    }

    alert('SUCCESS!! :-)')
}



}
