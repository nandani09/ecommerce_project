import React from 'react';
import { Carousel } from 'react-bootstrap';

const MyCarousel = () => {
  return (
    <div className="d-flex justify-content-center align-items-center w-100" style={{ minHeight: "60vh" }}>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-50 mx-auto"
            src="/images/banner.png"
            alt="First slide"
          />
          <Carousel.Caption>
            
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-50 mx-auto"
            src="/images/banner.png"
            alt="Second slide"
          />
          <Carousel.Caption>
            
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default MyCarousel;
