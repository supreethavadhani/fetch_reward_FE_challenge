import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDisplayFieldsComponent } from './card-display-fields.component';

describe('CardDisplayFieldsComponent', () => {
  let component: CardDisplayFieldsComponent;
  let fixture: ComponentFixture<CardDisplayFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardDisplayFieldsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDisplayFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
