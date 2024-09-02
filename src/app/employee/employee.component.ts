
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  bioSection = new FormGroup({
    firstName: new FormControl<string>('', [
      Validators.minLength(3),
      Validators.required
    ]),
    lastName: new FormControl<string>('', [Validators.minLength(3), Validators.required]),
    age: new FormControl<number|null>(null, [ Validators.required]),
    licenseNumber: new FormControl<string>('')
  });
  constructor() { }
  ngOnInit() {
    this.bioSection.get('age')?.events.subscribe((event) => {
      if (parseInt(event.source.value as string) > 18) {
        this.bioSection.get('licenseNumber')?.addValidators(Validators.required);
      } else {
        this.bioSection.get('licenseNumber')?.removeValidators(Validators.required);
      }
      this.bioSection.get('licenseNumber')?.updateValueAndValidity();
    });
  }
}