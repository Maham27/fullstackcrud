import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectvideosComponent } from './subjectvideos.component';

describe('SubjectvideosComponent', () => {
  let component: SubjectvideosComponent;
  let fixture: ComponentFixture<SubjectvideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectvideosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectvideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
