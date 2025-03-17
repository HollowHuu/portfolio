import { Component, createSignal, Show, createResource, Match, Switch } from "solid-js";


interface TechnologyProps {
    userId: number;
}

export interface IconProps {
    url: string;
    name: string;
}

const Icon: Component<IconProps> = (props) => {
    return (
        <li class="relative">
        <div class="group inline-block">
            <img src={props.url} alt="" class="mx-auto rounded-sm group-hover:hidden" width={32} height={32} decoding="async"/>
            <span class="mx-auto mb-1 hidden w-max rounded-md bg-transparent p-1 text-center text-sm font-medium text-emerald-300 opacity-100 backdrop-blur group-hover:inline">{props.name}</span>
        </div>
        </li>
    )
}

export const Technology: Component<TechnologyProps> = (props) => {
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
        <>
            <div class="py-8 sm:py-16">
                <div class="mx-auto max-w-7xl px-6 lg:px-8">
                    <div class="max-w-2xl lg:mx-0">
                        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">Technology</h2>
                        <p class="mt-2 text-lg leading-8 text-white">Here's what I typically work with.</p>
                    </div>
                    <ul class="mx-auto mt-6 box-border columns-1 gap-[1em] md:columns-2 lg:columns-3">
                        <li class="mb-2 break-inside-avoid rounded-lg bg-neutral-800/50 p-5 hover:bg-neutral-800/75">
                            <div class="flex max-w-7xl items-center justify-between border-b-2 border-red-500">
                                <div class="text-lg font-semibold leading-8 tracking-tight text-white">Languages</div>
                            </div>
                            <ul class="mx-auto mt-8 grid grid-cols-3 gap-9 text-center lg:mx-0 lg:max-w-none">
                                <Icon name="C#" url="https://svgl.app/library/csharp.svg" />
                                <Icon name="Golang" url="https://svgl.app/library/golang_dark.svg" />
                                <Icon name="TypeScript" url="https://svgl.app/library/typescript.svg" />
                                
                                <Icon name="Rust" url="https://svgl.app/library/rust_dark.svg" />
                                <Icon name="C" url="https://svgl.app/library/c.svg" />
                                <Icon name="Dart" url="https://svgl.app/library/dart.svg" />

                            </ul>
                        </li>
                        <li class="mb-2 break-inside-avoid rounded-lg bg-neutral-800/50 p-5 hover:bg-neutral-800/75">
                            <div class="flex max-w-7xl items-center justify-between border-b-2 border-red-500">
                                <div class="text-lg font-semibold leading-8 tracking-tight text-white">Backend</div>
                            </div>
                            <ul class="mx-auto mt-8 grid grid-cols-3 gap-9 text-center lg:mx-0 lg:max-w-none">
                                <Icon name="ASP Net Core" url="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg" />
                                <Icon name="Express.JS" url="https://svgl.app/library/expressjs_dark.svg" />
                                <Icon name="NodeJS" url="https://svgl.app/library/nodejs.svg" />

                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}