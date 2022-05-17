/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Slider, Checkbox, Radio } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  LoadingOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { getBrands } from "../functions/brand";
import {
  getPhonesByCount,
  fetchPhonesByFilter,
} from "../functions/phone";
import PhoneCard from "../components/cards/PhoneCard";

const { SubMenu } = Menu;

const Phones = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  const [phones, setPhones] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [brands, setBrands] = useState([]);
  const [brandIds, setBrandIds] = useState([]);

  useEffect(() => {
    getBrands().then((res) => setBrands(res.data));
  }, []);

  const pushOrSpliceArray = (index, array, value) =>
    index === -1 ? array.push(value) : array.splice(index, 1);

  const fetchPhones = (arg) => {
    setLoaded(false);
    fetchPhonesByFilter(arg).then((res) => {
      setPhones(res.data);
      setLoaded(true);
    });
  };

  // 1. load phones by default on page load
  const loadAllPhones = () => {
    setLoaded(false);
    getPhonesByCount(12).then((p) => {
      setPhones(p.data);
      setLoaded(true);
    });
  };

  // 2. load phones on user search input
  useEffect(() => {
    const delayed = setTimeout(
      () => (text ? fetchPhones({ query: text }) : loadAllPhones()),
      300
    );
    return () => clearTimeout(delayed);
  }, [text]);

  // 3. load phones based on price
  const handleSlider = (value) => {
    dispatch({ type: "SEARCH_QUERY", payload: { text: "" } });
    setBrandIds([]);
    setPrice(value);
    setTimeout(() => fetchPhones({ price: value }), 300);
  };

  // 4. load phones based on brand
  // show brands in a list of checkbox
  const showBrands = () =>
    brands.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4"
          value={c._id}
          name="brand"
          checked={brandIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  // handle check for brands
  const handleCheck = (e) => {
    dispatch({ type: "SEARCH_QUERY", payload: { text: "" } });
    setPrice([0, 0]);
    const inTheState = [...brandIds];
    const justChecked = e.target.value;
    const foundInTheState = inTheState.indexOf(justChecked);
    pushOrSpliceArray(foundInTheState, inTheState, justChecked);
    setBrandIds(inTheState);
    fetchPhones({ brand: inTheState });
  };

 
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <h4>Search/Filter</h4>
          <hr />

          <Menu
            defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]}
            mode="inline"
          >
            {/* price */}
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined /> Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="4999"
                />
              </div>
            </SubMenu>

            {/* brand */}
            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Brands
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }}>{showBrands()}</div>
            </SubMenu>

          </Menu>
        </div>

        <div className="col-md-9 pt-2">
          {!loaded && <LoadingOutlined />}
          {loaded && <h4 className="text-danger">Phones</h4>}
          {loaded && !phones.length && <p>No phones found</p>}
          {loaded && !!phones.length && (
            <div className="row pb-5">
              {phones.map((p) => (
                <div key={p._id} className="col-md-4 mt-3">
                  <PhoneCard phone={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Phones;
