'use strict';

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

    createUser(callback) {
        return ApiConnector.createUser({username: this.username, name: this.name, password: this.password}, (err, data) => {
            console.log(`Creating user ${this.username}`);
            callback(err, data);
        })
    }

    performLogin(callback) {
        return ApiConnector.performLogin({username: this.username, password: this.password}, (err, data) => {
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
    return ApiConnector.getStocks((err, data) => {
        console.log('Getting stocks info');
    }); 
}

let exchangeRate;

function main() {
    
    getStocks((err, data) => {
        if (err) {
            console.error('Error during getting stocks');
        } 
        exchangeRate = data[0];
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
                    let amount = 500000;
                    Ivan.addMoney({ currency: 'EUR', amount: amount }, (err, data) => {
                        if (err) {
                                console.error('Error during adding money to Ivan');
                        } else {
                                console.log(`Added ${amount} euros to Ivan`);
                                // здесь должна быть конвертация из евро в неткоины
                                // если вместо 50000 пишу amount далее появляется ошибка
                                let targetAmount = 50000 * exchangeRate['EUR_NETCOIN'];
                                Ivan.convertMoney({fromCurrency: 'EUR', targetCurrency:'NETCOIN', targetAmount: targetAmount}, (err, data) => {
                                    if (err) {
                                        console.error('Error during converting');
                                    } else {
                                        console.log('Converted to coins');
                                        Sasha.createUser( (err, data) => {
                                            if (err) {
                                                console.error('Error during creating user Sasha');
                                            } else {
                                                console.log('Sasha is created');
                                                Ivan.transferMoney({to: Sasha.username, amount: targetAmount}, (err, data) => {
                                                    if (err) {
                                                        console.error('Error during transfering')
                                                    } else {
                                                        console.log(`Sasha has got ${targetAmount} Netcoins`);
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
    });
}

main();