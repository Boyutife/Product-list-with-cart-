# Frontend Mentor - Product list with cart solution

This is a solution to the [Product list with cart challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- Add items to the cart and remove them
- Increase/decrease the number of items in the cart
- See an order confirmation modal when they click "Confirm Order"
- Reset their selections when they click "Start New Order"
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./assets/images/Screenshot.png)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [https://boyutife.github.io/Product-list-with-cart-/](https://boyutife.github.io/Product-list-with-cart-/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Tailwind

### What I learned

### 🚀 Highlights of My Learning

#### 🧰 `.map()` and `.filter()`

I learned how to use `.map()` and `.filter()` to transform and clean up fetched JSON data. This was especially helpful when I needed to add new key-value pairs to the data.

```js
const modifiedData = data.map((item) => ({
  ...item,
  addedKey: 'newValue',
}));

const activeItems = modifiedData.filter((item) => item.isActive);
```

---

#### ⏳ Getting Better with `async` Functions

I improved a lot in writing and organizing asynchronous code using `async/await`. This helped me manage data fetching in a clean and readable way.

```js
async function init() {
  const res = await fetch('/api/data');
  const data = await res.json();
  renderUI(data);
}
```

---

#### 🎯 Shorthand Class Toggle

I discovered a clean shorthand for toggling class names based on a condition:

```js
el.classList.toggle('classname', !condition);
```

This pattern helped me simplify my logic when updating UI states.

---

#### 🆔 Using `data-id` Attributes

I used `data-id` attributes to store and retrieve custom data from HTML elements:

```html
<button data-id="101">Click Me</button>
```

```js
const id = e.target.dataset.id;
```

---

#### 🛑 `e.stopPropagation()`

I learned to use `e.stopPropagation()` to prevent events from bubbling up to parent elements—very useful when managing nested click events.

```js
element.addEventListener('click', (e) => {
  e.stopPropagation();
});
```

---

#### 🔢 Smart Counter Limiting

This line helped me safely increase a value without going above a maximum (like 99):

```js
count = Math.min(count + 1, 99);
```

---

#### 📞 Calling Functions with Arguments

I learned where and how to properly call a function and pass arguments and parameters.

```js
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet('Developer');
```

---

This project boosted my confidence with JavaScript fundamentals, especially DOM interactions, working with Json, and writing cleaner, more maintainable code.

---

### Continued development

🔢 Reusable Functions and Clean Code
I want to keep improving how I structure my code, break logic into reusable functions, and make my code more readable and maintainable. This includes naming functions clearly and keeping concerns separated.

💡 Responsive Design and Layout
While I focused mainly on JavaScript, I want to spend more time refining my HTML/CSS layout skills, especially learning about Flexbox, Grid, and media queries to build responsive, mobile-friendly interfaces.

## Author

- Frontend Mentor - [@boyutife](https://www.frontendmentor.io/profile/boyutife)
- Twitter - [@boluwatife_ven](https://www.twitter.com/boluwatife_ven)

## Acknowledgments

Thank God
