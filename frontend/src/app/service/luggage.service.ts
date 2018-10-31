import { Luggage } from './../models/luggage';
import { AuthService } from './auth.service';
import { Configure } from './configure';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LuggageService {
  api = Configure.api();

  constructor(
    private http: HttpClient,
    // private auth: AuthService
  ) { }
  /**
   * will return all the luggages with pagination
   */
  getAll() {
    return this.http.get(`${this.api}/luggages`);
  }
  /**
   * will get spesific luggage
   * @param id luggageId
   */
  read(id: Number) {
    return this.http.get(`${this.api}/luggage/${id}`);
  }
  /**
   * will create luggage
   * @param data luggage data
   */
  create(data: Luggage) {
    return this.http.post(`${this.api}/luggages`, data);
  }
  /**
   * to update luggage
   * @param data luggage data
   */
  update(data: Luggage) {
    return this.http.post(`${this.api}/luggage/${data.id}`, data);
  }
  /**
   * to delete offfer
   * @param id id of the delete luggage
   */
  delete(id: Number) {
    return this.http.delete(`${this.api}/luggage/${id}`);
  }
  /**
   * http://localhost:8000/api/trips?page=2
   * @param url gets data with page
   */
  getWith(url) {
    return this.http.get(url);
  }

}