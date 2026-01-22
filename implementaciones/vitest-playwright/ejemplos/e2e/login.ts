import { test, expect } from '@playwright/test';
import { takeScreenshootPerTest } from 'tests/utils/screenshot';

test.describe('Login Page', () => {
  let form: any = null;
  let usernameInput: any = null;
  let passwordInput: any = null;
  let submitButton: any = null;

  // Antes de cada test, navegamos a la página de login
  test.beforeEach(async ({ page }) => {
    await page.goto('gap/');

    form = page.locator('form');
    usernameInput = page.locator('input[formcontrolname="username"]');
    passwordInput = page.locator('input[formcontrolname="password"]');

    submitButton = page
      .locator('button', { hasText: 'Ingresar' })
      .or(page.getByRole('button', { name: 'Ingresar' }));
  });

  // Verificamos que la URL contiene 'login'
  test("should url contain 'login'", async ({ page }) => {
    await expect(page).toHaveURL(/.*login/);
  });

  // Verificamos que el formulario de login es visible
  test('should display login form', async ({ page }) => {
    await expect(form).toBeVisible();
  });

  // Verificamos que los campos de usuario y contraseña sean requeridos
  test('should have required username and password fields', async ({
    page,
  }) => {
    // Verificamos que los campos son requeridos
    await expect(usernameInput).toHaveAttribute('required', '');
    await expect(passwordInput).toHaveAttribute('required', '');
  });

  // Verificamos que no se puede enviar el formulario de login con campos vacíos y muestre los mensajes de error correspondientes
  test('should not submit empty login form', async ({ page }) => {
    const alertError = page.locator(
      'text=Verifique los errores en el formulario.'
    );
    const usernameError = page.locator('text=El usuario es requerido');
    const passwordError = page.locator('text=La contraseña es requerida');

    // Hacemos clic en el botón de enviar sin rellenar los campos
    await submitButton.click();

    // Verificamos que seguimos en la misma página
    await expect(page).toHaveURL(/.*login/);

    // Verificamos que se muestran los mensajes de error
    await expect(alertError).toBeVisible();
    await expect(usernameError).toBeVisible();
    await expect(passwordError).toBeVisible();
  });

  // Verificar que el formulario de login no se puede enviar con credenciales inválidas y muestra el mensaje de error correspondiente
  test('should not submit login form with invalid credentials', async ({
    page,
  }) => {
    const invalidCredentialsError = page.locator(
      'text=Las credenciales son incorrectas. '
    );

    // Rellenamos los campos del formulario con credenciales inválidas
    await usernameInput.fill('invalidUser');
    await passwordInput.fill('invalidPassword');

    // Hacemos clic en el botón de enviar
    await submitButton.click();

    // Verificamos que seguimos en la misma página
    await expect(page).toHaveURL(/.*login/);

    // Verificamos que se muestra el mensaje de error de credenciales inválidas
    await expect(invalidCredentialsError).toBeVisible();
  });

  // Verificamos que podemos enviar el formulario de login
  test('should submit login form', async ({ page }, testInfo) => {
    console.log('Username input visible:', await usernameInput.isVisible());
    console.log('Password input visible:', await passwordInput.isVisible());
    console.log('Submit button visible:', await submitButton.isVisible());

    // Rellenamos los campos del formulario
    await usernameInput.fill('TU_USUARIO');
    await passwordInput.fill('TU_CONTRASEÑA');

    // Realizar captura de pantalla antes de enviar el formulario
    await takeScreenshootPerTest(page, testInfo, 'before-submit');

    // Enviamos el formulario
    await submitButton.click();

    // Verificamos que hemos sido redirigidos a la página correcta después del login
    await expect(page).toHaveURL(/\/gap\/companies\/?$/);

    // Realizar captura de pantalla después del login
    await takeScreenshootPerTest(page, testInfo, 'after-login.png');
    // await page.screenshot({ path: 'after-login.png' });
  });

  // Verificamos que el enlace de "Olvidé mi contraseña" funciona correctamente
  test('should navigate to forgot password page', async ({ page }) => {
    // Obtenemos el enlace de "Olvidé mi contraseña"
    const forgotPasswordLink = page.locator('a', {
      hasText: 'Olvidé mi contraseña',
    });

    // Hacemos click en el enlace
    await forgotPasswordLink.click();

    // Verificamos que hemos sido redirigidos a la página correcta
    await expect(page).toHaveURL(/.*forgot-password/);
  });

  // Verificamos que el botón de mostrar/ocultar contraseña funciona correctamente
  test('should toggle password visibility', async ({ page }) => {
    const toggleButton = page.locator('button[aria-label="Show password"]');

    await passwordInput.fill('123456');

    // Verificamos que el campo de contraseña es de tipo 'password' inicialmente
    await expect(passwordInput).toHaveAttribute('type', 'password');

    // Hacemos clic en el botón de mostrar/ocultar contraseña
    await toggleButton.click();

    // Verificamos que el campo de contraseña ahora es de tipo 'text'
    await expect(passwordInput).toHaveAttribute('type', 'text');
  });
});
