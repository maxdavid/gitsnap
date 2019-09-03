# gitsnap

[![npm](https://img.shields.io/npm/v/gitsnap.svg)](https://www.npmjs.com/package/gitsnap)

Snap a selfie on every commit

## Install

```
$ npm install --save-dev gitsnap
```

## Usage

Commit as usual, and say cheese!

### .gitsnaps directory

Snaps are stored in `.gitsnaps` directory, which is added to gitignore by default. Each snap is named by username, branch name, and unix time.

If working with multiple developers, try having everyone on the team install this project and commit the the .gitsnaps directory. Hilarity ensues.

## Caveats

99.9% sure this only works on MacOS. No guarantees for other platforms.

On installation, gitsnap checks if the current project is a working git project by checking for the `.git` directory. Will have to reinstall if project fails this way.
