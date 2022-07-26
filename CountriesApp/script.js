const Countries = document.getElementById("Countries");
const DropDown = document.getElementById('DropDown');
const Drop = document.getElementById('Drop');
const Filter = document.querySelectorAll('.filter');
const FilterName = document.getElementsByClassName('filterName')
const Search = document.querySelector('.Search')
const CountryName = document.getElementsByClassName('CountryName')
const navbtn = document.querySelector('.navbtn')
const CountryModel = document.querySelector('.CountryModel')
const Country = document.getElementsByClassName('Country')
const Back = document.querySelector('.Back')

fetchCountry();

async function fetchCountry() {
  const data = await fetch(`https://restcountries.com/v3.1/all`)
    .then((res) => res.json())
      let CountryHTML = "";
      for (let country of data) {
        CountryHTML += getCountryHTML(country);
      }

      Countries.insertAdjacentHTML("beforeend", CountryHTML);

      Country.addEventListener('click', () =>{
        ShowCountryDetail(data);
      })

}



function getCountryHTML(country) {
  return  `
    <div class="Country">
        <div class="CountryImage">
            <img src='${country.flags.svg}' alt="">
        </div>
        <div class="CountryInfo">
            <h5 class='CountryName'>${country.name.common}</h5>
            <p><strong>Population:</strong>${country.population}</p>
            <p class='filterName'><strong>Region:</strong>${country.region}</p>
            <p><strong>Capital:</strong>${country.capital}</p>
        </div>
    </div>
    `;

}

DropDown.addEventListener('click', function(event){
    Drop.classList.toggle('hideDrop')
})

Filter.forEach(element =>{
    element.addEventListener('click', function(event){
       Array.from(FilterName).forEach(el =>{
        if(el.innerText.includes(element.innerText)){
            el.parentElement.parentElement.style.display='grid'
        }
        else{
            el.parentElement.parentElement.style.display='none' 
        }
       })
    })
})

Search.addEventListener('input', function(event){
    Array.from(CountryName).forEach(elem =>{
        if(elem.innerText.includes(Search.value)){
            elem.parentElement.parentElement.style.display='grid'
        }
        else{
            elem.parentElement.parentElement.style.display='none' 
        }
       })
})

function ShowCountryDetail(data){
    CountryModel.classList.toggle('show')
    CountryModel.innerHTML = `
    <button class="Back">Back</button>
      <div class="Model">
        <div class="LeftModel">
          <img src="${data.flags}" alt="" />
        </div>
        <div class="RightModel">
          <h1>${data.name}</h1>
          <div class="ModelInfo">
            <div class="innerRight inner">
                <p><strong>Native Name:</strong>${data.nativeName}</p>
                <p ><strong>Population:</strong>${data.population}</p>
                <p><strong>Region:</strong>${data.region}</p>
                <p><strong>Sub Region:</strong>${data.subregion}</p>
                <p><strong>Capital:</strong>${data.capital}</p>
              </div>
              <div class="innerLeft inner">
                <p><strong>Top Level Domain:</strong>${data.topLevelDomain.map(elem =>elem)}</p>
                <p ><strong>Currencies:</strong>${data.currencies.map(elem =>elem.name)}</p>
                <p><strong>Languages:</strong>${data.languages.map(elem =>elem.name)}</p>
              </div>
          </div>
        </div>
      </div>
    `
    Back.addEventListener('click', function(event){
        CountryModel.classList.toggle('show')
    })
}

navbtn.addEventListener('click', function(event){
    document.body.classList.toggle('darkMode')
})





