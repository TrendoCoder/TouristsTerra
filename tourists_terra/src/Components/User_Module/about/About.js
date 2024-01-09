import React from "react";
import { Link, useNavigate } from "react-router-dom";
const About = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // This will go back to the previous page in the history stack
  };
  return (
    <div class="bg=white">
      <header class="absolute inset-x-0 top-0 z-50">
        <nav
          class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <button
              onClick={handleGoBack}
              className="-m-1.5 p-1.5 cursor-pointer"
            >
              <span
                className="h-8 w-auto font-bold"
                style={{
                  color: "#0F4157",
                  fontFamily: "Roboto",
                  fontSize: "30px",
                  fontWeight: 700,
                }}
              >
                Tourist Terra
              </span>
            </button>
          </div>
        </nav>
      </header>

      <main class="isolate">
        <div class="relative isolate -z-10">
          <svg
            class="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                width="200"
                height="200"
                x="50%"
                y="-1"
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y="-1" class="overflow-visible fill-gray-50">
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                stroke-width="0"
              />
            </svg>
            <rect
              width="100%"
              height="100%"
              stroke-width="0"
              fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
            />
          </svg>
          <div
            class="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
            aria-hidden="true"
          >
            {/* <div
              class="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
              style="clip-path: polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)"
            ></div> */}
          </div>
          <div class="overflow-hidden">
            <div class="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
              <div class="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                <div class="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                  <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Transforming travel connections for unforgettable
                    experiences.
                  </h1>
                  {/* <p class="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                    Cupidatat minim id magna ipsum sint dolor qui. Sunt sit in
                    quis cupidatat mollit aute velit. Et labore commodo nulla
                    aliqua proident mollit ullamco exercitation tempor. Sint
                    aliqua anim nulla sunt mollit id pariatur in voluptate
                    cillum. Eu voluptate tempor esse minim amet fugiat veniam
                    occaecat aliqua.
                  </p> */}
                </div>
                <div class="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                  <div class="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                    <div class="relative">
                      <img
                        src="https://a0.muscache.com/im/pictures/miso/Hosting-551750214200548144/original/fae72e54-68c1-454b-b0dd-b8cd8fa77d20.jpeg?im_w=960"
                        alt=""
                        class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                    </div>
                  </div>
                  <div class="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                    <div class="relative">
                      <img
                        src="https://lp-cms-production.imgix.net/2023-12/shutterstock708875509-resized.jpg?auto=format&w=1440&h=810&fit=crop&q=75"
                        alt=""
                        class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                    </div>
                    <div class="relative">
                      <img
                        src="https://lp-cms-production.imgix.net/2023-12/GettyImages-674535658.jpg?auto=format&q=75&w=1024"
                        alt=""
                        class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                    </div>
                  </div>
                  <div class="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                    <div class="relative">
                      <img
                        src="https://a0.muscache.com/im/pictures/miso/Hosting-649205954136109519/original/fbeb95fc-a28e-4092-891c-46577162d7d2.jpeg?im_w=960"
                        alt=""
                        class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                    </div>
                    <div class="relative">
                      <img
                        src="https://images.unsplash.com/photo-1670272505284-8faba1c31f7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                        alt=""
                        class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
          <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our mission
            </h2>
            <div class="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
              <div class="lg:w-full lg:max-w-2xl lg:flex-auto">
                <p class="text-xl leading-8 text-gray-600">
                  In recent years, Pakistan's travel industry has undergone a
                  noteworthy metamorphosis, showcasing substantial progress and
                  accomplishments. The sector's impressive generation of $19.5
                  billion in revenue in 2023 not only highlights its growing
                  economic significance but also signifies a positive shift in
                  the nation's tourism landscape. With approximately 50 million
                  travelers exploring Pakistan's diverse landscapes and cultural
                  treasures, the country has become an increasingly attractive
                  destination. Securing the 83rd position on the International
                  Travel and Tourism Development Index in 2023 is a testament to
                  Pakistan's rising global prominence in the travel sector.
                </p>
                <div class="mt-10 max-w-xl text-base leading-7 text-gray-700">
                  <p class="text-xl leading-8 text-gray-600">
                    Looking ahead, we aspire to contribute to the continued
                    growth of these statistics through our website. By providing
                    easy travel opportunities, fostering social connectivity for
                    travelers, and introducing various features, we aim to
                    enhance the overall travel experience, encouraging more
                    individuals to explore the rich tapestry of Pakistan's
                    offerings and further elevate its position on the
                    international tourism stage. Through these initiatives, we
                    are dedicated to not only maintaining but also enhancing the
                    positive strides made by Pakistan in fostering a thriving
                    and competitive travel industry.
                  </p>
                </div>
              </div>
              <div class="lg:flex lg:flex-auto lg:justify-center">
                <dl class="w-64 space-y-8 xl:w-80">
                  <div class="flex flex-col-reverse gap-y-4">
                    <dt class="text-base leading-7 text-gray-600">
                      Generated approximately in revenue in 2023
                    </dt>
                    <dd class="text-5xl font-semibold tracking-tight text-gray-900">
                      $19.5 billion
                    </dd>
                  </div>
                  <div class="flex flex-col-reverse gap-y-4">
                    <dt class="text-base leading-7 text-gray-600">
                      On International Travel and Tourism Development Index 2023
                    </dt>
                    <dd class="text-5xl font-semibold tracking-tight text-gray-900">
                      83rd
                    </dd>
                  </div>
                  <div class="flex flex-col-reverse gap-y-4">
                    <dt class="text-base leading-7 text-gray-600">
                      Travelers in the country
                    </dt>
                    <dd class="text-5xl font-semibold tracking-tight text-gray-900">
                      ~ 50 million
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
            alt=""
            class="aspect-[5/2] w-full object-cover xl:rounded-3xl"
          />
        </div>

        <div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-48 lg:px-8">
          <div class="mx-auto max-w-2xl lg:mx-0">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our team
            </h2>
          </div>
          <ul
            role="list"
            class="mx-auto mt-20 grid max-w-2xl grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mr-[50%] "
          >
            <li class="flex flex-col items-center pl-4">
              <img
                class="mx-auto h-24 w-24 rounded-full"
                src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                alt=""
              />
              <h3 class="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
                Rana Umair Nazar
              </h3>
              <p class="text-sm leading-6 text-gray-600">Founder / CEO</p>
            </li>

            <li class="flex flex-col items-center pl-4">
              <img
                class="mx-auto h-24 w-24 rounded-full"
                src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                alt=""
              />
              <h3 class="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
                Ch.Shamir Hussain
              </h3>
              <p class="text-sm leading-6 text-gray-600">Co-Founder / CTO</p>
            </li>
            <li class="flex flex-col items-center pl-4">
              <img
                class="mx-auto h-24 w-24 rounded-full"
                src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                alt=""
              />
              <h3 class="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
                Noman Muzafar
              </h3>
              <p class="text-sm leading-6 text-gray-600">Co-Founder / CTO</p>
            </li>
          </ul>
        </div>
      </main>
      <div>
        <section className="bg-white dark:bg-bgg">
          <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6 text-black dark:text-white">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl ">
              FAQs
            </h2>
            <div className="grid pt-8 text-left border-t border-gray-200 md:gap-16 dark:border-gray-700 md:grid-cols-2">
              <div>
                <div className="mb-10">
                  <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 ">
                    <svg
                      className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="black"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    What is Tourist Terra?
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                  Tourist's Terra Elevate your journey with a social touring web-app designed for seamless travel. Explore diverse facilities, connect with fellow travelers, and transform your experiences into unforgettable memories.
                  </p>
                </div>
                <div className="mb-10">
                  <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900">
                    <svg
                      className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="black"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    How can I sign up on Tourist Terra?
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    You can sign up on Tourist Terra using your email account.
            .
                  </p>
                </div>
                <div className="mb-10">
                  <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900">
                    <svg
                      className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="black"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    How can I sell on Tourist Terra?
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    By making seller account you can sell any travel product on tourist terra.
                  </p>
                </div>
                <div className="mb-10">
                  <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900">
                    <svg
                      className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="black"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    How can I become Local Guide on Tourist Terra?
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                  By verifying  yourself as local guide you can become a guide on tourist terra.
                  </p>
                </div>
              </div>
              <div>
                <div className="mb-10">
                  <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900">
                    <svg
                      className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="black"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    How do I earn on Tourist Terra?
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                  By becoming service provider "seller,localGuide , Transport provider, Accomodation Provider" you an earn through Tourist Terra.
                  </p>
                </div>
                <div className="mb-10">
                  <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900">
                    <svg
                      className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="black"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Is tourist Terra operates outside Pakistan?
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    No, Right now we provide our services in Pakistan but we will be expanding it soon.
                  </p>
                </div>
                <div className="mb-10">
                  <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900">
                    <svg
                      className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="black"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Can I book Tickets through Tourist Terra?
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    No, you can not book tickets on Tourist Terra but you can rent vehicles in different cites of Pakistan through Tourist Terra.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <footer class="mx-auto mt-20 max-w-7xl overflow-hidden px-6 pb-20 sm:mt-64 sm:pb-24 lg:px-8">
        
        <div class="flex justify-center space-x-10">
          <a href="#" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">Facebook</span>
            <svg
              class="h-6 w-6"
              fill="black"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
          <a href="#" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">Instagram</span>
            <svg
              class="h-6 w-6"
              fill="black"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
          <a href="#" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">Twitter</span>
            <svg
              class="h-6 w-6"
              fill="black"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a href="#" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">GitHub</span>
            <svg
              class="h-6 w-6"
              fill="black"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
          <a href="#" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">YouTube</span>
            <svg
              class="h-6 w-6"
              fill="black"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>
        <p class="mt-10 text-center text-xs leading-5 text-black">
          &copy; 2023 Tourist Terra, pk. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default About;
