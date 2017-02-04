export default (api) => {
  return () => {
    return {
      type: "FIND_UNCATEGORIZED_TRANSACTIONS",
      payload: api.getUrl()
        .then(url => {
          return api.client.get(url);
        })
        .catch(error => {
          Promise.reject(error);
        })
    };
  };
};
