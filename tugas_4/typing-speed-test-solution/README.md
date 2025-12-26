# Frontend Mentor - Typing speed test solution

This is a solution to the [Typing speed test challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/typing-speed-test-task-4). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

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
- Live Site URL: [Live Site](https://ahmadeko2017.github.io/challenge-basic-frontend-1/tugas-4/)

## My process

### Built with

- Semantic HTML5 markup
- CSS Grid / Flexbox
- [React](https://reactjs.org/) - JS library
- [Tailwind CSS](https://tailwindcss.com/) - For styles
- [Vite](https://vitejs.dev/) - Frontend Tooling

### What I learned

This challenge involved implementing state-driven logic for a typing game.
Key features implemented:
- **WPM Calculation**: `(Characters / 5) / TimeInMinutes`.
- **Typing Mechanics**: Comparing characters in real-time and highlighting errors.
- **Difficulty Selection**: Loading different text sets from JSON data.

```jsx
// WPM Logic
const timeInMinutes = (Date.now() - startTime) / 1000 / 60;
const grossWpm = (finalInput.length / 5) / timeInMinutes;
setWpm(Math.round(grossWpm));
```

## Author

- Frontend Mentor - [@ahmadeko2017](https://www.frontendmentor.io/profile/ahmadeko2017)
