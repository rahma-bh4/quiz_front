import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {

  form!:FormGroup;
  nom: string = '';
  email: string = '';
  
constructor(
    private http:HttpClient,
    private  router:Router,
    private formBuilder:FormBuilder,
    private modalService: NgbModal,
  ){

  }
  ngOnInit(): void {
this.form=this.formBuilder.group({
    nom:['',[Validators.required]],
    email:['',[Validators.required]]
  });
  }

  closeModal() {
    this.modalService.dismissAll(); // Ferme tous les modals
  }


  onsubmit() {
    this.http.post<any>("http://localhost:8000/api/quiz",this.form.getRawValue())
    .subscribe(res=>{
     
    localStorage.setItem('quiz_id', res.quiz_id);
    
     this.router.navigate(['/quiz'])
    }
   
   );
 
 }
}
