import { FormGroup, FormControl, ValidatorFn, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatStepperIntl, ErrorStateMatcher} from '@angular/material';
import { MatDatepickerInputEvent} from '@angular/material';

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
  providers: [{ provide: MatStepperIntl, useClass: TwStepperIntl },
  { provide: ErrorStateMatcher, useClass: EarlyErrorStateMatcher }
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

  constructor(private httpClient: HttpClient) {
    this.surveyForm = new FormGroup({
      basicQuestions: new FormGroup({
        name: new FormControl('', Validators.required),
        intro: new FormControl('', [Validators.required, Validators.minLength(10)]),
        country: new FormControl(''),
        majorTech: new FormControl(''),
        birthday: new FormControl({ value: '', disabled: true}),
        interest: new FormControl(null)
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
}
