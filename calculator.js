// ===== STATE MANAGEMENT =====
let currentInput = '0';
let expression = '';
let lastAnswer = 0;
let history = [];
let waitingForOperand = false;

// ===== DOM ELEMENTS =====
const display = document.getElementById('display');
const expressionDisplay = document.getElementById('expression');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistory');

// ===== UTILITY FUNCTIONS =====
function updateDisplay() {
    display.textContent = currentInput;
    expressionDisplay.textContent = expression;
}

function clearCalculator() {
    currentInput = '0';
    expression = '';
    waitingForOperand = false;
    updateDisplay();
}

function addToHistory(expr, result) {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    history.unshift({
        expression: expr,
        result: result,
        time: timeString
    });
    
    // Keep only last 50 calculations
    if (history.length > 50) {
        history.pop();
    }
    
    renderHistory();
}

function renderHistory() {
    if (history.length === 0) {
        historyList.innerHTML = '<p class="history-empty">No calculations yet</p>';
        return;
    }
    
    historyList.innerHTML = history.map(item => `
        <div class="history-item">
            <div class="history-expression">${item.expression}</div>
            <div class="history-result">= ${item.result}</div>
            <div class="history-time">${item.time}</div>
        </div>
    `).join('');
}

function clearHistory() {
    history = [];
    renderHistory();
}

// ===== MATHEMATICAL FUNCTIONS =====
function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function evaluateExpression(expr) {
    try {
        // Replace mathematical functions and constants
        expr = expr.replace(/π/g, Math.PI.toString());
        expr = expr.replace(/e(?![0-9])/g, Math.E.toString());
        
        // Handle scientific functions
        expr = expr.replace(/sin\(([^)]+)\)/g, (match, p1) => {
            return Math.sin(toRadians(eval(p1))).toString();
        });
        expr = expr.replace(/cos\(([^)]+)\)/g, (match, p1) => {
            return Math.cos(toRadians(eval(p1))).toString();
        });
        expr = expr.replace(/tan\(([^)]+)\)/g, (match, p1) => {
            return Math.tan(toRadians(eval(p1))).toString();
        });
        expr = expr.replace(/log\(([^)]+)\)/g, (match, p1) => {
            return Math.log10(eval(p1)).toString();
        });
        expr = expr.replace(/ln\(([^)]+)\)/g, (match, p1) => {
            return Math.log(eval(p1)).toString();
        });
        expr = expr.replace(/√\(([^)]+)\)/g, (match, p1) => {
            return Math.sqrt(eval(p1)).toString();
        });
        
        // Evaluate the expression
        const result = eval(expr);
        
        if (!isFinite(result)) {
            throw new Error('Invalid calculation');
        }
        
        return result;
    } catch (error) {
        throw new Error('Error');
    }
}

// ===== BUTTON HANDLERS =====
function handleNumber(value) {
    if (waitingForOperand) {
        currentInput = value;
        waitingForOperand = false;
    } else {
        currentInput = currentInput === '0' ? value : currentInput + value;
    }
    updateDisplay();
}

function handleOperator(operator) {
    if (expression && !waitingForOperand) {
        expression += currentInput + ' ' + operator + ' ';
    } else if (!expression) {
        expression = currentInput + ' ' + operator + ' ';
    } else {
        expression = expression.slice(0, -3) + ' ' + operator + ' ';
    }
    waitingForOperand = true;
    updateDisplay();
}

function handleFunction(func) {
    const value = parseFloat(currentInput);
    let result;
    
    try {
        switch(func) {
            case 'sin':
                result = Math.sin(toRadians(value));
                break;
            case 'cos':
                result = Math.cos(toRadians(value));
                break;
            case 'tan':
                result = Math.tan(toRadians(value));
                break;
            case 'log':
                result = Math.log10(value);
                break;
            case 'ln':
                result = Math.log(value);
                break;
            case 'sqrt':
                result = Math.sqrt(value);
                break;
            case 'square':
                result = value * value;
                break;
            case 'cube':
                result = value * value * value;
                break;
            case 'factorial':
                result = factorial(Math.floor(value));
                break;
            case 'pi':
                result = Math.PI;
                break;
            case 'e':
                result = Math.E;
                break;
            case 'ans':
                result = lastAnswer;
                break;
            default:
                return;
        }
        
        if (!isFinite(result)) {
            currentInput = 'Error';
        } else {
            // Round to 10 decimal places to avoid floating point errors
            currentInput = parseFloat(result.toFixed(10)).toString();
        }
        
        waitingForOperand = true;
        updateDisplay();
    } catch (error) {
        currentInput = 'Error';
        updateDisplay();
    }
}

function handleSpecialAction(action) {
    switch(action) {
        case 'clear':
            clearCalculator();
            break;
        case 'backspace':
            if (currentInput.length > 1) {
                currentInput = currentInput.slice(0, -1);
            } else {
                currentInput = '0';
            }
            updateDisplay();
            break;
        case 'negate':
            if (currentInput !== '0') {
                currentInput = currentInput.startsWith('-') 
                    ? currentInput.slice(1) 
                    : '-' + currentInput;
            }
            updateDisplay();
            break;
        case '(':
        case ')':
            if (waitingForOperand || currentInput === '0') {
                currentInput = action;
                waitingForOperand = false;
            } else {
                currentInput += action;
            }
            updateDisplay();
            break;
        case '%':
            const percentValue = parseFloat(currentInput) / 100;
            currentInput = percentValue.toString();
            waitingForOperand = true;
            updateDisplay();
            break;
        case 'power':
            expression = currentInput + '^';
            waitingForOperand = true;
            updateDisplay();
            break;
    }
}

function handleEquals() {
    if (!expression && currentInput === '0') return;
    
    let fullExpression = expression + currentInput;
    
    // Handle power operator
    fullExpression = fullExpression.replace(/\^/g, '**');
    
    try {
        const result = evaluateExpression(fullExpression);
        const roundedResult = parseFloat(result.toFixed(10));
        
        addToHistory(fullExpression.replace(/\*\*/g, '^'), roundedResult);
        
        lastAnswer = roundedResult;
        currentInput = roundedResult.toString();
        expression = '';
        waitingForOperand = true;
        updateDisplay();
    } catch (error) {
        currentInput = 'Error';
        expression = '';
        updateDisplay();
        setTimeout(() => {
            clearCalculator();
        }, 1500);
    }
}

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', () => {
    // Button click handlers
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const btn = e.currentTarget;
            const value = btn.dataset.value;
            const action = btn.dataset.action;
            
            // Add click animation
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 100);
            
            if (value !== undefined) {
                handleNumber(value);
            } else if (action) {
                if (['+', '-', '*', '/'].includes(action)) {
                    handleOperator(action);
                } else if (action === '=') {
                    handleEquals();
                } else if (['clear', 'backspace', 'negate', '(', ')', '%', 'power'].includes(action)) {
                    handleSpecialAction(action);
                } else {
                    handleFunction(action);
                }
            }
        });
    });
    
    // Clear history button
    clearHistoryBtn.addEventListener('click', clearHistory);
    
    // Keyboard support
    document.addEventListener('keydown', (e) => {
        e.preventDefault();
        
        // Numbers
        if (e.key >= '0' && e.key <= '9') {
            handleNumber(e.key);
        }
        // Decimal point
        else if (e.key === '.') {
            if (!currentInput.includes('.')) {
                handleNumber('.');
            }
        }
        // Operators
        else if (['+', '-', '*', '/'].includes(e.key)) {
            handleOperator(e.key);
        }
        // Equals
        else if (e.key === 'Enter' || e.key === '=') {
            handleEquals();
        }
        // Clear
        else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
            clearCalculator();
        }
        // Backspace
        else if (e.key === 'Backspace') {
            handleSpecialAction('backspace');
        }
        // Parentheses
        else if (e.key === '(') {
            handleSpecialAction('(');
        }
        else if (e.key === ')') {
            handleSpecialAction(')');
        }
        // Percentage
        else if (e.key === '%') {
            handleSpecialAction('%');
        }
    });
    
    // Initialize display
    updateDisplay();
    renderHistory();
});

// ===== PREVENT CONTEXT MENU ON BUTTONS =====
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('contextmenu', e => e.preventDefault());
});
