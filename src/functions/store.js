import axios from "axios";

export const getStores = async () =>
  await axios.get(`${process.env.REACT_APP_API}/stores`);

export const getStore = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/store/${slug}`);

export const removeStore = async (slug, authtoken) =>
  await axios.patch(
    `${process.env.REACT_APP_API}/store/${slug}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );

export const updateStore = async (slug, store, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/store/${slug}`, store, {
    headers: {
      authtoken,
    },
  });

export const createStore = async (store, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/store`, store, {
    headers: {
      authtoken,
    },
  });

export const getStoreSubs = async (_id) =>
  await axios.get(`${process.env.REACT_APP_API}/store/subs/${_id}`);
