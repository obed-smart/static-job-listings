"use strict";

const main = document.getElementById("main");
const categories = document.querySelector(".categories");

let filterLIst = [];

getDAta();
// getClick();

async function getDAta() {
  try {
    const response = await fetch("./data.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    displayData(data);
    getClick();
  } catch (error) {
    console.log(error);
  }
}

function displayData(data) {
  for (let [index, list] of data.entries()) {
    const item = ` <article
        class="flex bg-white flex-col relative px-5 lg:flex-row py-6 justify-start  lg:justify-between  lg:items-center rounded-md ${
          index === 0 || index === 1
            ? "border-l-4 border-l-DesaturatedDarkCyan"
            : ""
        }">
        <header
          class="flex gap-6 items-center lg:mb-0 mb-5 lg:border-b-0 border-b-[1px] border-b-DarkGrayishCyan  lg:p-0 py-5">
          <img src="${
            list.logo
          }" alt="Photosnap logo" class="w-20 -top-10 lg:top-auto  lg:relative absolute">
          <div class="space-y-2">
            <div class="flex gap-4 font-semibold items-center">
              <p class="text-DesaturatedDarkCyan text-[18px]">${
                list.company
              }</p>
              <p class="${
                list.new
                  ? "px-3 py-[2px] ml-3  uppercase text-[15px] lg:m-0 text-LightGrayishCyanFilter rounded-full bg-DesaturatedDarkCyan"
                  : "hidden"
              }">${list.new ? "New!" : ""}
              </p>
              <p class=" ${
                list.featured
                  ? "px-3 py-[2px] uppercase text-[15px] text-LightGrayishCyanFilter rounded-full bg-VeryDarkGrayishCyan"
                  : "hidden"
              }">
              ${list.featured ? "Featured" : ""}
              </p>
            </div>
            <h2 class="text-[20px] font-bold hover:text-DesaturatedDarkCyan cursor-pointer text-VeryDarkGrayishCyan">${
              list.position
            }</h2>
            <div class="flex items-center gap-5 text-DarkGrayishCyan text-[17px] font-semibold">
              <time datetime="2023-10-01">${list.postedAt}</time>
              <span class="w-[3px] aspect-square bg-DarkGrayishCyan"></span>
              <p>${list.contract}</p>
              <span class="w-[3px] aspect-square bg-DarkGrayishCyan"></span>
              <p>${list.location}</p>
            </div>
          </div>
        </header>
        <div>
          <ul
            class="flex option flex-wrap  gap-5 [&>li]:bg-LightGrayishCyanFilter [&>li]:py-1 [&>li]:px-2  items-center text-DesaturatedDarkCyan font-semibold text-[18px] [&>li]:rounded-md">
            <li
              class="hover:bg-DesaturatedDarkCyan cursor-pointer hover:text-LightGrayishCyanFilter transition-all duration-300">
              ${list.role}</li>
            <li
              class="hover:bg-DesaturatedDarkCyan cursor-pointer hover:text-LightGrayishCyanFilter transition-all duration-300">
              ${list.level}</li>
            

              ${list.languages
                .map(
                  (language) => `<li
              class="hover:bg-DesaturatedDarkCyan cursor-pointer hover:text-LightGrayishCyanFilter transition-all duration-300"> ${language}
            </li>`
                )
                .join(" ")}


              ${list.tools
                .map(
                  (tool) => `<li
              class="hover:bg-DesaturatedDarkCyan cursor-pointer hover:text-LightGrayishCyanFilter transition-all duration-300"> ${tool}
            </li>`
                )
                .join(" ")}


          </ul>
        </div>
      </article>`;

    main.innerHTML += item;
  }
}

function getClick() {
  const buttons = document.querySelectorAll(".option >  li");

  for (const button of buttons) {
    button.addEventListener("click", (e) => {
      const buttonText = e.target.textContent.trim();
      if (!filterLIst.includes(buttonText)) {
        filterLIst.push(buttonText);
        categories.parentNode.classList.remove("hidden");
      }

      displayFilteredOption();
    });
  }
}

function displayFilteredOption() {
  categories.innerHTML = "";
  const list = filterLIst
    .map((option, index) => {
      if (!(option in categories)) {
        return ` <li data-id="${index}" class="inline-flex font-medium  overflow-hidden rounded-md bg-LightGrayishCyanFilter items-center ">
          <span class="p-[4px]">${option}</span>
          <span 
            class="bg-DesaturatedDarkCyan remove-filter transition-all duration-300 inline-grid hover:bg-VeryDarkGrayishCyan cursor-pointer  h-8 w-8 place-items-center">
            <ion-icon name="close-sharp" class="text-white"></ion-icon>
          </span>
        </li>`;
      }
    })
    .join(" ");

  categories.innerHTML += list;
}

function removefilter() {
  const clearButton = document.getElementById("clearbtn");
  categories.addEventListener("click", (e) => {
    const closestFilter = e.target.closest(".remove-filter");

    if (!closestFilter) return;

    const index = Number(closestFilter.parentNode.dataset.id);
    console.log(index);
    if (closestFilter) {
      filterLIst.splice(index, 1);
      console.log(filterLIst);
      displayFilteredOption();

      if(filterLIst === []){
        categories.parentNode.classList.add("hidden");
      }
    }
  });

  clearButton.addEventListener("click", () => {
    filterLIst = [];
    categories.parentNode.classList.add("hidden");
    console.log(filterLIst);
    displayFilteredOption();
  });
}

removefilter();
