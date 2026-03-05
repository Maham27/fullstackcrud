import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjComponent } from './subj.component';

describe('SubjComponent', () => {
  let component: SubjComponent;
  let fixture: ComponentFixture<SubjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
