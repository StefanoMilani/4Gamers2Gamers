import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTeamPage } from './search-team.page';

describe('SearchTeamPage', () => {
  let component: SearchTeamPage;
  let fixture: ComponentFixture<SearchTeamPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTeamPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTeamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
