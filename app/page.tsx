import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Entrepreneurs from '@/components/sections/Entrepreneurs';
import ContactForm from '@/components/sections/ContactForm';
import Mission from '@/components/sections/Mission';
import UniquePoints from '@/components/sections/UniquePoints';
import Products from '@/components/sections/Products';
import YouthVending from '@/components/sections/YouthVending';
import ReferralProgram from '@/components/sections/ReferralProgram';
import ContactUs from '@/components/sections/ContactUs';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section id="hero">
          <Hero />
        </section>
        <section id="about">
          <Entrepreneurs />
          <Mission />
        </section>
        <section id="services">
          <UniquePoints />
          <Products />
        </section>
        <section id="contact">
          <ContactForm />
          <ReferralProgram />
        </section>
        <section id="contact-us">
          <ContactUs />
        </section>
      </main>
      <Footer />
    </div>
  );
}
