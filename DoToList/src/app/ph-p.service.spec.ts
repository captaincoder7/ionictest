import { TestBed } from '@angular/core/testing';

import { PhPService } from './ph-p.service';

describe('PhPService', () => {
  let service: PhPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



 


});
