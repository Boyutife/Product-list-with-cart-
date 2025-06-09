// Global variables
const cartForm = document.querySelector('.cart-form');
const productsContainer = document.querySelector('main');

// Maintain cart state
let cart = new Map();
let products = [];

// Function to fetch products from a JSON file

async function getProducts() {
  try {
    const res = await fetch('./data.json');
    const data = await res.json();

    const dataWithIdsAndQuantity = data.map((item, index) => ({
      ...item,
      id: index + 1,
      quantity: 0,
    }));
    return dataWithIdsAndQuantity;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

// Function to render products

function renderProducts(data) {
  data.forEach((product) => {
    const el = document.createElement('div');
    el.className = `card flex flex-col gap-1.5`;
    el.innerHTML = `
      <h2 class="text-slate-900 text-xl font-semibold">${product.name}</h2>
      <h3 class="-order-1 text-[hsl(14,86%,42%)]">${product.category}</h3>
      <strong class="text-rose-500 font-semibold text-2xl">$${product.price.toFixed(
        2
      )}</strong>
      <div class="card-img -order-2 relative mb-8 rounded-2xl ">
        <img class="card-img rounded-2xl" src="${product.image.mobile}" alt="${
      product.name
    }" />
        <div class="cartBtn absolute -bottom-6 cursor-pointer left-1/2 transform -translate-x-1/2 bg-white border border-rose-600 w-1/2 px-4 py-2 flex justify-center items-center gap-2 rounded-3xl" data-id="${
          product.id
        }">
          <img class="w-8" src="./assets/images/icon-add-to-cart.svg" alt="add cart icon" />
          <p>Add to Cart</p>
        </div>
      </div>
    `;
    productsContainer.appendChild(el);
    products.push(product);
    createQuantityBtns(product);
  });
}

// Function to create add to cart btns
function createQuantityBtns(product) {
  const btn = document.querySelector(`[data-id="${product.id}"]`);

  if (!btn) return;
  btn.addEventListener('click', (e) => {
    e.stopPropagation();

    if (cart.has(product.id)) return;

    updateCartBtnUi(btn, product);
    product.quantity = 1;

    cart.set(product.id, product);

    updateCartForm();
  });
}

// Function to update cart view
function updateCartBtnUi(btn, product) {
  // Update UI styles
  let cardImage = btn.closest('.card').querySelector('.card-img');
  cardImage.classList.add('border-2', 'border-rose-500');
  btn.classList.remove('bg-white', 'justify-center');
  btn.classList.add('bg-[hsl(14,86%,42%)]', 'justify-around');
  product.quantity = 1;
  // Replace Add to cart with +/- buttons
  btn.innerHTML = `
      <button
        data-action="decrease"
        class="decrease-btn border border-white rounded-full h-6 w-6 flex items-center justify-center p-0.5"
      >
        <img src="./assets/images/icon-decrement-quantity.svg" alt="decrease" />
      </button>
      <p class="quantity text-white">${product.quantity}</p>
      <button
        data-action="increase"
        class="increase-btn border border-white rounded-full h-6 w-6 flex items-center justify-center p-0.5"
      >
        <img src="./assets/images/icon-increment-quantity.svg" alt="increase" />
      </button>
      `;
  updateQuantity(btn, product);
}

// Function to reset cart button

function resetCartButton(btn) {
  const cardImage = btn.closest('.card-img');
  cardImage.classList.remove('border-2', 'border-rose-500');
  btn.classList.add('bg-white', 'justify-center');
  btn.classList.remove('bg-[hsl(14,86%,42%)]', 'justify-around');
  btn.innerHTML = `
        <img class="w-8" src="./assets/images/icon-add-to-cart.svg" alt="add cart icon" />
        <p>Add to Cart</p>
      `;
}

// Function to increase or decrease the quantity of products in the cart

function updateQuantity(btn, product) {
  const quantityText = btn.querySelector('.quantity');
  const increaseBtn = btn.querySelector('.increase-btn');
  const decreaseBtn = btn.querySelector('.decrease-btn');

  let count = product.quantity;

  increaseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    count = Math.min(count + 1, 99);
    product.quantity = count;
    quantityText.textContent = product.quantity;
    updateCartForm();
    cart.set(product.id, product);
  });

  decreaseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    count = Math.max(count - 1, 0);
    if (count === 0) {
      cart.delete(product.id);
      updateCartForm();
      resetCartButton(btn);
    } else {
      product.quantity = count;
      quantityText.textContent = product.quantity;
      updateCartForm();
      cart.set(product.id, product);
    }
  });
}

// Function to create cart form

function createCartForm() {
  const cartSection = document.createElement('section');
  cartSection.className =
    'cart-card container flex flex-col bg-white items-center rounded-2xl p-5';
  cartSection.innerHTML = `
      <h2 class="text-left w-full text-2xl text-[hsl(14,86%,42%)] font-bold">
          Your Cart (<span class="cart-quantity">0</span>)
        </h2>
   <img
          class="w-1/2"
          src="./assets/images/illustration-empty-cart.svg"
          alt="empty cart"
        />
        <p class="font-semibold text-[hsl(14,86%,42%)] mb-5">
          Your added items will appear here
        </p> 
  `;
  cartForm.appendChild(cartSection);
}

// Function to updatecartview

function updateCartForm() {
  cartForm.innerHTML = '';

  if (cart.size === 0) {
    createCartForm();
    return;
  }

  const cartItemsContainer = document.createElement('section');
  cartItemsContainer.className =
    'cart-card container flex flex-col bg-white items-center rounded-2xl gap-4 p-5 ';

  const totalQuantity = [...cart.values()].reduce(
    (sum, p) => sum + p.quantity,
    0
  );
  const totalPrice = [...cart.values()].reduce(
    (sum, p) => sum + p.quantity * p.price,
    0
  );

  const cartItems = [...cart.values()]
    .map(
      (product) => `
     <li
        class="cart-item flex items-center justify-between"
      >
        <div class="cart-item-info flex flex-col gap-2.5">
          <h3 class="text-xl font-semibold text-red-950">${product.name}</h3>
          <div class="cart-item-price-info flex items-center gap-2">
            <span
              class="item-quantity text-[hsl(14,86%,42%)] font-bold text-lg"
              >${product.quantity}x</span
            >
            <span class="item-unit-price text-rose-800 text-lg">
              @ $${product.price.toFixed(2)}
              <span
                class="item-total-price font-semibold ml-1 text-rose-900"
                >$${(product.quantity * product.price).toFixed(2)}</span
              ></span
            >
          </div>
        </div>
        <button
          class="remove-item-btn w-7 h-7 p-1.5 border-2 border-slate-200 rounded-full flex items-center justify-center" data-id="${
            product.id
          }"
        >
          <img
            class="remove-item-icon w-full"
            src="./assets/images/icon-remove-item.svg"
            alt="remove item"
            class="remove-item"
          />
        </button>
      </li>
  `
    )
    .join('');

  cartItemsContainer.innerHTML = `
   <h2 class="text-left w-full text-2xl text-[hsl(14,86%,42%)] font-bold">
          Your Cart (<span class="cart-quantity">${totalQuantity}</span>)
        </h2>
  
    <ul class="cart-items-list flex flex-col gap-4 w-full">${cartItems}</ul>

     <section
      class="order-total-section flex w-full justify-between items-center"
    >
      <h3 class="font-semibold">Order Total</h3>
      <div class="order-total-price text-2xl font-bold">$${totalPrice.toFixed(
        2
      )}</div>
    </section>

    <aside
      class="carbon-info-banner flex items-center gap-2 bg-rose-100 rounded-lg p-4 w-full"
    >
      <img
        src="./assets/images/icon-carbon-neutral.svg"
        alt="icon-carbon-neutral"
      />
      <p>
        This is a
        <strong class="font-bold">carbon-neutral</strong> delivery
      </p>
    </aside>

       <button
      class="confirm-order-btn bg-[hsl(14,86%,42%)] text-white font-bold text-xl rounded-4xl w-full py-4"
      type="submit"
    >
      Confirm Order
    </button>
  `;

  cartForm.appendChild(cartItemsContainer);

  // Attach event listeners to remove buttons
  const removeBtns = cartForm.querySelectorAll('.remove-item-btn');
  removeBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = parseInt(btn.dataset.id);
      const product = products.find((p) => p.id === id);
      if (product) {
        cart.delete(id);
        product.quantity = 0;

        // Also update the main product card UI
        const cardBtn = document.querySelector(`.cartBtn[data-id="${id}"]`);
        if (cardBtn) resetCartButton(cardBtn);

        updateCartForm(); // re-render the cart view
      }
    });
  });

  const confirmOrderBtn = cartForm.querySelector('.confirm-order-btn');
  confirmOrderBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (cart.size > 0) {
      const totalPrice = [...cart.values()].reduce(
        (sum, p) => sum + p.quantity * p.price,
        0
      );
      const modal = document.getElementById('modal');
      modal.classList.remove('hidden');
      const modalContent = document.createElement('div');
      const cartItems = [...cart.values()]
        .map(
          (item) => `
          <li
              class="cart-item flex items-center justify-between border-b py-0.5 pb-1.5 border-b-slate-200"
            >
              <img
                class="w-1/6 rounded-lg"
                src="${item.image.thumbnail}"
                alt="${item.name}"
              />

              <div class="cart-item-price-info flex flex-col items-start gap-2">
                      <h3 class="text-base font-bold text-red-950 truncate w-[150px]">
                      ${item.name}
                       </h3>

                <div class="flex gap-3 w-full">
                  <span
                    class="item-quantity text-[hsl(14,86%,42%)] font-bold text-base"
                    >${item.quantity}x</span
                  >
                  <span class="item-unit-price text-rose-900 text-base">
                    @ $${item.price.toFixed(2)}</span
                  >
                </div>
              </div>

              <p class="text-lg font-bold">$${(
                item.quantity * item.price
              ).toFixed(2)}</p>
            </li>
      `
        )

        .join('');

      modalContent.className =
        'absolute flex flex-col bottom-0 left-0 right-0 bg-white rounded-t-4xl p-6  gap-4';
      modalContent.innerHTML = `
      <img
          class="w-1/6"
          src="./assets/images/icon-order-confirmed.svg"
          alt="icon-order-confirmed"
        />
        <h2 class="text-3xl font-extrabold">Order <br />Confirmed</h2>
        <p class="text-[hsl(14,86%,42%)]">We hope you enjoy your food !</p>
        <div class="order-summary bg-rose-50 p-2.5 rounded">
          <ul class="p-3 space-y-1.5">
          ${cartItems}
          </ul>
          <div class="order-total flex justify-between py-3">
            <h3>Order Total</h3>
            <p>$${totalPrice.toFixed(2)}</p>
          </div>
        </div>

        <button
          class="start-new-order-btn bg-[hsl(14,86%,42%)] text-white font-bold text-xl rounded-4xl w-full py-3"
          type="button"
        >
          Start New Order
        </button>
      `;
      modal.appendChild(modalContent);

      const startNewOrder = modal.querySelector('.start-new-order-btn');
      startNewOrder.addEventListener('click', () => {
        e.preventDefault();
        e.stopPropagation();
        // clear cart
        cart.clear();
        // reset product UI
        products.forEach((product) => {
          product.quantity = 0;
          const btn = document.querySelector(
            `.cartBtn[data-id="${product.id}"]`
          );
          if (btn) resetCartButton(btn);
        });

        updateCartForm();

        document.getElementById('modal').classList.add('hidden');
      });
    }
  });
}

//  Fetch products and render them

getProducts().then((data) => {
  renderProducts(data);
  createCartForm();
});
