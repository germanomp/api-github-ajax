/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Roboto', 'sans-serif'], // Exemplo de configuração com a fonte 'Roboto'
      },
    },
  },
  plugins: [],
}

