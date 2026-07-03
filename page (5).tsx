@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background-color: #F0F2F6;
  color: #111111;
}

/* Smooth focus ring */
:focus-visible {
  @apply outline-2 outline-offset-2 outline-stone-900;
}

/* Responsive SoundCloud iframe */
.sc-player iframe {
  width: 100%;
  border: 0;
  display: block;
}
