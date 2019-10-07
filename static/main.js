class Profile {
    constructor({
        username, 
        name: {firstName, lastName}, 
        password
    }) 
        {
        this.username = username;
        this.name = {firstName, lastName}
        this.password = password;
    }

    createUser({username, name: {firstName, lastName}, password}, callback) {
        return ApiConnector.createUser({username, name: {firstName, lastName}, password}, (err, data) => {
            console.log(`Creating user ${this.username}`);
            callback(err, data);
        })
    }

    performLogin({username, password}, callback) {
        return ApiConnector.performLogin({username, password}, (err, data) => {
            console.log(`Authorizing user ${this.username}`);
            callback(err, data);
        })
    }

    addMoney({currency, amount}, callback) {
        return ApiConnector.addMoney({ currency, amount }, (err, data) => {
            console.log(`Adding ${amount} of ${currency} to ${this.username}`);
            callback(err, data);
        });
    }

    convertMoney({fromCurrency, targetCurrency, targetAmount}, callback) {
        return ApiConnector.convertMoney({fromCurrency, targetCurrency, targetAmount}, (err, data) => {
            console.log(`Converting ${fromCurrency} to ${targetCurrency} ${targetAmount}`);
            callback(err, data);
        })
    }

    transferMoney({to, amount}, callback) {
        return ApiConnector.transferMoney({to, amount}, (err, data) => {
            console.log(`Transfering ${amount} of Netcoins to ${to}`);
            callback(err, data);
        })
    }
}

function getStocks(){
    let exchangeRate = [];
    return ApiConnector.getStocks((err, data) => {
        console.log('Getting stocks info');
    }); 
}

getStocks();

function main() {
    const Ivan = new Profile({
        username: 'ivan',
        name: { firstName: 'Ivan', lastName: 'Chernyshev' },
        password: 'ivanspass',
    });

    const Sasha = new Profile({
        username: 'sasha',
        name: { firstName: 'Sasha', lastName: 'Ivanov' },
        password: 'summer',
    });

    Ivan.createUser( (err, data) => {
        if (err) {
            console.error('Error during creating user Ivan');
        } else {
            console.log('Ivan is created')
            Ivan.performLogin( (err, data) => {
                if (err) {
                    console.error('Error during user authorization');
                } else {
                    console.log('Ivan is authorized');
                    Ivan.addMoney({ currency: 'EUR', amount: 500000 }, (err, data) => {
                        if (err) {
                                console.error('Error during adding money to Ivan');
                        } else {
                                console.log(`Added 500000 euros to Ivan`);
                                Ivan.convertMoney({fromCurrency: 'EUR', targetCurrency:'NETCOIN', targetAmount: 500000}, (err, data) => {
                                    if (err) {
                                        console.error('Error during converting');
                                    } else {
                                        console.log('Converted to coins');
                                        Sasha.createUser( (err, data) => {
                                            if (err) {
                                                console.error('Error during creating user Sasha');
                                            } else {
                                                console.log('Sasha is created');
                                                Ivan.transferMoney({to: Sasha, amount: 100}, (err, data) => {
                                                    if (err) {
                                                        console.error('Error during transfering')
                                                    } else {
                                                        console.log('Sasha has got 36000 Netcoins');
                                                    }
                                                })
                                            }

                                        })                                        
                                    }
                                })
                        }
                })
                }
            })
        }

    });
}

main();