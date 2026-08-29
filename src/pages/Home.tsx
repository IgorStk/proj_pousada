import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Sobre } from "../components/Sobre";
import { Comodidades } from "../components/Comodidades";
import { Quartos } from "../components/Quartos";
import { BookingWidget } from "../components/BookingWidget";
import { Localizacao } from "../components/Localizacao";
import { Footer } from "../components/Footer";

export function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Sobre />
      <Comodidades />
      <Quartos />
      <BookingWidget />
      <Localizacao />
      <Footer />
    </>
  );
}
