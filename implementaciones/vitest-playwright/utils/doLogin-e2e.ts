import { Page, expect } from '@playwright/test';

/**
 * Función para realizar el login en la aplicación.
 * @param page - La página de Playwright donde se realizará el login.
 * @param username - El nombre de usuario para el login.
 * @param password - La contraseña para el login.
 * @param goToLogin - Indica si se debe navegar a la página de login antes de iniciar sesión. Por defecto es false.
 * @param gapPrefix - Indica si la URL de Login es sin el prefijo /gap. Por defecto es false
 */
export async function doLogin(
  page: Page,
  username: string,
  password: string,
  goToLogin = false,
  gapPrefix = false,
) {
  // Navegamos a la página de login si es necesario
  if (goToLogin) {
    const url = gapPrefix ? '/login' : '/gap/login';

    await page.goto(url, {
      waitUntil: 'networkidle', // Espera hasta que no haya conexiones de red durante al menos 500 ms
    });
  }

  // Espera a que el formulario de login sea visible
  await expect(page.locator('form')).toBeVisible({ timeout: 60000 });

  // Obtenemos los campos de usuario y contraseña, y el botón de ingresar. Rellenamos y hacemos clic en el botón
  await page.locator('input[formcontrolname="username"]').fill(username);
  await page.locator('input[formcontrolname="password"]').fill(password);

  await page
    .locator('button', { hasText: 'Ingresar' })
    .or(page.getByRole('button', { name: 'Ingresar' }))
    .click();

  // Esperamos a que la URL cambie a la página de compañías después del login
  await expect(page).toHaveURL(/\/companies\/?$/, { timeout: 60000 });
}
