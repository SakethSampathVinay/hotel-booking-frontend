import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StayInspiredComponent } from './stay-inspired.component';

describe('StayInspiredComponent', () => {
  let component: StayInspiredComponent;
  let fixture: ComponentFixture<StayInspiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StayInspiredComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StayInspiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
