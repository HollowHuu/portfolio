import { Component, createSignal, onMount, Show } from "solid-js";
import IContactDetails from "../Interfaces/IContactDetails";

const ContactDetailsSettings: Component = () => {
  const [contactDetails, setContactDetails] =
    createSignal<IContactDetails | null>(null);

  onMount(async () => {
    const token = localStorage.getItem("token");

    // Fetch existing contact details
    const response = await fetch("http://localhost:5003/contactdetails", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setContactDetails(data);
    } else if (response.status === 404) {
      // If no contact details exist, create a new one
      const newContactDetails: IContactDetails = {
        id: 0, // Placeholder, will be assigned by the backend
        email: "placeholder",
        phoneNumber: "placeholder",
        linkedInUrl: "placeholder",
        gitHubUrl: "placeholder",
        userId: 0, // Replace with the actual user ID if available
      };

      const createResponse = await fetch(
        "http://localhost:5003/contactdetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newContactDetails),
        },
      );

      if (createResponse.ok) {
        const createdDetails = await createResponse.json();
        setContactDetails(createdDetails);
      } else {
        console.error("Failed to create contact details");
      }
    } else {
      console.error("Failed to fetch contact details");
    }
  });

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    if (!contactDetails()) return;

    const response = await fetch(
      `http://localhost:5003/contactdetails/${contactDetails().id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(contactDetails()),
      },
    );

    if (response.ok) {
      alert("Contact details updated successfully!");
    } else {
      console.error("Failed to update contact details");
    }
  };

  const handleInputChange = (field: keyof IContactDetails, value: string) => {
    setContactDetails((prev) => {
      if (prev) {
        return { ...prev, [field]: value };
      }
      return prev;
    });
  };

  return (
    <div class="py-8 sm:py-16">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="max-w-2xl lg:mx-0">
          <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Contact Details
          </h2>
          <p class="mt-2 text-lg leading-8 text-white">
            Update your contact information here.
          </p>
        </div>
        <Show when={contactDetails()}>
          <div class="mt-6 space-y-6">
            <div>
              <label class="block text-sm font-medium text-white">Email</label>
              <input
                type="email"
                value={contactDetails().email}
                class="mt-1 block w-full p-2 bg-neutral-800/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onInput={(e) =>
                  handleInputChange("email", e.currentTarget.value)
                }
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-white">
                Phone Number
              </label>
              <input
                type="text"
                value={contactDetails().phoneNumber}
                class="mt-1 block w-full p-2 bg-neutral-800/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onInput={(e) =>
                  handleInputChange("phoneNumber", e.currentTarget.value)
                }
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-white">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={contactDetails().linkedInUrl}
                class="mt-1 block w-full p-2 bg-neutral-800/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onInput={(e) =>
                  handleInputChange("linkedInUrl", e.currentTarget.value)
                }
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-white">
                GitHub URL
              </label>
              <input
                type="url"
                value={contactDetails()?.gitHubUrl}
                class="mt-1 block w-full p-2 bg-neutral-800/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onInput={(e) =>
                  handleInputChange("gitHubUrl", e.currentTarget.value)
                }
              />
            </div>
            <button
              class="mt-4 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
              onClick={handleUpdate}
            >
              Save Changes
            </button>
          </div>
        </Show>
        <Show when={!contactDetails()}>
          <div class="text-white">Loading...</div>
        </Show>
      </div>
    </div>
  );
};

export default ContactDetailsSettings;
