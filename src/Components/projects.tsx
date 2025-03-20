import {
  Component,
  createSignal,
  Show,
  createResource,
  Match,
  Switch,
  For,
} from "solid-js";
import { IconProps } from "./technology";

interface ProjectProps {
  userId: number;
}

interface ProjectCardProps {
  imgUrl: string;
  name: string;
  description: string;
  projectUrl: string;
  svgUrl: string;
  icons: IconProps[];
}

interface IProject {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  svgUrl: string;
  url: string;
  icons: IconProps[];
  userId: number;
}

const Icon: Component<IconProps> = (props) => {
  return (
    <li class="relative mt-4 h-8 w-8">
      <span class="group">
        <img
          class="w-full"
          src={props.url}
          alt={props.name}
          width={32}
          height={32}
        />
        <span class="absolute bottom-full left-1/2 mb-1 hidden w-max -translate-x-1/2 transform rounded-md border-2 border-sky-300/75 bg-transparent p-1 text-sm text-white opacity-100 shadow-lg backdrop-blur group-hover:inline">
          {props.name}
        </span>
      </span>
    </li>
  );
};

export const ProjectCard: Component<ProjectCardProps> = (props) => {
  return (
    <li class="mb-6 break-inside-avoid rounded-lg bg-neutral-800/50 p-5 hover:bg-neutral-800/75">
      <img
        class="aspect-[3/2] rounded-lg object-contain"
        src={props.imgUrl}
        alt=""
        width={600}
        height={400}
        style="color: transparent;"
      />
      <div class="mt-6 flex max-w-7xl items-center justify-between border-b-2 border-red-500">
        <div class="text-lg font-semibold leading-8 tracking-tight text-white">
          {props.name}
        </div>
        <div class="flex items-center justify-between">
          <a class="ml-1" target="_blank" href={props.projectUrl}>
            <img src={props.svgUrl} class="h-6 w-6" />
          </a>
        </div>
      </div>
      <p class="mt-2 text-base leading-7 text-emerald-300">
        {props.description}
      </p>
      <ul class="flex items-center justify-evenly gap-x-3" role="list">
        <For each={props.icons}>
          {(icon) => <Icon name={icon.name} url={icon.svgUrl} />}
        </For>
      </ul>
    </li>
  );
};

export const Project: Component<ProjectProps> = (props) => {
  // Fetch projects from the backend
  const [projects] = createResource(props.userId, fetchProjects);

  // Function to fetch projects
  async function fetchProjects(userId: number): Promise<IProject[]> {
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:5003/project`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else if (response.status === 404) {
      // If no projects exist, return default values
      return [
        {
          id: 1,
          name: "My Portfolio",
          description: "My portfolio website.",
          imageUrl:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fkonachan.com%2Fimage%2F50d9f5adf2822f0feca92d3af176fa85%2FKonachan.com%2520-%2520109011%2520aqua_hair%2520chibi_miku%2520transparent%2520vector%2520vocaloid.png&f=1&nofb=1&ipt=0dac1a0a5031ddd380e035987212a4d27adc566fb01dfa50cdeadf4d9066f131&ipo=images",
          svgUrl: "https://svgl.app/library/expressjs_dark.svg",
          url: "",
          icons: [
            {
              name: "Tailwind CSS",
              url: "https://svgl.app/library/tailwindcss.svg",
            },
          ],
          userId: userId,
        },
      ];
    } else {
      throw new Error("Failed to fetch projects");
    }
  }

  return (
    <div class="pt-8 sm:pt-16">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="max-w-2xl lg:mx-0">
          <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Featured Projects
          </h2>
          <p class="mt-2 text-lg leading-8 text-white"></p>
        </div>
        <Switch>
          <Match when={projects.loading}>
            <div class="mt-6 text-white">Loading projects...</div>
          </Match>
          <Match when={projects()}>
            <ul
              class="mx-auto mt-6 box-border columns-1 gap-[1em] space-y-4 md:columns-2 lg:columns-3"
              role="list"
            >
              <For each={projects()}>
                {(project) => (
                  <ProjectCard
                    imgUrl={project.imageUrl}
                    name={project.name}
                    description={project.description}
                    svgUrl={project.svgUrl}
                    projectUrl={project.url}
                    icons={project.icons}
                  />
                )}
              </For>
            </ul>
          </Match>
        </Switch>
      </div>
    </div>
  );
};
