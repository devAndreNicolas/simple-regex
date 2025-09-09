import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegexDisplayComponent } from './regex-display.component';

describe('RegexDisplayComponent', () => {
  let component: RegexDisplayComponent;
  let fixture: ComponentFixture<RegexDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegexDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegexDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
