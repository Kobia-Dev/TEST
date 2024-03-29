import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarchartComponent } from './bargraph.component';

describe('BargraphComponent', () => {
  let component: BarchartComponent;
  let fixture: ComponentFixture<BarchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarchartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
