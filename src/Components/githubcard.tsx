// NOTICE - Deprecated

import { Component } from "solid-js";

interface GithubCardProps {
  url: string;
  name: string;
  description: string;
  language: Language;
  image?: string;
}

export enum Language {
  TypeScript,
  JavaScript,
  Python,
  Rust,
  Go,
  C,
  Cpp,
  Java,
  CSharp,
  Kotlin,
  Dart,
}

const LanguageColor = new Map<Language, string>([
  [Language.TypeScript, "#2b7489"],
  [Language.JavaScript, "#f1e05a"],
  [Language.Python, "#3572A5"],
  [Language.Rust, "#C9441B"],
  [Language.Go, "#00ADD8"],
  [Language.C, "#555555"],
  [Language.Cpp, "#f34b7d"],
  [Language.Java, "#b07219"],
  [Language.CSharp, "#178600"],
  [Language.Kotlin, "#F18E33"],
  [Language.Dart, "#00B4AB"],
]);

export const GithubCard: Component<GithubCardProps> = (props) => {
  return (
    <div class="bg-gray-500 rounded-lg w-150">
      <a href={props.url}>
        <h3 class="text-2xl">{props.name}</h3>
        <p>{props.description}</p>
        {/* Language name + dot with language colour */}
        <span
          class="inline-block rounded-full px-2 py-1 text-sm font-semibold"
          style={{ "background-color": LanguageColor.get(props.language) }}
        >
          {Language[props.language]}
        </span>
        {props.image && <img class="w-fit" src={props.image} />}
      </a>
    </div>
  );
};
