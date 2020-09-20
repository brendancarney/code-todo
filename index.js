const path = require('path')
const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec').exec

try {

  let eslintOutput = ''
  let eslintError = ''

  await exec(
    'node',
    [
      path.join(process.cwd(), 'node_modules/eslint/bin/eslint'),
      `--fix-dry-run`,
      '--format',
      'json',
    ],
    {
      silent: true,
      listeners: {
        stdout: (data) => {
          eslintOutput += data.toString()
        },
        stderr: (data) => {
          eslintError += data.toString()
        }
      }
    }
  )

  console.log(eslintOutput);
} catch (error) {
  core.setFailed(error.message);
}