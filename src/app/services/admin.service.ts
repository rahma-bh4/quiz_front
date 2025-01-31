import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:8000/api/add_scenario'; 
  //  // Remplacez par l'URL de votre API Django
  private apilist='http://localhost:8000/api/scenario_list'
private api='http://localhost:8000/api'
private apistat='http://localhost:8000/api/stat'
  constructor(private http: HttpClient) { }

  addScenario(scenario: any): Observable<any> {
    return this.http.post(this.apiUrl, scenario);
  }

  getScenarios(): Observable<any> {
    return this.http.get<any>(this.apilist);
  }

    deleteScenario(id: number): Observable<any> {
      return this.http.delete(`${this.api}/scenario/${id}/delete/`);
    }

    updateScenario(id: number, data: any): Observable<any> {
      return this.http.put(`${this.api}/scenarios/${id}/update/`, data);
    }
    getScenario(id: number): Observable<any> {
      return this.http.get(`${this.api}/scenarios/${id}/`);
    }
    getStatistiques(): Observable<any> {
      return this.http.get<any>(this.apistat);
    }
    
}
