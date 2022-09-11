let elSearchForm = document.querySelector(".js-search-form");
let elSearchInput = elSearchForm.querySelector(".js-search-input");
let elSearchList = document.querySelector(".js-search-list");
let elTemplate = document.querySelector("#js-search-temlate").content;
let elSpinner = document.querySelector(".js-spinner");

function renderCountry(datum) {
  elSearchList.innerHTML = null;

  let elFragmentWrapper = document.createDocumentFragment();
  datum.forEach(data => {
    let newFragment = elTemplate.cloneNode(true);
    let countryItem = newFragment.querySelector(".js-country-item");

    countryItem.querySelector(".country__img").src = data.flags.png;
    countryItem.querySelector(".country__img").alt = data.name.official
    countryItem.querySelector(".js-country-title").textContent = data.name.official;
    countryItem.querySelector(".js-country-text").textContent = data.name.common;

    elFragmentWrapper.append(countryItem);
  })

  elSearchList.append(elFragmentWrapper);
}

function error(err) {
  elSearchList.innerHTML = null;
  let errDiv = document.createElement("div");

   errDiv.innerHTML = `
  <p>${err}</p>`

  elSearchList.appendChild(errDiv);
}

function searchCountry(country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(res => {
      if (!res.ok) {
         throw new Error(renderError("Xatolik yuz berdi."));
      }

      return res.json();
    })
    .then(data => renderCountry(data))
    .finally(function spinnerAdd() {
      elSpinner.classList.add("d-none");
    });
}

function spinnerRemove() {
  elSpinner.classList.remove("d-none");
}

elSearchForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  elSearchList.innerHTML = null;
  spinnerRemove();

  let inputValue = elSearchInput.value.toLowerCase().trim();
  searchCountry(inputValue);

  elSearchInput.value = "";
})