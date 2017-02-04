export default (api) => {
  return {
    type: "FIND_CATEGORIES",
    payload: api.getUrl()
      .then(url => {
        return api.client.get(url);
      })
      .catch(error => {
        Promise.reject(error);
      })
  };
};
