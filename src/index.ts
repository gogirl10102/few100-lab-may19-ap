
import './styles.css';

var billAmt: number = 0;
let billInput = document.querySelector('input') as HTMLInputElement;
billInput.addEventListener('keyup', handleBillUpdate)

let billOutput = document.getElementById('billAmtDup');

let tipNote = document.getElementById('tipNote');

let tenPercent = document.getElementById('ten') as HTMLButtonElement;
let tipPerCentage = document.getElementById('tipPerCentage');
let fifteenPercent = document.getElementById('fifteen');
let twentyPercent = document.getElementById('twenty');
let percentages = document.querySelectorAll('.btn-group button');

percentages.forEach(p => p.addEventListener('click', handleTipAmountButton))
let percentageClicked = .2;

function handleTipAmountButton() {
    percentageClicked = +this.dataset.tip;
    percentages.forEach(p => {
        const button = p as HTMLButtonElement;
        button.disabled = false;
    });
    this.disabled = true;
    tipNote.innerHTML = percentageClicked * 100 + '%';
    tipPerCentage.innerHTML = percentageClicked * 100 + '%';
    calculateTipAndTotal(percentageClicked);
};

function handleBillUpdate() {
    billAmt = this.valueAsNumber;
    if (isNaN(billAmt) || billAmt < 0) {
        billInput.classList.add('has-error');
    }
    else {
        billInput.classList.remove('has-error');
        billOutput.innerHTML = formatter.format(billAmt);
        calculateTipAndTotal(percentageClicked);
    }
}

function calculateTipAndTotal(percentageClicked: number) {
    const tipAmt = billAmt * percentageClicked;

    let amtOfTip = document.getElementById('amtOfTip');
    amtOfTip.innerHTML = formatter.format(tipAmt);

    let ttlToBePaid = document.getElementById('ttlPaid');
    ttlToBePaid.innerHTML = formatter.format(tipAmt + billAmt);
}

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

