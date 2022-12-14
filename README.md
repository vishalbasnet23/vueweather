# [weatherapp](https://heartfelt-biscochitos-d46cb1.netlify.app/)

* Weather Application built with Vue Composition API and Tailwind CSS.
Weather Data is fetched from [open-meteo](https://open-meteo.com) as they do not require any API Keys or anything and provide all sort of weather data.
* City Dropdown is fetched from ~~[Postionstack](https://positionstack.com/documentation)~~ [Opencagedata](https://opencagedata.com) Forward Geocoding API which doesn't require your credit card numbers unlike Google Location API.

* Weather Icons used is by [Erikflowers](https://erikflowers.github.io/weather-icons/). Which I am actually planning on replacing with more colorful SVG Icons.

* LocalStorage for storing userData

* Setting page for users to set [Timezone]~~(http://worldtimeapi.org)~~ (https://timezonedb.com) and Temperature Unit.



## Todo
- [ ] Replace icons with more colorful icons
- [x] Integrate Pinia
- [ ] PWA
- [ ] Complete rewrite in TypeScript
- [ ] Welcome Screen for first time users

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
