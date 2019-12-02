import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {JourneyFormComponent} from './journey-form.component';

describe('JourneyListComponent', () => {
  let component: JourneyFormComponent;
  let fixture: ComponentFixture<JourneyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JourneyFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
