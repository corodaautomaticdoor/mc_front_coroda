import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionUpdateComponent } from './cotizacion-update.component';

describe('CotizacionUpdateComponent', () => {
  let component: CotizacionUpdateComponent;
  let fixture: ComponentFixture<CotizacionUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotizacionUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizacionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
