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
  // NOTICE - Change props interface to ContactDetailsProps when fetching from backend
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
                  <dd class="mt-2 text-base text-white/65">+45 12345678</dd>
                </div>
              </div>

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
                    example@gmail.com
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
};
