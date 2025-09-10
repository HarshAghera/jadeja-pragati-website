import Image from "next/image";

const cards = [
  {
    title: "Easy Registration",
    description:
      "LLP registration is simple and quick with minimal paperwork required.",
    img: "/pictures/about-llp.webp",
  },
  {
    title: "Limited Liability",
    description:
      "Partners are not personally liable for business debts, offering financial protection.",
    img: "/pictures/about-llp.webp",
  },
  {
    title: "Flexible Structure",
    description:
      "LLPs combine the benefits of partnerships and companies with fewer compliance requirements.",
    img: "/pictures/about-llp.webp",
  },
  {
    title: "Tax Benefits",
    description:
      "LLPs enjoy taxation benefits while maintaining flexibility in operations.",
    img: "/pictures/about-llp.webp",
  },
];

export default function GlassLLPCards() {
  return (
    <section
      className="py-16 px-6 sm:px-10 lg:px-20 
                    bg-gradient-to-br from-[#0f2557] via-[#11234e] to-[#676666]"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {cards.map((card, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-center sm:items-start 
                       bg-white/10 backdrop-blur-[20px] border border-white/25 
                       shadow-2xl rounded-3xl overflow-hidden transition-all duration-300
                       hover:bg-white/20 hover:backdrop-blur-[25px] p-4 sm:p-6"
          >
            {/* Image */}
            <div className="relative w-full sm:w-1/2 h-56 sm:h-64 flex-shrink-0 rounded-2xl overflow-hidden">
              <Image
                src={card.img}
                alt={card.title}
                fill
                className="object-cover w-full h-full"
              />
            </div>

            {/* Text */}
            <div className="p-4 sm:p-6 text-white sm:w-1/2">
              <h3 className="text-2xl font-semibold mb-3">{card.title}</h3>
              <p className="text-white/80 leading-relaxed">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
