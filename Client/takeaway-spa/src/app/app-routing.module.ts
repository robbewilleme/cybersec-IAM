import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './callback/callback.component'; // Create this component for callback handling
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'callback', component: CallbackComponent },
  // { path: '', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

