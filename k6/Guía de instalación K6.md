# Guía de instalación K6

A continuación se describen los pasos recomendados para instalar k6, configurar el entorno y crear la estructura de carpetas inicial para un proyecto organizado de pruebas de carga.

## 📚 Estructura del proyecto

```markdown
nombre_proyecto/
├── .vscode/
│   ├── extensions.json
│   ├── k6.code-snippets
│   └── settings.jso
├── reports/
├── src/
│   ├── config/
│   │   ├── options.js
│   │   └── thresholds.js
│   ├── data/
│   ├── k6-tests/
│   ├── lib/
│   │   ├── const.js
│   │   └── helpers.js
│   └── scenarios/
│       ├── login.js
│       └── searhc.js
├── .editorconfig
├── .gitignore
├── .prettierignore
├── .prettierrc
├── README.md
├── run-test.bat
├── run-test.ps1
└── run-test.sh
```

- **`.vscode/`** — Configuración específica de Visual Studio Code para el proyecto.
    - `extensions.json` — Extensiones recomendadas para instalar.
    - `k6.code-snippets` — Snippets personalizados de código k6 para agilizar desarrollo.
    - `settings.json` — Configuración del editor (formato, linting, etc.).
- **`reports/`** — Salida de resultados de tests.
- **`src/`** — Código fuente principal del proyecto.
    - **`config/`** — Configuraciones globales de k6.
        - `options.js` — Opciones de ejecución (VUs, duración, stages, executors).
        - `thresholds.js` — Umbrales de rendimiento y SLOs (http_req_duration, checks, etc.).
    - **`data/`** — Archivos CSV o JSON para parametrización (usuarios de prueba, productos, payloads).
    - **`k6-tests/`** — Scripts principales según el tipo de prueba (smoke, load, stress, spike, soak).
    - **`lib/`** — Utilidades y funciones auxiliares compartidas.
        - `const.js` — Constantes globales (URLs base, timeouts, headers, códigos HTTP).
        - `helpers.js` — Funciones reutilizables (parseo, validaciones, logging, random data).
    - **`scenarios/`** — Flujos de usuario modulares y reutilizables.
        - `login.js` — Escenario de autenticación/inicio de sesión.
        - `search.js` — Escenario de búsqueda (nota: hay un typo "searhc" en tu estructura).
- **`.editorconfig`** — Reglas de formato consistentes entre editores (indentación, charset, EOL).
- **`.gitignore`** — Archivos y carpetas excluidos de control de versiones.
- **`.prettierignore`** — Archivos que Prettier no debe formatear.
- **`.prettierrc`** — Configuración de Prettier (espaciado, comillas, punto y coma).
- **`README.md`** — Documentación del proyecto (setup, cómo ejecutar tests, convenciones).
- **`run-test.bat`** — Script de ejecución para Windows (Command Prompt).
- **`run-test.ps1`** — Script de ejecución para Windows (PowerShell).
- **`run-test.sh`** — Script de ejecución para Linux/macOS (Bash).

## 🛠 Instalación

[Guía de instalación oficial K6](https://grafana.com/docs/k6/latest/set-up/install-k6/)

### Windows

Para realizar la instalación de **K6 en windows** tenemos varias formas:

### Windows Package Manager (Winget) - RECOMENDADO

Asegurece de tener instalado winget para ello mediante el CMD ejecutar el siguiente comando. En caso de no tenerlo instalado puede descargarlo desde el [repositorio oficial](https://github.com/microsoft/winget-cli/releases).

```bash
winget
```

Eejecutar el siguiente comando para instalar K6.

```bash
winget install k6 --source winget
```

*El proceso de descarga e instalación es automático.*

### Binario .exe

Refierace al siguiente [enlace](https://grafana.com/docs/k6/latest/set-up/install-k6/#windows) para descargar el instalador.

### Linux

Para instalar k6 en Linux ejecute los siguientes comandos:

```bash
sudo gpg -k
```

```bash
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
```

```bash
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] <https://dl.k6.io/deb> stable main" | sudo tee /etc/apt/sources.list.d/k6.list
```

```bash
sudo apt-get update && sudo apt-get install k6
```

## Creación del Proyecto

Crear carpeta donde vivira el proyecto

```bash
mkdir nombre_proyecto && cd nombre_proyecto
```

### 📁 Crear estructura de carpetas y archivos

Linux (bash)

```bash
mkdir -p src/{config,data,k6-tests,lib,scenarios} .vscode reports && touch {.vscode/{extensions.json,k6.code-snippets,settings.json},src/config/{options.js,thresholds.js},src/lib/{const.js,helpers.js},src/scenarios/{login.js,search.js},.editorconfig,.gitignore,.prettierignore,.prettierrc,README.md,run-test.bat,run-test.ps1,run-test.sh}
```

Windows (Powershell)

```powershell
$folders = "src/config","src/data","src/k6-tests","src/lib","src/scenarios",".vscode","reports"; $folders | ForEach-Object { New-Item -Path $_ -ItemType Directory -Force }; $files = ".vscode/extensions.json",".vscode/k6.code-snippets",".vscode/settings.json","src/config/options.js","src/config/thresholds.js","src/lib/const.js","src/lib/helpers.js","src/scenarios/login.js","src/scenarios/search.js",".editorconfig",".gitignore",".prettierignore",".prettierrc","README.md","run-test.bat","run-test.ps1","run-test.sh"; $files | ForEach-Object { New-Item -Path $_ -ItemType File -Force }
```

## 📄 Contenido de los archivos

.vscode/extension.json

```json
{
  "recommendations": [
    "k6.k6",
    "esbenp.prettier-vscode"
  ]
}
```

.vscode/k6.code-snippets

```json
{
    "k6 Smoke": {
        "prefix": "k6smoke",
        "body": [
            "/**",
            "* ${2:Smoke Test}",
            "* Objetivo: ${4:Verificar que el endpoint responde correctament bajo condiones minimas o normales de carga}",
            "* Escenario: ${5:10 usuarios virtuales durante 30 segundos}",
            "* Métricas clave: ${6:Tiempo de respuesta y tasa de error}",
            "* Resultados esperados: ${7:Se espera que el endpoint responda con un código de estado 200 y tiempos de respuesta aceptables}",
            "* Notas adicionales: ${8:(Cualquier información adicional relevante para la prueba)}",
            "*/",
            "",
            "import http from 'k6/http';",
            "import { check, sleep } from 'k6';",
            "",
            "export const options = {",
            "  vus: 10,",
            "  duration: '30s',",
            "};",
            "",
            "export default function () {",
            "  const response = http.get('${1:<http://test.k6.io>}');",
            "  check(response, { 'status is 200': (r) => r.status === 200 });",
            "  sleep(1);",
            "}"
        ],
        "description": "Smoke test para verificar que el endpoint responde correctamente."
    },
    "k6 Load": {
        "prefix": "k6load",
        "body": [
            "* ${2:Load Test}",
            "* Objetivo: ${4:Verificar que el endpoint responde correctament bajo condiciones de carga moderada}",
            "* Escenario: ${5:50 usuarios virtuales durante 5 minutos}",
            "* Métricas clave: ${6:Tiempo de respuesta y tasa de error}",
            "* Resultados esperados: ${7:Se espera que el endpoint responda con un código de estado 200 y tiempos de respuesta aceptables bajo carga}",
            "* Notas adicionales: ${8:(Cualquier información adicional relevante para la prueba)}",
            "*/",
            "",
            "import http from 'k6/http';",
            "import { check, sleep } from 'k6';",
            "",
            "export const options = {",
            "  stages: [",
            "    { duration: '1m', target: 50 }, // Ramp-up to 50 users over 1 minute",
            "    { duration: '3m', target: 50 }, // Stay at 50 users for 3 minutes",
            "    { duration: '1m', target: 0 }, // Ramp-down to 0 users over 1 minute",
            "  ],",
            "};",
            "",
            "export default function () {",
            "  const response = http.get('${1:<http://test.k6.io>}');",
            "  check(response, { 'status is 200': (r) => r.status === 200 });",
            "  sleep(1);",
            "}"
        ],
        "description": "Load test para simular una carga gradual de usuarios y medir el rendimiento del endpoint."
    },
    "k6 Stress": {
        "prefix": "k6stress",
        "body": [
            "* ${2:Stress Test}",
            "* Objetivo: ${4:Verificar que el endpoint responde correctament bajo condiciones de carga máxima}",
            "* Escenario: ${5:100 usuarios virtuales durante 5 minutos}",
            "* Métricas clave: ${6:Tiempo de respuesta y tasa de error}",
            "* Resultados esperados: ${7:Se espera que el endpoint responda con un código de estado 200 y tiempos de respuesta aceptables bajo carga máxima}",
            "* Notas adicionales: ${8:(Cualquier información adicional relevante para la prueba)}",
            "*/",
            "",
            "import http from 'k6/http';",
            "import { check, sleep } from 'k6';",
            "",
            "export const options = {",
            "  stages: [",
            "    { duration: '1m', target: 100 }, // Ramp-up to 100 users over 1 minute",
            "    { duration: '5m', target: 100 }, // Stay at 100 users for 5 minutes",
            "    { duration: '1m', target: 0 }, // Ramp-down to 0 users over 1 minute",
            "  ],",
            "};",
            "",
            "export default function () {",
            "  const response = http.get('${1:<http://test.k6.io>}');",
            "  check(response, { 'status is 200': (r) => r.status === 200 });",
            "  sleep(1);",
            "}"
        ],
        "description": "Stress test para simular una carga máxima de usuarios y evaluar cómo el sistema maneja la presión."
    },
    "k6 Spike": {
        "prefix": "k6spike",
        "body": [
            "* ${2:Spike Test}",
            "* Objetivo: ${4:Verificar que el endpoint responde correctament bajo un aumento repentino de usuarios}",
            "* Escenario: ${5:10 usuarios virtuales durante 1 minuto, luego un pico a 100 usuarios durante 1 minuto, seguido de una caída a 0 usuarios durante 1 minuto}",
            "* Métricas clave: ${6:Tiempo de respuesta y tasa de error}",
            "* Resultados esperados: ${7:Se espera que el endpoint responda con un código de estado 200 y tiempos de respuesta aceptables durante el pico de usuarios}",
            "* Notas adicionales: ${8:(Cualquier información adicional relevante para la prueba)}",
            "*/",
            "",
            "import http from 'k6/http';",
            "import { check, sleep } from 'k6';",
            "",
            "export const options = {",
            "  stages: [",
            "    { duration: '1m', target: 10 }, // Ramp-up to 10 users over 1 minute",
            "    { duration: '1m', target: 100 }, // Spike to 100 users for 1 minute",
            "    { duration: '3m', target: 100 }, // Stay at 100 users for 3 minutes",
            "    { duration: '1m', target: 0 }, // Ramp-down to 0 users over 1 minute",
            "  ],",
            "};",
            "",
            "export default function () {",
            "  const response = http.get('${1:<http://test.k6.io>}');",
            "  check(response, { 'status is 200': (r) => r.status === 200 });",
            "  sleep(1);",
            "}"
        ],
        "description": "Spike test para simular un aumento repentino de usuarios y evaluar cómo el sistema maneja la carga inesperada."
    },
    "def": {
        "prefix": "def",
        "body": [
            "/**",
            "* ${1:(Nombre de la prueba)}",
            "* Objetivo: ${3:(Qué se espera lograr con esta prueba)}",
            "* Escenario: ${4:(Descripción del escenario de prueba, incluyendo el número de usuarios virtuales, la duración de la prueba, etc.)}",
            "* Métricas clave: ${5:(Qué métricas se van a monitorear, como el tiempo de respuesta, la tasa de error, etc.)}",
            "* Resultados esperados: ${6:(Qué resultados se consideran aceptables para esta prueba)}",
            "* Notas adicionales: ${7:(Cualquier información adicional relevante para la prueba)}",
            "*/",
            "",
            "import http from 'k6/http';",
            "import { check, sleep } from 'k6';",
            "",
            "export default function() {",
            "  $0",
            "};"
        ],
        "description": "Plantilla básica para un script de k6."
    },
    "opt": {
        "prefix": "opt",
        "body": [
            "export let options = {",
            "  $0",
            "};"
        ],
        "description": "Plantilla para definir las opciones de configuración de un script de k6."
    },
    "che": {
        "prefix": "che",
        "body": [
            "check(response, {",
            "  'is status code 200': (r) => r.status === 200,",
            "});"
        ],
        "description": "Plantilla para verificar el código de estado de una respuesta HTTP."
    },
    "slee": {
        "prefix": "slee",
        "body": [
            "sleep(${1:10});"
        ],
        "description": "Plantilla para agregar una pausa en la ejecución del script de k6."
    },
    "get": {
        "prefix": "get",
        "body": [
            "const ${1:response} = http.get('${2:<http://test.k6.io>}');"
        ],
        "description": "Plantilla para realizar una solicitud GET a un endpoint específico."
    },
    "post": {
        "prefix": "post",
        "body": [
            "const ${3:response} = http.post('${1:<http://test.k6.io>}', ${2:headers});"
        ],
        "description": "Plantilla para realizar una solicitud POST a un endpoint específico con un cuerpo de datos."
    },
    "put": {
        "prefix": "put",
        "body": [
            "const ${3:response} = http.put('${1:<http://test.k6.io>}', {",
            "  ${2:headers}",
            ");"
        ],
        "description": "Plantilla para realizar una solicitud PUT a un endpoint específico con un cuerpo de datos."
    },
    "delete": {
        "prefix": "del",
        "body": [
            "const ${3:response} = http.del('${1:<http://test.k6.io>}', {",
            "  ${2:headers}",
            ");"
        ],
        "description": "Plantilla para realizar una solicitud DELETE a un endpoint específico con un cuerpo de datos."
    },
    "group": {
        "prefix": "gro",
        "body": [
            "group('${1:groupName}', function() {",
            "  $0",
            "});"
        ],
        "description": "Plantilla para agrupar varias solicitudes o acciones dentro de un bloque lógico en un script de k6."
    },
    "notes": {
        "prefix": "notes",
        "body": [
            "/**",
            "* ${1:(Nombre de la prueba)}",
            "* Objetivo: ${3:(Qué se espera lograr con esta prueba)}",
            "* Escenario: ${4:(Descripción del escenario de prueba, incluyendo el número de usuarios virtuales, la duración de la prueba, etc.)}",
            "* Métricas clave: ${5:(Qué métricas se van a monitorear, como el tiempo de respuesta, la tasa de error, etc.)}",
            "* Resultados esperados: ${6:(Qué resultados se consideran aceptables para esta prueba)}",
            "* Notas adicionales: ${7:(Cualquier información adicional relevante para la prueba)}",
            "*/",
            ""
        ]
    }
}
```

.vscode/settings.json

```
{
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.formatOnPaste": true
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "editor.rulers": [
    100
  ],
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "files.eol": "\\n",
  "prettier.useEditorConfig": true
}
```

config/options.js

```jsx
/**
 * Configuración de opciones de ejecución para k6
 * Incluye diferentes escenarios: prueba rápida, carga normal, estrés
 */

export const quickTest = {
  vus: 5,
  duration: '10s',
  thinkTime: '1s',
};

export const normalLoad = {
  stages: [
    { duration: '1m', target: 10 },
    { duration: '3m', target: 20 },
    { duration: '2m', target: 0 },
  ],
};

export const stressTest = {
  stages: [
    { duration: '2m', target: 50 },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 },
    { duration: '5m', target: 0 },
  ],
};

export const soakTest = {
  vus: 30,
  duration: '30m',
};

export const baseOptions = {
  nocolor: false,
  ext: {
    loadimpact: {
      projectID: 0,
      name: 'k6-performance-tests',
    },
  },
};
```

config/thresholds.js

```jsx
/**
 * Umbrales de rendimiento (thresholds) para validar el éxito de las pruebas
 * Define límites aceptables para métricas de rendimiento
 */

export const defaultThresholds = {
  http_req_duration: ['p(95)<500', 'p(99)<1000'],
  http_req_failed: ['rate<0.1'],
  http_reqs: ['rate>100'],
};

export const strictThresholds = {
  http_req_duration: ['p(95)<300', 'p(99)<500', 'p(99.9)<1000', 'max<2000'],
  http_req_failed: ['rate<0.05'],
  http_reqs: ['rate>500'],
};

export const relaxedThresholds = {
  http_req_duration: ['p(95)<1000', 'p(99)<2000'],
  http_req_failed: ['rate<0.2'],
};

export const apiThresholds = {
  http_req_duration: ['p(90)<200', 'p(95)<500'],
  http_req_failed: ['rate<0.1'],
  checks: ['rate>=0.95'],
};
```

k6-tests/basic.test.js

```jsx
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Metricas customizadas para medir la tasa de errores y el tiempo de respuesta
const errorRate = new Rate('errors');
const responseTrend = new Trend('response_time');

// Configuración del test
export const options = {
  stages: [
    { duration: '30s', target: 10 }, // Aumenta a 10 usuario en 30 segundos (Ramp up)
    { duration: '1m', target: 10 }, // Mantiene 10 usuario durante 1 minuto (Stay)
    { duration: '30s', target: 0 }, // Disminuye a 0 usuarios en 30 segundos (Ramp down)
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% de las solicitudes deben responder en menos de 500ms
    errors: ['rate<0.1'], // Menos del 10% de las solicitudes deben ser errores
  },
};

// Funcion por defecto ejecutada para cada usuario virtual
export default function () {
  const BASE_URL = __ENV.BASE_URL || '<https://test-api.k6.io>';

  // Realizamos un solicitud GET a la API
  const res = http.get(`${BASE_URL}/public/crocodiles/`);

  // Registramos el tiempo de respuesta a la metrica y si hubo un error
  responseTrend.add(res.timings.duration);
  errorRate.add(res.status !== 200);

  // Comprobaciones (Assetions) para validar la respuesta
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
    'response has data': (r) => {
      const ct = r.headers['Content-Type'] || r.headers['content-type'] || '';
      if (!ct.includes('application/json')) return false;
      try {
        const body = r.json();
        if (Array.isArray(body)) return body.length > 0;
        if (body && typeof body === 'object') return Object.keys(body).length > 0;
        return !!body;
      } catch (e) {
        return false;
      }
    },
  });

  // Pausa de 1 segundo entre cada iteración para simular un comportamiento más realista
  sleep(1);
}
```

k6-tests/example-load.test.js

```jsx
import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { SharedArray } from 'k6/data';

// Configuración del test
export const options = {
  scenarios: {
    load_test: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '2m', target: 50 }, // Aumento gradual de carga (Ramp up)
        { duration: '5m', target: 50 }, // Carga sostenida (Sustained load)
        { duration: '2m', target: 100 }, // Carga máxima (Peak load)
        { duration: '5m', target: 100 }, // Pico sostenido (Sustained peak)
        { duration: '2m', target: 0 }, // Disminución gradual de carga (Ramp down)
      ],
      gracefulRampDown: '30s',
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'], // Menos del 1% de las solicitudes deben fallar
    http_req_duration: ['p(99)<1500'], // 99% de las solicitudes deben responder en menos de 1500ms
  },
};

const BASE_URL = __ENV.BASE_URL || '<https://test-api.k6.io>';

export default function () {
  group('API Endpoints', function () {
    // Lista de endpoints
    group('Lista de endpoints', function () {
      const listRes = http.get(`${BASE_URL}/public/crocodiles/`);
      check(listRes, {
        'list status 200': (r) => r.status === 200,
      });
    });

    // Obtener un recurso específico
    group('Obtener un recurso específico', function () {
      const singleRes = http.get(`${BASE_URL}/public/crocodiles/1/`);
      check(singleRes, {
        'status is 200': (r) => r.status === 200,
        'has correct id': (r) => r.json('id') === 1,
      });
    });
  });

  sleep(Math.random() * 3 + 1); // Pausa aleatoria entre 1 y 4 segundos para simular comportamiento realista
}
```

k6-tests/example-stress.test.js

```jsx
import http from 'k6/http';
import { check, sleep } from 'k6';

// Configuración de pruebas de estrés: encuentra puntos de ruptura.
export const options = {
  scenarios: {
    stress_test: {
      executor: 'ramping-arrival-rate',
      startRate: 10,
      timeUnit: '1s',
      preAllocatedVUs: 50,
      maxVUs: 500,
      stages: [
        { duration: '2m', target: 10 }, // Por debajo de la carga normal
        { duration: '5m', target: 50 }, // Carga normal
        { duration: '2m', target: 100 }, // Punto de ruptura inicial (Around breaking point)
        { duration: '5m', target: 200 }, // Punto de ruptura alto (Beyond breaking point)
        { duration: '2m', target: 300 }, // Punto de ruptura extremo (High stress)
        { duration: '5m', target: 300 }, // Punto de ruptura extremo sostenido (Sustained high stress)
        { duration: '2m', target: 0 }, // Recuperación (Recovery)
      ],
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.5'], // Menos del 50% de las solicitudes deben fallar (en estrés, se espera más errores)
    http_req_duration: ['p(95)<3000'], // 95% de las solicitudes deben responder en menos de 3000ms (en estrés, se espera tiempos más altos)
  },
};

const BASE_URL = __ENV.BASE_URL || '<https://test-api.k6.io>';

export default function () {
  const res = http.get(`${BASE_URL}/public/crocodiles/`);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time acceptable': (r) => r.timings.duration < 3000,
  });
}
```

lib/const.js

```jsx
/**
 * Constantes globales para pruebas de rendimiento con k6
 */

// URLs base según el entorno
export const BASE_URL = __ENV.BASE_URL || '<https://httpbin.org>';
export const API_BASE_URL = __ENV.API_BASE_URL || `${BASE_URL}/api`;

// Endpoints comunes
export const ENDPOINTS = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  USERS: '/users',
  SEARCH: '/search',
  PRODUCTS: '/products',
  HEALTH: '/health',
};

// Códigos HTTP
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

// Timeouts
export const TIMEOUTS = {
  SHORT: 5000,
  MEDIUM: 10000,
  LONG: 30000,
};

// Datos de prueba
export const TEST_USER = {
  email: 'test@example.com',
  password: 'Password123!',
};

// Códigos de error comunes
export const ERROR_CODES = {
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  SERVER_ERROR: 'SERVER_ERROR',
};
```

lib/helpers.js

```jsx
import { check } from 'k6';
import http from 'k6/http';

/**
 * Constantes de cabeceras HTTP comunes para las solicitudes a la API
 */
export const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

/**
 * Crea las cabeceras de autenticación con token Bearer
 * @param {string} token - JWT o Bearer token
 * @returns {object} Objeto de cabeceras con Authorization incluido
 */
export function authHeaders(token) {
  return {
    ...defaultHeaders,
    'Authorization': `Bearer ${token}`,
  };
}

/**
 * Realiza una comprobación de estado en la URL proporcionada
 * @param {string} url - URL para comprobar
 * @returns {boolean} True si status es 200
 */
export function healthCheck(url) {
  const res = http.get(url);
  return check(res, {
    'status is 200': (r) => r.status === 200,
  });
}

/**
 * Genera una cadena aleatoria para datos de prueba
 * @param {number} length - Longitud de la cadena a generar
 * @returns {string} Cadena aleatoria de la longitud especificada
 */
export function randomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Genera un tiempo de espera (sleep) aleatorio entre un rango de segundos especificado
 * @param {number} min - Minimo de segundos
 * @param {number} max - Maximo de segundos
 * @returns {number} Tiempo de espera en segundos
 */
export function randomSleep(min, max) {
  const duration = Math.random() * (max - min) + min;
  return duration;
}
```

scenarios/login.js

```jsx
/**
 * Escenario de Login - Simula el proceso de autenticación de usuarios
 */

import http from 'k6/http';
import { check, sleep } from 'k6';
import { authHeaders, randomSleep } from '../lib/helpers.js';
import { API_BASE_URL, ENDPOINTS, TEST_USER } from '../lib/const.js';

/**
 * Ejecuta un flujo de login y retorna el token de autenticación
 * @returns {string|null} Token JWT si el login es exitoso, null en caso contrario
 */
export function loginScenario() {
  const loginUrl = `${API_BASE_URL}${ENDPOINTS.LOGIN}`;

  const payload = JSON.stringify({
    email: TEST_USER.email,
    password: TEST_USER.password,
  });

  const response = http.post(loginUrl, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const success = check(response, {
    'login status is 200': (r) => r.status === 200,
    'login response has token': (r) => r.json('token') !== undefined,
  });

  if (success && response.status === 200) {
    const token = response.json('token');
    sleep(randomSleep(1, 3));
    return token;
  }

  return null;
}

/**
 * Ejecuta un logout/cierre de sesión
 * @param {string} token - Token JWT para autenticar la solicitud de logout
 * @returns {boolean} True si logout fue exitoso
 */
export function logoutScenario(token) {
  const logoutUrl = `${API_BASE_URL}${ENDPOINTS.LOGOUT}`;

  const response = http.post(logoutUrl, null, {
    headers: authHeaders(token),
  });

  const success = check(response, {
    'logout status is 200': (r) => r.status === 200 || r.status === 204,
  });

  sleep(randomSleep(1, 2));
  return success;
}

/**
 * Completa un ciclo completo de login y logout
 */
export function fullAuthCycle() {
  const token = loginScenario();

  if (token) {
    logoutScenario(token);
  }
}
```

scenarios/search.js

```jsx
/**
 * Escenario de Búsqueda - Simula búsquedas de productos o contenido
 */

import http from 'k6/http';
import { check, sleep } from 'k6';
import { authHeaders, randomSleep } from '../lib/helpers.js';
import { API_BASE_URL, ENDPOINTS, HTTP_STATUS } from '../lib/const.js';

/**
 * Realiza una búsqueda simple
 * @param {string} query - Término de búsqueda
 * @param {string} token - Token de autenticación (opcional)
 * @returns {object|null} Resultados de la búsqueda
 */
export function basicSearch(query, token = null) {
  const searchUrl = `${API_BASE_URL}${ENDPOINTS.SEARCH}`;

  const params = {
    q: query,
    limit: 10,
  };

  const headers = token ? authHeaders(token) : { 'Content-Type': 'application/json' };

  const response = http.get(searchUrl, {
    headers,
    params,
  });

  const success = check(response, {
    'search status is 200': (r) => r.status === HTTP_STATUS.OK,
    'search has results': (r) => r.json('results') !== undefined,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(randomSleep(0.5, 2));
  return success ? response.json() : null;
}

/**
 * Realiza una búsqueda avanzada con filtros
 * @param {string} query - Término de búsqueda
 * @param {object} filters - Filtros adicionales (precio, categoría, etc.)
 * @param {string} token - Token de autenticación
 * @returns {object|null} Resultados filtrados
 */
export function advancedSearch(query, filters = {}, token = null) {
  const searchUrl = `${API_BASE_URL}${ENDPOINTS.SEARCH}`;

  const params = {
    q: query,
    limit: 20,
    ...filters,
  };

  const headers = token ? authHeaders(token) : { 'Content-Type': 'application/json' };

  const response = http.get(searchUrl, {
    headers,
    params,
  });

  check(response, {
    'advanced search status is 200': (r) => r.status === HTTP_STATUS.OK,
    'response time < 1s': (r) => r.timings.duration < 1000,
  });

  sleep(randomSleep(1, 3));
  return response.json();
}

/**
 * Simula una secuencia de búsquedas consecutivas (usuario haciendo múltiples búsquedas)
 */
export function searchSequence(token = null) {
  const queries = ['laptop', 'phone', 'tablet', 'headphones', 'charger'];

  queries.forEach((query) => {
    basicSearch(query, token);
  });

  // Búsqueda con filtros
  advancedSearch('laptop', { min_price: 500, max_price: 1500 }, token);
}
```

.editorconfig

```
root = true

[*.js]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 2
trim_trailing_whitespace = true
max_line_length = 100

[*.test.js]
indent_size = 2
max_line_length = 120
insert_final_newline = true

[lib/**.js]
indent_size = 2

[k6-tests/**.js]
indent_size = 2

[*.json]
indent_style = space
indent_size = 2
trim_trailing_whitespace = false

[*.md]
trim_trailing_whitespace = false
insert_final_newline = true
```

.gitignore

```
# Dependencias
node_modules/
package-lock.json
yarn.lock

# Salidas
reports/
*.html
*.json
.output/

# Variables de entorno
.env
.env.local
.env.*.local

# IDEs y editores
.idea/
*.swp
*.swo
*~
.DS_Store
*.sublime-project
*.sublime-workspace

# Archivos temporales
*.tmp
*.temp
.cache/
.tmp/

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*

# Resultados de pruebas
coverage/
.nyc_output/

# Variables de sesión de k6 (si las hay)
.k6/
```

.prettierignore

```
node_modules/
reports/
.vscode/
dist/
*.html
.git/
```

.prettierrc

```
{
    "singleQuote": true,
    "semi": true,
    "trailingComma": "es5",
    "printWidth": 100,
    "tabWidth": 2,
    "useTabs": false,
    "arrowParens": "always",
    "endOfLine": "lf"
}
```

README.md

```markdown
# k6 Performance Testing Project

Proyecto de pruebas de rendimiento utilizando [k6](https://k6.io/).

## 🛠 Instalación

[Guía de instalación K6 Oficial](https://grafana.com/docs/k6/latest/set-up/install-k6/)

### Windows

Para realizar la instalación de **K6 en windows** tenemos varias formas:

#### Windows Package Manager (Winget) - RECOMENDADO

Asegurece de tener instalado winget para ello mediante el CMD ejecutar el siguiente comando. En caso de no tenerlo instalado puede descargarlo desde el [repositorio oficial](https://github.com/microsoft/winget-cli/releases).

```bash
winget
```

Eejecutar el siguiente comando para instalar K6.

```cmd
winget install k6 --source winget
```

_El proceso de descarga e instalación es automático._

#### Binario .exe

Entre al siguiente [enlace](https://grafana.com/docs/k6/latest/set-up/install-k6/#windows) para descargar el instalador.

### Linux

Para instalar k6 en Linux ejecute los siguientes comandos:

```bash
sudo gpg -k
```

```bash
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
```

```bash
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
```

```bash
sudo apt-get update && sudo apt-get install k6
```

## Uso

### Ejecutar prueba powershell (script)

```bash
./run-test.ps1
```

### Ejecutar prueba cmd (script)

```bash
./run-test.bat
```

### Ejecutar prueba bash (script)

```bash
./run-test.sh
```

### Ejecutar prueba (comando k6)

```bash
k6 run src/k6-tests/example.test.js
```

### Generar reporte HTML

```bash
k6 run --out json=reports/results.json src/k6-tests/example.test.js
```

### Ejecutar con múltiples VUs rápidamente

```bash
k6 run --vus 10 --duration 30s src/k6-tests/example.test.js
```

```

run-test-bat

```bash
@echo off
REM =============================================================================
REM k6 Test Runner - Windows Batch Wrapper
REM Ejecuta el script de PowerShell con la política de ejecución adecuada
REM =============================================================================

REM Cambia al directorio del script para que las rutas relativas funcionen
pushd "%~dp0"

REM Ejecuta PowerShell leyendo el archivo como UTF-8 e invocando su contenido.
REM Evita problemas de codificación y garantiza que las funciones del script
REM se carguen correctamente en la sesión.
powershell -NoProfile -ExecutionPolicy Bypass -Command "[Console]::OutputEncoding=[System.Text.Encoding]::UTF8; Get-Content -Raw -Encoding UTF8 -Path '%~dp0run-test.ps1' | Invoke-Expression"

REM Captura y propaga el código de salida
set "exitCode=%ERRORLEVEL%"

popd
exit /B %exitCode%
```

run-test.ps1

```powershell
# =============================================================================
# k6 Test Runner Script for Windows PowerShell
# =============================================================================

$TEST_DIR = "./src/k6-tests"
$REPORTS_DIR = "./reports"
$TEST_EXTENSION = "*.test.js"

# Crea el directorio reports si no existe
if (-not (Test-Path -Path $REPORTS_DIR)) {
    New-Item -ItemType Directory -Path $REPORTS_DIR | Out-Null
}

# -----------------------------------------------------------------------------
# Functions
# -----------------------------------------------------------------------------

function Print-Header {
    Write-Host ""
    Write-Host "╔═══════════════════════════════════════════════════════════════╗" -ForegroundColor Blue
    Write-Host "║                       k6 Test Runner                          ║" -ForegroundColor Blue
    Write-Host "╚═══════════════════════════════════════════════════════════════╝" -ForegroundColor Blue
    Write-Host ""
}

function Print-Separator {
    Write-Host "───────────────────────────────────────────────────────────────────" -ForegroundColor Blue
}

# -----------------------------------------------------------------------------
# Main Script
# -----------------------------------------------------------------------------

Print-Header

# -------------------- BUSCAR ARCHIVOS --------------------

Write-Host "Pruebas disponibles:" -ForegroundColor Yellow
Print-Separator

$tests = Get-ChildItem -Path $TEST_DIR -Filter $TEST_EXTENSION -Recurse -File | Sort-Object FullName
$testArray = @()

if ($tests.Count -eq 0) {
    Write-Host "No se encontraron tests en $TEST_DIR" -ForegroundColor Red
    exit 1
}

$i = 1
foreach ($test in $tests) {
    $relativePath = $test.FullName.Replace((Resolve-Path $TEST_DIR).Path + "\\", "")
    $testArray += $test.FullName
    Write-Host "  [$i] $relativePath" -ForegroundColor Green -NoNewline
    Write-Host ""
    $i++
}

Print-Separator

# -------------------- SELECCIONAR TEST A EJECUTAR --------------------

Write-Host "Selecciona el número del test o ingresa la ruta relativa del script: " -ForegroundColor Yellow -NoNewline
$testSelection = Read-Host

$selectedTest = $null

# Verifica si es una ruta de archivo
if ($testSelection -like "*.js") {
    if (Test-Path -Path $testSelection) {
        $selectedTest = (Resolve-Path $testSelection).Path
    } else {
        Write-Host "Archivo no encontrado: $testSelection" -ForegroundColor Red
        exit 1
    }
}
# Verifica si es un número válido
elseif ($testSelection -match '^\\d+$' -and [int]$testSelection -ge 1 -and [int]$testSelection -le $testArray.Count) {
    $selectedTest = $testArray[[int]$testSelection - 1]
}
else {
    Write-Host "Selección inválida. Ingresa un número o ruta relativa del script" -ForegroundColor Red
    exit 1
}

$testName = [System.IO.Path]::GetFileNameWithoutExtension($selectedTest)
$relativeTestPath = $selectedTest.Replace((Resolve-Path $TEST_DIR).Path + "\\", "")
$testSubdir = [System.IO.Path]::GetDirectoryName($relativeTestPath)

Write-Host "✓ Test seleccionado: $testName" -ForegroundColor Green
Print-Separator

# -------------------- CREA LA CARPETA DONDE SE GUARDA EL REPORTE --------------------
# Crea la misma carpeta donde esta el test en k6-tests pero en reports

if ([string]::IsNullOrEmpty($testSubdir) -or $testSubdir -eq ".") {
    $reportSubdir = $REPORTS_DIR
} else {
    $reportSubdir = Join-Path $REPORTS_DIR $testSubdir
    if (-not (Test-Path -Path $reportSubdir)) {
        New-Item -ItemType Directory -Path $reportSubdir | Out-Null
    }
}

# -------------------- CREA EL NOMBRE DEL REPORTE --------------------
# Por defecto se crea basado en el nombre del test y la fecha/hora actual

$defaultReport = "${testName}_$(Get-Date -Format 'ddMMyyyy_HHmmss')"
Write-Host "Nombre del reporte [" -ForegroundColor Yellow -NoNewline
Write-Host "$defaultReport" -NoNewline
Write-Host "]: " -ForegroundColor Yellow -NoNewline
$reportName = Read-Host

if ([string]::IsNullOrEmpty($reportName)) {
    $reportName = $defaultReport
}

# Si el nombre del reporte no termina con .html, se le agrega la extensión
if (-not $reportName.EndsWith(".html")) {
    $reportName = "$reportName.html"
}

Write-Host "✓ Reporte: $reportSubdir\\$reportName" -ForegroundColor Green
Print-Separator

# -------------------- CONFIGURACIÓN DE VARIABLES DE ENTORNO - K6 --------------------

Write-Host "Variables de entorno (presiona Enter para usar valores por defecto):" -ForegroundColor Yellow
Write-Host ""

# K6_WEB_DASHBOARD
# Write-Host "  K6_WEB_DASHBOARD [" -NoNewline
# Write-Host "true" -ForegroundColor Green -NoNewline
# Write-Host "]: " -NoNewline
# $webDashboard = Read-Host
if ([string]::IsNullOrEmpty($webDashboard)) { $webDashboard = "true" }

# K6_WEB_DASHBOARD_OPEN
# Write-Host "  K6_WEB_DASHBOARD_OPEN [" -NoNewline
# Write-Host "$webDashboard" -ForegroundColor Green -NoNewline
# Write-Host "]: " -NoNewline
# $webDashboardOpen = Read-Host
if ([string]::IsNullOrEmpty($webDashboardOpen)) { $webDashboardOpen = $webDashboard }

# BASE_URL
Write-Host "  BASE_URL (opcional) [" -NoNewline
Write-Host "-" -ForegroundColor Green -NoNewline
Write-Host "]: " -NoNewline
$baseUrl = Read-Host

# VUs
Write-Host "  VUs (virtual users, opcional) [" -NoNewline
Write-Host "-" -ForegroundColor Green -NoNewline
Write-Host "]: " -NoNewline
$vus = Read-Host

# DURATION
Write-Host "  DURATION (ej: 30s, 1m, opcional) [" -NoNewline
Write-Host "-" -ForegroundColor Green -NoNewline
Write-Host "]: " -NoNewline
$duration = Read-Host

Print-Separator

$env:K6_WEB_DASHBOARD = $webDashboard
$env:K6_WEB_DASHBOARD_OPEN = $webDashboardOpen
$env:K6_WEB_DASHBOARD_EXPORT = Join-Path $reportSubdir $reportName
if (-not [string]::IsNullOrEmpty($baseUrl)) {
    $env:BASE_URL = $baseUrl
}

# -------------------- CONSTRUCCIÓN DEL COMANDO --------------------

$cmdArgs = @("run")

if (-not [string]::IsNullOrEmpty($vus)) {
    $cmdArgs += "--vus"
    $cmdArgs += $vus
}

if (-not [string]::IsNullOrEmpty($duration)) {
    $cmdArgs += "--duration"
    $cmdArgs += $duration
}

$cmdArgs += $selectedTest

# Muestra un resumen de la configuración
Write-Host "Resumen de ejecución:" -ForegroundColor Yellow
Write-Host "  Test:        " -NoNewline
Write-Host "$selectedTest" -ForegroundColor Green
Write-Host "  Reporte:     " -NoNewline
Write-Host "$reportSubdir\\$reportName" -ForegroundColor Green
Write-Host "  BASE_URL:    " -NoNewline
Write-Host "$baseUrl" -ForegroundColor Green
Write-Host "  Dashboard:   " -NoNewline
Write-Host "$webDashboard" -ForegroundColor Green
Write-Host "  Auto-open:   " -NoNewline
Write-Host "$webDashboardOpen" -ForegroundColor Green
if (-not [string]::IsNullOrEmpty($vus)) {
    Write-Host "  VUs:         " -NoNewline
    Write-Host "$vus" -ForegroundColor Green
}
if (-not [string]::IsNullOrEmpty($duration)) {
    Write-Host "  Duration:    " -NoNewline
    Write-Host "$duration" -ForegroundColor Green
}
Print-Separator

# -------------------- EJECUCIÓN DEL TEST --------------------

Write-Host "¿Ejecutar test? (s/N) [" -ForegroundColor Yellow -NoNewline
Write-Host "s" -ForegroundColor Green -NoNewline
Write-Host "]: " -ForegroundColor Yellow -NoNewline
$confirm = Read-Host
if ([string]::IsNullOrEmpty($confirm)) { $confirm = "s" }

if ($confirm -notmatch '^[sS]$') {
    Write-Host "Ejecución cancelada" -ForegroundColor Red
    exit 0
}

# Ejecuta el comando
Write-Host ""
Write-Host "Ejecutando: k6 $($cmdArgs -join ' ')" -ForegroundColor Green
Print-Separator
Write-Host ""

& k6 $cmdArgs

$exitCode = $LASTEXITCODE

Write-Host ""
Print-Separator
if ($exitCode -eq 0) {
    Write-Host "✓ Test completado exitosamente" -ForegroundColor Green
    Write-Host "✓ Reporte guardado en: $reportSubdir\\$reportName" -ForegroundColor Green
} else {
    Write-Host "✗ Test finalizado con errores (código: $exitCode)" -ForegroundColor Red
}

exit $exitCode
```

run-test.sh

```bash
#!/bin/bash

# =============================================================================
# k6 Test Runner Script for Linux
# =============================================================================

TEST_DIR="./src/k6-tests"
REPORTS_DIR="./reports"
TEST_EXTENSION="*.test.js"

# Colors for output
# Define códigos de colores para imprimir mensajes en la terminal
RED='\\033[0;31m'
GREEN='\\033[0;32m'
YELLOW='\\033[1;33m'
BLUE='\\033[0;34m'
NC='\\033[0m' # No Color

# Crea el directorio reports si no existe
mkdir -p "$REPORTS_DIR"

# -----------------------------------------------------------------------------
# Functions
# -----------------------------------------------------------------------------

print_header() {
    echo -e "${BLUE}"
    echo "╔═══════════════════════════════════════════════════════════════╗"
    echo "║                       k6 Test Runner                          ║"
    echo "╚═══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

print_separator() {
    echo -e "${BLUE}───────────────────────────────────────────────────────────────────${NC}"
}

# -----------------------------------------------------------------------------
# Main Script
# -----------------------------------------------------------------------------

print_header

# -------------------- BUSCAR ARCHIVOS --------------------

echo -e "${YELLOW}Pruebas disponibles:${NC}"
print_separator

tests=()
i=1
while IFS= read -r file; do
    relative_path="${file#$TEST_DIR/}"
    tests+=("$file")
    echo -e "  ${GREEN}[$i]${NC} $relative_path"
    ((i++))
done < <(find "$TEST_DIR" -name $TEST_EXTENSION -type f | sort)

if [ ${#tests[@]} -eq 0 ]; then
    echo -e "${RED}No se encontraron tests en $TEST_DIR${NC}"
    exit 1
fi

print_separator

# -------------------- SELECCIONAR TEST A EJECUTAR --------------------

echo -e -n "${YELLOW}Selecciona el número del test o ingresa la ruta relativa del script:${NC} "
read -r test_selection

# Verifica si el valor ingresado es la ruta relativa del archivo
if [[ "$test_selection" == $TEST_EXTENSION ]]; then
    if [ -f "$test_selection" ]; then
        selected_test="$test_selection"
    else
        echo -e "${RED}Archivo no encontrado: $test_selection${NC}"
        exit 1
    fi

# Verifica si el valor ingresado en un número
elif [[ "$test_selection" =~ ^[0-9]+$ ]] && [ "$test_selection" -ge 1 ] && [ "$test_selection" -le ${#tests[@]} ]; then
    selected_test="${tests[$((test_selection-1))]}"
else
    echo -e "${RED}Selección inválida. Ingresa un número o ruta relativa del script${NC}"
    exit 1
fi

relative_test_path="${selected_test#$TEST_DIR/}"
test_subdir=$(dirname "$relative_test_path")
filename=$(basename "$selected_test")
# Quitar solo la extensión .js para conservar ".test" en el nombre del reporte
if [ "$test_subdir" = "." ]; then
    test_name="${filename%.js}"
else
    # Para tests en subcarpetas, también quitar únicamente la extensión .js
    test_name="${filename%.js}"
fi

echo -e "${GREEN}✓ Test seleccionado: $test_name${NC}"
print_separator

# -------------------- CREA LA CARPETA DONDE SE GUARDA EL REPORTE --------------------
# Crea la misma carpeta donde esta el test en k6-tests pero en reports

if [ "$test_subdir" != "." ]; then
    report_subdir="$REPORTS_DIR/$test_subdir"
    mkdir -p "$report_subdir"
else
    report_subdir="$REPORTS_DIR"
fi

# -------------------- CREA EL NOMBRE DEL REPORTE --------------------
# Por defecto se crea basado en el nombre del test y la fecha/hora actual

default_report="${test_name}_$(date '+%d%m%Y_%H%M%S')"
echo -e -n "${YELLOW}Nombre del reporte [${NC}${default_report}${YELLOW}]:${NC} "
read -r report_name

if [ -z "$report_name" ]; then
    report_name="$default_report"
fi

# Si el nombre del reporte no termina con .html, se le agrega la extensión
if [[ "$report_name" != *.html ]]; then
    report_name="${report_name}.html"
fi

echo -e "${GREEN}✓ Reporte: $report_subdir/$report_name${NC}"
print_separator

# -------------------- CONFIGURACIÓN DE VARIABLES DE ENTORNO - K6 --------------------

# Solicita al usuario configurar variables de entorno para la ejecución del test, con valores por defecto sugeridos
echo -e "${YELLOW}Variables de entorno (presiona Enter para usar valores por defecto):${NC}"
echo ""

# 1. K6_WEB_DASHBOARD (activa el dashboard web para visualizar el progreso del test en tiempo real)
# echo -e -n "  K6_WEB_DASHBOARD [${GREEN}true${NC}]: "
# read -r web_dashboard
web_dashboard=${web_dashboard:-true}

# 2. K6_WEB_DASHBOARD_OPEN (define si el dashboard se abre automáticamente en el navegador al iniciar el test)
# echo -e -n "  K6_WEB_DASHBOARD_OPEN [${GREEN}true${NC}]: "
# read -r web_dashboard_open
web_dashboard_open=${web_dashboard_open:-$web_dashboard}

# 3. BASE_URL (opcional) sobrescribe la URL base definida en el test, solo si se proporciona un valor
echo -e -n "  BASE_URL (opcional) [${GREEN}-${NC}]: "
read -r base_url

# 4. VUs (Opcional) sobrescribe el número de usuario virtuales definido en el test, solo si se proporciona un valor
echo -e -n "  VUs (virtual users, opcional) [${GREEN}-${NC}]: "
read -r vus

# 5. Duration (opcional) sobrescribe la duración del test definido en el test, solo si se proporciona un valor
echo -e -n "  DURATION (ej: 30s, 1m, opcional) [${GREEN}-${NC}]: "
read -r duration

print_separator

# Establece las variables de entorno para ejecutar el test con k6
export K6_WEB_DASHBOARD="$web_dashboard"
export K6_WEB_DASHBOARD_OPEN="$web_dashboard_open"
export K6_WEB_DASHBOARD_EXPORT="$report_subdir/$report_name"
export BASE_URL="$base_url"

# -------------------- CONSTRUCCIÓN DEL COMANDO --------------------

cmd="k6 run"

if [ -n "$vus" ]; then
    cmd="$cmd --vus $vus"
fi

if [ -n "$duration" ]; then
    cmd="$cmd --duration $duration"
fi

cmd="$cmd $selected_test"

# Muestra un resumen de la configuración
echo -e "${YELLOW}Resumen de ejecución:${NC}"
echo -e "  Test:        ${GREEN}$selected_test${NC}"
echo -e "  Reporte:     ${GREEN}$report_subdir/$report_name${NC}"
echo -e "  BASE_URL:    ${GREEN}$base_url${NC}"
echo -e "  Dashboard:   ${GREEN}$web_dashboard${NC}"
echo -e "  Auto-open:   ${GREEN}$web_dashboard_open${NC}"
[ -n "$vus" ] && echo -e "  VUs:         ${GREEN}$vus${NC}"
[ -n "$duration" ] && echo -e "  Duration:    ${GREEN}$duration${NC}"

print_separator

# -------------------- EJECUCIÓN DEL TEST --------------------

echo -e -n "${YELLOW}¿Ejecutar test? (s/N) [${GREEN}s${NC}${YELLOW}]:${NC} "
read -r confirm
confirm=${confirm:-s}

if [[ ! "$confirm" =~ ^[sS]$ ]]; then
    echo -e "${RED}Ejecución cancelada${NC}"
    exit 0
fi

echo ""
echo -e "${GREEN}Ejecutando: $cmd${NC}"
print_separator
echo ""

# Ejecuta el comando construido
eval "$cmd"

exit_code=$?

echo ""
print_separator
if [ $exit_code -eq 0 ]; then
    echo -e "${GREEN}✓ Test completado exitosamente${NC}"
    echo -e "${GREEN}✓ Reporte guardado en: $report_subdir/$report_name${NC}"
else
    echo -e "${RED}✗ Test finalizado con errores (código: $exit_code)${NC}"
fi
```
