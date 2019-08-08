import { FormGroup, FormControl, ValidatorFn, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import {
  MatStepperIntl,
  ErrorStateMatcher,
  MatDatepickerInputEvent,
  MAT_LABEL_GLOBAL_OPTIONS,
  MatCheckboxChange,
  MAT_CHECKBOX_CLICK_ACTION
} from '@angular/material';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import * as moment from 'moment';


export class TwStepperIntl extends MatStepperIntl {
  optionalLabel = '非必填';
}

// 調整時機為invalid + dirty即顯示錯誤訊息
export class EarlyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && control.dirty);
  }
}

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
  providers: [
    { provide: MatStepperIntl, useClass: TwStepperIntl },
    { provide: ErrorStateMatcher, useClass: EarlyErrorStateMatcher },
    { provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'noop' }
  ]
})
export class SurveyComponent implements OnInit {

  startDate = moment('2019-8-1');
  minDate = moment('2019-8-8');
  maxDate = moment('2019-8-28');

  // startDate = moment(new Date(2019, 7, 1));
  // minDate = moment(new Date(2019, 7, 8));
  // maxDate = moment(new Date(2019, 7, 18));

  // startDate = new Date(2019, 7, 1);
  // minDate = new Date(2019, 7, 8);
  // maxDate = new Date(2019, 7, 18);

  isLinear: boolean;

  surveyForm: FormGroup;

  intro: string;
  countries$: Observable<any[]>;

  majorTechList: any[];
  interestList: any[];
  nestInterestList: any[];

  // earlyErrorStateMacher = new EarlyErrorStateMatcher();

  indeterminateSelectedPayFor: boolean;
  

  constructor(private httpClient: HttpClient) {
    this.surveyForm = new FormGroup({
      basicQuestions: new FormGroup({
        name: new FormControl('', Validators.required),
        intro: new FormControl('', [Validators.required, Validators.minLength(10)]),
        country: new FormControl(''),
        majorTech: new FormControl(''),
        birthday: new FormControl({ value: '', disabled: true}),
        interest: new FormControl(null)
      }),
      mainQuestions: new FormGroup({
        payForAll: new FormControl(false),
        payForBook: new FormControl(false),
        payForMusic: new FormControl(false),
        payForMovie: new FormControl(true),
        angularLikeScore: new FormControl(5),
        angularMaterialLikeScore: new FormControl(5),
        subscribeAngular: new FormControl(true),
        subscribeAngularMaterial: new FormControl(true),
        subscribeNgRx: new FormControl(false)
      }),
      otherQuestions: new FormGroup({
        favoriteColorRed: new FormControl(0),
        favoriteColorGreen: new FormControl(0),
        favoriteColorBlue: new FormControl(0),
        surveyScore: new FormControl(0)
      })
    });
  }

  ngOnInit() {
    this.surveyForm
      .get('basicQuestions')
      .get('country')
      .valueChanges
      .pipe(debounceTime(300))
      .subscribe(inputCountry => {
        this.countries$ = this.httpClient.get<any[]>('assets/countries.json').pipe(map(countries => {
          return countries.filter(country => country.name.indexOf(inputCountry) >= 0);
        }));
      });


    this.majorTechList = [
      {
        name: '前端',
        items: ['HTML', 'CSS', 'JavaScript']
      },
      {
        name: '後端',
        items: ['C#', 'NodeJs', 'Go']
      }
    ];

    this.interestList = [
      {
        id: 1,
        name: '桌球'
      },
      {
        id: 2,
        name: '網球'
      },
      {
        id: 3,
        name: '羽球'
      }
    ];

    this.nestInterestList = [
      {
        id: 1,
        name: '球類',
        subItems: [
          {
            id: 11,
            name: '桌球'
          },
          {
            id: 12,
            name: '網球'
          },
          {
            id: 13,
            name: '羽球'
          }
        ]
      },
      {
        id: 2,
        name: '其他',
        subItems: [
          {
            id: 21,
            name: '游泳'
          },
          {
            id: 22,
            name: '跑步'
          }
        ]
      }
    ];

    this._setSelectAllState();
  }

  checkAllChange($event: MatCheckboxChange) {
    this.surveyForm
      .get('mainQuestions')
      .get('payForBook')
      .setValue($event.checked);
    this.surveyForm
      .get('mainQuestions')
      .get('payForMusic')
      .setValue($event.checked);
    this.surveyForm
      .get('mainQuestions')
      .get('payForMovie')
      .setValue($event.checked);
    this._setSelectAllState();
  }

  payForChange() {
    this._setSelectAllState();
  }

  private _setSelectAllState() {
    const payForBook = this.surveyForm.get('mainQuestions').get('payForBook').value;
    const payForMusic = this.surveyForm.get('mainQuestions').get('payForMusic').value;
    const payForMovie = this.surveyForm.get('mainQuestions').get('payForMovie').value;
    const count = (payForBook ? 1 : 0) + (payForMusic ? 1 : 0) + (payForMovie ? 1 : 0);
    this.surveyForm
      .get('mainQuestions')
      .get('payForAll')
      .setValue(count === 3);
    this.indeterminateSelectedPayFor = count > 0 && count < 3;
  }

  highlightFiltered(countryName: string) {
    const inputCountry = this.surveyForm.get('basicQuestions').get('country').value;
    return countryName.replace(inputCountry, `<span class="autocomplete-highlight">${inputCountry}</span>`);
  }

  displayCountry(country: any) {
    if (country) {
      return `${country.name} / ${country.code}`;
    } else {
      return '';
    }
  }

  familyDayFilter(date: moment.Moment): boolean {
    const day = date.day();
    return day !== 2 && day !== 5;
  }

  logDateInput($event: MatDatepickerInputEvent<moment.Moment>) {
    console.log($event);
  }

  logDateChange($event: MatDatepickerInputEvent<moment.Moment>) {
    console.log($event);
  }

  get selectedColorRed() {
    return this.surveyForm.get('otherQuestions').get('favoriteColorRed').value;
  }

  get selectedColorGreen() {
    return this.surveyForm.get('otherQuestions').get('favoriteColorGreen').value;
  }
  
  get selectedColorBlue() {
    return this.surveyForm.get('otherQuestions').get('favoriteColorBlue').value;
  }

  // 組合顏色樣式
  get selectedColorStyle() {
    return `rgb(${this.selectedColorRed}, ${this.selectedColorGreen}, ${this.selectedColorBlue})`;
  }
}
