import { Component, createSignal, createResource, Show } from "solid-js";
import styles from "./App.module.css";
import { Profile } from "./Components/profile";
import IProfile from "./Interfaces/IProfile";
import CheckAuth from "./Lib/CheckAuth";
import AdminProfileSettings from "./Components/AdminProfileSettings";
import AdminProjectSettings from "./Components/AdminProjectSettings";
import AdminTechnologySettings from "./Components/AdminTechnologySettings";
import ContactDetailsSettings from "./Components/AdminContactDetailsSettings";

const Admin: Component = () => {
  const [user, setUser] = createSignal<IProfile | null>(null);
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");

  CheckAuth().then((profile) => {
    setUser(profile);
  });

  const login = (username: string, password: string) => {
    fetch("http://localhost:5003/User/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: username, passwordHash: password }),
    }).then((res) => {
      if (!res.ok) {
        console.error("Failed to login");
        return;
      }

      res.json().then((data) => {
        localStorage.setItem("token", data.token);
        console.log(data);

        let profile: IProfile = {
          id: data.id,
          name: data.name,
          description: data.description,
          profilePicture: data.profilePicture,
        };

        setUser(profile); // Update the user state
        console.log(user());
      });
    });
  };

  const handleLogin = (e: Event) => {
    e.preventDefault(); // Prevent form submission
    login(username(), password());
  };

  return (
    <>
      <Show when={user() != null}>
        <div class="min-h-screen bg-neutral-950">
          <AdminProfileSettings />
          <AdminTechnologySettings />
          <AdminProjectSettings />
          <ContactDetailsSettings />
        </div>
      </Show>
      <Show when={user() == null}>
        <div class="min-h-screen bg-neutral-950">
          <h1 class="text-4xl font-bold text-white p-10">Login</h1>
          <div class="p-10">
            <form class="flex flex-col space-y-4" onSubmit={handleLogin}>
              <label class="text-white/75">Username</label>
              <input
                class="p-2 bg-neutral-800 border border-neutral-700 rounded-lg"
                value={username()}
                onInput={(e) => setUsername(e.currentTarget.value)}
              />
              <label class="text-white/75">Password</label>
              <input
                type="password"
                class="p-2 bg-neutral-800 border border-neutral-700 rounded-lg"
                value={password()}
                onInput={(e) => setPassword(e.currentTarget.value)}
              />
              <button
                type="submit"
                class="bg-red-500 text-white p-2 rounded-lg"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </Show>
    </>
  );
};

export default Admin;
