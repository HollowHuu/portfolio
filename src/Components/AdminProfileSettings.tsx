import { Component, createSignal, onMount, Show } from "solid-js";

import IProfile from "../Interfaces/IProfile";

const AdminProfileSettings: Component = () => {
  const [profile, setProfile] = createSignal<IProfile | null>(null);
  const [name, setName] = createSignal("");
  const [description, setDescription] = createSignal("");
  const [profilePicture, setProfilePicture] = createSignal("");

  // Fetch the current profile data when the component mounts
  onMount(async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5003/user/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setProfile(data);
      setName(data.name);
      setDescription(data.description);
      setProfilePicture(data.profilePicture);
    } else {
      console.error("Failed to fetch profile data");
    }
  });

  // Handle form submission
  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const updatedProfile = {
      name: name(),
      description: description(),
      profilePicture: profilePicture(),
    };

    const response = await fetch("http://localhost:5003/user/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedProfile),
    });

    if (response.ok) {
      const data = await response.json();
      setProfile(data);
      alert("Profile updated successfully!");
    } else {
      console.error("Failed to update profile");
    }
  };

  return (
    <div class="min-h-screen bg-neutral-950 p-10">
      <h1 class="text-4xl font-bold text-white mb-10">Profile Settings</h1>

      <Show when={profile() != null}>
        <form class="flex flex-col space-y-4" onSubmit={handleSubmit}>
          {/* Display ID (read-only) */}
          <div>
            <label class="text-white/75">ID</label>
            <input
              class="p-2 bg-neutral-800 border border-neutral-700 rounded-lg w-full"
              value={profile().id}
              readonly
            />
          </div>

          {/* Name */}
          <div>
            <label class="text-white/75">Name</label>
            <input
              class="p-2 bg-neutral-800 border border-neutral-700 rounded-lg w-full"
              value={name()}
              onInput={(e) => setName(e.currentTarget.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label class="text-white/75">Description</label>
            <textarea
              class="p-2 bg-neutral-800 border border-neutral-700 rounded-lg w-full"
              value={description()}
              onInput={(e) => setDescription(e.currentTarget.value)}
            />
          </div>

          {/* Profile Picture URL */}
          <div>
            <label class="text-white/75">Profile Picture URL</label>
            <input
              class="p-2 bg-neutral-800 border border-neutral-700 rounded-lg w-full"
              value={profilePicture()}
              onInput={(e) => setProfilePicture(e.currentTarget.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            class="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Save Changes
          </button>
        </form>
      </Show>
      <Show when={profile() == null}>
        <div class="text-white">Loading...</div>
      </Show>
    </div>
  );
};

export default AdminProfileSettings;
