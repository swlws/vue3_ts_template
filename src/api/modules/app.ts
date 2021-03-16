const BASE_URL = process.env.VUE_APP_BASE_URL;

export default {
  getMenu: {
    url: `${BASE_URL}/v1/menus`,
    method: "get",
  },
};
