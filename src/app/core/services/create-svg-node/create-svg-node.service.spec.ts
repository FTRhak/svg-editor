import { TestBed } from '@angular/core/testing';

import { CreateSvgNodeService } from './create-svg-node.service';

describe('CreateSvgNodeService', () => {
  let service: CreateSvgNodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateSvgNodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
