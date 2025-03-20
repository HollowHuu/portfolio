import {
  Component,
  createSignal,
  Show,
  createResource,
  Match,
  Switch,
} from "solid-js";
import IContactDetails from "src/Interfaces/IContactDetails";

interface ContactDetailsProps {
  userId: number;
}

export const ContactDetails: Component<ContactDetailsProps> = (props) => {
  // Fetch contact details from the backend
  const [contactDetails] = createResource(props.userId, fetchContactDetails);

  // Function to fetch contact details
  async function fetchContactDetails(userId: number): Promise<IContactDetails> {
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:5003/contactdetails`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else if (response.status === 404) {
      // If no contact details exist, return default values
      return {
        id: 0,
        email: "",
        phoneNumber: "",
        linkedInUrl: "",
        gitHub: "",
        userId: userId,
      };
    } else {
      throw new Error("Failed to fetch contact details");
    }
  }

  return (
    <div class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-emerald-500 sm:text-4xl">
            Contact
          </p>
          <p class="mt-4 max-w-2xl text-xl text-white/75 lg:mx-auto">
            You can contact me on the following platforms.
          </p>
        </div>

        <div class="mt-10">
          <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {/* Phone Number */}
            <Switch>
              <Match when={contactDetails.loading}>
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <dt class="text-lg leading-6 font-medium text-white/75">
                      Phone number
                    </dt>
                    <dd class="mt-2 text-base text-white/65">Loading...</dd>
                  </div>
                </div>
              </Match>
              <Match when={contactDetails()}>
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <dt class="text-lg leading-6 font-medium text-white/75">
                      Phone number
                    </dt>
                    <dd class="mt-2 text-base text-white/65">
                      {contactDetails().phoneNumber || "Not available"}
                    </dd>
                  </div>
                </div>
              </Match>
            </Switch>

            {/* Email */}
            <Switch>
              <Match when={contactDetails.loading}>
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                        />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <dt class="text-lg leading-6 font-medium text-white/75">
                      Email
                    </dt>
                    <dd class="mt-2 text-base text-white/65">Loading...</dd>
                  </div>
                </div>
              </Match>
              <Match when={contactDetails()}>
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                        />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <dt class="text-lg leading-6 font-medium text-white/75">
                      Email
                    </dt>
                    <dd class="mt-2 text-base text-white/65">
                      {contactDetails().email || "Not available"}
                    </dd>
                  </div>
                </div>
              </Match>
            </Switch>

            {/* LinkedIn */}
            <Switch>
              <Match when={contactDetails.loading}>
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-6 h-6"
                      >
                        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5V9h3v10zM6.5 7.25A1.75 1.75 0 118.3 5.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-5.6c0-1.36-.5-2.4-1.9-2.4-1.04 0-1.6.78-1.6 1.6V19h-3V9h3v1.56c.5-.86 1.6-1.56 2.6-1.56 2.2 0 3.9 1.4 3.9 4.4V19z" />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <dt class="text-lg leading-6 font-medium text-white/75">
                      LinkedIn
                    </dt>
                    <dd class="mt-2 text-base text-white/65">Loading...</dd>
                  </div>
                </div>
              </Match>
              <Match when={contactDetails()}>
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-6 h-6"
                      >
                        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5V9h3v10zM6.5 7.25A1.75 1.75 0 118.3 5.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-5.6c0-1.36-.5-2.4-1.9-2.4-1.04 0-1.6.78-1.6 1.6V19h-3V9h3v1.56c.5-.86 1.6-1.56 2.6-1.56 2.2 0 3.9 1.4 3.9 4.4V19z" />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <dt class="text-lg leading-6 font-medium text-white/75">
                      LinkedIn
                    </dt>
                    <dd class="mt-2 text-base text-white/65">
                      {contactDetails().linkedInUrl ? (
                        <a
                          href={contactDetails().linkedInUrl}
                          target="_blank"
                          class="text-emerald-300 hover:text-emerald-400"
                        >
                          Visit Profile
                        </a>
                      ) : (
                        "Not available"
                      )}
                    </dd>
                  </div>
                </div>
              </Match>
            </Switch>

            {/* GitHub */}
            <Switch>
              <Match when={contactDetails.loading}>
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-6 h-6"
                      >
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.92 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <dt class="text-lg leading-6 font-medium text-white/75">
                      GitHub
                    </dt>
                    <dd class="mt-2 text-base text-white/65">Loading...</dd>
                  </div>
                </div>
              </Match>
              <Match when={contactDetails()}>
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-6 h-6"
                      >
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.92 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <dt class="text-lg leading-6 font-medium text-white/75">
                      GitHub
                    </dt>
                    <dd class="mt-2 text-base text-white/65">
                      {contactDetails()?.gitHubUrl ? (
                        <a
                          href={contactDetails()?.gitHubUrl}
                          target="_blank"
                          class="text-emerald-300 hover:text-emerald-400"
                        >
                          Visit Profile
                        </a>
                      ) : (
                        "Not available"
                      )}
                    </dd>
                  </div>
                </div>
              </Match>
            </Switch>
          </dl>
        </div>
      </div>
    </div>
  );
};
