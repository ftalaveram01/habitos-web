import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MishabitosComponent } from './mishabitos.component';

describe('MishabitosComponent', () => {
  let component: MishabitosComponent;
  let fixture: ComponentFixture<MishabitosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MishabitosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MishabitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
