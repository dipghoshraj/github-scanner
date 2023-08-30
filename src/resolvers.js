const githubAPI = require('./githubAPI');

const resolvers = {
  Query: {


    repos: async (_, {token}) => {
      try {
        console.log(token)
        const response = await githubAPI(token).get('/user/repos');
        return response.data.map(repo => ({
          name: repo.name,
          size: repo.size,
          owner: repo.owner.login,
        }));
      } catch (error) {
        console.log(error);
        throw new Error('Unable to fetch repositories.');
      }
    },
    

    repoDetails: async (_, {token, owner, name }) => {
      try {
        const response = await githubAPI(token).get(`/repos/${owner}/${name}`);
        const ymlFileResponse = await githubAPI(token).get(`/repos/${owner}/${name}/contents`, {params: { path: '.yml' },});
        const activeWebhooksResponse = await githubAPI(token).get(`/repos/${owner}/${name}/hooks`);

        const contentsResponse = await githubAPI(token).get(`/repos/${owner}/${name}/contents`);
        const fileCount = contentsResponse.data.filter(item => item.type === 'file').length;


        return {
          name: response.data.name,
          size: response.data.size,
          owner: response.data.owner.login,
          isPrivate: response.data.private,
          fileCount: fileCount,
          ymlContent: ymlFileResponse.data.content,
          activeWebhooks: activeWebhooksResponse.data.length,
        };
      } catch (error) {
        console.log(error);
        throw new Error('Unable to fetch repository details.');
      }
    },
  },
};

module.exports = resolvers;
