'use strict';

let inputNumber = document.getElementById('inputNumber');
let text1 = document.getElementById('text1');
let buttonClear = document.getElementById('buttonClear');
let buttonIncCounter = document.getElementById('buttonIncCounter');
let buttonDecCounter = document.getElementById('buttonDecCounter');
let buttonSetCounter = document.getElementById('buttonSetCounter');
let buttonGetCounter = document.getElementById('buttonGetCounter');

const url = "http://" + document.location.host + "/api/v1/counter";

function logger(s) {
    text1.value = s + "\n" + text1.value;
}

buttonClear.addEventListener('click', () => {
    logger("Clear");
    inputNumber.value = 0;
});

buttonIncCounter.addEventListener('click', () => {
    logger("Inc");
    // POST is NOT idempotent. 
    // POST adds 100 to the server's counter.
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            add: 100
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then(response => response.json())
        .then(json => inputNumber.value = json.counter);
});

buttonDecCounter.addEventListener('click', () => {
    logger("Dec");
    // POST is NOT idempotent. 
    // POST adds -100 to the server's counter.
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            add: -100
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then(response => response.json())
        .then(json => inputNumber.value = json.counter);
});

buttonSetCounter.addEventListener('click', () => {
    logger("Set");
    // PUT is idempotent. 
    // PUT sets the server's counter.
    fetch(url, {
        method: 'PUT',
        body: JSON.stringify({
            counter: Number(inputNumber.value)
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then(response => response.json())
        .then(json => inputNumber.value = json.counter);
});

function getCounter() {
    logger("Get");
    // GET:
    fetch(url)
        .then(response => response.json())
        .then(json => inputNumber.value = json.counter);
}

buttonGetCounter.addEventListener('click', getCounter);

getCounter();