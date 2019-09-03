module.exports = {
  log: function(input, type) {
    switch (type) {
      case 'warn':
        console.log(
          '\x1b[2m\x1b[33m',
          'gitsnap:',
          '\x1b[0m\x1b[33m',
          input,
          '\x1b[0m'
        );
        break;
      case 'error':
        console.log(
          '\x1b[0m\x1b[31m',
          'gitsnap:',
          '\x1b[1m\x1b[31m',
          input,
          '\x1b[0m'
        );
        break;
      case 'success':
        console.log(
          '\x1b[2m\x1b[32m',
          'gitsnap:',
          '\x1b[0m\x1b[32m',
          input,
          '\x1b[0m'
        );
        break;
      default:
        console.log(
          '\x1b[2m\x1b[32m',
          'gitsnap:',
          '\x1b[0m\x1b[32m',
          input,
          '\x1b[0m'
        );
    }
  }
};
