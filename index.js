const _ = require('lodash');
const axios = require('axios');

async function main() {
  const data = [3, 1, 4, 1, 5, 9, 2, 6];
  console.log('Sorted:', _.sortBy(data));

  try {
    const res = await axios.get('https://api.github.com/zen');
    console.log('GitHub says:', res.data);
  } catch (err) {
    console.log('GitHub API:', err.message);
  }
}

main();
