import { Blog } from "../types/blog";

export async function fetchBlogs(): Promise<Blog[]> {
  return [
    {
      slug: "one-life-one-tree",
      title: "One Life, One Tree",
      description:
        "One Life, One Tree is a movement encouraging each person to plant one tree in their lifetime. It’s a simple step toward a greener, healthier planet for future generations.",
      content: `
        <h1>One Life, One Tree 🌱</h1>
        
        <p>
          Imagine if every person on Earth planted just one tree in their lifetime. That’s the heart of the <strong>"One Life, One Tree"</strong> movement — a global call to action that transforms individual responsibility into collective impact. Trees are more than just greenery — they are the lungs of our planet, the homes of biodiversity, and silent guardians of climate balance.
        </p>
        
        <h2>🌍 Why One Tree Matters</h2>
        <p>
          A single tree can absorb up to 22 kg of carbon dioxide per year, provide oxygen for two people, cool the surrounding air, and serve as habitat for countless species. Planting one tree is not just symbolic — it's scientifically powerful.
        </p>
        
        <h2>👤 One Person Can Make a Difference</h2>
        <p>
          You don’t need to be an environmentalist to make a positive impact. Whether you’re a student, a teacher, a parent, or a business owner — planting a tree is a simple act that transcends age, profession, and borders. One person. One life. One tree.
        </p>
        
        <h2>📸 Stories of Change</h2>
        <p>
          From rural farmers in India planting mango saplings for their grandchildren, to students in Kenya growing acacia trees in schoolyards — the <strong>"One Life, One Tree"</strong> movement is blooming with inspiring stories. Each tree has a story, and each planter becomes part of something bigger than themselves.
        </p>
        
        <h2>🌳 How to Join the Movement</h2>
        <ul>
          <li>🌱 Choose a native tree species suitable for your region</li>
          <li>🌦 Plant during the right season — typically just before the rainy period</li>
          <li>🧑‍🌾 Water regularly and protect the sapling during its first year</li>
          <li>📷 Share your planting moment on social media using <code>#OneLifeOneTree</code></li>
        </ul>
        
        <h2>🤝 Partnering for the Planet</h2>
        <p>
          Local governments, schools, and NGOs can collaborate to scale this movement. Tree-planting drives, awareness workshops, and eco-clubs can all be part of the initiative. It's a perfect community-building opportunity with long-term environmental rewards.
        </p>
        
        <h2>🌟 Final Thought</h2>
        <p>
          We often think changing the world requires grand actions. But sometimes, it starts with digging a small hole, placing a young sapling, and giving it hope. With <strong>One Life, One Tree</strong>, we can create a greener legacy — one human, one tree at a time.
        </p>
        `,

      image: "/blogs/onelife.png",
      date: "2025-04-10",
    },
    {
      slug: "eyes-in-the-wild",
      title: "Eyes in the Wild",
      description:
        "Eyes in the Wild invites you to observe wildlife through a deeper lens — seeing emotion, behavior, and hidden beauty in every creature. It's about connecting with nature beyond the surface, with awe and respect.",
      content: `<h1>Witness Wildlife as You've Never Seen Before</h1>

            <p>
              Nature is full of life, secrets, and raw beauty — but most of us only scratch the surface.
              <strong>"Eyes in the Wild"</strong> invites you into the heart of the wilderness, where each glance
              reveals a hidden story, and every creature plays a vital role in Earth's grand ecosystem.
              Let’s open our eyes to the untamed world, one encounter at a time.
            </p>

        <h2>1. 🐆 Unseen Moments: When the Wild Comes Alive</h2>
        <p>
          Wildlife isn’t always about what we see — it’s often about what we miss. Cameras trap rare
          expressions: a tiger yawning under the morning sun, an owl blinking slowly in moonlight,
          or a fawn taking its first shaky step. These moments, fleeting and silent, remind us that
          the wild is constantly alive — whether we’re watching or not.
        </p>

        <h2>2. 🐘 The Language of the Eyes</h2>
        <p>
          Animals speak volumes through their eyes — curiosity, fear, protection, even love. A mother
          elephant’s calm gaze as she shields her calf, or a leopard’s intense stare from a tree —
          these aren’t just stares. They're instinctual communication. Observing these "eyes in the wild"
          is like reading nature’s unspoken language.
        </p>

        <h2>3. 🦅 Bird’s Eye Views: Seeing From Above</h2>
        <p>
          To truly witness wildlife, we must sometimes shift perspective. Soaring birds like eagles,
          hawks, and vultures see a world we can only imagine — vast, open, and full of patterns
          invisible from the ground. Their eyes are built for survival, scanning landscapes with
          precision honed by evolution. What would the wild look like through their eyes?
        </p>

        <h2>4. 🦓 Hidden in Plain Sight: Masters of Camouflage</h2>
        <p>
          Ever looked directly at a creature and not seen it? Many wild animals are masters of disguise —
          from leaf-tailed geckos to snow leopards blending perfectly into their rocky surroundings.
          Spotting them requires patience, sharp observation, and a trained eye. Once you do see them,
          it feels like unlocking a secret level of nature.
        </p>

        <h2>5. 📸 Through the Lens: How Wildlife Photography Reveals the Soul of the Wild</h2>
        <p>
          Wildlife photographers spend hours, even days, for a single shot — and often, what they capture
          isn't just an image, but an emotion. The glint in a lion’s eye, the shimmer on a dragonfly’s
          wings, or the cautious glance of a fox. These moments bring the wild closer to us and show us
          that every creature, big or small, lives with purpose, struggle, and grace.
        </p>

        <h2>🌍 Conclusion: Be a Silent Observer, a Respectful Guest</h2>
        <p>
          The wild doesn’t need our interference — it needs our respect. By simply observing, learning,
          and protecting, we become part of a global effort to keep nature’s stories alive. So next
          time you step into the wild — or simply look out into nature — remember to open your eyes
          not just to see, but to witness.
        </p>
          `,
      image: "/blogs/eyesOnAnimal.jpeg",
      date: "2025-04-10",
    },
  ];
}

export async function fetchBlogBySlug(slug: string): Promise<Blog | null> {
  const blogs = await fetchBlogs();
  return blogs.find((b) => b.slug === slug) || null;
}
