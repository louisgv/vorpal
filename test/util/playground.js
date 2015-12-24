'use strict';

var Vorpal = require('./../../lib/vorpal');
var vorpal = new Vorpal();
var less = require('vorpal-less');
var repl = require('vorpal-repl');
vorpal.use(less).use(repl);

vorpal.command('add [numbers...]', 'Adds numbers together')
  .alias('addition')
  .alias('plus')
  .action(function (args, cb) {
    var numbers = args.numbers;
    var sum = 0;
    for (var i = 0; i < numbers.length; ++i) {
      sum += parseFloat(numbers[i]);
    }
    this.log(sum);
    cb(undefined, sum);
  });

vorpal.command('double [values...]', 'Doubles a value on each tab press')
  .autocompletion(function (text, iteration, cb) {
    if (iteration > 1000000) {
      cb(undefined, ['cows', 'hogs', 'horses']);
    } else {
      var number = String(text).trim();
      if (!isNaN(number)) {
        number = (number < 1) ? 1 : number;
        cb(undefined, 'double ' + number * 2);
      } else {
        cb(undefined, 'double 2');
      }
    }
  })
  .action(function (args, cb) {
    cb();
  });

vorpal.command('fdsdf <word>')
  .option('-m, --more')
  .action(function (args, cb) {
    this.log('BAMSHLACK');
    cb();
  });

vorpal.command('foo <word>')
  .option('-m, --more')
  .autocompletion(function (text, iter, cb) {
    cb(undefined, 'foo ' + text + '1');
  })
  .action(function (args, cb) {
    vorpal.activeCommand.log('aaaaaaaaaaaa');
    this.log(args);
    cb();
  });

vorpal.command('bar <word>')
  .action(function (args, cb) {
    this.log(args);
    cb();
  });

vorpal.command('sub command', 'does things')
  .option('-c, --cow')
  .action(function (args, cb) {
    cb();
  });

vorpal.command('login [userkey] [usersecret]', 'does things')
  .action(function (args, cb) {
    var self = this;
    this.prompt([
      { type: 'input',
        name: 'userKey',
        message: 'User Key:',
        validate: function(input) {
          return input.length > 10;
        }
      }
    ], function() {
      self.prompt([
        { type: 'input',
          name: 'userSecret',
          message: 'User Secret:',
          validate: function(input) {
            return input.length > 20;
          }
        },
      ], function() {
        console.log('BACK');
        cb();
      });      
    })
  });

vorpal.command('reverse')
  .option('-c, --cow')
  .action(function (args, cb) {
    this.log(String(args.stdin || '').split('').reverse().join(''));
    cb();
  });

vorpal.command('promptme')
  .action(function (args, cb) {
    this.prompt({
      type: 'list',
      name: 'data',
      choices: ['a', 'c', 'd'],
      message: 'test'
    }, function (result) {
      console.log(result);
      cb();
    });
  });

vorpal.command('cancelme')
  .action(function (args, cb) {
    setTimeout(function () {
      cb();
    }, 10000)
  })
  .cancel(function (a, b) {
    console.log('cancelled!', a, b);
  });

vorpal.command('inputme')
  .action(function (args, cb) {
    this.prompt({
      type: 'input',
      name: 'data',
      message: 'say something im giving up on you: '
    }, function (result) {
      console.log(result);
      cb();
    });
  });

setTimeout(function() {
  console.log('HI')
}, 10000);

vorpal
  .delimiter('calc:')
  .show()
  .parse(process.argv);
