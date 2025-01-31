import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-add-scenario',
  templateUrl: './add-scenario.component.html',
  styleUrl: './add-scenario.component.css'
})
export class AddScenarioComponent {
  scenarioForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private scenarioService: AdminService,private router:Router) {
    this.scenarioForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      sender: [''],
      sender_mail: [''],
      footer: [''],
      button: [''],
      url: [''],
      objet: [''],
      mail_body: [''],
      image: [null],
      reponse: ['', Validators.required],
      explication: ['', Validators.required]
    });
  }

  onTypeChange(event: Event): void {
    const selectedType = (event.target as HTMLSelectElement).value;

    // Reset non-relevant fields when type changes
    if (selectedType === 'image') {
      this.scenarioForm.patchValue({
        sender: '',
        sender_mail: '',
        footer: '',
        button: '',
        url: '',
        objet: '',
        mail_body: '',
        image: null
      });
    }
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    this.selectedFile = file;
    this.scenarioForm.patchValue({ image: file });
  }

  onSubmit(): void {
    if (this.scenarioForm.valid) {
      const formData = new FormData();
  
      // Parcours des champs du formulaire et ajout au FormData
      Object.keys(this.scenarioForm.controls).forEach((key) => {
        const value = this.scenarioForm.get(key)?.value;
  
        if (key === 'image' && this.selectedFile) {
          formData.append(key, this.selectedFile, this.selectedFile.name);
        } else if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });
  
      console.log('Données envoyées :', Array.from((formData as any).entries()));
  
      // Envoi des données au backend
      this.scenarioService.addScenario(formData).subscribe(
        (response) => {
          console.log('Scenario ajouté avec succès!', response);
          alert('Scenario ajouté avec succès!');
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du scénario', error);
          alert('Erreur lors de l\'ajout du scénario');
        }
      );
    } else {
      alert('Le formulaire est invalide !');
    }
  }
  
}

