  localStorage.clear();


/////////////////////////////////////////////////////////////////////////////////

//Pokemon constructor

let ids = Number(0);

class Pokemon {
  constructor(name, type, hp, attack, defense, speed, special) {
    this.id = Number(ids);
    this.name = name;
    this.type = type;
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
    this.speed = speed;
    this.special = special;

    this.ready = this.hp > 50 ? true : false;

    (this.level = Math.round(
      Number(
        Number(this.hp) +
          Number(this.attack) +
          Number(this.defense) +
          Number(this.speed) +
          Number(this.special)
      ) / 5
    )),
      (this.ready = this.level > 50 ? true : false);
    ids++;
  }
}

///////////////////////////////////////////////////////////////////

//creating initial 5 Pokemon

let createPokemonInitial = function () {
  let pokemonId = document.querySelectorAll("#id");

  let pokemonName = document.querySelectorAll("#Pokemon-Name");

  let pokemonImg = document.querySelectorAll("#Pokemon-img");
  let type = document.querySelectorAll("#Type");

  let hpRange = document.querySelectorAll("#HP-Range");
  let attackRange = document.querySelectorAll("#Attack-Range");
  let defenseRange = document.querySelectorAll("#Defense-Range");
  let speedRange = document.querySelectorAll("#Speed-Range");
  let specialRange = document.querySelectorAll("#Special-Range");
  let levels = document.querySelectorAll("#Level");
  let ready = document.querySelectorAll("#Combat-Ready");

  let bulbasaur = new Pokemon("Bulbasaur", 5, 45, 49, 49, 45, 65);
  let charmander = new Pokemon("Charmander", 2, 39, 52, 43, 65, 50);
  let squirtle = new Pokemon("Squirtle", 3, 44, 48, 65, 43, 50);
  let pikachu = new Pokemon("Pikachu", 4, 35, 55, 30, 90, 50);
  let pidgeotto = new Pokemon("Pidgeotto", 10, 63, 60, 55, 71, 50);

  let pokemons = [];
  pokemons.push(bulbasaur, charmander, squirtle, pikachu, pidgeotto);

  for (let i = 0; i < pokemons.length; i++) {
    pokemonId[i].value = pokemons[i].id;
    pokemonId[i].parentElement.textContent = pokemonId[i].value;

    pokemonName[i].value = pokemons[i].name;
    pokemonName[i].parentElement.textContent = pokemonName[i].value;

    let lowerName = pokemons[i].name.toLowerCase();
    let url = `https://img.pokemondb.net/artwork/large/${lowerName}.jpg`;

    pokemonImg[i].src = url;

    type[i].options[pokemons[i].type].selected = pokemons[i].type;
    type[i].parentElement.textContent =
      type[i].options[pokemons[i].type].textContent;

    hpRange[i].value = pokemons[i].hp;
    hpRange[i].parentElement.children[0].textContent = pokemons[i].hp;
    hpRange[i].parentElement.children[1].value = pokemons[i].hp;

    attackRange[i].value = pokemons[i].attack;
    attackRange[i].parentElement.children[0].textContent = pokemons[i].attack;
    attackRange[i].parentElement.children[1].value = pokemons[i].attack;

    defenseRange[i].value = pokemons[i].defense;
    defenseRange[i].parentElement.children[0].textContent = pokemons[i].defense;
    defenseRange[i].parentElement.children[1].value = pokemons[i].defense;

    speedRange[i].value = pokemons[i].speed;
    speedRange[i].parentElement.children[0].textContent = pokemons[i].speed;
    speedRange[i].parentElement.children[1].value = pokemons[i].speed;

    specialRange[i].value = pokemons[i].special;
    specialRange[i].parentElement.children[0].textContent = pokemons[i].special;
    specialRange[i].parentElement.children[1].value = pokemons[i].special;

    levels[i].value = pokemons[i].level;
    levels[i].parentElement.textContent = levels[i].value;

    ready[i].value = pokemons[i].level > 50 ? true : false;
    ready[i].parentElement.textContent = ready[i].value;

    localStorage.setItem(pokemons[i].id, JSON.stringify(pokemons[i]));
  }
};

createPokemonInitial();

////////////////////////////////////////////////////////////////////////////////

//Fetch/Update local storage

let updateStorage = function () {
  let pokemons = [];

  Object.keys(localStorage).forEach((key) => {
    pokemons.push(JSON.parse(localStorage.getItem(key)));
  });

  let sortedPokemons = pokemons.sort(function (a, b) {
    return a.id - b.id;
  });

  let pokemonId = document.querySelectorAll("#id");

  let pokemonName = document.querySelectorAll("#Pokemon-Name");
  let type = document.querySelectorAll("#Type");

  let hpRange = document.querySelectorAll("#HP-Range");
  let attackRange = document.querySelectorAll("#Attack-Range");
  let defenseRange = document.querySelectorAll("#Defense-Range");
  let speedRange = document.querySelectorAll("#Speed-Range");
  let specialRange = document.querySelectorAll("#Special-Range");
  let levels = document.querySelectorAll("#Level");

  let ready = document.querySelectorAll("#Combat-Ready");

  for (let i = 0; i < pokemonId.length; i++) {
    pokemonId[i].value = Number(sortedPokemons[i].id);
    pokemonId[i].parentElement.textContent = pokemonId[i].value;

    pokemonName[i].value = sortedPokemons[i].name;
    pokemonName[i].parentElement.textContent = pokemonName[i].value;

    type[i].value = sortedPokemons[i].type;

    type[i].parentElement.textContent = type[i].options[type[i].value].text;

    hpRange[i].value = sortedPokemons[i].hp;
    attackRange[i].value = sortedPokemons[i].attack;
    defenseRange[i].value = sortedPokemons[i].defense;

    speedRange[i].value = sortedPokemons[i].speed;
    specialRange[i].value = sortedPokemons[i].special;

    sortedPokemons[i].level = Math.round(
      Number(
        Number(sortedPokemons[i].hp) +
          Number(sortedPokemons[i].attack) +
          Number(sortedPokemons[i].defense) +
          Number(sortedPokemons[i].speed) +
          Number(sortedPokemons[i].special)
      ) / 5
    );

    levels[i].value = sortedPokemons[i].level;
    levels[i].parentElement.textContent = levels[i].value;

    ready[i].value = sortedPokemons[i].level > 50 ? true : false;
    ready[i].parentElement.textContent = ready[i].value;

    localStorage.setItem(
      Number(sortedPokemons[i].id),
      JSON.stringify(sortedPokemons[i])
    );

    localStorage.removeItem("");
  }
};

updateStorage();

//////////////////////////////////////////////////////////////////////////////////////

//Calculating/displaying total stats
let tableBody = document.getElementById("table-body");

let totalStats = function () {
  let hpPoints = document.querySelectorAll("#Total-HP")[0];
  let attackPoints = document.querySelectorAll("#Total-Attack")[0];
  let defensePoints = document.querySelectorAll("#Total-Defense")[0];
  let speedPoints = document.querySelectorAll("#Total-Speed")[0];
  let specialPoints = document.querySelectorAll("#Total-Special")[0];

  let pokemons = [];

  Object.keys(localStorage).forEach((key) => {
    pokemons.push(JSON.parse(localStorage.getItem(key)));
  });

  let hps = 0;
  let attacks = 0;
  let defences = 0;
  let speeds = 0;
  let specials = 0;

  for (let i = 0; i < pokemons.length; i++) {
    hps += Number(pokemons[i].hp);
    attacks += Number(pokemons[i].attack);
    defences += Number(pokemons[i].defense);
    speeds += Number(pokemons[i].speed);
    specials += Number(pokemons[i].special);
  }

  hpPoints.innerHTML = `<tr>${hps}</tr>`;
  attackPoints.innerHTML = `<tr>${attacks}</tr>`;
  defensePoints.innerHTML = `<tr>${defences}</tr>`;
  speedPoints.innerHTML = `<tr>${speeds}</tr>`;
  specialPoints.innerHTML = `<tr>${specials}</tr>`;
};

totalStats();

tableBody.addEventListener("click", totalStats);

/////////////////////////////////////////////////////////////////////////////////

//Monitor changes with edit button
let isDisabled = true;

let addDisable = function () {
  let editBtn = document.querySelectorAll("#Edit-Btn");

  for (let i = 0; i < tableBody.rows.length; i++) {
    let anId = 0;

    editBtn[i].addEventListener("click", () => {
      editBtn[i].style.border = "";
      var row = editBtn[i].parentElement.parentElement.parentElement;

      var id = row.children[0].textContent;
      anId = Number(id);

      let name = row.children[1].textContent;

      let aPokemon = localStorage.getItem(anId);
      let aPokemonType = JSON.parse(aPokemon).type;

      row.children[4].children[1].disabled = true;
      let hp = row.children[4].children[1].value;

      row.children[5].children[1].disabled = true;
      let attack = row.children[5].children[1].value;

      row.children[6].children[1].disabled = true;
      let defense = row.children[6].children[1].value;

      row.children[7].children[1].disabled = true;
      let speed = row.children[7].children[1].value;

      row.children[8].children[1].disabled = true;
      let special = row.children[8].children[1].value;

      let updatedPokemon = new Pokemon(
        name,
        aPokemonType,
        hp,
        attack,
        defense,
        speed,
        special
      );

      updatedPokemon.id = anId;

      localStorage.setItem(anId, JSON.stringify(updatedPokemon));
      let parsedPokemon = localStorage.getItem(JSON.parse(anId));

      row.children[9].innerHTML = JSON.parse(parsedPokemon).level;
      row.children[10].textContent = JSON.parse(parsedPokemon).ready;
    });
  }
  isDisabled = !isDisabled;
};

let removeDisable = function () {
  let editBtn = document.querySelectorAll("#Edit-Btn");

  for (let i = 0; i < tableBody.rows.length; i++) {
    editBtn[i].addEventListener("click", () => {
      editBtn[i].style.border = "3px solid #ffcb05";

      let row = editBtn[i].parentElement.parentElement.parentElement;

      row.children[4].children[1].disabled = false;
      row.children[5].children[1].disabled = false;
      row.children[6].children[1].disabled = false;
      row.children[7].children[1].disabled = false;
      row.children[8].children[1].disabled = false;
    });
  }
  isDisabled = !isDisabled;
};

let checkDisabled = function () {
  if (isDisabled) {
    removeDisable();
  } else {
    addDisable();
    updateStorage();
    setLabels();
  }

  totalStats();
};

let setDisable = function () {
  let editBtn = document.querySelectorAll("#Edit-Btn");

  for (let i = 0; i < editBtn.length; i++) {
    editBtn[i].addEventListener("mousedown", checkDisabled);
    totalStats();
  }
  totalStats();
};

setDisable();

/////////////////////////////////////////////////////////////////////////////

//set Add new Row

let addBtn = document.getElementById("Add-Btn");

let addNewRow = function () {
  let tableBody = document.getElementById("table-body");

  let newPokemonName = document.querySelector("#newPokemon-Name");

  let newType = document.querySelector("#newType");

  let newHpRange = document.querySelector("#newHP-Range");

  let newAttackRange = document.querySelector("#newAttack-Range");

  let newDefenseRange = document.querySelector("#newDefense-Range");

  let newSpeedRange = document.querySelector("#newSpeed-Range");

  let newSpecialRange = document.querySelector("#newSpecial-Range");

  let newPokemon = new Pokemon(
    newPokemonName.options[newPokemonName.selectedIndex].text,
    Number(newType.options[newType.selectedIndex].value),
    Number(newHpRange.value),
    Number(newAttackRange.value),
    Number(newDefenseRange.value),
    Number(newSpeedRange.value),
    Number(newSpecialRange.value)
  );

  window.localStorage.setItem(newPokemon.id, JSON.stringify(newPokemon));

  let x = newPokemon.type;

  switch (x) {
    case 0:
      x = "Normal";
      break;
    case 1:
      x = "Fire";
      break;
    case 2:
      x = "Water";
      break;
    case 3:
      x = "Electric";
      break;
    case 4:
      x = "Grass";
      break;
    case 5:
      x = "Ice";
      break;
    case 6:
      x = "Fighting";
      break;
    case 7:
      x = "Poison";
      break;
    case 8:
      x = "Ground";
      break;
    case 9:
      x = "Flying";
      break;
    case 10:
      x = "Psychic";
      break;
    case 11:
      x = "Bug";
      break;
    case 12:
      x = "Rock";
      break;
    case 13:
      x = "Ghost";
      break;
    case 14:
      x = "Dragon";
      break;
    default:
      break;
  }

  let newRow = document.createElement("tr");
  let lowerName = newPokemon.name.toLowerCase();
  let url = `https://img.pokemondb.net/artwork/large/${lowerName}.jpg`;

  newRow.innerHTML += `
 <tr>
             <td style="color: #2a75bb !important;">${newPokemon.id}</td>

             <td style="color: #2a75bb !important;">${newPokemon.name}</td>

              <td>
                <input type="file" style="display: none;" accept="image/*" id="img-url">
                  <img
                    src="${url}"
                    class="img-fluid"
                    alt="A Pokemon Image"
                    width="128"
                    height="128"
                    id="Pokemon-img"
                  />
                </input>
             

              <td class="types" style="color: #2a75bb !important;"> ${x} </td> </td>
                 
              </td>

              <td>
                <label for="HP" class="form-label" id="form-label">HP </label>
                <input
                  type="range"
                  class="form-range"
                  min="1"
                  max="100"
                  value = "${newPokemon.hp}"
                  id="HP-Range"
                  disabled
                />
              </td>

              <td>
                <label for="Attack" class="form-label" id="form-label">Attack </label>
                <input
                  type="range"
                  class="form-range"
                  min="1"
                  max="100"
                  value = "${newPokemon.attack}"
                  id="Attack-Range"
                  disabled
                />
              </td>

              <td>
                <label for="Defense" class="form-label" id="form-label">Defense </label>
                <input
                  type="range"
                  class="form-range"
                  min="1"
                  max="100"
               
                  id="Defense-Range"
                  value = "${newPokemon.defense}"
                  disabled
                />
              </td>

              <td>
                <label for="Speed" class="form-label" id="form-label">Speed </label>
                <input
                  type="range"
                  class="form-range"
                  min="1"
                  max="100"
                  value = "${newPokemon.speed}"
                 
                  id="Speed-Range"
                  disabled
                />
              </td>

              <td>
                <label for="Special" class="form-label" id="form-label">Special </label>
                <input
                  type="range"
                  class="form-range"
                  min="1"
                  max="100"
                  value = "${newPokemon.special}"
                
                  id="Special-Range"
                  disabled
                />
              </td>

              <td class="levels"> ${newPokemon.level}
                <input
                  type="text"
                  placeholder="1-100"
                  class="w-75"
                  id="Level"
                  value = "${newPokemon.level}"
                  style="display: none;"

                  disabled
                />
              </td>
              

              <td style="color: #2a75bb !important;">${newPokemon.ready}</td>
              
              <td>
                <li class="list-inline-item">
                  <button
                    class="btn btn-success btn-sm rounded-10"
                    type="button"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Edit"
                    id="Edit-Btn"
                  ></button>
                </li>
                <li class="list-inline-item">
                  <button
                    class="btn btn-danger btn-sm rounded-10"
                    type="button"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Delete"
                    id="Delete-Btn"
                  ></button>
                </li>
              </td>
  </tr>
`;

  tableBody.appendChild(newRow);

  let stat = document.querySelectorAll("#form-label");

  for (let i = stat.length - 10; i < stat.length; i++) {
    stat[i].textContent = Number(stat[i].nextElementSibling.value);
  }
};

let addingRow = function () {
  addNewRow();

  setDisable();
};

addBtn.addEventListener("click", addingRow);

//////////////////////////////////////////////////////////////////////////////////

//set Delete Row

let setDeleteRow = function (event) {
  if (event.target.classList.contains("btn-danger")) {
    let deleteBtn = event.target;

    localStorage.removeItem(
      deleteBtn.parentElement.parentElement.parentElement.children[0]
        .textContent
    );

    deleteBtn.closest("tr").remove();
  }
};

tableBody.addEventListener("click", setDeleteRow);

////////////////////////////////////////////////////////////////////////

//setting stat labels

let setLabels = function () {
  let stat = document.querySelectorAll("#form-label");

  let pokemons = [];

  Object.keys(localStorage).forEach((key) => {
    pokemons.push(JSON.parse(localStorage.getItem(key)));
  });

  for (let i = 0; i < stat.length; i++) {
    stat[i].textContent = stat[i].nextElementSibling.value;
  }
};

setLabels();

/////////////////////////////////////////////////////////////////////////////

//Changing image (not implemented)
tableBody = document.getElementById("table-body");

let changeImage = false;

let updateImage = function (event) {
  if (event.target.classList.contains("img-fluid") && !isDisabled) {
    let image = event.target;
    image.style.display = "none";
    image.previousElementSibling.style.display = "block";
    image.previousElementSibling.style.fontSize = "1em";
    image.previousElementSibling.style.maxWidth = "72px";

    image.previousElementSibling.onchange = () => {
      let selectedImage = image.previousElementSibling.files[0];

      image.src = URL.createObjectURL(selectedImage);
      image.previousElementSibling.style.display = "none";
      image.style.display = "block";

      URL.revokeObjectURL(selectedImage);
    };
  }
};

tableBody.addEventListener("click", updateImage);

//////////////////////////////////////////////////////////////////////////////
//Sorting by ID

//Descending

let sortingByIdDesc = function () {
  let table, rows, switching, i, x, y, shouldSwitch;

  table = document.getElementsByTagName("table")[0];
  switching = true;

  while (switching) {
    switching = false;
    rows = table.rows;

    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;

      x = rows[i].getElementsByTagName("TD")[0];

      y = rows[i + 1].getElementsByTagName("TD")[0];

      if (Number(x.innerHTML) < Number(y.innerHTML)) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
};

let dscButton = document.querySelectorAll("#Dsc-Btn")[0];

dscButton.addEventListener("click", sortingByIdDesc);

//Ascending
let sortingByIdAsc = function () {
  let table, switching2, i, x, y, shouldSwitch2;

  table = document.getElementsByTagName("table")[0];
  switching2 = true;

  let rows = table.rows;
  while (switching2) {
    switching2 = false;

    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch2 = false;

      x = rows[i].children[0];

      y = rows[i + 1].children[0];

      if (Number(x.innerHTML) > Number(y.innerHTML)) {
        shouldSwitch2 = true;
        break;
      }
    }
    if (shouldSwitch2) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching2 = true;
    }
  }
};

let ascButton = document.querySelectorAll("#Asc-Btn")[0];

ascButton.addEventListener("click", sortingByIdAsc);

//////////////////////////////////////////////////////////////////////////////

//Cancel button
let clearNewPokemon = function () {
  let newPokemonName = document.querySelector("#newPokemon-Name");

  let newType = document.querySelector("#newType");

  let newHpRange = document.querySelector("#newHP-Range");

  let newAttackRange = document.querySelector("#newAttack-Range");

  let newDefenseRange = document.querySelector("#newDefense-Range");

  let newSpeedRange = document.querySelector("#newSpeed-Range");

  let newSpecialRange = document.querySelector("#newSpecial-Range");

  newPokemonName.value = 1;
  newType.value = 0;
  newHpRange.value = 0;
  newAttackRange.value = 0;
  newDefenseRange.value = 0;
  newSpeedRange.value = 0;
  newSpecialRange.value = 0;
};

let cancelBtn = document.querySelector("#Cancel-Btn");
cancelBtn.addEventListener("click", clearNewPokemon);
