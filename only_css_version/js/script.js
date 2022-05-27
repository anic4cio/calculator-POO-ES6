class Calculator {
    constructor() {
        this.upperValue = document.getElementById('upper-number');
        this.resultValue = document.getElementById('result-number');
        this.reset = 0;
    }

    checkLastDigit(input, upperValue, reg) {
        if((
            !reg.test(input) &&
            !reg.test(upperValue.substr(upperValue.length - 1))
        )) {
            return true;
        } else {
            return false;
        }
    }

    btnPress() {
        let input = this.textContent;
        let upperValue = calc.upperValue.textContent;
        var reg = new RegExp('^\\d+$'); // input is numbers only?

        if(calc.checkLastDigit(input, upperValue, reg)) {
            return false;
        }

        if(upperValue == '0') {
            calc.upperValue.textContent = input;
        } else {
            calc.upperValue.textContent += input;
        }
    }
}

// new instance of object from Calculator class
let calc = new Calculator;

// all buttons into variable 'buttons'
let buttons = document.getElementsByClassName('btn');

// map all buttons
for(let i = 0; buttons.length > i; i++) {
    buttons[i].addEventListener('click', calc.btnPress);

}