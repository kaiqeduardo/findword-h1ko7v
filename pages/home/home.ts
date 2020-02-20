import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  result: 
  Array<
  {
    word : Array<{ i: number; j: number; letter: string }>
    direction : string
  }> = [];

  inputValue = "";
  matrix = [
    ["a", "b", "c", "d", "e", "f"],
    ["g", "h", "c", "i", "j", "k"],
    ["l", "m", "n", "a", "o", "p"],
    ["q", "r", "s", "t", "s", "u"],
    ["v", "w", "x", "y", "z", "a"]
  ];
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
    this.result = [];
    this.firstLetterPosition = [];

    let splitedInputValue: Array<string> = this.inputValue.split("");
    this.maxIValue = this.matrix.length;
    this.maxJValue = this.matrix[this.matrix.length - 1].length;
    // console.log(`maxIValue ${this.maxIValue} - maxJValue ${this.maxJValue}`);
    // console.log(splitedInputValue);
    if (splitedInputValue.length > 0) {
      this.findFirstLetter(splitedInputValue[0]);
      // console.log("aux", this.firstLetterPosition);
      if (splitedInputValue.length > 1) {
        // searching for the actual word
        this.firstLetterPosition.forEach(data => {
          let secondPosition = [];
          this.positions.forEach(p => {
            let x = this.positionNextLetter(data.i, data.j, p);
            if (x && splitedInputValue[1] === this.matrix[x.i][x.j]) {
              x.letter = splitedInputValue[1];
              secondPosition.push(x);

              this.mountWord(data.i, data.j, splitedInputValue[0],p);
              this.mountWord(x.i, x.j, x.letter, x.direction);
            }
          });

          if (splitedInputValue.length > 2) {
            let copySecondPosition = Object.assign([], secondPosition);

            copySecondPosition.forEach(s => {
              let position: number = 2;
              let k = s;
              

              do {

                let x = this.positionNextLetter(k.i, k.j, s.direction);

                if (
                  x &&
                  splitedInputValue[position] === this.matrix[x.i][x.j]
                ) {
                  x.letter = splitedInputValue[position];

                  this.mountWord(x.i, x.j, x.letter,x.direction);

                  k = x;
                } else {
                  this.removeWord(s.direction);
                  break;
                }

                position++;
              } while (position < splitedInputValue.length);
            });
          }

          //console.log(" Result ", this.result);

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
          // console.log(this.firstLetterPosition);
          // console.log(`i ${i} - j ${j}`);
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
        if (j - 1 >= this.minJValue) {
          return { i, j: j - 1, direction, letter: "" };
        } else {
          return null;
        }
      }
      case "rigth": {
        if (j + 1 <= this.maxJValue) {
          return { i, j: j + 1, direction, letter: "" };
        } else {
          return null;
        }
      }
      case "top": {
        if (i - 1 >= this.minIValue) {
          return { i: i - 1, j, direction, letter: "" };
        } else {
          return null;
        }
      }
      case "bottom": {
        if (i + 1 < this.maxIValue) {
          return { i: i + 1, j, direction, letter: "" };
        } else {
          return null;
        }
      }
      case "leftTop": {
        if (i - 1 >= this.minIValue && j - 1 >= this.minJValue) {
          return { i: i - 1, j: j - 1, direction, letter: "" };
        } else {
          return null;
        }
      }
      case "leftBottom": {
        if (i + 1 < this.maxIValue && j - 1 >= this.minJValue) {
          return { i: i + 1, j: j - 1, direction, letter: "" };
        } else {
          return null;
        }
      }
      case "rigthTop": {
        if (i - 1 >= this.minIValue && j + 1 < this.maxJValue) {
          return { i: i - 1, j: j + 1, direction, letter: "" };
        } else {
          return null;
        }
      }
      case "rigthBottom": {
        if (i + 1 < this.maxIValue && j + 1 < this.maxJValue) {
          return { i: i + 1, j: j + 1, direction, letter: "" };
        } else {
          return null;
        }
      }
    }
  }

  mountWord(i: number, j: number, letter: string, direction: string) {
    let aux = this.result.find(item=>item.direction === direction);
    if(!aux){
      aux = {direction:direction, word: []};
      this.result.push(aux);
    }
    
    aux.word.push({i,j,letter});
  }

  removeWord(direction: string) {
    let aux = this.result.findIndex(item=>item.direction === direction);
    if(aux !== -1){
      this.result.splice(aux,1);
    }
  }

  existLetter(i: number, j: number): boolean {
    let aux;
    this.result.forEach((item)=>{
        if (aux) return;
        aux = item.word.find(dt => dt.i === i && dt.j === j);
        if (aux) return;
    });

    if (aux) return true;
      else return false;    
  }
}
