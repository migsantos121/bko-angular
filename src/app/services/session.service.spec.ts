import { SessionService } from './session.service';
import { inject } from '@angular/core/testing';
import { Http, XHRBackend, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockConnection, MockBackend } from '@angular/http/testing';
import { TestBed } from '@angular/core/testing';
import { async } from '@angular/core/testing';
import { User } from '../models/user';
describe('SessionService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        SessionService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });

  });

  fit('can instantiate service when inject service',
    inject([SessionService], (service: SessionService) => {
      expect(service instanceof SessionService).toBe(true);
    }));

  fit('can instantiate service with "new"', inject([Http], (http: Http) => {
    expect(http).not.toBeNull('http should be provided');
    const service = new SessionService(http);
    expect(service instanceof SessionService).toBe(true, 'new service should be ok');
  }));


  fit('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
    }));

  describe('when logging in a user', () => {
    let backend: MockBackend;
    let service: SessionService;
    let fakeLoginResponse: Object;
    let fakeLogin: Object;
    let response: Response;
    const jwtDecode = require('jwt-decode');

    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
      backend = be;
      service = new SessionService(http);
      fakeLogin = {
        'username': 'admin',
        'password': 'massilia'
      };
      fakeLoginResponse = {
        // tslint:disable-next-line:max-line-length
        'auth_token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoxLCJpc3MiOiJiby1zZXJ2aWNlcy5jb2luYWZyaXF1ZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE1MTk5MjI1MDgsImlhdCI6MTUxOTgzNjEwOH0.Z_3IHHq85oXGcBfhZspcnZeUiAFqj43Fq6_lB5SCV3U',
        'message': 'Successfully logged in.',
        'status': 'success'
      };
      const options = new ResponseOptions({ status: 200, body: { data: fakeLoginResponse } });
      response = new Response(options);
    }));

    fit('should have expected a jwt token', async(inject([], () => {
      backend.connections
        .subscribe((c: MockConnection) => c.mockRespond(response));

      service.postOauth(fakeLogin).toPromise()
        .then(user_data => {
          const parsedToken = jwtDecode(user_data['data']['auth_token']);
          expect(user_data['data']['status']).toEqual('success');
          expect(parsedToken.hasOwnProperty('role')).toBeTruthy('the decoded token should contain the role of the user');
          expect(parsedToken.hasOwnProperty('username')).toBeTruthy('the decoded token should contain the username of the user');
        });
    })));
  });

  describe('when logging out a user', () => {
    let backend: MockBackend;
    let service: SessionService;

    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
      backend = be;
      service = new SessionService(http);
    }));

    fit('should have expected localstorage to be empty', async(inject([], () => {
      localStorage.clear();
      expect(localStorage.getItem('bo::token')).toBeNull('should have expected no. of heroes');
    })));
  });

});
