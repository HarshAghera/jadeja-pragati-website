import React from "react";
import Image from "next/image";
import "@/app/Styles/whyChooseUs.css";

const WhyChooseUs = () => {
  return (
    <section className="whychooseus-container">
      {/* Left Top Box */}
      <div className="box blue top-left">
        <div className="icon">💡</div>
        <h3>SAMPLE HEADLINE</h3>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem non similique eum inventore saepe accusamus eligendi eaque temporibus nesciunt consequuntur.</p>
      </div>

      {/* Left Bottom Box */}
      <div className="box white bottom-left">
        <div className="icon">🕒</div>
        <h3>SAMPLE HEADLINE</h3>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati, eligendi fugiat quas iusto quia quis temporibus non pariatur excepturi accusamus!</p>
      </div>

      {/* Center Image */}
      <div className="center-image">
        <Image
          src="/boy.jpg"
          alt="Why Choose Us"
          width={400}
          height={400}
          className="center-img"
        />
      </div>

      {/* Right Top Text */}
      <div className="right-top">
        <h1>
          WHY <span>CHOOSE</span> US?
        </h1>
        <p>
          Everyday we work hard to make life of our clients better and happier.
        </p>
      </div>

      {/* Right Bottom Left Box */}
      <div className="box blue bottom-right-left">
        <div className="icon">📅</div>
        <h3>SAMPLE HEADLINE</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque dolorem dignissimos itaque nostrum, quis harum non magnam dicta, molestiae nam iste voluptate earum fuga accusantium?</p>
      </div>

      {/* Right Bottom Right Box */}
      <div className="box white bottom-right-right">
        <div className="icon">⚙️</div>
        <h3>SAMPLE HEADLINE</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis deserunt maiores ipsa vero eos porro eius maxime nam non dicta dolor, delectus vitae omnis iure?</p>
      </div>
    </section>
  );
};

export default WhyChooseUs;
