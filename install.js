#!/usr/bin/env node
'use strict';
const progress = require('./utilities/progress');

//
// Compatibility with older node.js as path.exists got moved to `fs`.
//
var fs = require('fs'),
  path = require('path'),
  root = path.resolve(__dirname, '..', '..'),
  exists = fs.existsSync || path.existsSync;

//
// Snippet that gets added to git's post-commit hook.
//
const snippet = `npx gitsnap &\n`;

//
// Gather the location of the possible hidden .git directory, the hooks
// directory which contains all git hooks and the absolute location of the
// `post-commit` file. The path needs to be absolute in order for the symlinking
// to work correctly.
//
var git = path.resolve(root, '.git'),
  hooks = path.resolve(git, 'hooks'),
  postcommit = path.resolve(hooks, 'post-commit'),
  gitsnap_dir = '.gitsnaps',
  gitsnaps = path.resolve(root, gitsnap_dir),
  gitignore = path.resolve(root, '.gitignore');

//
// Bail out if we don't have an `.git` directory as the hooks will not get
// triggered. If we do have directory create a hooks folder if it doesn't exist.
//
if (!exists(git) || !fs.lstatSync(git).isDirectory()) {
  progress.log('No .git directory found. Aborting.', 'error');
  progress.log("Please run `git init' and reinstall.", 'warn');
  return;
}
if (!exists(hooks)) fs.mkdirSync(hooks);

//
// It could be that we do not have rights to this folder which could cause the
// installation of this module to completely fail. We should just output the
// error instead destroying the whole npm install process.
//
try {
  if (exists(postcommit)) {
    progress.log('Post-commit hook found.');

    fs.readFile(postcommit, (err, data) => {
      if (err) throw err;
      if (data.includes(snippet))
        progress.log('Already installed in post-commit hook.');
      else {
        progress.log('Appending gitsnap snippet to post-commit hook.');
        fs.appendFileSync(postcommit, snippet);
      }
    });
  } else {
    //
    // If there isn't an existing post-commit hook, let's just create one
    //
    progress.log('');
    progress.log('No post-commit hook found.');
    progress.log('Creating post-commit hook for gitsnap.');
    fs.writeFileSync(postcommit, snippet);

    //
    // Make sure post-commit file is executable
    //
    fs.chmodSync(postcommit, '755');
  }

  //
  // Create gitsnaps directory
  //
  if (!fs.existsSync(gitsnaps)) {
    progress.log('');
    progress.log('Creating .gitsnaps directory');
    fs.mkdirSync(gitsnaps);
  }

  //
  // By default we're git-ignoring our gitsnaps directory
  //
  if (fs.existsSync(gitignore)) {
    fs.readFile(gitignore, (err, data) => {
      if (err) throw err;
      if (!data.includes(gitsnap_dir)) {
        progress.log('');
        progress.log('Appending gitsnap gitsnaps directory to gitignore');
        fs.appendFileSync(gitignore, gitsnap_dir);
      }
    });
  } else {
    fs.writeFileSync(gitignore, gitsnap_dir);
  }
} catch (e) {
  console.error('');
  console.error('Failed to add gitsnap to post-commit hook because:');
  console.error('', e);
}
