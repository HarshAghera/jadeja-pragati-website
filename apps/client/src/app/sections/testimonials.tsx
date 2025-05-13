import TestimonialsSlider from "../client/components/testimonials/slider";

const testimonials = [
  {
    name: "John Doe",
    role: "Head of Customer Experience at FinTech Global",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. In, tenetur perspiciatis repellendus veritatis fugiat quia necessitatibus atque voluptatum ullam deserunt.",
    stars: 5,
  },
  {
    name: "Elijah Ramirez",
    role: "Director of Operations at EcoHome Solutions",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. In, tenetur perspiciatis repellendus veritatis fugiat quia necessitatibus atque voluptatum ullam deserunt.",
    stars: 5,
  },
  {
    name: "Mia Song",
    role: "CTO at HealthBridgeTech",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. In, tenetur perspiciatis repellendus veritatis fugiat quia necessitatibus atque voluptatum ullam deserunt.",
    stars: 5,
  },
  {
    name: "Alice Kim",
    role: "Product Manager at GreenTech",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. In, tenetur perspiciatis repellendus veritatis fugiat quia necessitatibus atque voluptatum ullam deserunt.",
    stars: 4,
  },
  {
    name: "Leo Zhang",
    role: "CEO at MedAI Systems",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. In, tenetur perspiciatis repellendus veritatis fugiat quia necessitatibus atque voluptatum ullam deserunt.",
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
