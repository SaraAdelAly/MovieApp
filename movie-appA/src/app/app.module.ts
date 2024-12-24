import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AppRoutingModule, routes } from './app.routes'; 
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { RegisterComponent } from './register/register.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { SearchOmdbComponent } from './search-omdb/search-omdb.component';

@NgModule({
  declarations: [
   
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RegisterComponent,
    FormsModule, 
    AppRoutingModule, 
    AppComponent,
    HomeComponent,
    LoginComponent,
    HttpClientModule,
    UserDashboardComponent,
    AdminDashboardComponent,
    MovieDetailComponent,
    SearchOmdbComponent,
    RouterModule,
    AddMovieComponent,
    MovieListComponent,
    RouterModule.forRoot(routes), 
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}


