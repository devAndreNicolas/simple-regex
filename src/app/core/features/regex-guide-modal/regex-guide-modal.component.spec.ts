import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegexGuideModalComponent } from './regex-guide-modal.component';

describe('RegexGuideModalComponent', () => {
  let component: RegexGuideModalComponent;
  let fixture: ComponentFixture<RegexGuideModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegexGuideModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegexGuideModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
