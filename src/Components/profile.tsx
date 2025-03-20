import {
  Component,
  createSignal,
  Show,
  createResource,
  Match,
  Switch,
} from "solid-js";

import IProfile from "src/Interfaces/IProfile";

interface ProfileProps {
  userId: number;
}

export const Profile: Component<ProfileProps> = (props) => {
  // Fetch profile data from the backend
  const [profileData] = createResource(props.userId, fetchProfileData);

  // Function to fetch profile data
  async function fetchProfileData(userId: number): Promise<IProfile> {
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:5003/user/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else if (response.status === 404) {
      // If no profile data exists, return default values
      return {
        id: 0,
        name: "Something went wrong", // Default name
        description: "",
        profilePicture:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpngimg.com%2Fuploads%2Fquestion_mark%2Fquestion_mark_PNG17.png&f=1&nofb=1&ipt=ae67f3e626961d17c4545af55cdb0f1c16ff4dfb33533979c185668b32295d25&ipo=images",
      };
    } else {
      throw new Error("Failed to fetch profile data");
    }
  }

  return (
    <>
      <div class="mx-auto w-full max-w-7xl py-8 text-left sm:py-16">
        <div class="px-6 sm:px-8 lg:w-1/2 xl:pr-16">
          <h1 class="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            <span class="block text-white xl:inline">Hi, I am</span>
            <Switch>
              <Match when={profileData.loading}>
                <span class="mt-4 block text-emerald-500">Loading...</span>
              </Match>
              <Match when={profileData()}>
                <span class="mt-4 block text-emerald-500">
                  {profileData().name}
                </span>
              </Match>
            </Switch>
          </h1>
          <div class="mt-6 max-w-7xl space-y-3 text-lg text-white/75 sm:text-xl md:mt-8 md:max-w-3xl">
            <Switch>
              <Match when={profileData.loading}>
                <p>Loading profile description...</p>
              </Match>
              <Match when={profileData()}>
                <p>{profileData().description}</p>
              </Match>
            </Switch>
          </div>
        </div>
      </div>
      <div class="relative hidden h-64 w-full items-center justify-center sm:h-72 md:h-96 lg:absolute lg:inset-y-10 lg:right-0 lg:flex lg:h-full lg:w-1/2">
        <div class="group relative h-32 w-32 sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-72 lg:w-72 xl:h-96 xl:w-96">
          <div class="absolute -inset-1 animate-[pulse_4s_cubic-bezier(0.4,_0,_0.6,_1)_infinite] rounded-full bg-blue-500/75 py-2 blur-2xl group-hover:bg-emerald-500/75"></div>
          <Switch>
            <Match when={profileData.loading}>
              <div class="absolute inset-0 h-full w-full rounded-full bg-neutral-700/50 animate-pulse"></div>
            </Match>
            <Match when={profileData()}>
              <img
                src={profileData()?.profilePicture}
                alt="Profile"
                class="absolute inset-0 h-full w-full rounded-full object-cover ring-2 ring-blue-500 group-hover:ring-emerald-500"
              />
            </Match>
          </Switch>
        </div>
      </div>
    </>
  );
};
