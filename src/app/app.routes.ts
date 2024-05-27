import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialControlComponent } from '../components/financial-control/financial-control.component';

export const routes: Routes = [
  { path: '', component: FinancialControlComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
