import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMovimentacao } from './editar-movimentacao';

describe('EditarMovimentacao', () => {
  let component: EditarMovimentacao;
  let fixture: ComponentFixture<EditarMovimentacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarMovimentacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarMovimentacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
