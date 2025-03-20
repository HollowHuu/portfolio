import { Component, createSignal, onMount, Show, For } from "solid-js";
import ITechnology from "../Interfaces/ITechnology";

const TechnologySettings: Component = () => {
  const [technologies, setTechnologies] = createSignal<ITechnology[]>([]);
  const [icons, setIcons] = createSignal<
    { id: number; name: string; svgUrl: string }[]
  >([]);

  onMount(async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5003/technology", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setTechnologies(data);
    } else {
      console.error("Failed to fetch technologies");
    }

    const iconResponse = await fetch("http://localhost:5003/icon", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (iconResponse.ok) {
      const iconData = await iconResponse.json();
      setIcons(iconData);
    } else {
      console.error("Failed to fetch icons");
    }
  });

  const handleUpdate = async (updatedTechnology: ITechnology) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:5003/technology/${updatedTechnology.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTechnology),
      },
    );

    if (response.ok) {
      setTechnologies((prev) =>
        prev.map((t) =>
          t.id === updatedTechnology.id ? updatedTechnology : t,
        ),
      );
      alert("Technology updated successfully!");
    } else {
      console.error("Failed to update technology");
    }

    // Handle icon updates
    for (let i = 0; i < updatedTechnology.icons.length; i++) {
      const icon = updatedTechnology.icons[i];
      const iconResponse = await fetch(`http://localhost:5003/technologyicon`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: 0, // Placeholder
          technologyId: updatedTechnology.id,
          iconId: icon.id,
        }),
      });

      if (iconResponse.ok) {
        alert("Icon updated successfully!");
      } else {
        console.error("Failed to update icon");
      }
    }
  };

  const handleCreateTechnology = async () => {
    const token = localStorage.getItem("token");

    const newTechnology: ITechnology = {
      id: 0,
      name: "New Technology",
      userId: 0,
      icons: [],
    };

    const response = await fetch("http://localhost:5003/technology", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newTechnology),
    });

    if (response.ok) {
      const createdTechnology = await response.json();
      setTechnologies((prev) => [...prev, createdTechnology]);
      alert("Technology created successfully!");
    } else {
      console.error("Failed to create technology");
    }
  };

  const handleIconSelect = (
    technologyId: number,
    icon: { id: number; name: string; svgUrl: string },
  ) => {
    setTechnologies((prev) => {
      return prev.map((technology) => {
        if (technology.id === technologyId) {
          const updatedIcons = technology.icons
            ? technology.icons.some((i) => i.id === icon.id)
              ? technology.icons.filter((i) => i.id !== icon.id)
              : [...technology.icons, icon]
            : [icon];
          return { ...technology, icons: updatedIcons };
        }
        return technology;
      });
    });
  };

  return (
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
        <button
          class="mb-6 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
          onClick={handleCreateTechnology}
        >
          Create New Technology
        </button>
        <ul class="mx-auto mt-6 box-border columns-1 gap-[1em] md:columns-2 lg:columns-3">
          <For each={technologies()}>
            {(technology) => (
              <li class="mb-2 break-inside-avoid rounded-lg bg-neutral-800/50 p-5 hover:bg-neutral-800/75">
                <div class="flex max-w-7xl items-center justify-between border-b-2 border-red-500">
                  <input
                    type="text"
                    value={technology.name}
                    class="text-lg font-semibold leading-8 tracking-tight text-white bg-transparent border-b border-white focus:outline-none"
                    onInput={(e) =>
                      setTechnologies((prev) => {
                        const updated = [...prev];
                        updated.find((t) => t.id === technology.id).name =
                          e.currentTarget.value;
                        return updated;
                      })
                    }
                  />
                </div>
                <ul class="mx-auto mt-8 grid grid-cols-3 gap-9 text-center lg:mx-0 lg:max-w-none">
                  <For each={technology.icons}>
                    {(icon) => (
                      <img src={icon.svgUrl} alt={icon.name} class="h-6 w-6" />
                    )}
                  </For>
                </ul>
                <div class="mt-2">
                  <For each={icons()}>
                    {(icon) => (
                      <button
                        class="m-1 p-1 bg-gray-700 text-white rounded-lg"
                        onClick={() => handleIconSelect(technology.id, icon)}
                      >
                        {icon.name}
                      </button>
                    )}
                  </For>
                </div>
                <button
                  class="mt-4 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={() => handleUpdate(technology)}
                >
                  Save Changes
                </button>
              </li>
            )}
          </For>
        </ul>
      </div>
    </div>
  );
};

export default TechnologySettings;
