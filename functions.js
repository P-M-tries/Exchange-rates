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

        return ''
    };

    function validateBase(base) {

        let currencyList = [ 'CAD', 'HKD', 'LVL', 'PHP', 'DKK', 'HUF', 'CZK', 'AUD', 'RON',
        'SEK', 'IDR', 'INR', 'BRL', 'RUB', 'LTL', 'JPY', 'THB', 'CHF', 'SGD', 'PLN', 'BGN',
        'TRY', 'CNY', 'NOK', 'NZD', 'ZAR', 'USD', 'MXN', 'EEK', 'GBP', 'KRW', 'MYR', 'EUR', 33]

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

            $exchangeOne.setAttribute('id', `${prop}-exchange`)


