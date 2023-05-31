const path = require('path');
const fs = require('fs-extra');
const cheerio = require('cheerio');
const Envs = require('./envs');

module.exports = {
  prepare: async (req) => {
    const file = path.join(__dirname, '../client/build/index.html');
    // Prepare HTML
    const html = await fs.readFile(file, 'utf8');
    const variables = [
      { id: 'api-vars', src: `${Envs.get('apiURL')}/vars.js` },
      { id: 'client-vars', src: `${Envs.get('clientURL')}/vars.js` },
    ];
    const $ = cheerio.load(html);
    for (const variable of variables) {
      const $script = $(`head script[data-id="${variable.id}"]`);
      $script.attr('src', variable.src);
    }
    return $.html();
  },
};
