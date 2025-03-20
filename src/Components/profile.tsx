import {
  Component,
  createSignal,
  Show,
  createResource,
  Match,
  Switch,
} from "solid-js";

interface ProfileProps {
  userId: number;
}

export const Profile: Component<ProfileProps> = (props) => {
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
      <div class="mx-auto w-full max-w-7xl py-8 text-left sm:py-16">
        <div class="px-6 sm:px-8 lg:w-1/2 xl:pr-16">
          <h1 class="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            <span class="block text-white xl:inline">Hi, I am</span>
            <span class="mt-4 block text-emerald-500">Nicolas</span>
          </h1>
          <div class="mt-6 max-w-7xl space-y-3 text-lg text-white/75 sm:text-xl md:mt-8 md:max-w-3xl">
            <p></p>
            <p>
              I love designing, developing, and deploying apps from start to
              finish. Whether it's creating something new or tweaking an
              existing project, I'm always up for it! When I'm not coding,
              you'll find me playing a variety of Pokemon games.
            </p>
            <p>
              If it's about solving problems and building cool stuff, I'm ready
              to jump in and get started! Let's create something great together!
            </p>
          </div>
        </div>
      </div>
      <div class="relative hidden h-64 w-full items-center justify-center sm:h-72 md:h-96 lg:absolute lg:inset-y-10 lg:right-0 lg:flex lg:h-full lg:w-1/2">
        <div class="group relative h-32 w-32 sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-72 lg:w-72 xl:h-96 xl:w-96">
          <div class="absolute -inset-1 animate-[pulse_4s_cubic-bezier(0.4,_0,_0.6,_1)_infinite] rounded-full bg-blue-500/75 py-2 blur-2xl group-hover:bg-emerald-500/75"></div>
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.zerochan.net%2FHatsune.Miku.full.2308455.png&f=1&nofb=1&ipt=9c6fc5bcce482bb4f427ed84769d6b1b76e35a9eb2bf8204c156a1a8957c9680&ipo=images"
            alt=""
            class="absolute inset-0 h-full w-full rounded-full object-cover ring-2 ring-blue-500 group-hover:ring-emerald-500"
          />
        </div>
      </div>
    </>
  );
};
