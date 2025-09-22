import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RDProject, Innovations, Experiment, RDMetrics } from '../models/rd.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RDService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProjects(): Observable<RDProject[]> {
    return this.http.get<RDProject[]>(`${this.API_URL}/rd/projects`);
  }

  getInnovations(): Observable<Innovations> {
    return this.http.get<Innovations>(`${this.API_URL}/rd/innovations`);
  }

  getExperiments(): Observable<Experiment[]> {
    return this.http.get<Experiment[]>(`${this.API_URL}/rd/experiments`);
  }

  getMetrics(): Observable<RDMetrics> {
    return this.http.get<RDMetrics>(`${this.API_URL}/rd/metrics`);
  }
}
