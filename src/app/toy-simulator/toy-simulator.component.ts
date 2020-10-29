import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { Position } from '../position.model';

/**
 * Logic:
 * Considering a 2d plane of x and y, I defined easch hop as 1 number in an array
 * commonService: used to add/retreive the location of robot changePosition, getCurrentPosition, getPositions
 * an Subjectbehavior Observable is created on the service end to add value in the stream of observable and retreive it easly
 * In this approch I dont have to constantly care abput the currentLocation of the data because I subscribe it on the init of my app
 * place: simply places the robot
 * move: moves the robot each unit x, y direction
 * report: gives the report for the same and I have also bind the form back so that we always have the values there.
 */


@Component({
  selector: 'app-toy-simulator',
  templateUrl: './toy-simulator.component.html',
  styleUrls: ['./toy-simulator.component.css']
})
export class ToySimulatorComponent implements OnInit {

  form: FormGroup;
  currentLocation: Position;

  x = [0, 1, 2, 3, 4];
  y = [0, 1, 2, 3, 4];
  direction = ['North', 'East', 'South', 'West'];
  unsubscriber$: any;

  constructor(private fb: FormBuilder, private commonService: CommonService) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      x: [0, Validators.required],
      y: [0, Validators.required],
      direction: ['North', Validators.required] // face
    });

    // on init call the initial status of the Robot
    this.commonService.getCurrentPositions().subscribe(res => {
      this.currentLocation = res;
    });
  }

  // place robot
  onSubmit(e): void {
    // console.log(e);
    this.commonService.changePosition(e);
  }

  // move robot
  move(): void {
    const position: Position = this.currentLocation;
    if (this.board(position)) {
      switch (position.direction) {
        case 'North':
          if (position.y < 4) {
            position.y += 1;
            this.currentLocation = position;
            this.form.patchValue(position);
            this.report();
          } else { alert('Reached the End of the table'); }
          break;

        case 'South':
          if (position.y <= 4 && position.y > 0) {
            position.y -= 1;
            this.currentLocation = position;
            this.form.patchValue(position);
            this.report();
          } else { alert('Reached the End of the table'); }
          break;

        case 'East':
          if (position.x < 4) {
            position.x += 1;
            this.currentLocation = position;
            this.form.patchValue(position);
            this.report();
          } else { alert('Reached the End of the table'); }
          break;

        case 'West':
          if (position.x <= 4 && position.x > 0) {
            position.x -= 1;
            this.currentLocation = position;
            this.form.patchValue(position);
            this.report();
          } else { alert('Reached the End of the table'); }
          break;
        default:
          alert('Reached the End of the table');
          break;
      }
    }
  }

  // report current status
  report(): void {
    this.commonService.getCurrentPositions().subscribe(res => {
      // console.log('report', res);
      this.currentLocation = res;
    });
  }

  // report history
  reportHistory(): Array<Position> {
    return this.commonService.getPositions();
  }

  // check for is Board
  board(direction: Position): boolean {

    const dir = ['North', 'West', 'East', 'South'];

    if (!dir.includes(direction.direction) || direction.x < 0 || direction.x > 4 || direction.y < 0 || direction.y > 4) {
      return false;
    }
    return true;
  }

  // turn Robot to left
  left(): void {

    // console.log(this.currentLocation.direction);
    if (this.board(this.currentLocation)) {
      let direction;
      if (this.currentLocation.direction == 'North') {
        direction = 'West';
      } else if (this.currentLocation.direction == 'West') {
        direction = 'South'
      } else if (this.currentLocation.direction == 'South') {
        direction = 'East';
      } else if (this.currentLocation.direction == 'East') {
        direction = 'North';
      }
      this.currentLocation.direction = direction;
    } else {
      console.log('Mr Roboto has left the board');
    }
    this.form.patchValue(this.currentLocation);
    this.report();
  }

  // turn Robot to left
  right(): void {

    // console.log(this.currentLocation.direction);
    if (this.board(this.currentLocation)) {
      let direction;
      if (this.currentLocation.direction == 'North') {
        direction = 'East';
      } else if (this.currentLocation.direction == 'West') {
        direction = 'North'
      } else if (this.currentLocation.direction == 'South') {
        direction = 'West';
      } else if (this.currentLocation.direction == 'East') {
        direction = 'South';
      }
      this.currentLocation.direction = direction;

    } else {
      console.log('Mr Roboto has left the board');
    }
    this.form.patchValue(this.currentLocation);
    this.report();
  }
}
