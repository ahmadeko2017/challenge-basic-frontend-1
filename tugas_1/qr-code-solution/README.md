# Frontend Mentor - QR code component solution

This is a solution to the [QR code component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/qr-code-component-iux_sIO_H). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

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
- Live Site URL: [Live Site](https://ahmadeko2017.github.io/challenge-basic-frontend-1/tugas-1/)

## My process

### Built with

- Semantic HTML5 markup
- Flexbox
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Tailwind CSS](https://tailwindcss.com/) - For styles
- [Vite](https://vitejs.dev/) - Frontend Tooling

### What I learned

This project involved setting up a React environment with Vite and integrating Tailwind CSS. 

One specific learning point was configuring Tailwind properly with the `content` array to ensure it scans all my component files:

```js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // ...
}
```

## Author

- Frontend Mentor - [@ahmadeko2017](https://www.frontendmentor.io/profile/ahmadeko2017)
