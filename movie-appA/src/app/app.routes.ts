import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { userGuardGuard } from './user-guard.guard';
import { adminGuardGuard } from './admin-guard.guard';
import { FormsModule } from '@angular/forms'; 
import { LoginComponent } from './login/login.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { RegisterComponent } from './register/register.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { SearchOmdbComponent } from './search-omdb/search-omdb.component';


export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    {path: 'register', component: RegisterComponent},
    {path: 'admin-login', component: AdminLoginComponent},
    {path: 'add-movie', component:AddMovieComponent},
    { path: 'movie-details/:id', component: MovieDetailComponent },
    {path: 'search-omdb', component:SearchOmdbComponent},
    { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [userGuardGuard] },
    { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [adminGuardGuard] },
    { path: '', redirectTo: '/homw', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' }, 
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }