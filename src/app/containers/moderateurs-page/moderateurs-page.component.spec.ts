import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModerateursPageComponent } from './moderateurs-page.component';
import { ModerateurService } from '../../services';
import { ComponentsModule } from '../../components';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LoadingModule } from 'ngx-loading';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MomentModule } from 'angular2-moment';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PipesModule } from '../../pipes';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { inject } from '@angular/core/testing';

class MockModerateurService {
  public moderateurs = {
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

  getModerateurs() {
    return Promise.resolve(this.moderateurs);
  }
}


describe('ModerateursPageComponent', () => {
  let component: ModerateursPageComponent;
  let fixture;

  beforeEach(async(() => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );

    TestBed.configureTestingModule({
      declarations: [ModerateursPageComponent],
      imports: [
        LoadingModule,
        FormsModule,
        HttpModule,
        MomentModule,
        NoopAnimationsModule,
        BrowserAnimationsModule,
        PipesModule,
        NgxChartsModule,
        ComponentsModule,
        LoadingModule,
        ReactiveFormsModule
      ],
      providers: [{ provide: ModerateurService, useClass: MockModerateurService }]
    })
      .compileComponents();
  }));

  fixture = TestBed.createComponent(ModerateursPageComponent);
  fixture.detectChanges();

  beforeEach(() => {
    fixture = TestBed.createComponent(ModerateursPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));


  fit('Should get list of users', async(inject([], () => {
    fixture.componentInstance.getModerateurs();
    fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        return fixture.whenStable();
      })
      .then(() => {
        console.log(fixture);
        const compiled = fixture.debugElement.nativeElement;
      });
  })));

});
