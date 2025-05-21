import { About, Blog, Form, Hero, Navbar, News, Projects } from "../components";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <div className="bg-news_bg_color mb-16">
        <News />
        <Projects />
      </div>
      <Blog />
      <Form />
    </div>
  );
}
