import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOmdbComponent } from './search-omdb.component';

describe('SearchOmdbComponent', () => {
  let component: SearchOmdbComponent;
  let fixture: ComponentFixture<SearchOmdbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchOmdbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchOmdbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
