import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkWaterPage } from './drinkWater.page';

describe('Tab1Page', () => {
  let component: DrinkWaterPage;
  let fixture: ComponentFixture<DrinkWaterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DrinkWaterPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinkWaterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
