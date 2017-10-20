import {NO_ERRORS_SCHEMA} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { SampleDataFormComponent } from './sample-data-form.component';
import { ConfigFormComponent} from 'shared/components/config-form/config-form.component';

import {ObjKeysPipe, TitleCasePipe} from 'shared/pipes/index';

describe('SampleDataFormComponent', () => {
  let component: SampleDataFormComponent;
  let fixture: ComponentFixture<SampleDataFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports : [ FormsModule, ReactiveFormsModule ],
      declarations: [ SampleDataFormComponent, ConfigFormComponent, ObjKeysPipe, TitleCasePipe ]
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   // console.log(component);
  //   // expect(component).toBeTruthy();
  // });
});