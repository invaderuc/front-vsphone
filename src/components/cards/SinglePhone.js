/* eslint-disable jsx-a11y/anchor-is-valid */
import { Card, Tabs } from "antd";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Laptop from "../../images/laptop.png";
import PhoneListItems from "./PhoneListItems";

const { TabPane } = Tabs;

// this is childrend component of Phone page
const SinglePhone = ({ phone }) => {

  const { name, images, description } = phone;

  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images && images.map((i) => <img alt="carousel-img-prod" src={i.url} key={i.public_id} />)}
          </Carousel>
        ) : (
          <Card cover={<img alt="cov-not-prod" src={Laptop} className="mb-3 card-image" />}></Card>
        )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
          <table class="table">
              <tbody>
                <tr>
                  <th scope="row">High</th>
                  <td>{ phone.high} millimeters</td>
                </tr>
                <tr>
                  <th scope="row">Width</th>
                  <td>{ phone.width} millimeters</td>
                </tr>
                <tr>
                  <th scope="row">Length</th>
                  <td>{ phone.length} millimeters</td>
                </tr>
                <tr>
                  <th scope="row">Weight</th>
                  <td>{ phone.weight} grams</td>
                </tr>
              </tbody>
          </table>
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="bg-info p-3">{name}</h1>
        <Card>
          <PhoneListItems phone={phone} />
        </Card>
      </div>
    </>
  );
};

export default SinglePhone;
