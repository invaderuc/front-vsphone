import axios from "axios";

export const createPhone = async (phone, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/phone`, phone, {
    headers: {
      authtoken,
    },
  });

export const getPhonesByCount = async (count) =>
  await axios.get(`${process.env.REACT_APP_API}/phones/${count}`);

export const removePhone = async (slug, authtoken) =>
  await axios.patch(
    `${process.env.REACT_APP_API}/phone/${slug}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );

export const getPhone = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/phone/${slug}`);

export const updatePhone = async (slug, phone, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/phone/${slug}`, phone, {
    headers: {
      authtoken,
    },
  });

export const getPhones = async (sort, order, page) =>
  await axios.post(`${process.env.REACT_APP_API}/phones`, {
    sort,
    order,
    page,
  });

export const getPhonesCount = async () =>
  await axios.get(`${process.env.REACT_APP_API}/phones/total`);

export const phoneStar = async (phoneId, star, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/phone/star/${phoneId}`,
    { star },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getRelated = async (phoneId) =>
  await axios.get(`${process.env.REACT_APP_API}/phone/related/${phoneId}`);

export const fetchPhonesByFilter = async (arg) =>
  await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);