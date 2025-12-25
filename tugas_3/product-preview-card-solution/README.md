# Frontend Mentor - Product preview card component solution

This is a solution to the [Product preview card component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-preview-card-component-GO7UmttRfa). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### Links

- Solution URL: [Solution Repository](https://github.com/ahmadeko2017/challenge-basic-frontend-1)
- Live Site URL: [Live Site](https://ahmadeko2017.github.io/challenge-basic-frontend-1/tugas-3/)

## My process

### Built with

- Semantic HTML5 markup
- CSS Grid / Flexbox
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Tailwind CSS](https://tailwindcss.com/) - For styles
- [Vite](https://vitejs.dev/) - Frontend Tooling

### What I learned

This challenge highlighted the importance of responsive imagery properly.
I used the `<picture>` element to switch between different image files based on screen width:

```jsx
<picture>
  <source media="(min-width: 768px)" srcSet={imageProductDesktop} />
  <img src={imageProductMobile} alt="..." />
</picture>
```

I also worked with multiple fonts (Montserrat and Fraunces) by configuring them in `tailwind.config.js`.

## Author

- Frontend Mentor - [@ahmadeko2017](https://www.frontendmentor.io/profile/ahmadeko2017)
