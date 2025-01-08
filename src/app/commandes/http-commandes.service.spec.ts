import { TestBed } from '@angular/core/testing';

import { HttpCommandesService } from './http-commandes.service';

describe('HttpCommandesService', () => {
  let service: HttpCommandesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpCommandesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
