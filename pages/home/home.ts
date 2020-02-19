import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  
  inputValue = "";
  matrix = [["a", "b", "c"], ["a", "e", "f"], ["g", "h", "i"]];
  positions = [
    "left",
    "rigth",
    "top",
    "bottom",
    "leftTop",
    "leftBottom",
    "rigthTop",
    "rigthBottom"
  ];
  firstLetterPosition: Array<{ i: number; j: number }> = [];
  minIValue: number = 0;
  minJValue: number = 0;
  maxIValue: number;
  maxJValue: number;

  constructor(public navCtrl: NavController) {}

  checkIfExist() {
    let splitedInputValue: Array<string> = this.inputValue.split("");
    this.maxIValue = this.matrix.length;
    this.maxJValue = this.matrix[this.matrix.length - 1].length;
    console.log(`maxIValue ${this.maxIValue} - maxJValue ${this.maxJValue}`);
    console.log(splitedInputValue);
    if (splitedInputValue.length > 0) {
      this.findFirstLetter(splitedInputValue[0]);
      console.log("aux", this.firstLetterPosition);
      if (splitedInputValue.length > 1) {
        // searching for the actual word
        this.firstLetterPosition.forEach(data => {
          let secondPosition = [];

          this.positions.forEach(p => {
            let x = this.positionNextLetter(data.i, data.j, p);
            console.log('x',x)
            if (x && (splitedInputValue[1] === this.matrix[x.i][x.j])) {
              x.letter = splitedInputValue[1];
              secondPosition.push(x);
            }
          });

          console.log("seconPosition", secondPosition);
        });
      }
    } else {
      this.firstLetterPosition = [];
    }
  }

  findFirstLetter(letter: string): void {
    this.matrix.forEach((itemI, i) => {
      this.matrix[i].forEach((itemJ, j) => {
        if (letter === this.matrix[i][j]) {
          this.firstLetterPosition.push({ i, j });
          console.log(this.firstLetterPosition);
          console.log(`i ${i} - j ${j}`);
        }
      });
    });
  }

  positionNextLetter(
    i: number,
    j: number,
    direction: string
  ): { i: number; j: number; direction: string; letter: string } {
    switch (direction) {
      case "left": {
        if (j-- >= this.minJValue) {
          return { i, j: j--, direction, letter: "" };
        } else {
          return null;
        }
      }
      case "rigth": {
        if (j++ <= this.maxJValue) {
          return { i, j: j++, direction, letter: "" };
        } else {
          return null;
        }
      }
      case "top": {
        if (i-- >= this.minIValue) {
          return { i: i--, j, direction, letter: "" };
        } else {
          return null;
        }
      }
      case "bottom": {
        if (i++ <= this.maxIValue) {
          return { i: i++, j, direction, letter: "" };
        } else {
          return null;
        }
      }
      case "leftTop": {
        if (i-- >= this.minIValue && j-- >= this.minJValue) {
          return { i: i--, j: j--, direction, letter: "" };
        } else {
          return null;
        }
      }
      case "leftBottom": {
        if (i++ <= this.maxIValue && j-- >= this.minJValue) {
          return { i: i++, j: j--, direction, letter: "" };
        } else {
          return null;
        }
      }
      case "rigthTop": {
        if (i-- >= this.minIValue && j++ <= this.maxJValue) {
          return { i: i--, j: j++, direction, letter: "" };
        } else {
          return null;
        }
      }
      case "rigthBottom": {
        if (i++ <= this.maxIValue && j++ <= this.maxJValue) {
          return { i: i++, j: j++, direction, letter: "" };
        } else {
          return null;
        }
      }
    }
  }
}
