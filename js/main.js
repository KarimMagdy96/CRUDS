let tittle = document.getElementById("tittle");
let price = document.getElementById("price");
let tax = document.getElementById("tax");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let creatBtn = document.getElementById("creat");
let search = document.getElementById("search");
let updatebtn = document.getElementById("update");
let deletebtn = document.getElementById("delete");
let form = document.getElementById("form");
let totalprice = document.getElementsByClassName("total");
let tbody = document.getElementById("tbody");
let update = document.getElementById("update");
let searchTittle = document.getElementById("searchTittle");
let SearchCategory = document.getElementById("SearchCategory");
let titleReg = document.getElementById("titleReg");
let catReg = document.getElementById("catReg");
let countRege = document.getElementById("countReg");
let tittleReg = /^[a-z0-9_-]{2,16}$/;
let categoryReg = /^[a-z0-9_-]{2,16}$/;
let countReg = /([0-9]|[1-9][0-9]{1,2}|1000)/gm;
let creatvaldit = document.getElementById("creatvaldit");
let pdodacts;
let updateIndex = 0;
let input = document.getElementsByTagName("input");
let searchTerm = "title";
if (localStorage.getItem("prodacts")) {
  pdodacts = JSON.parse(localStorage.getItem("prodacts"));
  showProdacts();
} else {
  pdodacts = [];
}

//stop form from reloading page
form.onsubmit = function (event) {
  event.preventDefault();
  console.log("work");
};
Array.from(totalprice).forEach((element) => {
  element.addEventListener("input", function () {
    let mytotal =
      Number(price.value) +
      Number(tax.value) +
      Number(ads.value) -
      Number(discount.value);
    if (mytotal > 0 && price.value > 0) {
      total.innerHTML = mytotal;
      total.classList.add("bg-success");
      total.classList.remove("bg-danger");
    } else {
      total.innerHTML = 0;
      total.classList.add("bg-danger");
    }
  });
});

//get prodact and save it to local storage
creatBtn.addEventListener("click", function () {
  if (
    tittle.classList.contains("is-valid") &&
    category.classList.contains("is-valid") &&
    price.value != ""
  ) {
    let prodact = {
      tittle: tittle.value,
      price: price.value,
      tax: tax.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value,
    };
    if (count.value > 1) {
      for (let i = 0; i < count.value; i++) {
        pdodacts.push(prodact);
        localStorage.setItem("prodacts", JSON.stringify(pdodacts));
      }
    } else {
      pdodacts.push(prodact);
      localStorage.setItem("prodacts", JSON.stringify(pdodacts));
    }

    showProdacts();

    tittle.value = "";
    price.value = "";
    tax.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
  } else {
    creatvaldit.classList.remove("d-none");
  }
});

function showProdacts() {
  let cartona = ``;
  for (let i = 0; i < pdodacts.length; i++) {
    cartona += `
                    <tr>
                    <td>${i + 1}</td>
                    <td >${pdodacts[i].tittle}</td>
                    <td>${pdodacts[i].price}</td>
                    <td>${pdodacts[i].tax}</td>
                    <td>${pdodacts[i].ads}</td>
                    <td>${pdodacts[i].discount}</td>
                    <td>${pdodacts[i].total}</td>
                    <td><button id="update" class=" btn w-100 btn-warning text-white"onclick="getProdactinfo(${i})">Update</button></td>
                    <td><button id="delete" class=" btn w-100 btn-danger text-white"onclick="deleteProdact(${i})">Delete</button></td>
                </tr>
    `;
  }
  tbody.innerHTML = cartona;
}

function getProdactinfo(i) {
  updateIndex = i;
  let updatedProdact = pdodacts[i];
  tittle.value = updatedProdact.tittle;
  price.value = updatedProdact.price;
  tax.value = updatedProdact.tax;
  ads.value = updatedProdact.ads;
  discount.value = updatedProdact.discount;
  total.innerHTML = updatedProdact.total;
  category.value = updatedProdact.category;
  creatBtn.classList.add("d-none");
  count.disabled = true;
  update.classList.remove("d-none");
}

update.addEventListener("click", function () {
  let prodact = {
    tittle: tittle.value,
    price: price.value,
    tax: tax.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  pdodacts.splice(updateIndex, 1, prodact);
  localStorage.setItem("prodacts", JSON.stringify(pdodacts));

  showProdacts();

  tittle.value = "";
  price.value = "";
  tax.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
  update.classList.add("d-none");

  creatBtn.classList.remove("d-none");
  count.disabled = false;
});

function deleteProdact(i) {
  pdodacts.splice(i, 1);
  localStorage.setItem("prodacts", JSON.stringify(pdodacts));
  if (localStorage.getItem("prodacts")) {
    tittle.value = "";
    price.value = "";
    tax.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
    update.classList.add("d-none");
    creatBtn.classList.remove("d-none");
  }
  showProdacts();
}

searchTittle.addEventListener("click", function () {
  searchTerm = "title";
  search.placeholder = "Search by Title";
});

SearchCategory.addEventListener("click", function () {
  searchTerm = "category";
  search.placeholder = "Search by Category";
});

search.addEventListener("input", function () {
  if (searchTerm === "title") {
    let result = pdodacts.filter((prodact) =>
      prodact.tittle.toLowerCase().includes(search.value.toLowerCase())
    );
    let cartona = ``;

    for (let i = 0; i < result.length; i++) {
      cartona += `
                    <tr>
                    <td>${i + 1}</td>
                    <td >${result[i].tittle}</td>
                    <td>${result[i].price}</td>
                    <td>${result[i].tax}</td>
                    <td>${result[i].ads}</td>
                    <td>${result[i].discount}</td>
                    <td>${result[i].total}</td>
                    <td><button id="update" class=" btn w-100 btn-warning text-white"onclick="getProdactinfo(${i})">Update</button></td>
                    <td><button id="delete" class=" btn w-100 btn-info text-white"onclick="deleteProdact(${i})">Delete</button></td>
                </tr>
    `;
    }
    tbody.innerHTML = cartona;
  } else {
    let result = pdodacts.filter((prodact) =>
      prodact.category.toLowerCase().includes(search.value.toLowerCase())
    );
    let cartona = ``;

    for (let i = 0; i < result.length; i++) {
      cartona += `
                    <tr>
                    <td>${i + 1}</td>
                    <td >${result[i].tittle}</td>
                    <td>${result[i].price}</td>
                    <td>${result[i].tax}</td>
                    <td>${result[i].ads}</td>
                    <td>${result[i].discount}</td>
                    <td>${result[i].total}</td>
                    <td><button id="update" class=" btn w-100 btn-warning text-white"onclick="getProdactinfo(${i})">Update</button></td>
                    <td><button id="delete" class=" btn w-100 btn-info text-white"onclick="deleteProdact(${i})">Delete</button></td>
                </tr>
    `;
    }
    tbody.innerHTML = cartona;
  }
});

tittle.onkeyup = function () {
  if (tittleReg.test(tittle.value)) {
    tittle.classList.add("is-valid");
    tittle.classList.remove("is-invalid");
    titleReg.classList.add("d-none");
  } else {
    tittle.classList.add("is-invalid");
    tittle.classList.remove("is-valid");
    titleReg.classList.remove("d-none");
  }
};

category.onkeyup = function () {
  if (categoryReg.test(category.value)) {
    category.classList.add("is-valid");
    category.classList.remove("is-invalid");
    catReg.classList.add("d-none");
  } else {
    category.classList.add("is-invalid");
    category.classList.remove("is-valid");
    catReg.classList.remove("d-none");
  }
};

count.onkeyup = function () {
  if (countReg.test(count.value)) {
    count.classList.add("is-valid");
    count.classList.remove("is-invalid");
    countRege.classList.add("d-none");
  } else {
    count.classList.add("is-invalid");
    count.classList.remove("is-valid");
    countRege.classList.remove("d-none");
  }
};

Array.from(input).forEach((input) => {
  input.addEventListener("focus", () => {
    creatvaldit.classList.add("d-none");
  });
});
