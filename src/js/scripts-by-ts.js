'use strict';
var TypedCalculator = /** @class */ (function () {
   function TypedCalculator() {
      this.highValue = document.getElementById('upper-number');
      this.finalValue = document.getElementById('result-number');
      this.reset = 0;
   }
   TypedCalculator.prototype.clearValues = function () {
      this.highValue.textContent = '0';
      this.finalValue.textContent = '0';
   };
   TypedCalculator.prototype.checkLastDigit = function (input, highValue, regex) {
      if ((!regex.test(input) &&
            !regex.test(highValue.substring(highValue.length - 1)))) {
         return true;
      }
      else {
         return false;
      }
   };
   TypedCalculator.prototype.addition = function (n1, n2) {
      return n1 + n2;
   };
   TypedCalculator.prototype.subtraction = function (n1, n2) {
      return n1 - n2;
   };
   TypedCalculator.prototype.multiplication = function (n1, n2) {
      return n1 * n2;
   };
   TypedCalculator.prototype.division = function (n1, n2) {
      return n1 / n2;
   };
   TypedCalculator.prototype.refreshValues = function (total) {
      this.highValue.textContent = String(total);
      this.finalValue.textContent = String(total);
   };
   TypedCalculator.prototype.solve = function () {
      var highValueArray = (this.highValue.textContent).split(' ');
      var result = 0;
      for (var i = 0; i <= highValueArray.length; i++) {
         var operationIndex = 0;
         var actualItem = highValueArray[i];
         if (actualItem === 'x') {
            result = calculate.multiplication(Number(highValueArray[i - 1]), Number(highValueArray[i + 1]));
            operationIndex = 1;
         }
         else if (actualItem === '÷') {
            result = calculate.division(Number(highValueArray[i - 1]), Number(highValueArray[i + 1]));
            operationIndex = 1;
         }
         else if (!highValueArray.includes('x') && !highValueArray.includes('÷')) {
            if (actualItem === '+') {
               result = calculate.addition(Number(highValueArray[i - 1]), Number(highValueArray[i + 1]));
               operationIndex = 1;
            }
            else if (actualItem === '-') {
               result = calculate.subtraction(Number(highValueArray[i - 1]), Number(highValueArray[i + 1]));
               operationIndex = 1;
            }
         }
         if (operationIndex) {
            highValueArray[i - 1] = result;
            highValueArray.splice(i, 2);
            i = 0;
         }
      }
      if (result) {
         calculate.reset = 1;
      }
      calculate.refreshValues(result);
   };
   TypedCalculator.prototype.buttonPress = function () {
      var input = this.textContent;
      var highValue = calculate.highValue.textContent;
      var regex = new RegExp('^\\d+$');
      if (calculate.reset && regex.test(input)) {
         highValue = '0';
      }
      calculate.reset = 0;
      if (String(input) === 'AC') {
         calculate.clearValues();
      }
      else if (String(input) === '=') {
         calculate.solve();
      }
      else {
         if (calculate.checkLastDigit(String(input), highValue, regex)) {
            return false;
         }
         if (!regex.test(String(input))) {
            input = ' '.concat(input, ' ');
         }
         if (highValue === '0') {
            if (regex.test(String(input))) {
               calculate.highValue.textContent = input;
            }
         }
         else {
            calculate.highValue.textContent += input;
         }
      }
   };
   return TypedCalculator;
}());
var calculate = new TypedCalculator;
var keys = document.getElementsByClassName('btn');
for (var i = 0; keys.length > i; i++) {
   keys[i].addEventListener('click', calculate.buttonPress);
}
