function updateCounters() {
    // Total number of products
    var totalCount = document.getElementById('total-count');
    var totalProducts = document.getElementsByClassName("product").length;
    totalCount.innerHTML = totalProducts;

    // Total number of bought products
    var boughtCount = document.getElementById('bought-count');
    var boughtProducts = document.getElementsByClassName("bought").length;
    boughtCount.innerHTML = boughtProducts;

    // Total number of unbought products
    var productCount = document.getElementById('product-count');
    var unboughtProducts = totalProducts - boughtProducts;
    productCount.innerHTML = unboughtProducts;
}

function toggleBought() {
    var checkbox = this;
    
    if (checkbox.checked) {
      checkbox.parentElement.className = "product bought";
    } else {
    checkbox.parentElement.className = "product";
    }
updateCounters();
}

function submitProduct() {
    var inputField = document.getElementById("new-product");
    var newProductTitle = inputField.value;
    createProduct(newProductTitle);

    // reset the value of the inputField to make it empty and
    // ready to create new products
    inputField.value = null;

updateCounters();

  function createProduct(title) {
    // create a list item
    var listItem = document.createElement("li");
    listItem.className = "product";

    // create a checkbox and add it to the list item
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "product-" + nextProductId();
    checkbox.checked = false;

    // assign the toggleBought function on the checkbox's onchange event
    checkbox.onchange = toggleBought.bind(checkbox);
    listItem.appendChild(checkbox);

    //Created quantity box 
    var quantity = document.createElement("input");
    quantity.type = "number";
    quantity.id = "quantity";
    listItem.appendChild(quantity);

    // create some whitespace to put between the checkbox and the textarea
    var space = document.createTextNode("    ");
    listItem.appendChild(space);

    // create a textarea that holds the title and add it to the list item
    var textarea = document.createElement("textarea");
    textarea.htmlFor = checkbox.id;
    textarea.innerHTML = title;
    listItem.appendChild(textarea);

    // add the list item with the checkbox, the whitespace and the textarea to the list
    var list = document.getElementById("productlist");
    list.appendChild(listItem);
  }

// Every product has it's own id so we can add that to the corresponding textarea's
function nextProductId() {
    return document.getElementsByClassName("product").length + 1;
    }
}



function cleanUpBoughtProducts() {
    var list = document.getElementById("productlist");
    var boughtItems = document.getElementsByClassName("bought");

    // Reverse loop through the bought product items so we can remove them without changing the index of the remaining items when we remove them
    for (var i = boughtItems.length; i > 0; i--) {
        list.removeChild(boughtItems[i-1]);
    }       

    updateCounters();
}