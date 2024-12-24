// import { TestBed } from '@angular/core/testing';
// import { CanActivateFn, Router } from '@angular/router';
// import { AuthGuard } from './auth.guard';
// import { AuthService } from '../app/services/auth.service';
// import { of } from 'rxjs';

// describe('authGuard', () => {
//   let authGuard: AuthGuard;
//   let authService: AuthService;
//   let router: Router;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         AuthGuard,
//         {
//           provide: AuthService,
//           useValue: {
//             isAuthenticated: jasmine.createSpy('isAuthenticated'),
//           }
//         },
//         {
//             provide: Router,
//             useValue: {
//                 navigate: jasmine.createSpy('navigate')
//             }
//         }
//       ]
//     });
//       authGuard = TestBed.inject(AuthGuard);
//       authService = TestBed.inject(AuthService);
//       router = TestBed.inject(Router);
//   });

//   it('should be created', () => {
//     expect(authGuard).toBeTruthy();
//   });

//     it('should allow access if user is authenticated', () => {
//         (authService.isAuthenticated as jasmine.Spy).and.returnValue(true);
//         const result = authGuard.canActivate();
//         expect(result).toBe(true);
//         expect(router.navigate).not.toHaveBeenCalled();
//     });

//     it('should redirect to login if user is not authenticated', () => {
//         (authService.isAuthenticated as jasmine.Spy).and.returnValue(false);
//         const result = authGuard.canActivate();
//         expect(result).toBe(false);
//         expect(router.navigate).toHaveBeenCalledWith(['/login']);
//     });
// });