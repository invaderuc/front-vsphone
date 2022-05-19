import React from "react";

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
    battery,
    storage,
    ram,
    weight,
    high,
    width,
    length,
    brand
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
        <label>RAM</label>
        <input
          type="number"
          name="ram"
          className="form-control"
          value={ram}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Storage</label>
        <input
          type="number"
          name="storage"
          className="form-control"
          value={storage}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Battery</label>
        <input
          type="number"
          name="battery"
          className="form-control"
          value={battery}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Weight</label>
        <input
          type="number"
          name="weight"
          className="form-control"
          value={weight}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>High</label>
        <input
          type="number"
          name="high"
          className="form-control"
          value={high}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Width</label>
        <input
          type="number"
          name="width"
          className="form-control"
          value={width}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Length</label>
        <input
          type="number"
          name="length"
          className="form-control"
          value={length}
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
