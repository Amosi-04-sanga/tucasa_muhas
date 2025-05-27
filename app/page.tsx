import { About, Blog, Form, Hero, News, Projects } from "../components";

export default function Home() {
  return (
    <div>
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
