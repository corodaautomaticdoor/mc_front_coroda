import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSendComponent } from './modal-send.component';

describe('ModalSendComponent', () => {
  let component: ModalSendComponent;
  let fixture: ComponentFixture<ModalSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
