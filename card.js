

const data = localStorage.getItem("cart");
const convert = JSON.parse(data);
console.log(convert);

let output = document.querySelector("#output");

function render() {
 
  output.innerHTML = '';
  
  convert.map((item, index) => {
    output.innerHTML += `
      <div class="cart-box">
        <div class="cart-box-image">
          <img src="{https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iPhone-13-Pro_iPhone-13-Pro-Max_09142021_inline.jpg.large_2x.jpg}" />
        </div>
        <div class="cart-box-content">
          <h1>${item.brand} ${item.model}</h1>
          <p>Storage: ${item.ram} / ${item.rom}</p>
          <p>${item.camera}</p>
          <div class="quantity">
            <button onclick="decreaseItems(${index}, ${item.price})">-</button>
            <p id="qun-num-${index}">${item.quantity}</p>
            <button onclick="increaseItems(${index}, ${item.price})">+</button>
          </div>
          <h4 id="price-${index}">Price $${item.price * item.quantity}</h4>
                  <a href="https://www.apple.com/by/iphone-13/"><button>Buy Now</button></a>

           <button class="delete" onclick="deleteItems(${index})">Delete Items</button>
        </div>
       
      </div>
    `;
  });
}
function increaseItems(index, price) {
  let quantityElem = document.querySelector(`#qun-num-${index}`);
  let priceElem = document.querySelector(`#price-${index}`);
  quantityElem.innerHTML++;
  priceElem.innerHTML = `Price $${price * quantityElem.innerHTML}`;

  // Update quantity in cart array and localStorage
  convert[index].quantity = parseInt(quantityElem.innerHTML);
  localStorage.setItem("cart", JSON.stringify(convert));
}

// Minus function to decrease quantity
function decreaseItems(index, price) {
  let quantityElem = document.querySelector(`#qun-num-${index}`);
  let priceElem = document.querySelector(`#price-${index}`);
  if (quantityElem.innerHTML > "1") {
    quantityElem.innerHTML--;
    priceElem.innerHTML = `Price $${price * quantityElem.innerHTML}`;

  
    convert[index].quantity = parseInt(quantityElem.innerHTML);
    localStorage.setItem("cart", JSON.stringify(convert));
  }
}


function buynow() {
  swal({
    title: "Are you sure?",
    text: "Once you add, your order will be submitted!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willSubmit) => {
    if (willSubmit) {
      swal("Your order has been submitted successfully!", {
        icon: "success",
      });
    } else {
      swal("Your order is still in the cart.");
    }
  });
}

// Delete item function
function deleteItems(index) {
  convert.splice(index, 1); 
  localStorage.setItem("cart", JSON.stringify(convert)); // Update localStorage
  render();
}


render();