import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';

import { CreatePostComponent } from './create-post/create-post.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { AdminHeaderComponent } from './shared/components/admin-header/admin-header.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './shared/components/admin/admin.component';
import { AuthService } from './shared/services/auth.service';
import { AuthGuard } from './shared/services/auth.guard';
import { SearchPipe } from './shared/search.pipe';

@NgModule({
  declarations: [
    LoginComponent,
    AdminComponent,
    DashboardComponent,
    CreatePostComponent,
    AdminHeaderComponent,
    SearchPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent,
        children: [
          { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
          { path: 'login', component: LoginComponent },
          {
            path: 'dashboard',
            component: DashboardComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'createPost',
            component: CreatePostComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'editPost/:id/edit',
            component: EditPostComponent,
            canActivate: [AuthGuard],
          },
        ],
      },
    ]),
  ],
  exports: [],
  providers: [AuthService, AuthGuard],
})
export class AdminModule {}
