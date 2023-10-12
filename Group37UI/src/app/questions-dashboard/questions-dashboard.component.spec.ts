import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, beforeEach, it,expect } from 'jasmine';
import { QuestionsDashboardComponent } from './questions-dashboard.component';

describe('QuestionsDashboardComponent', () => {
  let component: QuestionsDashboardComponent;
  let fixture: ComponentFixture<QuestionsDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionsDashboardComponent]
    });
    fixture = TestBed.createComponent(QuestionsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
