import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation, MatStepperModule } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EnvironmentService } from '../services/environment.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { AsyncPipe, CommonModule } from '@angular/common';
import { VotesuccessComponent } from '../votesuccess/votesuccess.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatFormFieldModule, MatRadioModule, MatStepperModule, MatIconModule, MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule, AsyncPipe, VotesuccessComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  private _formBuilder = inject(FormBuilder);
  private breakpointObserver = inject(BreakpointObserver);

  public candidates: any[] = []

  firstFormGroup = this._formBuilder.group({
    gender: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    gender: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    gender: ['', Validators.required],
  });
  fouthFormGroup = this._formBuilder.group({
    gender: ['', Validators.required],
  });
  fiveFormGroup = this._formBuilder.group({
    gender: ['', Validators.required],
  });
  sixFormGroup = this._formBuilder.group({
    gender: ['', Validators.required],
  });
  sevenFormGroup = this._formBuilder.group({
    gender: ['', Validators.required],
  });
  eightFormGroup = this._formBuilder.group({
    gender: ['', Validators.required],
  });
  nineFormGroup = this._formBuilder.group({
    gender: ['', Validators.required],
  });
  tenFormGroup = this._formBuilder.group({
    gender: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;

  constructor(public formbuilder: FormBuilder, public http: HttpClient, public routes: Router, public service: EnvironmentService) {

    this.stepperOrientation = this.breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));


  }


  public message: any = ''

  public voterMsg: any = ''
  public voterName: any = ''
  public voterCode: any = ''
  public isModalOpen = false

  getCandidates() {

    this.service.getUserDashboard().subscribe((response: any) => {
      this.candidates = response;

    },
      (error) => {
        this.displayError(error)

      }
    );


  }

  getDataWithExpiry(): string | null {
    const storedData = localStorage.getItem('food');

    if (!storedData) {
      return null;
    }

    const parsedData = JSON.parse(storedData);
    const currentTime = new Date().getTime();

    if (currentTime > parsedData.expiry) {
      alert("Session timeout")
      this.routes.navigate(['/signin'])
      this.removeDataFromStorage();
      return null;
    }

    const decryptedValue = parsedData.value;
    return decryptedValue;
  }


  removeDataFromStorage(): void {
    localStorage.removeItem('food');
  }

  getData() {

    const decryptedData = this.getDataWithExpiry();

    let obj = {
      mynewfood: decryptedData,


    }

    this.service.getDetails(obj).subscribe((data: any) => {

      this.voterName = data.fullname
      this.voterCode = data.statecode

    })

  }

  public checkInterval: any
  ngOnInit(): void {

    this.getCandidates()

    this.getData()
    this.getDataWithExpiry()


    this.checkInterval = setInterval(() => {
      this.getDataWithExpiry();
    }, 10000);

  }

  displayError(error: any) {
    if (error.error && error.error.message) {
      this.message = error.error.message;
    } else {
      this.message = 'An unexpected error occurred. Please try again.';
    }
  }

  onSubmit() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid && this.fouthFormGroup.valid && this.fiveFormGroup.valid && this.sixFormGroup.valid && this.sevenFormGroup.valid && this.eightFormGroup.valid && this.nineFormGroup.valid && this.tenFormGroup.valid) {
      let obj = {
        'votercode': this.voterCode,
        'president': this.firstFormGroup.value['gender'],
        'vice_president': this.secondFormGroup.value['gender'],
        'gensecretary': this.thirdFormGroup.value['gender'],
        'assgensecretary': this.fouthFormGroup.value['gender'],
        'fin_secretary': this.fiveFormGroup.value['gender'],
        'electoralofficer1': this.sixFormGroup.value['gender'],
        'electoralofficer2': this.sevenFormGroup.value['gender'],
        'profficer': this.eightFormGroup.value['gender'],
        'projectmanager': this.nineFormGroup.value['gender'],
        'welfareofficer': this.tenFormGroup.value['gender'],
      }


      this.service.userDashboard(obj).subscribe((data: any) => {

        if (data.status === true) {
          this.isModalOpen = true

        }
        else {
          this.voterMsg = data.message
          this.showMessageWithTimeout(this.voterMsg, 3000)
        }
      })

    } else {
      this.voterMsg = "All steps must be selected"
      this.showMessageWithTimeout(this.voterMsg, 3000)
    }

  }


  public showMsg = false

  showMessageWithTimeout(message: string, duration: number) {
    this.showMsg = true;

    setTimeout(() => {
      this.hideMessage();
    }, duration)

  }

  hideMessage() {
    this.voterMsg = '';
    // this.msg1 = '';
    this.showMsg = false
  }

  closeModal() {

    this.routes.navigate(['/'])

  }


  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

}
