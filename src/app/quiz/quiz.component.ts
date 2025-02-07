import { AfterViewInit, Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Dropdown } from 'bootstrap';
import * as bootstrap from 'bootstrap';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit,AfterViewInit{
  scenario: any|null; // Scénario actuel
  userAnswer: boolean | null = null; // Réponse de l'utilisateur
  feedbackMessage: string | null = null;
  is_email:boolean|null=null;
  is_image:boolean|null=null;
  hide:boolean=false;
  first:boolean=true;
  current_date:any;
  quiz_id=Number(localStorage.getItem('quiz_id'));
  constructor(private quizService: QuizService,private cdr: ChangeDetectorRef,private router: Router) {}

  ngOnInit() {
    const backdrops = document.querySelectorAll('.modal-backdrop');
  backdrops.forEach((backdrop) => backdrop.remove());

  // Assurez-vous que le body est scrollable
  document.body.style.overflow = 'auto';
  document.body.classList.remove('modal-open');
  if(this.first){ 
    this.loadScenario();
   this.first=false;
  }
  else{
    this.router.navigate(['/accueil']);
  }
 this.current_date=new Date();

    // Charger le premier scénario
  }

  loadScenario(): void {
    this.quizService.getScenario(this.quiz_id).subscribe(
      (data) => {
        console.log('Données reçues du backend:', data);
        this.scenario = data;
        this.feedbackMessage = null; 
        localStorage.setItem('scenario_id', String(this.scenario.id));
        // Réinitialiser le message de feedback
  
        // Gestion des types
        if (this.scenario && this.scenario.type === 'email') {
          this.is_email = true;
        } else if (this.scenario && this.scenario.type === 'image') {
          this.is_image = true;
        }
      },
      (error) => {
        console.error('Erreur lors du chargement du scénario', error);
        this.router.navigate(['/accueil']);
      }
    );
  }
  
  
phishing_reponse()
{
  this.userAnswer=true;
  this.submitAnswer(this.userAnswer);
}
legitime_reponse()
{
  this.userAnswer=false;
  this.submitAnswer(this.userAnswer);
}
submitAnswer(answer: boolean): void {
  
  if (this.scenario && this.scenario.id) {
    const payload = { scenario_id: this.scenario.id, user_answer: answer, quiz_id: this.quiz_id }; // Assuming quiz_id is 1 for now
    this.quizService.submitAnswer(payload).subscribe(
      (response) => {
        this.feedbackMessage = response.message;
        this.hide=true; 
        this.first=false;
        // Message de retour
       
      },
      (error) => console.error('Erreur lors de la soumission de la réponse', error)
    );
  }
}
loadNextScenario(): void {
  this.feedbackMessage = null;
  // Effacer le message précédent
  const scenario_id = Number(localStorage.getItem('scenario_id')); // Récupérer l'ID du scénario actuel

  if (!scenario_id) {
    console.error('ID du scénario manquant dans localStorage');
    this.router.navigate(['/accueil']);
    return;
  }

  this.quizService.getNextScenario(scenario_id,this.quiz_id).subscribe(
    (response) => {
     
      this.scenario = response.data || response.scenario || response;
      console.log('Scénario suivant:', this.scenario);
      this.is_email = false;
      this.is_image = false;
      console.log('Valeur et type de this.scenario:', this.scenario, typeof this.scenario);
      this.current_date=new Date();
      if (
        this.scenario === null || 
        this.scenario === undefined || 
        (typeof this.scenario === 'object' && !this.scenario.id)
      )  {
        console.log('Scénario est null, undefined, ou un objet vide. Redirection.');
        this.router.navigate(['/result']);
        return;
      }else{
      console.log('first',this.first);
      this.hide=false // Mettre à jour le scénario actuel
     // this.cdr.detectChanges();
      // Mettre à jour localStorage
      localStorage.setItem('scenario_id', String(this.scenario.id));

      // Réinitialiser le type de scénario
      if (this.scenario && this.scenario.type === 'email') {
        this.is_email = true;
        console.log('type:', this.scenario?.type);
      } else if (this.scenario && this.scenario.type === 'image') {
        this.is_image = true;
      }
      this.cdr.detectChanges();
      console.log('Type:', this.scenario.type);}
    },
    (error) => {
      console.error('Erreur lors du chargement du scénario suivant', error);
      this.router.navigate(['/result']);
    }
  );
}
myFunction(event: Event): void {
  event.preventDefault(); // Empêche la redirection
  console.log('Lien cliqué sans redirection');
}

ngAfterViewInit() {
  document.querySelectorAll('.dropdown-toggle').forEach(dropdownToggle => {
    new bootstrap.Dropdown(dropdownToggle);
  });
}

}