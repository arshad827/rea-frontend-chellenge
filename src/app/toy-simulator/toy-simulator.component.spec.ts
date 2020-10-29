import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToySimulatorComponent } from './toy-simulator.component';

describe('ToySimulatorComponent', () => {
  let component: ToySimulatorComponent;
  let fixture: ComponentFixture<ToySimulatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToySimulatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToySimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
