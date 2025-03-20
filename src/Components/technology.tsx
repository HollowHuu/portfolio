import {
  Component,
  createSignal,
  Show,
  createResource,
  Match,
  Switch,
} from "solid-js";

import ITechnology from "../Interfaces/ITechnology";

interface TechnologyProps {
  userId: number;
}

interface IconProps {
  url: string;
  name: string;
}

const Icon: Component<IconProps> = (props) => {
  return (
    <li class="relative">
      <div class="group inline-block">
        <img
          src={props.url}
          alt=""
          class="mx-auto rounded-sm group-hover:hidden"
          width={32}
          height={32}
          decoding="async"
        />
        <span class="mx-auto mb-1 hidden w-max rounded-md bg-transparent p-1 text-center text-sm font-medium text-emerald-300 opacity-100 backdrop-blur group-hover:inline">
          {props.name}
        </span>
      </div>
    </li>
  );
};

export const Technology: Component<TechnologyProps> = (props) => {
  // Fetch technologies from the backend
  const [technologies] = createResource(props.userId, fetchTechnologies);

  // Function to fetch technologies
  async function fetchTechnologies(userId: number): Promise<ITechnology[]> {
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:5003/technology`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else if (response.status === 404) {
      // If no technologies exist, return default values
      return [
        {
          id: 1,
          name: "Languages",
          icons: [
            { svgUrl: "https://svgl.app/library/csharp.svg", name: "C#" },
            {
              svgUrl: "https://svgl.app/library/golang_dark.svg",
              name: "Golang",
            },
            {
              svgUrl: "https://svgl.app/library/typescript.svg",
              name: "TypeScript",
            },
            { svgUrl: "https://svgl.app/library/rust_dark.svg", name: "Rust" },
            { svgUrl: "https://svgl.app/library/c.svg", name: "C" },
            { svgUrl: "https://svgl.app/library/dart.svg", name: "Dart" },
          ],
          userId: userId,
        },
        {
          id: 2,
          name: "Backend",
          icons: [
            {
              svgUrl:
                "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg",
              name: "ASP Net Core",
            },
            {
              svgUrl: "https://svgl.app/library/expressjs_dark.svg",
              name: "Express.JS",
            },
            { svgUrl: "https://svgl.app/library/nodejs.svg", name: "NodeJS" },
          ],
          userId: userId,
        },
      ];
    } else {
      throw new Error("Failed to fetch technologies");
    }
  }

  return (
    <>
      <div class="py-8 sm:py-16">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="max-w-2xl lg:mx-0">
            <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Technology
            </h2>
            <p class="mt-2 text-lg leading-8 text-white">
              Here's what I typically work with.
            </p>
          </div>
          <Switch>
            <Match when={technologies.loading}>
              <div class="mt-6 text-white">Loading technologies...</div>
            </Match>
            <Match when={technologies()}>
              <ul class="mx-auto mt-6 box-border columns-1 gap-[1em] md:columns-2 lg:columns-3">
                <For each={technologies()}>
                  {(technology) => (
                    <li class="mb-2 break-inside-avoid rounded-lg bg-neutral-800/50 p-5 hover:bg-neutral-800/75">
                      <div class="flex max-w-7xl items-center justify-between border-b-2 border-red-500">
                        <div class="text-lg font-semibold leading-8 tracking-tight text-white">
                          {technology.name}
                        </div>
                      </div>
                      <ul class="mx-auto mt-8 grid grid-cols-3 gap-9 text-center lg:mx-0 lg:max-w-none">
                        <For each={technology.icons}>
                          {(icon) => (
                            <Icon name={icon.name} url={icon.svgUrl} />
                          )}
                        </For>
                      </ul>
                    </li>
                  )}
                </For>
              </ul>
            </Match>
          </Switch>
        </div>
      </div>
    </>
  );
};
