import { Component, createSignal, Show, createResource, Match, Switch, For } from "solid-js";
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

const Icon: Component<IconProps> = (props) => {
    return (
        <li class="relative mt-4 h-8 w-8">
            <span class="group">
                <img class="w-full" src={props.url} alt={props.name} width={32} height={32} />
                <span class="absolute bottom-full left-1/2 mb-1 hidden w-max -translate-x-1/2 transform rounded-md border-2 border-sky-300/75 bg-transparent p-1 text-sm text-white opacity-100 shadow-lg backdrop-blur group-hover:inline">{props.name}</span>
            </span>
        </li>
    )
}

export const ProjectCard: Component<ProjectCardProps> = (props) => {
    return (
        <li class="mb-6 break-inside-avoid rounded-lg bg-neutral-800/50 p-5 hover:bg-neutral-800/75">
            <img class="aspect-[3/2] rounded-lg object-contain" src={props.imgUrl} alt="" width={600} height={400} style="color: transparent;" />
            <div class="mt-6 flex max-w-7xl items-center justify-between border-b-2 border-red-500">
                <div class="text-lg font-semibold leading-8 tracking-tight text-white">{props.name}</div>
                <div class="flex items-center justify-between">
                    <a class="ml-1" target="_blank" href={props.projectUrl}>
                        <img src={props.svgUrl} class="h-6 w-6"  />
                    </a>
                </div>
            </div>
            <p class="mt-2 text-base leading-7 text-emerald-300">{props.description}</p>
            <ul class="flex items-center justify-evenly gap-x-3" role="list">
                <For each={props.icons}>{(icon) => <Icon name={icon.name} url={icon.url}/> }</For>
            </ul>
        </li>
    )
}

export const Project: Component<ProjectProps> = (props) => {
    // const [contactInfo] = createResource(props.userId, fetchContactDetails);

    // // TODO - Implement fetching from backend
    // async function fetchContactDetails(id: number) {

    //     const contact: IContactDetails = {
    //         Id: 2,
    //         Email: "Test",
    //         PhoneNumber: "212",
    //         LinkedInUrl: ""
    //     }

    //     return contact
    // }

    return (
        <div class="pt-8 sm:pt-16">
            <div class="mx-auto max-w-7xl px-6 lg:px-8">
                <div class="max-w-2xl lg:mx-0">
                    <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">Featured Projects</h2>
                    <p class="mt-2 text-lg leading-8 text-white"></p>
                </div>
                <ul class="mx-auto mt-6 box-border columns-1 gap-[1em] space-y-4 md:columns-2 lg:columns-3" role="list">
                    <ProjectCard imgUrl="https://adityapunmiya.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdijxynt89%2Fimage%2Fupload%2Fv1725052376%2FAditya_os4fzb.jpg&w=640&q=75" 
                    name="My Portfolio" 
                    description={`My portfolio website to show off my skills, projects, experience and to take control of my "CSSphobia".`} 
                    svgUrl="https://svgl.app/library/expressjs_dark.svg"
                    projectUrl=""
                    icons={[
                        {name: "Tailwind CSS", url: "https://svgl.app/library/tailwindcss.svg"}
                    ]}
                    />
                </ul>
            </div>
        </div>
    )
}