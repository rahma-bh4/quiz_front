import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrl: './scenario.component.css'
})
export class ScenarioComponent {
  id: number;
  is_email:boolean|null=null;
  is_image:boolean|null=null;
  is_phishing:boolean|null=null;
  scenario:any;
   constructor(
      private scenarioService: AdminService,
      private route: ActivatedRoute,
      private router: Router
    ) {
      this.id = this.route.snapshot.params['id'];
    }
    ngOnInit(): void {
      this.loadScenario(this.id);
      console.log(this.is_image);
      console.log(this.is_email);
    }
    loadScenario(id:number):void{
      this.scenarioService.getScenario(id).subscribe(
        data => {
          console.log('Données reçues du backend:', data);
          this.scenario = data;
          if (this.scenario.type === 'email') {
            this.is_email = true;
            this.is_image = false; // Assurez-vous que l'autre variable est bien définie
          } else if (this.scenario.type === 'image') {
            this.is_image = true;
            this.is_email = false; // Assurez-vous que l'autre variable est bien définie
          }
    
        },
        error => {
          console.error('Erreur lors du chargement du scénario', error);
        }
      );
    }
    myFunction(event: Event): void {
      event.preventDefault(); // Empêche la redirection
      console.log('Lien cliqué sans redirection');
    }

}
