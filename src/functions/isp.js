import axios from "axios";

export const getIsps = async () =>
  await axios.get(`${process.env.REACT_APP_API}/isps`);

export const getIsp = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/isp/${slug}`);

export const removeIsp = async (slug, authtoken) =>
  await axios.patch(
    `${process.env.REACT_APP_API}/isp/${slug}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );

export const updateIsp = async (slug, isp, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/isp/${slug}`, isp, {
    headers: {
      authtoken,
    },
  });

export const createIsp = async (isp, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/isp`, isp, {
    headers: {
      authtoken,
    },
  });

export const getIspSubs = async (_id) =>
  await axios.get(`${process.env.REACT_APP_API}/isp/subs/${_id}`);