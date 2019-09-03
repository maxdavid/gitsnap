const progress = require('./progress');

module.exports = {
  runner: function(cmd, args) {
    const { spawnSync } = require('child_process');
    const process = spawnSync(cmd, args);
    return process.stdout.toString().replace(/(\r\n|\n|\r)/gm, '');
  },
  asyncRunner: function(cmd, args) {
    const { spawn } = require('child_process');
    const process = spawn(cmd, args);
    process.stderr.on('data', data => {
      progress.log(`Error taking gitsnap: ${data}`, 'error');
    });
  }
};
