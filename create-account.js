function createAccount(pin, amount=0) {
    return {
        checkBalance(inputPin) {
            if (pin !== inputPin)
                return `Invalid PIN.`;

            return `$${amount}`;
        },
        deposit(inputPin, depositAmt) {
            if (pin !== inputPin)
                return `Invalid PIN.`;
            amount += depositAmt;
            return `Successfully deposited $${depositAmt}. Current balance: $${amount}.`;
        },
        withdraw(inputPin, withdrawAmt) {
            if (pin !== inputPin)
                return `Invalid PIN.`;
            if (withdrawAmt > amount)
                return `Withdrawal amount exceeds account balance. Transaction cancelled.`;
            amount -= withdrawAmt;
            return `Successfully withdrew $${withdrawAmt}. Current balance: $${amount}.`;
        },
        changePin(oldPin, newPin) {
            if (pin !== oldPin)
                return `Invalid PIN.`;
            pin = newPin;
            return 'PIN successfully changed!';
        }
    }
}

module.exports = { createAccount };
