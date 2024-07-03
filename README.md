# React + Vite + Vitest + MSW2.x + Testing Library + Jsdom

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Setup vitest

https://vitest.dev/guide/
https://github.com/vitest-dev/vitest/tree/main/examples/react

1. Install vitest

```bash
npm install vitest --save-dev
```

2. Add a script to your package.json

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

3. Configure vitest: modify vite.config.js, add test object

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.js"],
  },
});
```

4. Add vitest.setup.js setup file

```bash
touch vitest.setup.js
```

```js
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});
```

5. Install jest and testing-library/react and /jest-dom

```bash
npm install jest @testing-library/react @testing-library/jest-dom --save-dev
```

6. Vitet is not set as global as jest so you need to import it in your test files

```js
import { test, vi, expect } from "vitest";
```

7. Run tests

```bash
npm run test
```

8. The user-event library is not included in the testing-library/react package, so you need to install it separately

```bash
npm install @testing-library/user-event --save-dev
```

# Mocking

https://mswjs.io/docs/getting-started

1. Install msw

```bash
npm install msw --save-dev
```

2. vitest include build-in polyfill for fetch, so there is no issues with jsdom environment
