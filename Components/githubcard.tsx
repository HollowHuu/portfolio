import { Component } from "solid-js";

interface GithubCardProps {
  url: string;
  name: string;
  description: string;
  language: Language;
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
  [Language.Rust, "#000000"],
  [Language.Go, "#00ADD8"],
  [Language.C, "#555555"],
  [Language.Cpp, "#f34b7d"],
  [Language.Java, "#b07219"],
  [Language.CSharp, "#178600"],
  [Language.Kotlin, "#F18E33"],
  [Language.Dart, "#00B4AB"],
]);

export const GithubCard: Component = (props: GithubCardProps) => {
  return (
    <div>
      <a href={props.url}>
        <h3>{props.name}</h3>
        <p>{props.description}</p>
        <span style={{ color: LanguageColor.get(props.language) }}>
          {Language[props.language]}
        </span>
      </a>
    </div>
  );
};
