import { ModerateurService } from './moderateur.service';
import { inject } from '@angular/core/testing';
import { Http, XHRBackend, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockConnection, MockBackend } from '@angular/http/testing';
import { TestBed } from '@angular/core/testing';
import { async } from '@angular/core/testing';
import { User } from '../models/user';
describe('ModerateurService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ModerateurService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });

  });

  fit('can instantiate service when inject service',
    inject([ModerateurService], (service: ModerateurService) => {
      expect(service instanceof ModerateurService).toBe(true);
    }));

  fit('can instantiate service with "new"', inject([Http], (http: Http) => {
    expect(http).not.toBeNull('http should be provided');
    const service = new ModerateurService(http);
    expect(service instanceof ModerateurService).toBe(true, 'new service should be ok');
  }));


  fit('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
    }));

  describe('when getting users lists', () => {
    let backend: MockBackend;
    let service: ModerateurService;
    let fakeResponse: Object;
    let response: Response;
    const jwtDecode = require('jwt-decode');

    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
      backend = be;
      service = new ModerateurService(http);
      fakeResponse = {
        'data': [
          {
            'created_on': '2018-03-07T11:15:37',
            'firstname': null,
            'lastname': null,
            'role': 'admin',
            'user_id': 1,
            'username': 'nmtsylla'
          },
          {
            'created_on': '2018-03-07T11:15:48',
            'firstname': null,
            'lastname': null,
            'role': 'moderator',
            'user_id': 2,
            'username': 'sylla'
          }
        ],
        'message': 'User list.',
        'status': 'success'
      };
      const options = new ResponseOptions({ status: 200, body: { data: fakeResponse } });
      response = new Response(options);
    }));

    fit('should have an object with main key data and an array of object or empty', async(inject([], () => {
      backend.connections
        .subscribe((c: MockConnection) => c.mockRespond(response));
      const user = {
        'created_on': '2018-03-07T11:15:37',
        'firstname': null,
        'lastname': null,
        'role': 'admin',
        'user_id': 1,
        'username': 'nmtsylla'
      };
      service.getModerateurs().toPromise()
        .then(data => {
          expect(data.hasOwnProperty('data')).toBeTruthy();
          expect(data.data['data']).toContain(user);
          expect(data.data.hasOwnProperty('status')).toBeTruthy();
        });
    })));
  });

  describe('when retrieving a user', () => {
    let backend: MockBackend;
    let service: ModerateurService;
    let fakeResponse: Object;
    let response: Response;
    const jwtDecode = require('jwt-decode');

    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
      backend = be;
      service = new ModerateurService(http);
      fakeResponse = {
        'data': {
          'created_on': '2018-03-07T11:15:37',
          'firstname': null,
          'lastname': null,
          'role': 'admin',
          'user_id': 1,
          'username': 'nmtsylla'
        },
        'status': 'success'
      };
      const options = new ResponseOptions({ status: 200, body: { data: fakeResponse } });
      response = new Response(options);
    }));

    fit('should have an object with 2 fields: data & status', async(inject([], () => {
      backend.connections
        .subscribe((c: MockConnection) => c.mockRespond(response));
      const user = {
        'created_on': '2018-03-07T11:15:37',
        'firstname': null,
        'lastname': null,
        'role': 'admin',
        'user_id': 1,
        'username': 'nmtsylla'
      };
      service.getModerateur(user).toPromise()
        .then(data => {
          expect(data.hasOwnProperty('data')).toBeTruthy();
          expect(data.data.hasOwnProperty('status')).toBeTruthy();
        });
    })));
  });

  describe('when updating a user', () => {
    let backend: MockBackend;
    let service: ModerateurService;
    let fakeResponse: Object;
    let response: Response;
    const jwtDecode = require('jwt-decode');

    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
      backend = be;
      service = new ModerateurService(http);
      fakeResponse = {
        'data': {
          'user_id': 1,
          'firstname': 'Massamba',
          'lastname': 'Samb'
        },
        'status': 'success'
      };
      const options = new ResponseOptions({ status: 200, body: { data: fakeResponse } });
      response = new Response(options);
    }));

    fit('should have an object with 2 fields: data & status', async(inject([], () => {
      backend.connections
        .subscribe((c: MockConnection) => c.mockRespond(response));
      const user = {
        'firstname': 'Massamba',
        'lastname': 'Samb'
      };
      service.updateModerateur(user).toPromise()
        .then(data => {
          expect(data.hasOwnProperty('data')).toBeTruthy();
          expect(data.data.hasOwnProperty('status')).toBeTruthy();
        });
    })));
  });

  describe('Create a user', () => {
    let backend: MockBackend;
    let service: ModerateurService;
    let fakeResponse: Object;
    let response: Response;
    const jwtDecode = require('jwt-decode');

    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
      backend = be;
      service = new ModerateurService(http);
      fakeResponse = {
        'data': {
          'user_id': 1,
          'firstname': 'Massamba',
          'lastname': 'Samb',
          'role': 'admin',
          'username': 'massamba'
        },
        'status': 'success'
      };
      const options = new ResponseOptions({ status: 200, body: { data: fakeResponse } });
      response = new Response(options);
    }));

    fit('should have a User object all fields set unless user_id', async(inject([], () => {
      backend.connections
        .subscribe((c: MockConnection) => c.mockRespond(response));
      const user = {
        'firstname': 'Massamba',
        'lastname': 'Samb',
        'role': 'admin',
        'username': 'massamba'
      };
      service.createModerateur(user).toPromise()
        .then(data => {
          expect(data.hasOwnProperty('data')).toBeTruthy('the response should include a data object');
          expect(data.data.hasOwnProperty('status')).toBeTruthy('the response should include a status attribute');
        });
    })));
  });

  describe('deleting a user', () => {
    let backend: MockBackend;
    let service: ModerateurService;
    let fakeResponse: Object;
    let response: Response;
    const jwtDecode = require('jwt-decode');

    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
      backend = be;
      service = new ModerateurService(http);
      fakeResponse = {
        'status': 'success',
        'message': 'User successfully deleted.'
      };
      const options = new ResponseOptions({ status: 200, body: { data: fakeResponse } });
      response = new Response(options);
    }));

    fit('should be given an object with at least user_id set', async(inject([], () => {
      backend.connections
        .subscribe((c: MockConnection) => c.mockRespond(response));
      const user = {
        'user_id': 1,
      };
      service.deleteModerateur(user).toPromise()
        .then(data => {
          expect(data.hasOwnProperty('data')).toBeTruthy('the response should include a data object');
          expect(data.data.hasOwnProperty('status')).toBeTruthy('the response should include a status attribute');
          expect(data['data']['status']).toEqual('success');
        });
    })));
  });


});
