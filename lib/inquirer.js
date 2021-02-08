const inquirer = require('inquirer');

module.exports = {

  askMainMenu: () => {
    const value = {
        name: 'menu',
        type: 'rawlist',
        message: 'Select Menu :',
        choices: [
          'Send to Single Contact',
          'Send to Multiple Contacts',
          'Auto Reply Incoming Chat',
          'Tes',
          'Exit',
        ],
        filter: function (val) {
          return val.toLowerCase();
        },
      };
    return inquirer.prompt(value);
  },

  /*********** */


  askPhone: () => {
    const value = {
        name: 'phone',
        type: 'input',
        message: 'Enter Contact Phone Number :',
        validate: function( value ) {
          if (value.length > 8) {
            return true;
          } else {
            return 'Please enter valid phone number.';
          }
        }
      };
    return inquirer.prompt(value);
  },

  /*********** */

  askMessage: () => {
    const value = {
        name: 'message',
        type: 'input',
        message: 'Enter Your Message :',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter message.';
          }
        }
      };
    return inquirer.prompt(value);
  },


  askAgain: () => {
    return inquirer
      .prompt([
        {
          name: "again_confirm",
          type: "confirm",
          message: "Send Again to Another Number?",
        },
      ])
  },

};
