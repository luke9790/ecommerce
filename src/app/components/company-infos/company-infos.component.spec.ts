import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInfosComponent } from './company-infos.component';

describe('CompanyInfosComponent', () => {
  let component: CompanyInfosComponent;
  let fixture: ComponentFixture<CompanyInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyInfosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
