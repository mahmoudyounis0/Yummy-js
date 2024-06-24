const api_dataload_meals = document.getElementById("api_dataload_meals");
const rowInput = document.getElementById('rowInput');

$(window).on('load', function () {
  $("#loader").fadeOut(4000, function () {
    $("body").css("overflow", "auto");
  });
});


// =====> slide nav

let left = false;
$("#bar-menus").click(function () {
  if (!left) {
    SlideRight();

    left = true;

  } else {
    SlideLeft();
    left = false;
  }
});
function SlideRight() {
  $("aside").animate({ left: 0 }, 500);
  $('#bar-menus').removeClass("fa-bar");
  $('#bar-menus').addClass("fa-close");

  for (let i = 0; i < links.length; i++) {
    $(".menus ul li a").eq(i).animate({
      top: 0
    }, (i + 5) * 100)
  }
}
let sideMenus = $('#menus').outerWidth();
function SlideLeft() {
  $("aside").animate({ left: `-${sideMenus}` }, 500);
  $('#bar-menus').addClass("fa-bar");
  $('#bar-menus').removeClass("fa-close");
  $(".menus ul li a").animate({ top: 300 }, 500)

}
let links = document.querySelectorAll(".menus ul li a");
for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function (e) {
    SlideLeft();
  });
}

// ====> Default search by name Api

async function getDefaultName(searchName) {
  $('.api_dataloading').fadeIn(200).css('display', "flex");
  const apiSearch = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchName}`
  );
  const searchDefault = await apiSearch.json();
  display(searchDefault.meals)
  $('.api_dataloading').fadeOut(200);
}
getDefaultName(" ");

function display(arr) {
  let meal = "";
  for (let i = 0; i < arr.length; i++) {
    meal += `
    <div class="col-md-6 col-lg-3">
    <div class="item position-relative rounded-3" onclick="getDetails('${arr[i].idMeal}')">
   <img src="${arr[i].strMealThumb}" alt="" class="w-100" loading="lazy">
        <div class="layer-item position-absolute rounded-3">
            <h3 class="text-capitalize ps-1 pe-3">${arr[i].strMeal}</h3>
            
        </div>
    </div>
  </div>
    `;
  }
  api_dataload_meals.innerHTML = meal;
}

async function searchLetter(term) {
  $('.api_dataloading').fadeIn(200).css('display', "flex");
  if (term == "") {
    term = "a";
  }
  const apiSearchLetter = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  const searchDefaultLetter = await apiSearchLetter.json();
  display(searchDefaultLetter.meals)
  $('.api_dataloading').fadeOut(200);
}
function Search() {
  SlideLeft();

  rowInput.innerHTML = `
<div class="row g-4 my-5 d-flex justify-content-center">
<div class="col-md-6 color"><input type="text" class="form-control bg-transparent text-white" placeholder="Search By Name" oninput='getDefaultName(this.value)'> </div>
<div class="col-md-6 color"><input type="text" class="form-control bg-transparent text-white" placeholder="Search By letter" oninput ='searchLetter(this.value)'></div>
</div>

`
  api_dataload_meals.innerHTML = " "
}


async function Area() {
  SlideLeft();

  rowInput.innerHTML = "";
  $('.api_dataloading').fadeIn(200).css('display', "flex");
  const apiArea = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  const Area = await apiArea.json();
  console.log(Area.meals);
  displayArea(Area.meals);
  $('.api_dataloading').fadeOut(200);

}
function displayArea(arr) {
  SlideLeft();
  let area = "";
  for (let i = 0; i < arr.length; i++) {
    area += `
  <div class="offset-2 col-10 offset-md-0 col-md-6 col-lg-3">
  <div class="text-center text-light" onclick="getTypeArea('${arr[i].strArea
      }')">
      <i class="fa-solid fa-house-laptop fa-4x"></i>
      <h3>${arr[i].strArea}</h3>
      </div>
  </div>
  `;
  }
  api_dataload_meals.innerHTML = area;
}

async function getTypeArea(typeArea) {
  SlideLeft();

  $('.api_dataloading').fadeIn(200).css('display', "flex");

  const AreaFood = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${typeArea}`
  );
  const meal = await AreaFood.json();
  console.log(meal.meals);
  displayType(meal.meals);
  $('.api_dataloading').fadeOut(200);

}

// displaing area and category
function displayType(arr) {
  SlideLeft()
  if (arr.length > 20) {
    arr.length = 20;
  }
  display(arr)

}



//  category
async function Category() {
  SlideLeft();

  rowInput.innerHTML = ""
  $('.api_dataloading').fadeIn(200).css('display', "flex");
  const apiCategory = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const category = await apiCategory.json();
  console.log(category.categories);
  displayCategory(category.categories);
  $('.api_dataloading').fadeOut(200);

}

function displayCategory(arr) {
  SlideLeft();

  let category = "";
  for (let i = 0; i < arr.length; i++) {
    category += `
  <div class="offset-2 col-10 offset-md-0 col-md-6 col-lg-3">
  <div class="item position-relative rounded-3" onclick="getTypeCategory('${arr[i].strCategory
      }')">
 <img src="${arr[i].strCategoryThumb}" alt="" class="w-100" loading="lazy">
      <div class="layer-item text-center position-absolute rounded-3">
          <h4 class="text-capitalize p-0 m-0">${arr[i].strCategory}</h4>
          <p class="m-0 p-0">${arr[i].strCategoryDescription
        .split(" ")
        .slice(0, 20)
        .join(" ")}
          </p>
      </div>
  </div>
</div>
  `;
  }
  api_dataload_meals.innerHTML = category;
}

async function getTypeCategory(typeCategory) {
  SlideLeft();
  $('.api_dataloading').fadeIn(200).css('display', "flex");
  const categoryFood = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${typeCategory}`
  );
  const meal = await categoryFood.json();
  console.log(meal.meals);
  displayType(meal.meals);
  $('.api_dataloading').fadeOut(200);

}


async function getDetails(id) {
  SlideLeft();
  rowInput.innerHTML = ""
  $('.api_dataloading').fadeIn(200).css('display', "flex");

  const detailMeal = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const responseMeal = await detailMeal.json();
  console.log(responseMeal.meals);
  displayDetail(responseMeal.meals[0]);
  $('.api_dataloading').fadeOut(200);;

}

function displayDetail(arr) {
  let ingredients = "";
  for (let i = 1; i <= 20; i++) {
    if (arr[`strIngredient${i}`]) {
      ingredients += `<li class="bg-info-subtle rounded-2 p-2 me-3 mb-2 text-green">${arr[`strMeasure${i}`]} ${arr[`strIngredient${i}`]}</li>`
    }
  };

  api_dataload_meals.innerHTML = `
    <div class="offset-2 col-9 col-lg-4 offset-lg-0 text-white">
      <img src="${arr.strMealThumb}" alt="" class="w-100 rounded-3">
        <h2 class="mt-2">${arr.strMeal}</h2>
    </div>
    <div class="offset-2 col-9 col-lg-8 text-light offset-lg-0">
      <h2>instruction</h2>
        <p>${arr.strInstructions}</p>
          <div class="text-capitalize">
            <h3><span class="me-2">Area</span>: ${arr.strArea} </h3>
            <h3><span class="me-2">Category</span>: ${arr.strCategory} </h3>
            <h3><span class="me-2">Recipes</span>: </h3>
            <ul class="list-unstyled d-flex flex-wrap"> 
          ${ingredients}
            </ul>
            <h3><span class="me-2">tags</span> :</h3>
            <ul class="list-unstyled d-flex flex-wrap">
            ${arr.strTags?.split(",").map(function (x) {
    return `<li class="bg-pink rounded-2 p-2 my-2 m-2 d-inline-block text-brown">${x}</li>`
  }).join('') || " "}
            </ul>
          </div>
          <div>
              <a href="${arr.strSource}" class="btn bg-green text-white text-capitalize" target="_blank"> Source</a>
              <a href="${arr.strYoutube}" class="btn bg-danger text-white text-capitalize"  target="_blank"> Youtube</a>
          </div>
    </div>

`
};


//||======> ingredients

async function Ingredient() {
  SlideLeft();

  rowInput.innerHTML = ""
  $('.api_dataloading').fadeIn(200).css('display', "flex");

  const apiIngredient = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  const Ingredient = await apiIngredient.json();
  console.log(Ingredient.meals);
  displayIngredient(Ingredient.meals);
  $('.api_dataloading').fadeOut(200);

}
function displayIngredient(arr) {
  SlideLeft();
  let ingredient = "";
  if (arr.length > 20) {
    arr.length = 20;
  }
  for (let i = 0; i < arr.length; i++) {
    ingredient += `
  <div class="offset-2 col-10 offset-md-0 col-md-6 col-lg-3">
  <div class="text-center text-light" onclick="getTypeIngredient('${arr[i].strIngredient
      }')">
  <i class="fa-solid fa-drumstick-bite fa-4x"></i>
      <h3>${arr[i].strIngredient}</h3>
      <p class="m-0 p-0">${arr[i].strDescription?.split(" ").slice(0, 20).join(" ") || " "}
      </p>
      </div>
  </div>
  `;
  }
  api_dataload_meals.innerHTML = ingredient;
}
async function getTypeIngredient(typeIngredient) {
  SlideLeft();

  $('.api_dataloading').fadeIn(200).css('display', 'flex');

  const ingredientFood = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${typeIngredient}`
  );
  const Ingredient = await ingredientFood.json();
  console.log(Ingredient.meals);
  displayType(Ingredient.meals);
  $('.api_dataloading').fadeOut(200);

}


// ||=============> form
function Contact() {
  SlideLeft();

  rowInput.innerHTML = "";
  api_dataload_meals.innerHTML = `
  
  <section class="min-vh-100 d-flex align-items-center justify-content-center">
  <form class="w-75 mx-auto">
      <div class="row g-4">
          <div class="col-lg-6">
              <input onkeyup='inputUser()' id="uName" class="form-control" type="text" placeholder="Enter your Name">
              <p id="alertName"
                  class="d-none form-control my-2 py-3 text-center text-brown border-0 bg-pink">
                  Special characters and numbers not allowed</p>
          </div>
          <div class="col-lg-6">
              <input onkeyup='inputEmail()' id="uEmail" class="form-control" type="email" placeholder="Enter your Email">
              <p id="alertEmail"
                  class="d-none form-control my-2 py-3 text-center text-brown border-0 bg-pink">
                  Email not valid *exemple@yyy.zzz</p>

          </div>
          <div class="col-lg-6">
              <input onkeyup='inputPhone()' id="uPhone" class="form-control" type="tel" placeholder="Enter your Phone">
              <p id="alertPhone"
                  class="d-none form-control my-2 py-3 text-center text-brown border-0 bg-pink">
                  Enter valid Phone Number</p>
          </div>
          <div class="col-lg-6">
              <input onkeyup='inputAge()' id="uAge" class="form-control" type="number" placeholder="Enter your Age">
              <p id="alertAge"
                  class="d-none form-control my-2 py-3 text-center text-brown border-0 bg-pink">
                  Enter valid Age </p>

          </div>
          <div class="col-lg-6">
              <input onkeyup='inputPassword()' id="uPassword" class="form-control" type="password"
                  placeholder="Enter your Password">
              <p id="alertPassword"
                  class="d-none form-control my-2 py-3 text-center text-brown border-0 bg-pink">
                  Enter valid password *Minimum eight characters, at least one letter and one
                  number:*</p>

          </div>
          <div class="col-lg-6">
              <input onkeyup='inputRePassword()' id="uRePassword" class="form-control" type="password"
                  placeholder="RePassword">
              <p id="alertRePassword"
                  class="d-none form-control my-2 py-3 text-center text-brown border-0 bg-pink">
                  Enter valid rePassword</p>

          </div>
          <button id="btnSubmit" type="button"
              class="btn text-capitalize col-lg-1 mx-auto text-danger border border-danger"
              disabled>submit</button>
      </div>
  </form>
</section> 
  
  `

}

function isNameValid() {
  const uRegex = /^[A-za-z]{3,10}(\s?[A-za-z]{3,10})?$/;
  return uRegex.test(document.getElementById("uName").value);
}

function inputUser() {
  if (!isNameValid() || document.getElementById("uName").value == "") {
    $("#alertName").removeClass("d-none");
  } else {
    $("#alertName").addClass("d-none");
  }
  if (Check()) {
    document.getElementById("btnSubmit").removeAttribute("disabled");
  } else {
    document.getElementById("btnSubmit").setAttribute("disabled", true);
  }
};

function isEmailValid() {
  const eRegex = /^[A-za-z]{3,20}([0-9]{1,4})?@[a-z]{3,7}\.[a-z]{3}$/;
  return eRegex.test(document.getElementById("uEmail").value);
}
function inputEmail() {
  if (!isEmailValid() || document.getElementById("uEmail").value == "") {
    $("#alertEmail").removeClass("d-none");
    if (document.getElementById("uName").value == "") {
      $("#alertName").removeClass("d-none");
    }
  } else {
    $("#alertEmail").addClass("d-none");
  }
  if (Check()) {
    document.getElementById("btnSubmit").removeAttribute("disabled");
  } else {
    document.getElementById("btnSubmit").setAttribute("disabled", true);
  }
};

function isPhoneValid() {
  const phoneRegex = /^[0-9]{12}$/;
  return phoneRegex.test(document.getElementById("uPhone").value);
}
function inputPhone() {
  if (!isPhoneValid() || document.getElementById("uPhone").value == "") {
    $("#alertPhone").removeClass("d-none");
    if (document.getElementById("uName").value == "") {
      $("#alertName").removeClass("d-none");
    }
    if (document.getElementById("uEmail").value == "") {
      $("#alertEmail").removeClass("d-none");
    }
  } else {
    $("#alertPhone").addClass("d-none");
  }
  if (Check()) {
    document.getElementById("btnSubmit").removeAttribute("disabled");
  } else {
    document.getElementById("btnSubmit").setAttribute("disabled", true);
  }
};

function isAgeValid() {
  const ageRegex = /^[0-9]{2}$/;
  return ageRegex.test(document.getElementById("uAge").value);
}
function inputAge() {
  if (!isAgeValid() || document.getElementById("uAge").value == "") {
    $("#alertAge").removeClass("d-none");
    if (document.getElementById("uName").value == "") {
      $("#alertName").removeClass("d-none");
    }
    if (document.getElementById("uEmail").value == "") {
      $("#alertEmail").removeClass("d-none");
    }
    if (document.getElementById("uPhone").value == "") {
      $("#alertPhone").removeClass("d-none");
    }
  } else {
    $("#alertAge").addClass("d-none");
  }
  if (Check()) {
    document.getElementById("btnSubmit").removeAttribute("disabled");
  } else {
    document.getElementById("btnSubmit").setAttribute("disabled", true);
  }
};

function isPasswordValid() {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}/;
  return passwordRegex.test(document.getElementById("uPassword").value);
}
function inputPassword() {
  if (!isPasswordValid() || document.getElementById("uPassword").value == "") {
    $("#alertPassword").removeClass("d-none");
    if (document.getElementById("uName").value == "") {
      $("#alertName").removeClass("d-none");
    }
    if (document.getElementById("uEmail").value == "") {
      $("#alertEmail").removeClass("d-none");
    }
    if (document.getElementById("uPhone").value == "") {
      $("#alertPhone").removeClass("d-none");
    }
    if (document.getElementById("uAge").value == "") {
      $("#alertAge").removeClass("d-none");
    }
  } else {
    $("#alertPassword").addClass("d-none");
  }
  if (Check()) {
    document.getElementById("btnSubmit").removeAttribute("disabled");
  } else {
    document.getElementById("btnSubmit").setAttribute("disabled", true);
  }
};

function isRePasswordValid() {
  return document.getElementById("uPassword").value == document.getElementById("uRePassword").value;
}

function inputRePassword() {
  if (!isRePasswordValid() || document.getElementById("uRePassword").value == "") {
    $("#alertRePassword").removeClass("d-none");
    if (document.getElementById("uName").value == "") {
      $("#alertName").removeClass("d-none");
    }
    if (document.getElementById("uEmail").value == "") {
      $("#alertEmail").removeClass("d-none");
    }
    if (document.getElementById("uPhone").value == "") {
      $("#alertPhone").removeClass("d-none");
    }
    if (document.getElementById("uAge").value == "") {
      $("#alertAge").removeClass("d-none");
    }
    if (document.getElementById("uPassword").value == "") {
      $("#alertPassword").removeClass("d-none");
    }
  } else {
    $("#alertRePassword").addClass("d-none");
  }
  if (Check()) {
    document.getElementById("btnSubmit").removeAttribute("disabled");
  } else {
    document.getElementById("btnSubmit").setAttribute("disabled", true);
  }
};

function Check() {
  if (
    isNameValid() &&
    isEmailValid() &&
    isPhoneValid() &&
    isAgeValid() &&
    isPasswordValid() &&
    isRePasswordValid()
  ) {
    return true;
  } else {
    return false;
  }
}
