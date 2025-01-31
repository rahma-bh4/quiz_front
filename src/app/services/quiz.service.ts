import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  data2:any;
  data:any;
  private apiUrl = 'http://127.0.0.1:8000/api/scenario';
  private apiUrl2 = 'http://127.0.0.1:8000/api/next';
  private apiUrlRes='http://127.0.0.1:8000/api/result' // URL du backend

  constructor(private http: HttpClient) {}

  // Obtenir un scénario
  getScenario(quiz: number): Observable<any> {
    const params = { quiz_id: quiz }; // Les paramètres de requête
    return this.http.get(this.apiUrl, { params });
  }

  // Soumettre une réponse
  submitAnswer(data: { scenario_id: number; user_answer: boolean; quiz_id:number }): Observable<any> {
    return this.http.post(this.apiUrl, data); // Le backend renvoie le scénario suivant
  }
  getNextScenario(scenario: number,quiz:number): Observable<any> {
    this.data2={scenario_id:scenario,quiz_id:quiz};
    return this.http.post(this.apiUrl2, this.data2);  // Envoyer scenario_id dans le corps de la requête
  }
  getresult(quiz_id: number): Observable<any> {
    return this.http.post(this.apiUrlRes, { quiz_id }); // Envoyer `quiz_id` dans le corps de la requête
  }
}
