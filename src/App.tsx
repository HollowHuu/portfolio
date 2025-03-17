import type { Component } from "solid-js";
import styles from "./App.module.css";
import { GithubCard, Language } from "./Components/githubcard";
import { Profile } from "./Components/profile";
import { Technology } from "./Components/technology";
import { Project } from "./Components/projects";

const App: Component = () => {
  return (
    <div class={styles.App}>
      {/* A portfolio website for https://github.com/hollowhuu */}
      <div class="min-h-screen bg-neutral-950">
        <Profile userId={2}/>

        {/* adjust padding for offset */}
        <div class="p-20"></div>
        <Technology userId={2} />
        <Project userId={2}/>
      </div>

      
    </div>
  );
};

export default App;
