const axios = require('axios');

const githubAPI = (token) => axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

module.exports = githubAPI;
