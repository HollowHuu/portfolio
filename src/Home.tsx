import { Component } from "solid-js/types/server/rendering.js";
import { GithubCard, Language } from "./Components/githubcard";
import { Profile } from "./Components/profile";
import { Technology } from "./Components/technology";
import { Project } from "./Components/projects";
import { ContactDetails } from "./Components/contactDetails";

const Home: Component = () => {
  return (
    <div class="min-h-screen bg-neutral-950">
      <Profile userId={2} />

      {/* adjust padding for offset */}
      <div class="p-20"></div>
      <Technology userId={2} />
      <Project userId={2} />
      <ContactDetails userId={2} />
    </div>
  );
};

export default Home;
