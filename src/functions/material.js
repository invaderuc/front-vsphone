import axios from "axios";

export const getMaterials = async () =>
  await axios.get(`${process.env.REACT_APP_API}/materials`);

export const getMaterial = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/material/${slug}`);

export const removeMaterial = async (slug, authtoken) =>
  await axios.patch(
    `${process.env.REACT_APP_API}/material/${slug}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );

export const updateMaterial = async (slug, material, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/material/${slug}`, material, {
    headers: {
      authtoken,
    },
  });

export const createMaterial = async (material, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/material`, material, {
    headers: {
      authtoken,
    },
  });

export const getMaterialSubs = async (_id) =>
  await axios.get(`${process.env.REACT_APP_API}/material/subs/${_id}`);