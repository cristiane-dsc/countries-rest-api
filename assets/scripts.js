// Variáveis de escopo global
let countries = document.querySelector("#countries-container");
let input = document.getElementById("country-search");
let select = document.getElementById('region-filter');

// FUNÇÕES AUXILIARES

// Exibe os dados um país como cartão na página
function showCountry(data) {
  let div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `<img src="${data.flags.svg}" width=250>
                   <span>${data.name.common}</span>
                   <p>Population: ${data.population}</p>
                   <p>Region: ${data.region}</p>
                   <p>Capital: ${data.capital}</p>`
  countries.appendChild(div);
}

// Exibe dados do país pesquisado no campo de pesquisa por nome
// É ligeiramente diferente da função showCountry() porque seu array de resposta é um pouco diferente e é necessário especificar o índice dos dados retornados
function showCountry_2(data) {
  let result = document.querySelector("#countries-container");

  if (data.status === 404) {
    result.innerHTML = "Country not found!";
  } else {  
    result.innerHTML = `<div class="card">
                          <img src="${data[0].flags.svg}" width=250>
                          <span>${data[0].name.common}</span>
                          <p>Population: ${data[0].population}</p>
                          <p>Region: ${data[0].region}</p>
                          <p>Capital: ${data[0].capital}</p>
                        </div>`
  }
}

// FUNÇÕES DE BUSCA

// Busca e exibe os dados de todos os países na página inicial
function displayAll() {
  let url = "https://restcountries.com/v3.1/all";

  fetch(url).then(function(response){
    response.json().then(function(data) {
      return data;
    })
    .then((data) => {      
      data.forEach((item) => {
        showCountry(item);
      })
    })
  });
}

// Busca e exibe dados do país digitado no campo de pesquisa
function searchByName() {
  let searchInput = document.querySelector("#country-search").value;
  let url = `https://restcountries.com/v3.1/name/${searchInput}`;

  fetch(url).then(function(response) {
    response.json().then(showCountry_2);
  });
}

// Busca e exibe países da região escolhida na lista dropdown
function searchByRegion() {
	let region = select.options[select.selectedIndex].value;

  if (region == "none") {
    return null;
  } else {
    let url = `https://restcountries.com/v3.1/region/${region}`;

    countries.innerHTML = ''; // reseta o conteúdo da div onde aparecem os resultados

    fetch(url).then(function(response) {
      response.json().then(function(data) {
        return data;
      })
      .then((data) => {      
        data.forEach((item) => {
          showCountry(item);
        })
      })
    })
  }
}

// DETECÇÃO DE EVENTOS

input.addEventListener("keydown", function(e) {  // Detecção de eventos para tecla enter

  let key = e.which || e.keyCode || 0;  // necessário para compatibilidade entre navegadores

  if (key === 13) {
    searchByName();
  }
});

select.addEventListener("change", searchByRegion);  // Detecção de eventos para seleção de região