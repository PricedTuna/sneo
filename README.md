# sneo-brutalism

Biblioteca de componentes React con TypeScript. El primer componente es `HelloWorld`.

## Preparación

Necesitas Node.js y npm instalados.

```bash
npm install
npm run typecheck
npm run build
```

## Uso

```tsx
import { HelloWorld } from 'sneo-brutalism';

export function App() {
  return <HelloWorld />;
}
```

La compilación genera los archivos JavaScript y las declaraciones de TypeScript en `dist/`.

## Publicación en npm

Instala Node.js con npm, ejecuta `npm ci` y comprueba el contenido del paquete con `npm pack --dry-run`. El empaquetado comprueba los tipos y compila automáticamente.

Comprueba que el nombre `sneo-brutalism` esté disponible con `npm view sneo-brutalism`. Si ya pertenece a otra persona, cambia `name` en `package.json` y `package-lock.json` por un nombre disponible, por ejemplo `@tu-usuario/sneo-brutalism`.

Inicia sesión con `npm login` y publica con `npm publish --access public`. npm puede solicitar autenticación de dos factores. Para versiones posteriores, incrementa la versión con `npm version patch`, `minor` o `major` antes de publicar.

## Botón

Importa la hoja de estilos una vez en tu aplicación y utiliza el componente:

```tsx
import { Button } from 'sneo-brutalism';
import 'sneo-brutalism/styles.css';

export function App() {
  return <Button variant="yellow" onClick={() => console.log('¡Hola!')}>Continuar</Button>;
}
```

`variant` acepta `yellow` (predeterminado), `blue`, `green` y `pink`. El botón admite los atributos normales de HTML, como `disabled`, `type` y `className`, y referencias a su elemento. Su tipo predeterminado es `button`. Para reproducir la tipografía del proyecto de referencia, carga JetBrains Mono en tu aplicación; si no está disponible se usa una fuente alternativa.

## Probar los componentes en el navegador

La carpeta `examples/` contiene una aplicación de prueba que importa los componentes directamente desde `src/`. Para iniciarla:

```bash
npm install
npm run dev
```

Abre la dirección local que aparece en la terminal (normalmente `http://localhost:5173`). Al guardar cambios en los componentes o sus estilos, la página se actualizará automáticamente. Para detener el servidor, pulsa `Ctrl+C` en la terminal.

La aplicación de ejemplo es solo para desarrollo: el paquete npm incluye únicamente `dist/`.
