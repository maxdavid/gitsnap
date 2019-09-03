#!/usr/bin/env node
const path = require('path');
const { runner, asyncRunner } = require('./utilities/runner');

const buildSnapFilename = function() {
  const getGitName = function() {
    let username = null;
    if ((username = runner('git', ['config', 'user.name']))) return username;
    else return runner('git', ['config', '--global', 'user.name']);
  };

  const getBranchName = function() {
    let branch = null;
    if ((branch = runner('git', ['branch', '--show-current']))) return branch;
    else return runner('git', "branch | grep \\* | cut -d ' ' -f2".split(' '));
  };

  const fileparts = [getGitName(), getBranchName()];
  const filename = fileparts.reduce((name, part) => {
    if (part) return name + part + '_';
  }, '');

  return `${filename}${Date.now()}.jpg`;
};

const snapsDir = function() {
  const root = path.resolve(__dirname, '..', '..');
  return path.resolve(root, '.gitsnaps');
};

//
// Build the filename and run the bin
//
const file = buildSnapFilename();
const dir = snapsDir();
asyncRunner(__dirname + '/bin/imagesnap', ['-q', path.resolve(dir, file)]);
