import React, { useState, useEffect } from "react";
import "../styles/home.css";

import { Container, Row, Col } from "reactstrap";

import heroImg from "../assets/images/hero-img01.jpeg";
import heroImg02 from "../assets/images/hero-img02.png";
import heroImg03 from "../assets/images/hero-img03.jpeg";
import worldImg from "../assets/images//world.png";

import exerienceImg from "../assets/images/experience.jpg";
import Subtitle from "../shared/Subtitle";
import Testimonials from "../components/Testimonial/Testimonials";

const Home = () => {
  return (
    <>
      {/* ========= hero section start */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle subtitle={"Know Before You Done"} />
                  <img src={worldImg} alt="" />
                </div>
                <h1>
                  TrustShield opens the door to better{" "}
                  <span className="highlight">customer service</span>
                </h1>
                <p>
                  We uphold the highest standards of integrity and transparency
                  in our processes. Any attempt to manipulate or falsify
                  documents will not be tolerated. Our commitment to combatting
                  fraud is unwavering, as we strive to maintain the integrity of
                  our customs procedures. Applicants found engaging in
                  fraudulent activities will face severe consequences in
                  accordance with the law. We appreciate your cooperation in
                  upholding the principles of honesty and trustworthiness in all
                  dealings with the Sri Lanka Customs Department.
                </p>
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-1">
                <img src={heroImg} alt="" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-5 ">
                <img src={heroImg03} alt="" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-5">
                <img src={heroImg02} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* ========= hero section end */}

      {}

      {/* ========= experience section start ========= */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="experiemce__content">
                <Subtitle subtitle={"Exeprience"} />

                <h2>
                  With our all experience <br /> we will serve you{" "}
                </h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit
                  <br />
                  Officiis minus tenetur facere cum sint reiciendis nostrum
                </p>
              </div>

              <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>12k+</span>
                  <h6>Successful Rounds</h6>
                </div>
                <div className="counter__box">
                  <span>2k+</span>
                  <h6>Regular Clients</h6>
                </div>
                <div className="counter__box">
                  <span>10</span>
                  <h6>Years experience</h6>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="experience__img">
                <img src={exerienceImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ========= experience section start ========= */}

      {/* ========= testiminial section start ========= */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Reviews"} />
              <h2 className="testimonial__title">
                What our Customers say about us
              </h2>
            </Col>
            <Col lg="12">
              <Testimonials />
            </Col>
          </Row>
        </Container>
      </section>

      {/* ========= testiminial section end ========= */}
    </>
  );
};
export default Home;
