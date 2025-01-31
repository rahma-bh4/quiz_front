import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddScenarioComponent } from './add-scenario/add-scenario.component';
import { ScenarioUpdateComponent } from './scenario-update/scenario-update.component';
import { StatComponent } from './stat/stat.component';
import { ScenarioComponent } from './scenario/scenario.component';



const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'accueil',component: AccueilComponent},
  {path:'quiz',component: QuizComponent},
  {path:'result',component: ResultComponent},
  {path:'dashboard',component: DashboardComponent},
  {path:'add-scenario',component:AddScenarioComponent},
  { path: 'update-scenario/:id', component: ScenarioUpdateComponent },
  {path:'stat',component:StatComponent},
  {path:'view-scenario/:id',component:ScenarioComponent},
  {path:'',component: AccueilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
