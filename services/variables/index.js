const _ = require('lodash');
const path = require('path');
const fs = require('fs-extra');
const UglifyJS = require('uglify-js');

module.exports = {
  setup: async () => {
    // Clear variables
    await fs.readdir(path.join(__dirname, '../../public'))
      .then(res => res.filter(f => f.match(/vars.js/gim)))
      .then(res => res.map(f => fs.removeSync(path.join(__dirname, `../../public/${f}`))));
    // Setup variables
    const filePath = path.join(__dirname, '../../public/vars.js');
    const vars = _.pickBy(process.env, (value, key) => key.startsWith('REACT_APP_'));
    const { code } = UglifyJS.minify(`
      function injectVariables() {
        window.__ENVS__ = Object.assign(window.__ENVS__, ${JSON.stringify(vars)});
      }
      injectVariables();
    `);
    await fs.writeFile(filePath, code);
    return true;
  },
};
