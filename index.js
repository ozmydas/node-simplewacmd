const chalk = require('chalk');
// const clear = require('clear');
const figlet = require('figlet');
const files = require('./lib/files');
const inquirer = require('./lib/inquirer');
const CLI = require('clui');
const { waselenium } = require('./lib/waselenium');
const { Separator } = require('inquirer');
const { reset } = require('chalk');


const Spinner = CLI.Spinner;
const wa = new waselenium();

// process.exit(1);

/*************/

function clear(){
  console.clear();
}

async function ready() {
  try {
    clear();

    console.log(
      chalk.yellow(
        figlet.textSync('WA_CMD', { horizontalLayout: 'full' })
      )
    );

    console.log();
    let separator = "";
    for (i = 0; i <= 56; i++) {
      separator += "+";
    }
    console.log(separator);
    console.log();

    mainmenu();
  } catch (err) {
    console.log(err);
  }

} // end func

async function mainmenu() {
  try {
    const menu = await inquirer.askMainMenu();

    switch (menu.menu) {
      case "send to single contact":
        await run("single");
      case "tes":
        await backtomain();
      case "exit":
        clear();
        process.exit(1);
      default:
        indevelop(menu.menu)
    }
  } catch (err) {
    console.log(err);
  }
}


async function run(mode) {
  try {
    await wa.start();
    await wa.open();
    await wa.checkin();
    await wa.minimize();

    switch (mode) {
      case "single":
        await waExecuteSingle();
      default:
        indevelop("5693");
    }

  } catch (err) {
    console.log(err)
  } finally {
    // console.log(chalk.yellow("END PHASE : Closing Webdiver"));
    // wa.close();
  }

}

async function waExecuteSingle() {
  try {
    const phone = await inquirer.askPhone();
    wa.set_phone(phone.phone);
    await wa.search();

    const message = await inquirer.askMessage();
    wa.set_message(message.message);
    await wa.send();

    let isAgain = await inquirer.askAgain();
    if (isAgain.again_confirm) {
      console.log(chalk.yellow("---------------------------------------"))
      await waExecuteSingle();
    } else {
      await backtomain();
    }
  } catch (err) {
    console.log(err)
    wa.close
  }
} // end func

async function ask() {
  const phone = await inquirer.askPhone();
  console.log(chalk.magenta("Get Phone : " + phone.phone));
  // console.log(phone);

  const message = await inquirer.askMessage();
  console.log(chalk.magenta("Get Message : " + message.message));
  // console.log(message);
}

async function backtomain() {
  clear();
  console.log(
    chalk.yellow(
      figlet.textSync('WA_CMD', { horizontalLayout: 'full' })
    )
  );

  console.log();
  let separator = "";
  for (i = 0; i <= 56; i++) {
    separator += "+";
  }
  console.log(separator);
  console.log();
  await mainmenu();
}

async function indevelop(info = "") {
  console.log(chalk.red("In Development " + info));
  await new Promise(r => setTimeout(r, 2000))
  backtomain();
}

/*************/

ready();