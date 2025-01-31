import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  implements OnInit{
  scenarios: any[] = [];
  statistiques: any = {};
  constructor(private scenarioService: AdminService,
     
  ) {}

  ngOnInit(): void {
    this.scenarioService.getScenarios().subscribe(
      (data) => {
        this.scenarios = data;
      },
      (error) => {
        console.error('Error fetching scenarios:', error);
      }
    );
    this.getStatistiques();
  }
  deleteScenario(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce scénario ?')) {
      this.scenarioService.deleteScenario(id).subscribe(
        response => {
          console.log('Scénario supprimé avec succès', response);
          // Supprimer le scénario localement
          this.scenarios = this.scenarios.filter(scenario => scenario.id !== id);
        },
        error => {
          console.error('Erreur lors de la suppression du scénario', error);
        }
      );
    }
  }

  getStatistiques(): void {
    this.scenarioService.getStatistiques().subscribe(
      data => {
        this.statistiques = data;
      },
      error => {
        console.error('Erreur lors de la récupération des statistiques:', error);
      }
    );
  }
 
  
}
