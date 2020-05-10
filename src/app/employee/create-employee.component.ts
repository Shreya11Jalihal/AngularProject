import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  testForm:FormGroup;
  submitted = false;
  validationMessages = {
    'fullName': {
      'required': 'Name is required',
      'minlength': 'Name must be greater than 2 characters.',
      'maxlength': 'Name must be less than 10 characters'
    },
    'email': {
      'required': 'Email is required',
    },  
    'skillName': {
      'required': 'SkillName is required',
    },
   'experienceInYears': {
    'required': 'ExperienceDetail is required',
   },
    'proficiency': {
      'required': 'Proficiency is required',
    },
  };

  

  formErrors = {
    'fullName': '',
    'email': '',
    'skillName': '',
    'experienceInYears': '',
    'proficiency': ''
  };
  constructor(private fb: FormBuilder) {

  }
  ngOnInit() {
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(9)]],
      email: ['', Validators.required],
      skills: this.fb.group({
        skillName: ['', Validators.required],
        experienceInYears: ['', Validators.required],
        proficiency: ['', Validators.required]
      })
    });
    
    this.testForm=this.fb.group({
      testName:['']

    });

    this.employeeForm.valueChanges.subscribe((data) => {
      this.logValidationerrors(this.employeeForm);
    });
    // this.employeeForm.get('fullName').valueChanges.subscribe(value=>
    //   {
    //       console.log(value);
    //   }
    // );

    // this.employeeForm.valueChanges.subscribe((value :any)=>
    // {
    //     console.log(JSON.stringify(value));

    //  }

    //);

    this.employeeForm.get('skills').valueChanges.subscribe((value: any) => {
      console.log(JSON.stringify(value));
    });
  }

  logValidationerrors(group: FormGroup=this.employeeForm): void {
     
    
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationerrors(abstractControl);
      }
      else {
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid &&
          (abstractControl.touched || abstractControl.dirty)) {
          const messages = this.validationMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });

    
  };

  onSubmit(): void {
    console.log(this.employeeForm);
    this.submitted = true;
    if (this.employeeForm.invalid) {
      return;
    }
    //console.log(this.employeeForm.get('fullName').value);
    //console.log(this.employeeForm.controls.fullName.touched);

  };

  onLoadData(): void {
  };

}
