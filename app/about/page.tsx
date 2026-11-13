import Header from "@/components/Header";
import AboutPage from "@/components/AboutPage";
import Contact from "@/components/Contact";

export const metadata = { title: "About — Beibarys" };

export default function Page() {
  return (
    <main>
      <Header />
      <AboutPage />
      <Contact />
    </main>
  );
}
