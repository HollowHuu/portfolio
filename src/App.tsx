import type { Component } from "solid-js";
import styles from "./App.module.css";

const App: Component = () => {
  return (
    <div class={styles.App}>
      {/* A portfolio website for https://github.com/hollowhuu */}
      <header class={styles.header}>
        <h1 class="bg-white text-black px-2 text-7xl">HollowHuu</h1>
        <h2 class="py-2 text-4xl">Software Developer</h2>
      </header>

      <main class={styles.main}>
        <section class={styles.section}>
          <h3 class="text-3xl">Projects</h3>
          <ul>
            <li>
              <a
                href="https://github.com/HollowHuu/lunar-bot"
                class="text-blue-500"
              >
                Lunar Bot
              </a>

              <p>Just a simple bot for Discord.</p>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default App;
