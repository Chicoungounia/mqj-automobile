import { TestBed } from '@angular/core/testing';

import { HttpUtilisateursService } from './http-utilisateurs.service';

describe('HttpUtilisateursService', () => {
  let service: HttpUtilisateursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpUtilisateursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
