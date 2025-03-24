window.addEventListener('message', function(event) {
    this.document.body.style.display = 'flex';
});

const screen = document.querySelector('.screen');
let input = '';
let value;
let screencontent;
let equal = false;
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.calc-button');
    const calculator = document.querySelector('.calculator');

    buttons.forEach(button => {
        button.addEventListener('click', function (event) {
            value = this.textContent.trim();
            screencontent = screen.textContent.trim();
            

            if (value === 'AC') {
                input = '';
                screen.textContent = '0';
                equal = false;
            } else if (value === '=') {
                if (screencontent !== '0') {
                    try {
                        input = input.replace(/×/g, '*').replace(/÷/g, '/');
                        screen.textContent = eval(input);
                        if (input.includes('+') || input.includes('-') || input.includes('*') || input.includes('/') || input.includes('%')) {
                            equal = true;
                        };
                        input = screen.textContent;
                    } catch {
                        screen.textContent = 'undefined';
                        input = '';
                    };
                };
            } else if (value === '←') {
                input = input.slice(0, -1);
                if (input === '') {
                    screen.textContent = '0';
                    equal = false;
                } else {
                    screen.textContent = input;
                };
            } else {
                if (screencontent === '0' && (value === '.' || value === '+' || value === '-' || value === '×' || value === '÷' || value === '%')) {
                    input = '0';
                } else if (screencontent === '0') {
                    input = '';
                } else if (screencontent !== '0' && equal) {
                    if (value !== '+' && value !== '-' && value !== '×' && value !== '÷' && value !== '%') {
                        input = '';
                        equal = false;

                    } else {
                        input = screencontent;
                        equal = false;
                    };
                };
                input += value;
                screen.textContent = input;
            };
        });
        const logo = document.querySelector('.logo');
        document.addEventListener('click', function (event){
            if (!calculator.contains(event.target)) {
                closeUI();
            };
        });
    });
});

document.addEventListener('keydown', function(event) {
    screencontent = screen.textContent.trim()
    if (event.key === 'Escape') {
        closeUI();
    } else if (event.key === '1' || event.key === '2' || event.key === '3' || event.key === '4' || event.key === '5' || event.key === '6' || event.key === '7' || event.key === '8' || event.key === '9' || event.key === '0') {
        if (screencontent === '0') {
            input = '';
        } else if (screencontent !== '0' && equal) {
            input = '';
            equal = false;
        };
        input += event.key;
        screen.textContent = input;
    } else if (event.key === '.' || event.key === '+' || event.key === '-' || event.key === '%') {
        if (screencontent == '0') {
            input = '0';
        } else if (screencontent !== '0' && equal) {
            input = screencontent;
            equal = false;
        };
        input += event.key;
        screen.textContent = input;
    } else if (event.key === '*') {
        if (screencontent === '0') {
            input = '0';
        };
        input += '×';
        screen.textContent = input;
    } else if (event.key === '/') {
        if (screencontent === '0') {
            input = '0';
        };
        input += '÷';
        screen.textContent = input;
    } else if (event.key === 'Backspace') {
        input = input.slice(0, -1)
        if (input === '') {
            screen.textContent = '0';
        } else {
            screen.textContent = input;
        };
    } else if (event.key === 'Enter') {
        try {
            input = input.replace(/×/g, '*').replace(/÷/g, '/');
            screen.textContent = eval(input);
            if (input.includes('+') || input.includes('-') || input.includes('*') || input.includes('/') || input.includes('%')) {
                equal = true;
            };
            input = screen.textContent;
        } catch {
            screen.textContent = 'undefined';
            input = '';
        };
    };
});

screen.addEventListener('click', () => {
    const text = screen.textContent;
    const copyel = document.createElement('textarea');
    copyel.value = text;
    document.body.appendChild(copyel);
    copyel.select();
    document.execCommand('copy');
    copyel.remove();
    const copyicon = document.querySelector('.notify');
    copyicon.style.display = ('block');
    setTimeout(() => {
        copyicon.style.display = ('none');
    }, 1500);
});

function closeUI() {
    document.body.style.display = 'none';
    fetch(`https://${GetParentResourceName()}/closeUI`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    });
};