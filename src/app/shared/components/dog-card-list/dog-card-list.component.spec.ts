import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogCardListComponent } from './dog-card-list.component';

describe('DogCardListComponent', () => {
  let component: DogCardListComponent;
  let fixture: ComponentFixture<DogCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DogCardListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DogCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
