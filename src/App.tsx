import type { Component } from "solid-js";
import styles from "./App.module.css";
import { GithubCard, Language } from "./Components/githubcard";

const App: Component = () => {
  return (
    <div class={styles.App}>
      {/* A portfolio website for https://github.com/hollowhuu */}
      <header class={styles.header}>
        <h1 class="bg-white text-black px-2 text-7xl">HollowHuu</h1>
        <h2 class="py-2 text-4xl">Software Developer</h2>
      </header>

      <main class={styles.main + " py-10 px-5"}>
        <section class={styles.section}>
          <h3 class="text-3xl">Projects</h3>
          <div class="flex justify-center gap-4">
            <GithubCard
              url="https://github.com/hollowhuu/portfolio"
              name="Portfolio"
              description="My portfolio website"
              language={Language.TypeScript}
              image="https://cdn.discordapp.com/attachments/702085428185923586/1333043190910943323/image.png?ex=679774b7&is=67962337&hm=9077250c0d6ee74e6d89e9f5af1c27fb582c96886450528cef15d47313441df3&"
            />
            <GithubCard
              url="https://github.com/hollowhuu/lunar-bot"
              name="Lunar Bot"
              description="A Discord bot written in Rust"
              language={Language.Rust}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
