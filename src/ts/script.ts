'use strict';
class TypedCalculator {
	highValue: HTMLElement;
	finalValue: HTMLElement;
	textContent: number;
	reset: number;
	constructor() {
		this.highValue = document.getElementById('upper-number')!;
		this.finalValue = document.getElementById('result-number')!;
		this.reset = 0;
	}

	clearValues() {
		this.highValue.textContent = '0';
		this.finalValue.textContent = '0';
	}

	checkLastDigit(input: string, highValue: string, regex: RegExp) {
		if ((
			!regex.test(input) &&
			!regex.test(highValue.substring(highValue.length - 1))
		)) {
			return true;
		} else {
			return false;
		}
	}

	addition(n1: number, n2: number) {
		return n1 + n2;
	}

	subtraction(n1: number, n2: number) {
		return n1 - n2;
	}

	multiplication(n1: number, n2: number) {
		return n1 * n2;
	}

	division(n1: number, n2: number) {
		return n1 / n2;
	}

	refreshValues(total: number) {
		this.highValue.textContent = String(total);
		this.finalValue.textContent = String(total);
	}

	solve() {
		let highValueArray: number[] | string[] = (this.highValue.textContent!).split(' ');
		let result = 0;

		for (let i = 0; i <= highValueArray.length; i++) {
			let operationIndex = 0;
			let actualItem = highValueArray[i];

			if (actualItem === 'x') {
				result = calculate.multiplication(Number(highValueArray[i - 1]), Number(highValueArray[i + 1]));
				operationIndex = 1;

			} else if (actualItem === '÷') {
				result = calculate.division(Number(highValueArray[i - 1]), Number(highValueArray[i + 1]));
				operationIndex = 1;

			} else if (!highValueArray.includes('x') && !highValueArray.includes('÷')) {

				if (actualItem === '+') {
					result = calculate.addition(Number(highValueArray[i - 1]), Number(highValueArray[i + 1]));
					operationIndex = 1;
				} else if (actualItem === '-') {
					result = calculate.subtraction(Number(highValueArray[i - 1]), Number(highValueArray[i + 1]));
					operationIndex = 1;
				}
			}

			if (operationIndex) {
				highValueArray[i - 1] = result as unknown as string;

				highValueArray.splice(i, 2);

				i = 0;
			}
		}

		if (result) {
			calculate.reset = 1;
		}

		calculate.refreshValues(result);
	}

	buttonPress() {
		let input: string | number = this.textContent;
		let highValue = calculate.highValue.textContent;

		const regex = new RegExp('^\\d+$');

		if (calculate.reset && regex.test(input as unknown as string)) {
			highValue = '0';
		}

		calculate.reset = 0;

		if (String(input) === 'AC') {
			calculate.clearValues();
		} else if (String(input) === '=') {
			calculate.solve();
		} else {

			if (calculate.checkLastDigit(String(input), highValue!, regex)) {
				return false;
			}

			if (!regex.test(String(input))) {
				input = ` ${input} `;
			}

			if (highValue === '0') {
				if (regex.test(String(input))) {
					calculate.highValue.textContent = input as string;
				}
			} else {
				calculate.highValue.textContent += input as string;
			}
		}
	}
}

const calculate = new TypedCalculator;
const keys = document.getElementsByClassName('btn');

for (let i = 0; keys.length > i; i++) {
	keys[i].addEventListener('click', calculate.buttonPress);
}
