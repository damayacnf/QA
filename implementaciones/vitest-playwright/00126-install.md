# Guía de instalación Vitest y Playwright.

A continuación, se presentan los pasos necesarios para instalar Vitest y Playwright, junto con la estructura recomendad de carpetas, archivos y los comandos principales para su ejecución.

# 📁 Estructura de carpetas/archivos

En esta sección se describen las carpetas y archivos que fueron agregados o modificados en el proyecto.

## Estructura inicial

```markdown
gp_fuse/
├── src/
│   └──  test.ts               
├── test/                      
│   ├── e2e/                  
│   ├── unit/                  
│   └── utils/                 
│   └── results/                
├── vitest.config.ts           
├── playwright.config.ts        
└── package.json              
```

- **`ts`** Archivo de configuración que se ejecuta antes de cada test.
- **`test/`** Estructura de carpeta donde estarán alojafods los test y utilidades para los mismos, así como los resultados de los test que genera Vitest y Playwright.
    - **`e2e/`** Carpeta para los test e2e.
    - **`unit/`** Carpeta pasa los test unit.
    - **`utils/`** Carpeta de utilidades para los test
- **`config.ts`** Archivo para la configuración de Vitest.
- **`config.ts`** Archivo para la configuración de Playwright.
- **`package.json` (Modificado)** Se agregadon las dependencias nuevas y se quitaron las de karma y Jasmine, además se agregaron comandos para ejecutar los test.

*Todos los archivos y carpetas, con excepción del archivo package.json, corresponden a nuevas integraciones incorporadas al proyecto.*

# 💻 Dependencias

A continuación se listan las dependencias que se instalarán, así como las que se eliminarán del proyecto

## ✅ Instalar

Instalar dependencias de Vitest y Playwight

```bash
npm install -D vitest@3 @vitest/ui @vitest/coverage-v8 jsdom@26 playwright@1.57.0 @playwright/test
```

Si alguna dependencia genera errores de compatibilidad, agrega la flag `--legacy-peer-deps` al comando de instalación. Sin embargo, se recomienda buscar versiones compatibles de las dependencias, ya que el uso de esta flag puede ocasionar problemas de estabilidad en el futuro.

## ❌ Desinstalar

Eliminar dependencias de Karma y Jasmine

```bash
npm uninstall karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter
```

# 📝 Modificación de archivos

A continuación se listan los archivos existentes que se modificarán, ya sea porque se agregará contenido nuevo o se reemplazará por completo

## 📝 package.json

En el archivo `package.json`, agrega los siguientes scripts para ejecutar las pruebas. Si existen scripts previos de Karma y Jasmine, elimínalos.

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "e2e": "playwright test",
    "e2e:debug": "playwright test --debug",
    "e2e:headed": "playwright test --headed",
    "e2e:ui": "playwright test --ui"
  }
}
```

- **`test**` – Corre los test en modo watch
- **`tets:run`** – Ejecución uúnica pa CI/CD
- **`test:ui`** – Abre la interfaz visual de Vitest
- **`test:coverage`** – Genera reporte de cobertura de código
- **`e2e**` – Ejecuta test E2E en segundo plano
- **`e2e:debug`** – Abre el inspector para depuración
- **`e2e:headed`** – Ejecuta mostrando el navegador
- **`e2e:ui**` – Interfaz interactiva de Playwright

## 📝 .gitignore

En el archivo `.gitignore`  agregar lo siguiente para omitir archivos innecesarios.

```markdown
# Vitest
coverage/
.vitest/

# Testing
/tests/**/*.log
/tests/results/
*.png
*.jpg

# Playwright
test-results/
playwright-report/
blob-report/
playwright/.auth/
```

# 📄 Crear nuevos archivos y capetas

Antes de realizar este paso es necesario crear las carpetas según la estructura indicada en [Estructura de Carpeta y Archivos](#-estructura-de-carpetasarchivos).

## 📄 vitest.config.ts

Este archivo va en la root del proyecto.

```tsx
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,                   // Permite usar funciones como 'describe', 'it', 'expect' sin importarlas en cada archivo
    environment: 'jsdom',            // Simula un entorno de navegador para probar componentes web
    include: ['tests/unit/**/*.{test,spec}.ts'], // Define qué archivos se consideran pruebas unitarias
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache', 'tests/e2e/**'], // Ignora carpetas innecesarias y tests E2E
    setupFiles: ['./src/test.ts'],   // Archivo que se ejecuta antes de cada test (configuración global)
    coverage: {
      provider: 'v8',                // Utiliza el motor V8 nativo para medir la cobertura de código
      reporter: ['text', 'lcov', 'html', 'json'], // Formatos de reporte: consola, lcov, sitio web (html) y archivo json
      reportsDirectory: 'tests/results/coverage', // Ubicación donde se guardarán los resultados del coverage
      exclude: [                     // Archivos que no deben contar para la estadística de cobertura
        'node_modules/',
        'src/test.ts',
        '**/*.spec.ts',
        '**/index.ts',
        'dist/**',
        'tests/**'
      ]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Permite usar '@/' como acceso directo a la carpeta 'src'
    }
  }
});
```

## 📄 playwright.config.ts

Este archivo va en la root del proyecto. **IMPORTANTE** configurar la url descrita en el archivo.

```tsx
import { defineConfig, devices } from '@playwright/test';

const url = ''                                 // IMPORTANTE CONFIGURAR LA URL DE LA APP.

export default defineConfig({
  testDir: './tests/e2e',                      // Directorio donde se encuentran los archivos de prueba E2E
  outputDir: 'tests/results/e2e/artifacts',    // Carpeta para trazas, capturas de pantalla y videos
  fullyParallel: true,                         // Ejecuta todas las pruebas en paralelo para mayor velocidad
  forbidOnly: !!process.env.CI,                // Falla si hay un '.only' en el código (útil para entornos de CI/CD)
  retries: process.env.CI ? 2 : 0,             // Reintenta fallos 2 veces en CI para descartar errores aleatorios
  workers: process.env.CI ? 1 : undefined,     // En CI usa 1 solo trabajador para evitar conflictos de recursos
  reporter: [['html', { outputFolder: 'tests/results/e2e/report' }]], // Genera reporte HTML en la ruta especificada
  use: {
    baseURL: url,                               // URL base para evitar escribirla completa en cada test
    trace: 'on-first-retry',                    // Graba una traza detallada solo cuando una prueba falla la primera vez
    screenshot: 'only-on-failure',              // Toma captura de pantalla automáticamente si el test falla
    video: 'retain-on-failure',                 // Guarda el video de la ejecución solo si hubo errores
  },
  projects: [
    {
      name: 'chromium', // Pruebas en Google Chrome / Edge (Chromium)
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox', // Pruebas en Mozilla Firefox
      use: { ...devices['Desktop Firefox'] },
    },
    // {
    //   name: 'webkit', // Pruebas en Safari (Webkit)
    //   use: { ...devices['Desktop Safari'] },
    // },
    // /* Configuración para dispositivos móviles */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  /* Configuración del servidor local para que Playwright lo levante automáticamente */
  webServer: {
    command: 'npm start',                  // Comando para iniciar tu aplicación localmente
    url: url ,                             // URL que Playwright espera que esté activa antes de empezar
    reuseExistingServer: !process.env.CI,  // En local, reutiliza el servidor si ya está corriendo
  },
});
```

## 📄 src/test.ts

Este archivo va ubicado dentro de la **carpeta src.** En caso de querer cambiar la ubicación del archivo también deberá de cambiar la referencia del mismo que hace en el archivo [**vitest.config.ts**](#-vitestconfigts) en la propiedad **setupFiles**.

```tsx
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// Inicializa el entorno de pruebas de Angular.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,     // Módulo base para compilar componentes dinámicamente en tests
  platformBrowserDynamicTesting(), // Define la plataforma de ejecución para las pruebas del navegador
);
```

## 📄 tests/utils/screenshot.ts

Este archivo debe ubicarse en la carpeta **test/utils** dentro del directorio raíz del proyecto. ***Su uso es opcional y proporciona la funcionalidad necesaria para generar capturas de pantalla de forma automática cuando el desarrollador lo requiera.***

```tsx
import { Page, TestInfo } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export async function takeScreenshootPerTest(
  page: Page,
  testInfo: TestInfo,
  name: string
) {
  // directorio base para las capturas de pantalla
  const baseDir = 'tests/results/screenshots';
  const testDir = path.join(baseDir, testInfo.title.replace(/\s+/g, '_'));

  // si no existe el directorio, lo creamos
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }

  // ruta completa del archivo de la captura de pantalla
  const filePath = path.join(testDir, `${name}.png`);

  // tomamos la captura de pantalla
  await page.screenshot({ path: filePath, fullPage: true });

  // devolvemos la ruta del archivo
  return filePath;
}
```

Una vez hechas las instalaciones y creados los archivos, ejecutar el siguiente comando instalar los navegadores que necesita Playwright para ejecutar los test, estos se definieron en el archivo [playwright.config.ts](#-playwrightconfigts).

```bash
npx playwright install
```
