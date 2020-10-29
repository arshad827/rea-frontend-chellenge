import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToySimulatorComponent } from './toy-simulator/toy-simulator.component';

const routes: Routes = [
  { path: '', component: ToySimulatorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
