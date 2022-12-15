'use strict';
class Calculator {
   constructor() {
      this.upperValue = document.getElementById('upper-number');
      this.resultValue = document.getElementById('result-number');
      this.reset = 0;
      this.highValue = undefined;
   }

   clearValues() {
      this.upperValue.textContent = '0';
      this.resultValue.textContent = '0';
   }

   // check if last character is symbol
   checkLastDigit(input, upperValue, regex) {
      if ((
         !regex.test(input) &&
         !regex.test(upperValue.substr(upperValue.length - 1))
      )) {
         return true;
      } else {
         return false;
      }
   }

   addition(n1, n2) {
      return parseFloat(n1) + parseFloat(n2);
   }

   subtraction(n1, n2) {
      return parseFloat(n1) - parseFloat(n2);
   }

   multiplication(n1, n2) {
      return parseFloat(n1) * parseFloat(n2);
   }

   division(n1, n2) {
      return parseFloat(n1) / parseFloat(n2);
   }

   refreshValues(total) {
      this.upperValue.textContent = total;
      this.resultValue.textContent = total;
   }

   solve() {
      // turn string with numbers and symbols into an array
      let upperValueArray = (this.upperValue.textContent).split(' ');
      let result = 0;

      for (let i = 0; i <= upperValueArray.length; i++) {
         let operationIndex = 0;
         let actualItem = upperValueArray[i];

         // run the multiplication
         if (actualItem === 'x') {
            result = calc.multiplication(upperValueArray[i - 1], upperValueArray[i + 1]);
            operationIndex = 1;

            // run the division
         } else if (actualItem === '÷') {
            result = calc.division(upperValueArray[i - 1], upperValueArray[i + 1]);
            operationIndex = 1;

            // checks if there is still division or multiplication to be done
         } else if (!upperValueArray.includes('x') && !upperValueArray.includes('÷')) {

            // and now run the addition and subtraction
            if (actualItem === '+') {
               result = calc.addition(upperValueArray[i - 1], upperValueArray[i + 1]);
               operationIndex = 1;
            } else if (actualItem === '-') {
               result = calc.subtraction(upperValueArray[i - 1], upperValueArray[i + 1]);
               operationIndex = 1;
            }
         }

         // updates array values for next iteration
         if (operationIndex) {

            // turn the previous index into current of operation
            upperValueArray[i - 1] = result;

            // remove items already used for operation
            upperValueArray.splice(i, 2);

            // refresh the index value
            i = 0;
         }
      }

      // reset the upperValue if still there are numbers of last operation
      if (result) {
         calc.reset = 1;
      }

      // update both values with result
      calc.refreshValues(result);
   }

   buttonPress() {
      let input = this.textContent;
      let upperValue = calc.upperValue.textContent;

      // return true if the input is a number
      const regex = new RegExp('^\\d+$');

      // clear screen when reset operation
      if (calc.reset && regex.test(input)) {
         upperValue = '0';
      }

      // clear the reset property
      calc.reset = 0;

      // clear the screen when AC is pressed
      if (input === 'AC') {
         calc.clearValues();
      } else if (input === '=') {
         calc.solve();
      } else {

         // check if last character is symbol
         if (calc.checkLastDigit(input, upperValue, regex)) {
            return false;
         }

         // add spaces around symbols
         if (!regex.test(input)) {
            input = ` ${input} `;
         }

         // remove 0 when adding numbers
         if (upperValue === '0') {
            if (regex.test(input)) {
               calc.upperValue.textContent = input;
            }
         } else {
            calc.upperValue.textContent += input;
         }
      }
   }
}

const calc = new Calculator;
const buttons = document.getElementsByClassName('btn');

// map all buttons
for (let i = 0; buttons.length > i; i++) {
   buttons[i].addEventListener('click', calc.buttonPress);
}
