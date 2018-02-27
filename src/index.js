class SmartCalculator {
    constructor(initialValue = 0) {
        this._memory = [initialValue];
        this._lastOperationWasSubstraction = false;
        this._powValue = null;
    }

    valueOf() {
        let result;

        if (this._powValue !== null) {
            this._pow(this._powValue);
        }

        if (typeof this._memory[0] === "number") {
            result = this._memory[0];
        } else {
            result = this._memory[0].reduce(
                (productOfNumbers, number) => productOfNumbers * number,
                1
            );
        }

        for (let index = 0; index < this._memory.length; ++index) {
            if (typeof this._memory[index] === "number") {
                if (index) {
                    result += this._memory[index];
                }
            } else {
                if (index) {
                    result += this._memory[index].reduce(
                        (productOfNumbers, number) => productOfNumbers * number,
                        1
                    );
                }
            }
        }

        return result;
    }

    add(number) {
        if (this._powValue !== null) {
            this._pow(this._powValue);
        }

        this._memory.push(number);
        this._lastOperationWasSubstraction = false;

        return this;
    }

    subtract(number) {
        if (this._powValue !== null) {
            this._pow(this._powValue);
        }

        this._memory.push(-number);
        this._lastOperationWasSubstraction = true;

        return this;
    }

    multiply(number) {
        if (this._powValue !== null) {
            this._pow(this._powValue);
        }

        if (typeof this._memory[this._memory.length - 1] === "number") {
            this._memory[this._memory.length - 1] = [
                this._memory[this._memory.length - 1],
                number
            ];
        } else {
            this._memory[this._memory.length - 1].push(number);
        }

        this._lastOperationWasSubstraction = false;

        return this;
    }

    devide(number) {
        if (this._powValue !== null) {
            this._pow(this._powValue);
        }

        if (typeof this._memory[this._memory.length - 1] === "number") {
            this._memory[this._memory.length - 1] = [
                this._memory[this._memory.length - 1],
                1 / number
            ];
        } else {
            this._memory[this._memory.length - 1].push(1 / number);
        }

        this._lastOperationWasSubstraction = false;

        return this;
    }

    pow(number) {
        if (this._powValue !== null) {
            this._powValue = Math.pow(this._powValue, number);
        } else {
            this._powValue = number;
        }

        return this;
    }

    _pow(number) {
        if (typeof this._memory[this._memory.length - 1] === "number") {
            this._memory[this._memory.length - 1] = Math.pow(
                this._memory[this._memory.length - 1],
                number
            );
            if (number % 2 === 0 && this._lastOperationWasSubstraction) {
                this._memory[this._memory.length - 1] = -this._memory[
                    this._memory.length - 1
                ];
            }
        } else {
            this._memory[this._memory.length - 1][
                this._memory[this._memory.length - 1].length - 1
            ] = Math.pow(
                this._memory[this._memory.length - 1][
                    this._memory[this._memory.length - 1].length - 1
                ],
                number
            );
            if (number % 2 === 0 && this._lastOperationWasSubstraction) {
                this._memory[this._memory.length - 1][
                    this._memory[this._memory.length - 1].length - 1
                ] = -this._memory[this._memory.length - 1][
                    this._memory[this._memory.length - 1].length - 1
                ];
            }
        }

        this._powValue = null;
    }
}

module.exports = SmartCalculator;
