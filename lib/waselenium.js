const selenium = require('selenium-webdriver');
const moment = require('moment');
const chalk = require('chalk');
const CLI = require('clui');
const { thru } = require('lodash');
const Spinner = CLI.Spinner;


class waselenium {

    constructor() {
        this.url = "https://web.whatsapp.com/";
        this.phone = "";
        this.message = "";
        this.driver = "";
    }

    async start() {
        try {
            if (this.driver == "") {
                this.driver = new selenium.Builder().forBrowser('firefox').build();
            }
        } catch (err) {
            console.log(err);
        }
    }

    async open() {

        const loading = new Spinner(chalk.greenBright("Opening Whatsapp Web"));

        try {
            loading.start();

            (await this.driver).get(this.url);

            (await this.driver).getTitle().then((t) => {
                // console.log(chalk.greenBright("\n PHASE 1 : Please Scan QR Code"));
            });
        } catch (err) {
            console.log(chalk.red(err))
            this.close();
        } finally {
            loading.stop();
        }
    } // end func

    async checkin() {
        const loading = new Spinner(chalk.greenBright("Waiting QR to be scanned"));

        try {
            loading.start();
            await this.driver.wait(selenium.until.elementsLocated(selenium.By.id("pane-side")), 120000).then((el) => {
                // console.log(chalk.greenBright("\n PHASE 2 : Logged In"))
            });
        } catch (err) {
            console.log(chalk.red(err))
            this.close();
        } finally {
            loading.stop();
        }
    } // end func

    set_phone(phone) {
        this.phone = phone;
    }

    set_message(message) {
        this.message = message;
    }


    async minimize() {
        (await this.driver).manage().window().setRect({ width: 100, height: 150 });
    }

    async search() {
        const loading = new Spinner(chalk.greenBright("Searching in Contact"));

        try {
            loading.start();
            var input_phone = (await this.driver).findElement(selenium.By.className("copyable-text"));
            (await input_phone).click();
            await new Promise(r => setTimeout(r, 200))
            await input_phone.sendKeys(this.phone, selenium.Key.ENTER).then(() => {
                // console.log(chalk.greenBright("PHASE 3 : Get Contact"))
            })
        } catch (err) {
            console.log(chalk.red(err))
            this.close();
        } finally {
            loading.stop();
        }
    } // end func


    async send() {
        const loading = new Spinner(chalk.greenBright("Sending Message"));

        try {
            loading.start();
            var input_text = (await this.driver).findElement(selenium.By.xpath('//div[@data-tab="6"]'));
            await input_text.sendKeys(this.message, selenium.Key.ENTER).then(() => {
                // console.log(chalk.greenBright("Message Sent to " + this.phone))
            })
        } catch (err) {
            console.log(chalk.red(err))
            this.close();
        } finally {
            loading.stop();
            console.log(chalk.greenBright("Message Sent to " + this.phone))
        }
    }

    close() {
        try{
            if(this.driver){
                setTimeout(() => {
                    this.driver.quit();
                }, 100)
            }
        } catch(err){
            
        }

    }

} // end class


/****************/


module.exports = {
    waselenium
}