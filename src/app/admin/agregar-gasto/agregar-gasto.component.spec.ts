import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarGastoComponent } from './agregar-gasto.component';

describe('AgregarGastoComponent', () => {
  let component: AgregarGastoComponent;
  let fixture: ComponentFixture<AgregarGastoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarGastoComponent]
    });
    fixture = TestBed.createComponent(AgregarGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
