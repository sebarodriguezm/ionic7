import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddOptionPage } from './add-option.page';

describe('AddOptionPage', () => {
  let component: AddOptionPage;
  let fixture: ComponentFixture<AddOptionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddOptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
