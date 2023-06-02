import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarGastoComponent } from './modificar-gasto.component';

describe('ModificarGastoComponent', () => {
  let component: ModificarGastoComponent;
  let fixture: ComponentFixture<ModificarGastoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarGastoComponent]
    });
    fixture = TestBed.createComponent(ModificarGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
