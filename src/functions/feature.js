import axios from "axios";

export const getFeatures = async () =>
  await axios.get(`${process.env.REACT_APP_API}/features`);

export const getFeature = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/feature/${slug}`);

export const removeFeature = async (slug, authtoken) =>
  await axios.patch(
    `${process.env.REACT_APP_API}/feature/${slug}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );

export const updateFeature = async (slug, feature, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/feature/${slug}`, feature, {
    headers: {
      authtoken,
    },
  });

export const createFeature = async (feature, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/feature`, feature, {
    headers: {
      authtoken,
    },
  });

export const getFeatureSubs = async (_id) =>
  await axios.get(`${process.env.REACT_APP_API}/feature/subs/${_id}`);