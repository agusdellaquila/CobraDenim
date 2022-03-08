function addSubscription(subType) {
    let cobraSub = [];
    if (subType == 'pro') {
        cobraSub = ['CobraClub Pro Subscription', 9]
    } else { //no other option than 'inv' investor
        cobraSub = ['CobraClub Investor Subscription', 24]
    }
    let subscription = JSON.stringify(cobraSub);
    localStorage.setItem('subscription', subscription);
}