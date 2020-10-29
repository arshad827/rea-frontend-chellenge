import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { Position } from './position.model';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private position = new BehaviorSubject<Position>({ x: 0, y: 0, direction: 'North' });
  currentPosition = this.position.asObservable();
  data: Array<Position> = [];
  constructor() { }

  /**
   * For changing the position
   */
  changePosition(data: Position): void {
    this.data.push(data);
    this.position.next(data);
  }

  /**
   * For getting the position
   */
  getCurrentPositions(): Observable<any> {
    return this.currentPosition;
  }

  /**
   * For getting the positions
   */
  getPositions(): Array<Position> {
    return this.data;
  }
}
