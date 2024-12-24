import { TestBed } from '@angular/core/testing';

import { AdminMovieService } from '../services/admin-movie.service';

describe('AdminMovieService', () => {
  let service: AdminMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
