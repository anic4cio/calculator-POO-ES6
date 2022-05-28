class Calculator {
    constructor() {
        this.upperValue = document.getElementById('upper-number');
        this.resultValue = document.getElementById('result-number');
        this.reset = 0;
    }

    clearValues() {
        this.upperValue.textContent = '0';
        this.resultValue.textContent = '0';
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

    // soma
    sum(n1, n2) {
        return parseFloat(n1) + parseFloat(n2)
    }

    // subtração
    subtraction(n1, n2) {
        return parseFloat(n1) - parseFloat(n2)
    }

    // multiplicação
    multiplication(n1, n2) {
        return parseFloat(n1) * parseFloat(n2)
    }

    // divisão
    division(n1, n2) {
        return parseFloat(n1) / parseFloat(n2)
    }

    // atualiza os valores
    refreshValues(total) {
        this.upperValue.textContent = total;
        this.resultValue.textContent = total;
    }

    // resolve a operação
    resolution() {

        // transforma a string num array
        let upperValueArray = (this.upperValue.textContent).split(' ');

        // resultado da operação
        let result = 0;

        for(let i = 0; i <= upperValueArray.length; i++) {

            let operation = 0;
            let actualItem = upperValueArray[i];

            // executa a multiplicação
            if(actualItem == 'x') {
                result = calc.multiplication(upperValueArray[i - 1], upperValueArray[i + 1]);
                operation = 1;
            // executa a divisão
            } else if (actualItem == '÷'){
                result = calc.division(upperValueArray[i - 1], upperValueArray[i + 1]);
                operation = 1;
            // checa se tem multiplicação e divisão para ser feita no array
            } else if(!upperValueArray.includes('x') && !upperValueArray.includes('÷')) {
            // soma e subtração
                if(actualItem == '+') {
                    result = calc.sum(upperValueArray[i - 1], upperValueArray[i + 1]);
                    operation = 1;
                } else if(actualItem == '-') {
                    result = calc.subtraction(upperValueArray[i - 1], upperValueArray[i + 1]);
                    operation = 1;
                }
            }
            
            // atualiza valores do array para a próxima iteração
            if(operation) {
                
                // tranforma o indice anterior no resultado atual da operação
                upperValueArray[i - 1] = result;
                
                // remove os itens já utilizados para operação
                upperValueArray.splice(i, 2);
                
                //atualiza o valor do índice
                i = 0;
            }
        }


        if(result) {
            calc.reset = 1;
        }

        // atualiza os totais
        calc.refreshValues(result);
    }

    btnPress() {
        let input = this.textContent;
        let upperValue = calc.upperValue.textContent;

        // virifica se o input é um número
        var reg = new RegExp('^\\d+$');

        // limpa o display quando resetar a operação
        if(calc.reset && reg.test(input)) {
            upperValue = '0';
        } 

        // limpa a propriedade de reset
        calc.reset = 0;

        // limpa o display quando AC é pressionado
        if(input == 'AC') {
            calc.clearValues();
        } else if (input == '=') {
            calc.resolution();
        } else {

            // verifica se último caractera é número ou símbolo
            if(calc.checkLastDigit(input, upperValue, reg)) {
                return false;
            }
            
            // adiciona espaços ao lado dos simbolos
            if(!reg.test(input)) {
                input = ` ${input} `;
            }

            if(upperValue == '0') {
                if(reg.test(input)) {
                    calc.upperValue.textContent = input;
                }
            } else {
                calc.upperValue.textContent += input;
            }
        }
    }
}

// nova instância da classe Calculator
let calc = new Calculator;

// 
let buttons = document.getElementsByClassName('btn');

// map all buttons
for(let i = 0; buttons.length > i; i++) {
    buttons[i].addEventListener('click', calc.btnPress);

}