import React from "react";

import './Calculator.css'
import Button from "../components/Button";
import Display from "../components/Display";

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values:[0,0],
    current: 0
}
export class Calculator extends React.Component {

    state = {...initialState}
    constructor(props){
        super(props)
        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
    }

    clearMemory(){
       this.setState({...initialState})
    }

    setOperation(operation){
        if(this.state.current === 0){
           this.setState({
            operation,
            current: 1,
            clearDisplay:true
           })
        }else {
            const equals = operation === "=";
            const currentOperation = this.state.operation;

            const values = [...this.state.values];


            
            
            switch (currentOperation) {
                case "+":
                        values[0] = values[0] + values[1];
                    break;
                case "-":
                        values[0] = values[0] - values[1];
                    break;
                case "/":
                        values[0] = values[0] / values[1];
                    break;
                case "*":
                        values[0] = values[0] * values[1];
                    break;
            
                default:
                    break;
            }
            if(isNaN(values[0]) || !isFinite(values[0])){
                this.clearMemory();
                return
            }
            values[1] = 0;
            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0:1,
                clearDisplay: !equals,
                values
            })
 
        }
    }

    addDigit(n){
       if(n === '.' && this.state.displayValue.includes('.')){
            return ;
       }

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;
        const currentValue = clearDisplay ? '':this.state.displayValue;
        const displayValue = currentValue + n;
        this.setState({displayValue, clearDisplay:false});


        if(n !== '.'){
            const i = this.state.current;
            const newValeu = parseFloat(displayValue);

            const values = [...this.state.values];
            values[i] = newValeu
            this.setState({values})
            console.log(values);
        }
    }


    render(){
        return(
            <>
            <div className="calculator">
                <Display value={this.state.displayValue}></Display>
                <Button label="AC" triple="triple" click={this.clearMemory}></Button>
                <Button label="/" operation='operation' click={this.setOperation}></Button>
                <Button label="7" click={this.addDigit}></Button>
                <Button label="8" click={this.addDigit}></Button>
                <Button label="9" click={this.addDigit}></Button>
                <Button label="*" operation='operation' click={this.setOperation}></Button>
                <Button label="4" click={this.addDigit}></Button>
                <Button label="5" click={this.addDigit}></Button>
                <Button label="6" click={this.addDigit}></Button>
                <Button label="-" operation='operation' click={this.setOperation}></Button>
                <Button label="1" click={this.addDigit}></Button>
                <Button label="2" click={this.addDigit}></Button>
                <Button label="3" click={this.addDigit}></Button>
                <Button label="+" operation='operation' click={this.setOperation}></Button>
                <Button label="0" click={this.addDigit} double="double"></Button>
                <Button label="." click={this.addDigit}></Button>
                <Button label="=" operation='operation' click={this.setOperation}></Button>
            </div>
            </>
        )
    }
}