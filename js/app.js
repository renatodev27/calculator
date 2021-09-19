const calculatorComponent = Vue.component('calculator', {
    template: '#calc-template',
    data() {
        return {
            inputValue: '0',
            totalValue: 0,
            resultUsed: false,
            operation: '',
            fullOperation: '',
            addedOperation: false,
        }
    },
    methods: {
        numberButtonClick(number) { 
            if (this.resultUsed) {
                if (!this.operation) {
                    this.totalValue = 0;
                    this.fullOperation = '';
                }

                this.inputValue = '';
                this.resultUsed = false;
            }

            if (this.addedOperation) {
                this.addedOperation = false;
                this.inputValue = '';
            }

            if (this.inputValue == '0') {
                this.inputValue = '';
            }

            if (typeof(this.inputValue) === 'string') {
                this.inputValue += String(number);
            }
            else {
                this.inputValue = '';
                this.inputValue += String(number);
            }
        },
        actionButtonClick(action) {
            let num = Number(this.inputValue);

            switch (action) {
                case 'sumar' : 
                    this.operation = 'suma';

                    if (!this.resultUsed) {
                        this.totalValue += num;
                        this.resultUsed = false;
                        this.fullOperation += `${num}`;
                    }
                    else {
                        this.fullOperation = `${this.totalValue}`;
                    }

                    this.addedOperation = true;
                    this.fullOperation += ' + ';
                break;

                case 'restar' : 
                    this.operation = 'resta';

                    if (!this.resultUsed) {
                        if (this.totalValue == 0) this.totalValue = num;
                        else this.totalValue -= num;
                        this.resultUsed = false;
                        this.fullOperation += `${num}`;
                    }
                    else {
                        this.fullOperation = `${this.totalValue}`;
                    }

                    this.addedOperation = true;
                    this.fullOperation += ' - ';
                break;

                case 'multiplicar' :
                    this.operation = 'multi';

                    if (!this.resultUsed) {
                        if (this.totalValue == 0) this.totalValue = num;
                        else this.totalValue *= num;
                        this.resultUsed = false;
                        this.fullOperation += `${num}`;
                    }
                    else {
                        this.fullOperation = `${this.totalValue}`;
                    }

                    this.addedOperation = true;
                    this.fullOperation += ' x ';
                break;

                case 'dividir' : 
                    this.operation = 'divide';
                    
                    if (!this.resultUsed) {
                        if (this.totalValue == 0) this.totalValue = num;
                        else this.totalValue /= num;
                        this.resultUsed = false;
                        this.fullOperation += `${num}`;
                    }
                    else {
                        this.fullOperation = `${this.totalValue}`;
                    }

                    this.addedOperation = true;
                    this.fullOperation += ' / ';
                break;

                case 'result' :
                    this.addedOperation = false;
                    this.fullOperation += `${this.inputValue} = `;

                    if (!this.resultUsed) {
                        
                        switch (this.operation) {
                            case 'suma' :  this.totalValue += Number(this.inputValue); break;
                            case 'resta' :  this.totalValue -= Number(this.inputValue); break;
                            case 'multi' : this.totalValue *= Number(this.inputValue); break;
                            case 'divide' : this.totalValue /= Number(this.inputValue); break;
                        }
                        
                        this.operation = '';
                        this.inputValue = String(this.totalValue);
                        this.resultUsed = true;
                    }
                break;
            }
        },
        backSpace() {
            const string = this.inputValue.substring(0, this.inputValue.length - 1);
            this.inputValue = string;
            if (!this.inputValue) this.inputValue = '0';
        },
        ereaseAll(status) {
            this.inputValue = '0';
            if (status) {
                this.totalValue = 0;
                this.fullOperation = '';
            } 
        },
        inputWriting(e) {
            switch (e.keyCode) {
                case 49 : this.numberButtonClick(1); break;
                case 50 : this.numberButtonClick(2); break;
                case 51 : this.numberButtonClick(3); break;
                case 52 : this.numberButtonClick(4); break;
                case 53 : this.numberButtonClick(5); break;
                case 54 : this.numberButtonClick(6); break;
                case 56 : this.numberButtonClick(8); break;
                case 57 : this.numberButtonClick(9); break;
                case 48 : this.numberButtonClick(0); break;
                case 189 : this.actionButtonClick('restar'); break;
                case 13 : this.actionButtonClick('result'); break;
                case 27 : this.ereaseAll(true); break;
                case 8 : if (!this.resultUsed) this.backSpace(); break;
            }
            
            if (e.key === '*') this.actionButtonClick('multiplicar');
            if (e.key === '/') this.actionButtonClick('dividir');
            if (e.key === '7') this.numberButtonClick(7);
            if (e.key === '+') this.actionButtonClick('sumar');
        }
    }
})

const app = new Vue({
    components: {
        calculatorComponent
    },
    el: '#app',
})