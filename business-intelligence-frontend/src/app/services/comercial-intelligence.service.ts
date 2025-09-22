import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComercialDashboard, Report, Analytics } from '../models/comercial-intelligence.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComercialIntelligenceService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDashboard(): Observable<ComercialDashboard> {
    return this.http.get<ComercialDashboard>(`${this.API_URL}/comercialintelligence/dashboard`);
  }

  getReports(): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.API_URL}/comercialintelligence/reports`);
  }

  getAnalytics(): Observable<Analytics> {
    return this.http.get<Analytics>(`${this.API_URL}/comercialintelligence/analytics`);
  }
}
