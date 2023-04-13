import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavCardsComponent } from './fav-cards.component';

describe('FavCardsComponent', () => {
  let component: FavCardsComponent;
  let fixture: ComponentFixture<FavCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
