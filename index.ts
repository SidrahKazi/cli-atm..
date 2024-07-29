#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

async function rainbow(arr:string,time:number){
    let text = chalkAnimation.rainbow(arr)
    await new Promise ((resolve) => {
       setTimeout(resolve,time);
    })
    text.stop();
}
async function radar(arr:string,time:number) {
    let text = chalkAnimation.karaoke(arr);
    await new Promise ((resolve) => {
        setTimeout(resolve,time);
    })
    text.stop();
}

await rainbow(`Welcome to SID CLI_ATM`,2024);
await radar(`\n\n|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||`,6000);
let pin = 99099;

let balance = await inquirer.prompt([{
    name: "amount",
    type: 'number',
    message: chalk.green("\nEnter the balance of demo account")
}]);

let info = `\nDEMO ACCOUNT BALANCE : ${chalk.cyan(balance.amount)} PKR`;
console.log(chalk.yellowBright(info));

let pininput;
do {
    pininput = await inquirer.prompt(
        {
            name:"pin",
            type: "number",
            message: chalk.greenBright("\nPls enter your pin {PIN : 99099}")
        }
    )

    if(pininput.pin !== pin){

        console.log(chalk.redBright(`\nInCorrect Pin ,Card declined! \n pls try again`));

    }else{

        while (true) {

            await radar(`\n\n|||||||||||||||||||||||||||||||||||||||||||||||||||||||`,6000);

            let chooseopt = await inquirer.prompt(
            {

                name:"Operation",
                type: "list",
                message: chalk.greenBright("\npls Select the option:"),
                choices: ["Balance Inquiry","Transfer","Withdraw","Fast Cash","Exit"]
            }
                
            )

            if(chooseopt.Operation === "Balance Inquiry"){
                console.log(chalk.magentaBright.bold`Your Balance is: ${chalk.yellow(balance.amount)}`);

            }else if(chooseopt.Operation === "Transfer"){

                let accNum = await inquirer. prompt([{

                    name: "accountNumber",
                    type: "number",
                    message: chalk.green("Enter Account Number")
                }])
                let amount = await inquirer.prompt([{

                    name: "amount",
                    type: "number",
                    message: chalk.green("Enter the Amount")
                }])
                if(amount.amount > balance.amount){

                    console.log(chalk.redBright(`\nInsufficient Balance ,Pls Try again`));
                    console.log(chalk.yellowBright(`Your current balance is: ${chalk.cyan(balance.amount)}`));


                }else{


                    balance.amount -= amount.amount
                    console.log(chalk.yellowBright(`Succesfully Transfered ${chalk.cyan(amount.amount)} To Account Number:${chalk.cyan(accNum.accountNumber)}`));
                    console.log(chalk.yellowBright(`Now your current balance is: ${chalk.cyan(balance.amount)}`));
            }



        }else if(chooseopt.Operation === "Withdraw"){

            let Withdrawval = await inquirer.prompt([{
                name: "amount",
                type: "number",
                message: chalk.greenBright("Enter The Amount.")
            }])
            if(Withdrawval.amount > balance.amount){

                console.log(chalk.redBright(`\nInsufficient Balance ,Pls Try again`));
                console.log(chalk.red(`Your current balance is: ${chalk.cyanBright(balance.amount)}`));

            }else if(Withdrawval.amount > 35000){

                console.log(chalk.redBright(`You cant withdraw more than atm limit \n pls try again \n Max limit: ${chalk.cyanBright(35000)}`));


            }else{
                balance.amount -= Withdrawval.amount;
                console.log(`Successfully Withdraw ${Withdrawval.amount}`);
                console.log(`Your Current Balance is ${balance.amount}`);
            }

        }else if(chooseopt.Operation === "Fast Cash"){

            let fastCash = await inquirer.prompt([{
                name: "amounts",
                type: "list",
                message: chalk.greenBright("Select The Amount:"),
                choices: [10000,20000,25000,30000,35000]
            }])
            if(fastCash.amounts === 10000){

                if(fastCash.amounts > balance.amount){

                    console.log(chalk.red(`Insufficient balance,Try again! \n Yourcurrent balance is ${chalk.yellow(balance.amoount)}`));


                }else{

                    balance.amount -= 10000
                    console.log(chalk.magenta(`Successfully Wiyhdraw ${chalk.yellow(fastCash.amounts)}`));
                    console.log(chalk.magenta(`Your Current Balance is ${chalk(balance.amount)}`));
                }

            }else if(fastCash.amounts === 20000){
                if(fastCash.amounts > balance.amount){

                    console.log(chalk.red(`Insufficient balance,Try again! \n Your current balance is ${chalk.yellow(balance.amount)}`));


                }else{

                    balance.amount -= 20000
                    console.log(chalk.magenta(`Succrssfully Withdraw ${chalk.yellow(fastCash.amounts)}`));
                    console.log(chalk.magenta(`Your Current Balance is ${chalk.yellow(balance.amount)}`));
                }
            }else if (fastCash.amounts === 25000){
                if(fastCash.amounts > balance.amount){

                    console.log(chalk.red(`Insufficient balance,Try again! \n Your current balance is ${chalk.yellow(balance.amount)}`));


                }else{

                balance.amount -= 20000
                console.log(chalk.magenta(`SuccessfullyWithdraw ${chalk.yellow(fastCash.amounts)}`));
                console.log(chalk.magenta(`Your Current Balance is ${chalk.yellow(balance.amount)}`));
                }
            }else if(fastCash.amounts === 25000){
                if(fastCash.amounts > balance.amount){

                    console.log(chalk.red(`Insufficient balance,Try again! \n Your current balance is ${chalk.yellow(balance.amount)}`));


                }else{

                    balance.amount -= 25000
                    console.log(chalk.magenta(`Successfully Withdraw ${chalk.yellow(fastCash.amounts)}`));
                    console.log(chalk.magenta(`Your Current Balance is ${chalk.yellow(balance.amount)}`));
                }
            }else if(fastCash.amounts === 35000){
                if(fastCash.amounts > balance.amount){

                    console.log(chalk.red(`Insufficient balance,Try again! \n Your current balance is ${chalk.yellow(balance.amount)}`));


                    
                }else{

                    balance.amount -= 35000
                    console.log(chalk.magenta(`Successfully Withdraw ${chalk.yellow(fastCash.amounts)}`));
                    console.log(chalk.magenta(`Your Current Balance is ${chalk.yellow(balance.amount)}`));
                }
            }else {
                console.log(chalk.red(`Error 404 pls try again`));
            }
        }else if(chooseopt.Operation ==="Exit"){

            await rainbow(`\nThank you for using this ATM`,3000)
            break;

        }
    }

    }
} while (pininput.pin !== pin);