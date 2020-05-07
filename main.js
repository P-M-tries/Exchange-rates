const $convertButton = document.querySelector('#convert-button');

$convertButton.onclick = () => {
    const input = fetchInput();
    clearErrors();
    
    const validationResult = validateInput(input);

    if (validationResult === ''){
        clearTable();
        createTable(input);
        const data = summonAPI(input);
    };

};



