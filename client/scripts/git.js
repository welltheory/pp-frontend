const _ = require('lodash');
const prompts = require('prompts');
const cp = require('child_process');
const git = require('simple-git');

const exec = command => new Promise((resolve, reject) => {
  cp.exec(command, (error, stdout, stderr) => {
    if (error) return reject(error);
    return resolve(stdout);
  });
});

const run = async () => {
  const branch = await exec('git rev-parse --abbrev-ref HEAD').then((output) => output.trim());
  const {
    commitType,
    _commitMessage,
    description,
    _fixes,
    shouldPush,
  } = await prompts([
    {
      type: 'select',
      name: 'commitType',
      message: 'Commit type:',
      choices: [
        { title: 'feat', value: 'feat' },
        { title: 'fix', value: 'fix' },
        { title: 'chore', value: 'chore' },
        { title: 'test', value: 'test' },
        { title: 'refactor', value: 'refactor' },
        { title: 'docs', value: 'docs' },
        { title: 'ci', value: 'ci' },
        { title: 'style', value: 'style' },
        { title: 'perf', value: 'perf' },
      ],
    },
    {
      type: 'text',
      name: '_commitMessage',
      message: 'Commit message:',
    },
    {
      type: 'text',
      name: 'description',
      message: 'Commit description (optional):',
    },
    {
      type: 'text',
      name: '_fixes',
      message: 'Fixes (optional, comma separated):',
    },
    {
      type: 'confirm',
      name: 'shouldPush',
      message: 'Push to origin?',
    },
  ]);
  const commitMessage = _.capitalize(_commitMessage.replace(/\.+$/, '').trim());
  const title = `${commitType}: ${commitMessage}`;
  let body = '';
  if (description) {
    body += `${description}`;
  }
  if (_fixes) {
    const fixes = _fixes.split(',').map(fix => fix.trim()).join(', ');
    if (body) body += '\n\n';
    body += `Fixes: ${fixes}`;
  }
  const { confirm } = await prompts({
    type: 'confirm',
    name: 'confirm',
    message: 'Do you want to proceed?',
  });
  if (!confirm) return;
  const $git = git();
  try {
    await $git.add('./*');
    console.log('[GIT] Files added.');
    await $git.commit(body ? `${title}\n\n${body}` : title);
    console.log('[GIT] Files committed.');
    if (shouldPush) {
      await $git.push('origin', branch);
      console.log('[GIT] Files pushed.');
    }
  } catch (e) {
    console.log('[GIT] Error:', e);
  }
};

run();
