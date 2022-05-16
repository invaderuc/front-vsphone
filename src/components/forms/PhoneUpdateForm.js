import React from "react";
import { Select } from "antd";

const { Option } = Select;

const PhoneUpdateForm = ({
  handleSubmit,
  handleChange,
  values,
  handleBrandChange,
  brands,
  selectedBrand,
}) => {
  // destructure
  const {
    name,
    description,
    price,
    brand,
    brands,
  } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={price}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Brand</label>
        <select
          name="brand"
          className="form-control"
          onChange={handleBrandChange}
          value={selectedBrand ? selectedBrand : brand._id}
        >
          {brands.length > 0 &&
            brands.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <br />
      <button className="btn btn-outline-info">Save</button>
    </form>
  );
};

export default PhoneUpdateForm;
