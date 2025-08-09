import React from "react";
import Image from "next/image";
import "@/app/styles/whyChooseUs.css";

const WhyChooseUs = () => {
  return (
    <section className="whychooseus-container">
      <div className="box blue top-left">
        <div className="icon">
          <Image
            src="/icons/expert_led.webp"
            alt="Exper-led Consultancy"
            width={50}
            height={50}
          />
        </div>
        <h3>EXPERT-LED CONSULTANCY</h3>
        <p>
          Our team of seasoned professionals brings deep industry knowledge to
          every project. We guide you through complex regulations with
          confidence and clarity.
        </p>
      </div>

      <div className="box white bottom-left">
        <div className="icon">
          <Image
            src="/icons/reliable.webp"
            alt="Reliable service"
            width={50}
            height={50}
          />
        </div>
        <h3>TRANSPARENT & RELIABLE SERVICE</h3>
        <p>
          We believe in honesty, accountability, and timely delivery. Our
          clients trust us for clear communication and dependable results.
        </p>
      </div>

      <div className="center-image">
        <Image
          src="/pictures/boy.webp"
          alt="Why Choose Us"
          width={400}
          height={400}
          className="center-img"
        />
      </div>

      <div className="right-top">
        <h1>
          WHY <span>CHOOSE</span> US?
        </h1>
        <p>
          Everyday we work hard to make life of our clients better and happier.
        </p>
      </div>

      <div className="box blue bottom-right-left">
        <div className="icon">
          <Image
            src="/icons/end_support.webp"
            alt="End Support"
            width={50}
            height={50}
          />
        </div>
        <h3>END-TO-END SUPPORT</h3>
        <p>
          From licensing and compliance to business setup, we manage it all. You
          focus on growth — we handle the paperwork and procedures.
        </p>
      </div>

      <div className="box white bottom-right-right">
        <div className="icon">
          <Image
            src="/icons/customize_solutions.webp"
            alt="Customized solutions"
            width={50}
            height={50}
          />
        </div>
        <h3>CUSTOMIZED SOLUTIONS</h3>
        <p>
          We tailor every service to meet your specific business goals and
          sector needs. No one-size-fits-all — just practical, results-driven
          strategies.
        </p>
      </div>
    </section>
  );
};

export default WhyChooseUs;
