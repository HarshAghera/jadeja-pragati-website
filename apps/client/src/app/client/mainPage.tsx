import Services from "../sections/services";
import  HomePage  from "../sections/homePage";
import AboutUs from "../sections/aboutUs";
import WhyChooseUs from "../sections/whyChooseUs";
import Testimonials from "../sections/testimonials";

export default function MainPage() {
  return (
    <main>
      <HomePage />
      <Services />
      <AboutUs />
      <WhyChooseUs />
      <Testimonials />
    </main>
  );
}
