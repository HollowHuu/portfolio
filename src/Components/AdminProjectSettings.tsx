import { Component, createSignal, onMount, Show, For } from "solid-js";
import IProject from "../Interfaces/IProject";

const ProjectSettings: Component = () => {
  const [projects, setProjects] = createSignal<IProject[]>([]);
  const [icons, setIcons] = createSignal<
    { id: number; name: string; svgUrl: string }[]
  >([]);

  onMount(async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5003/project", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setProjects(data);
      console.log(data);
    } else {
      console.error("Failed to fetch projects");
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

  const handleUpdate = async (updatedProject: IProject) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:5003/project/${updatedProject.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProject),
      },
    );

    if (response.ok) {
      setProjects((prev) =>
        prev.map((p) => (p.id === updatedProject.id ? updatedProject : p)),
      );
      alert("Project updated successfully!");
    } else {
      console.error("Failed to update project");
    }

    // Icons are not being updated this way. We need to handle them separately.
    // They have to updated individually.
    for (let i = 0; i < updatedProject.icons.length; i++) {
      const icon = updatedProject.icons[i];
      const iconResponse = await fetch(`http://localhost:5003/projecticon`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: 0, //Placeholder
          projectId: updatedProject.id,
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

  const handleCreateProject = async () => {
    const token = localStorage.getItem("token");

    const newProject: IProject = {
      id: 0,
      name: "New Project",
      description: "Project description",
      imageUrl: "",
      svgUrl: "",
      url: "",
      icons: [],
      userId: 0,
    };

    const response = await fetch("http://localhost:5003/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newProject),
    });

    if (response.ok) {
      const createdProject = await response.json();
      setProjects((prev) => [...prev, createdProject]);
      alert("Project created successfully!");
    } else {
      console.error("Failed to create project");
    }
  };

  const handleIconSelect = (
    projectId: number,
    icon: { id: number; name: string; svgUrl: string },
  ) => {
    setProjects((prev) => {
      return prev.map((project) => {
        if (project.id === projectId) {
          const updatedIcons = project.icons
            ? project.icons.some((i) => i.id === icon.id)
              ? project.icons.filter((i) => i.id !== icon.id)
              : [...project.icons, icon]
            : [icon];
          return { ...project, icons: updatedIcons };
        }
        return project;
      });
    });
  };

  return (
    <div class="min-h-screen bg-neutral-950 p-10">
      <h1 class="text-4xl font-bold text-white mb-10">Project Settings</h1>
      <button
        class="mb-6 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
        onClick={handleCreateProject}
      >
        Create New Project
      </button>
      <Show when={projects().length > 0}>
        <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <For each={projects()}>
            {(project, index) => (
              <li class="mb-6 break-inside-avoid rounded-lg bg-neutral-800/50 p-5 hover:bg-neutral-800/75">
                <input
                  type="text"
                  value={project.imageUrl}
                  class="w-full p-1 text-sm bg-transparent border-b border-white text-white focus:outline-none"
                  placeholder="Image URL"
                  onInput={(e) =>
                    setProjects((prev) => {
                      const updated = [...prev];
                      updated[index()].imageUrl = e.currentTarget.value;
                      return updated;
                    })
                  }
                />
                <img
                  class="aspect-[3/2] rounded-lg object-contain mt-2"
                  src={project.imageUrl}
                  alt={project.name}
                  width={600}
                  height={400}
                  style="color: transparent;"
                />
                <div class="mt-6 flex max-w-7xl items-center justify-between border-b-2 border-red-500">
                  <input
                    type="text"
                    value={project.name}
                    class="text-lg font-semibold leading-8 tracking-tight text-white bg-transparent border-b border-white focus:outline-none"
                    onInput={(e) =>
                      setProjects((prev) => {
                        const updated = [...prev];
                        updated[index()].name = e.currentTarget.value;
                        return updated;
                      })
                    }
                  />
                  <input
                    type="text"
                    value={project.svgUrl}
                    class="w-20 p-1 text-sm bg-transparent border-b border-white text-white focus:outline-none"
                    placeholder="SVG URL"
                    onInput={(e) =>
                      setProjects((prev) => {
                        const updated = [...prev];
                        updated[index()].svgUrl = e.currentTarget.value;
                        return updated;
                      })
                    }
                  />
                  <div class="flex items-center justify-between">
                    <a class="ml-1" target="_blank" href={project.url}>
                      <img src={project.svgUrl} class="h-6 w-6" />
                    </a>
                  </div>
                </div>
                <input
                  type="text"
                  value={project.url}
                  class="w-full p-1 text-sm bg-transparent border-b border-white text-white focus:outline-none"
                  placeholder="Project URL"
                  onInput={(e) =>
                    setProjects((prev) => {
                      const updated = [...prev];
                      updated[index()].url = e.currentTarget.value;
                      return updated;
                    })
                  }
                />
                <textarea
                  class="mt-2 text-base leading-7 text-emerald-300 bg-transparent border border-emerald-300 rounded-lg p-2 w-full focus:outline-none"
                  value={project.description}
                  onInput={(e) =>
                    setProjects((prev) => {
                      const updated = [...prev];
                      updated[index()].description = e.currentTarget.value;
                      return updated;
                    })
                  }
                />
                <ul
                  class="flex items-center justify-evenly gap-x-3 mt-2"
                  role="list"
                >
                  <For each={project.icons}>
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
                        onClick={() => handleIconSelect(project.id, icon)}
                      >
                        {icon.name}
                      </button>
                    )}
                  </For>
                </div>
                <button
                  class="mt-4 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={() => handleUpdate(project)}
                >
                  Save Changes
                </button>
              </li>
            )}
          </For>
        </ul>
      </Show>
      <Show when={projects().length === 0}>
        <div class="text-white">Loading...</div>
      </Show>
    </div>
  );
};

export default ProjectSettings;
