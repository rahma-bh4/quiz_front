import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent implements OnInit {
  user:any;
  constructor(private quizService:QuizService) {}
quiz_id=Number(localStorage.getItem('quiz_id'))
  ngOnInit() {
    const backdrops = document.querySelectorAll('.modal-backdrop');
  backdrops.forEach((backdrop) => backdrop.remove());

  // Assurez-vous que le body est scrollable
  document.body.style.overflow = 'auto';
  document.body.classList.remove('modal-open');
  this.getResult();
  

}
getResult(){
  if(this.quiz_id){
    this.quizService.getresult(this.quiz_id).subscribe(
      (data)=>{

        this.user=data;
        console.log('Données reçues du backend:', data);
      }
    );
  }
  
}
}
