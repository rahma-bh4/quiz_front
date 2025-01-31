import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-scenario-update',
  templateUrl: './scenario-update.component.html',
  styleUrl: './scenario-update.component.css'
})
export class ScenarioUpdateComponent implements OnInit {
  scenario: any = {
    titre: '',
    description: '',
    type: 'email',
    sender: '',
    sender_mail: '',
    reponse: false,
    explication: '',
  };
  id: number;
  constructor(
    private scenarioService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadScenario();
  }
  onSubmit() {
    const formData = new FormData();
    for (const key in this.scenario) {
      if (this.scenario[key] !== null && this.scenario[key] !== undefined) {
        formData.append(key, this.scenario[key]);
      }
    }

    this.scenarioService.updateScenario(this.id, formData).subscribe({
      next: (response) => {
        console.log('Scénario modifié avec succès', response);
        this.router.navigate(['/dashboard']); // Redirige après modification
      },
      error: (error) => {
        console.error('Erreur lors de la modification', error);
      },
    });
  }
  loadScenario() {
    this.scenarioService.getScenario(this.id).subscribe({
      next: (response) => {
        this.scenario = response; // Charge les données dans le formulaire
      },
      error: (error) => {
        console.error('Erreur lors du chargement du scénario', error);
      },
    });
  }
  onTypeChange() {
    if (this.scenario.type === 'image') {
      // Si type est "image", réinitialisez les champs spécifiques à "email"
      this.scenario.sender = '';
      this.scenario.sender_mail = '';
      this.scenario.footer = '';
      this.scenario.button = '';
      this.scenario.url = '';
      this.scenario.objet = '';
      this.scenario.mail_body = '';
    } else if (this.scenario.type === 'email') {
      // Si type est "email", réinitialisez le champ image
      this.scenario.image = null;
    }
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.scenario.image = file;
    }
  }

}
