    function fetchInput () {
        const date = document.querySelector('#date-input').value;
        const baseSelect = document.querySelector('#select-menu').value;
        let amount = document.querySelector('#amount-input').value.trim();
        if (amount.length === 0) {
            amount = 1;
        };

        const inputInfo = [date, baseSelect, amount];

        return inputInfo;
    };

    function validateInput (inputArray) {
        const $form = document.querySelector('#input-data-form');
        const errorArray = [];

        errorArray.push(validateDate(inputArray[0]));
        errorArray.push(validateBase(inputArray[1]));
        errorArray.push(validateAmount(inputArray[2]));

        const errors = Object.assign({}, errorArray);

        const success = manageErrors(errors, $form) === 0;

        if(success) {
            return '';
        }

    };

    function validateDate(date) {
        if (date.trim().length === 0){
            return 'This field cannot be empty';
        }
        
       const dateRegex = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
        if(!dateRegex.test(date)) {
            return 'The date must have the following format: year-month-day (eg.: 2010-01-12)';
        }

        let dateMax = new Date().toJSON().slice(0,10).replace(/-/g,'-');
        let splittedMaxDate = dateMax.split('-');
        let dateMin = '1999';

        let splittedDate = date.split('-');
        

        if(Number(splittedDate[0]) < dateMin) {
            return 'The year must be 1999 or later';
        }

        if(Number(splittedDate[0]) === Number(splittedMaxDate[0])) {
            if(Number(splittedDate[1]) > Number(splittedMaxDate[1])){
                return 'The date must not be in the future';
            }else{
                let oneMoreDayFromToday = Number(splittedMaxDate[2]) + 1;
                if(Number(splittedDate[2]) >= oneMoreDayFromToday){ 
                    return 'The date must not be in the future';
                } else {
                    return '';
                };
            };
            
        };

        return ''
    };

    function validateBase(base) {

        let currencyList = [ 'CAD', 'HKD', 'LVL', 'PHP', 'DKK', 'HUF', 'CZK', 'AUD', 'RON',
        'SEK', 'IDR', 'INR', 'BRL', 'RUB', 'LTL', 'JPY', 'THB', 'CHF', 'SGD', 'PLN', 'BGN',
        'TRY', 'CNY', 'NOK', 'NZD', 'ZAR', 'USD', 'MXN', 'ILS', 'GBP', 'KRW', 'MYR', 'EUR', 33]

        if (!currencyList.includes(base)){
            return 'The currency entered is invalid';
        }

        return '';
    };

    function validateAmount(amount) {
        
        if (Number(amount) === 0){
            return 'This field cannot be 0';
        };

        if(isNaN(amount)) {
            return 'This field can only be filled with numbers';
        };

        return '';
    };

    function manageErrors(errors, form) {
        const keys = Object.keys(errors);

        let errorNumber = 0;

        keys.forEach(function(key) {
            const error = errors[key];

            if(error){
                errorNumber ++;
                form[key].classList.add('is-invalid');
                form[key].classList.add('error');
                const $forErrors = document.getElementById('error-container' + key);
                $forErrors.style.display = 'inline';
                $forErrors.innerText = error;
            } else {
                form[key].classList.add('correct');
                form[key].classList.remove('is-invalid');
                const $forErrors = document.getElementById('error-container' + key);
                $forErrors.classList.add('error-hide');
            }

           
        });

        return errorNumber;
    };

    function summonAPI(input) {

        fetch(`https://api.exchangeratesapi.io/${input[0]}?base=${input[1]}`)
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                fillTable(myJson.rates, input);
            });

    };

    function fillTable(obj, input) {
        for (const prop in obj) {
            const $tBody = document.querySelector('#exchange-tbody');
            const $tr = document.createElement('tr');
            const $currencyTh = document.createElement('th');
            const $exchangeOne = document.createElement('td');

            const currency = prop;
            $currencyTh.innerText = currency;

            const exchangeRate = obj[prop].toFixed(2);
            $exchangeOne.innerText = exchangeRate;

            $tr.appendChild($currencyTh);
            $tr.appendChild($exchangeOne);

            if (Number(input[2]) !== 1) {
                const $exchangeAmount = document.createElement('td');
                const exchangeForAmount = obj[prop] * Number(input[2]);
                $exchangeAmount.innerText = exchangeForAmount.toFixed(2);
                $tr.appendChild($exchangeAmount);
                };



            $tBody.appendChild($tr);
        };

        const inputAmount = Number(input[2]);

        if (inputAmount !== 1) {
            createAnotherColumnTitle(input);
        };
        

    };

    function createAnotherColumnTitle(input) {
        const $tableHead = document.querySelector('#table-head')
        const $th = document.createElement('th');
        $th.setAttribute('scope', 'col');



        const $amountDiv = document.createElement('div');
        $amountDiv.setAttribute('id','your-amount');
        $amountDiv.innerText = input[2];
        $th.appendChild($amountDiv);

        const $currencyDiv = document.createElement('div');
        $currencyDiv.innerText = input[1];
        $th.appendChild($currencyDiv);

        $tableHead.appendChild($th);
    }



