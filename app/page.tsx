import { About, Blog, Form, Hero, News, Projects } from "../components";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <div className="bg-news_bg_color">
        <News />
        <Projects />
      </div>

      <div className="bg-form_bg">
      <Blog />

      </div>
      <Form />
    </div>
  );
}
