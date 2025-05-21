import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptDetailComponent } from './prompt-detail.component';

describe('PromptDetailComponent', () => {
  let component: PromptDetailComponent;
  let fixture: ComponentFixture<PromptDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PromptDetailComponent]
    });
    fixture = TestBed.createComponent(PromptDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
