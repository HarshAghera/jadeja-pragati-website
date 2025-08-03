import TestimonialsSlider from "../client/components/testimonials/slider";

const testimonials = [
  {
    name: "Abhishek Bamta",
    role: " All Scrap 1 Recycle",
    text: "Jadeja Pragati helped us set up our tyre recycling plant in Jafrabad with support — from licenses to machinery and approvals. Their team is knowledgeable, reliable, and made the process easy. Highly recommended for anyone starting a recycling business!",
    stars: 5,
  },
  {
    name: "Pratik Patel",
    role: " Shree Gurukrupa Enterprise",
    text: "We approached Jadeja Pragati for help with the GPCB license, and they handled everything professionally. Their team guided us step-by-step and completed the process smoothly and on time. Truly reliable consultancy for environmental clearances!",
    stars: 5,
  },
  {
    name: "Amit Vasani",
    role: "Vihana Enterprise",
    text: "Jadeja Pragati helped us get our import license quickly and without complications. Their team explained the process clearly and handled all the paperwork efficiently. Excellent support for anyone starting import-related business!",
    stars: 5,
  },
  {
    name: "Narendrasinh Rana",
    role: "Divyaraj Rubber",
    text: "Jadeja Pragati gave us complete support and clear guidance on starting our import operations. From understanding the process to choosing the right licenses, their advice was practical and easy to follow. Highly recommended for new importers!",
    stars: 5,
  },
  {
    name: "Dharmendrasinh Zala",
    role: "Alternate Fuel",
    text: "Jadeja Pragati guided us perfectly during our factory visits and official inspections. Their team ensured everything was in order and compliant, which helped us clear approvals smoothly. Truly dependable for on-site consultancy and audit preparation!",
    stars: 5,
  },
];

const Testimonials = () => {
  return (
    <div className="relative bg-gradient-to-br from-[#dbe3ec]/50 via-[#f2f6fa]/50 to-white/60 py-11 px-4">
      <div className="absolute inset-0 opacity-10 bg-cover bg-no-repeat pointer-events-none z-0" />
      <div className="relative max-w-6xl mx-auto text-center text-[#0f2557] z-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl mb-4">
          What our <span className="text-[#0f2557]">Clients Say</span>
        </h1>
        <p className="text-[#0f2557]/70 mb-10">
          Hear Directly From Our Satisfied Partners
        </p>

        <TestimonialsSlider testimonials={testimonials} />

        <div className="custom-pagination mt-6 flex justify-center space-x-2"></div>
      </div>
    </div>
  );
};

export default Testimonials;
