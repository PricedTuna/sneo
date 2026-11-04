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

## Dropdown

El dropdown presenta un menú de acciones. Importa la misma hoja de estilos que usa `Button`:

```tsx
import { Dropdown } from 'sneo-brutalism';
import 'sneo-brutalism/styles.css';

<Dropdown
  label="Cargar resultados"
  items={[
    { id: 'latest', label: 'Cargar últimos resultados', icon: '↻', onSelect: () => console.log('Últimos') },
    { id: 'local', label: 'Cargar JSON local', icon: '⭱', onSelect: () => console.log('Local') },
  ]}
/>
```

Cada opción necesita un `id` único, un `label` y una función `onSelect`; también admite `icon` y `disabled`. Puedes deshabilitar el menú completo con `disabled`. Se cierra al elegir una opción, hacer clic fuera o pulsar Escape; las opciones se pueden recorrer con Tab.

## Card

`Card` muestra contenido dentro de una tarjeta con el estilo del proyecto de referencia. Importa `sneo-brutalism/styles.css` una vez en tu aplicación.

```tsx
import { useState } from 'react';
import { Card } from 'sneo-brutalism';

function Ejemplo() {
  const [selected, setSelected] = useState(false);
  return (
    <>
      <Card title="Resumen">Contenido de la tarjeta</Card>
      <Card title="JSON" selectable selected={selected} onClick={() => setSelected(!selected)}>
        Seleccionar para comparar
      </Card>
    </>
  );
}
```

Por defecto se representa como un `article`. Con `selectable` se convierte en un botón con estado controlado mediante `selected` y `onClick`; evita colocar otros elementos interactivos dentro de esa variante.

## Configuración compartida

Envuelve tus componentes con `ThemeProvider` para configurar colores y tipografía. Los valores omitidos conservan el estilo original; un proveedor anidado hereda los valores de su padre. La prop `theme` de cada componente tiene prioridad sobre el proveedor.

```tsx
import { ThemeProvider, Button, Card, Dropdown } from 'sneo-brutalism';
import 'sneo-brutalism/styles.css';

const config = { primaryColor: '#ffadad', accentColor: '#7235b8', borderColor: '#34214d', fontFamily: 'sans-serif' };

<ThemeProvider config={config}>
  <Button>Color compartido</Button>
  <Button theme={{ primaryColor: '#a8e6a3' }}>Color individual</Button>
  <Card title="Resumen">Contenido</Card>
  <Dropdown label="Acciones" items={[{ id: 'abrir', label: 'Abrir', onSelect: () => {} }]} />
</ThemeProvider>
```

`primaryColor` afecta al botón amarillo, al título de Card y al hover de las opciones del Dropdown. `accentColor` afecta al botón azul y al estado seleccionado de Card. Las variantes verde y rosa conservan sus colores. Elige colores con suficiente contraste; el texto del botón azul es blanco y el del amarillo es negro.

También puedes ajustar la forma y el movimiento con estas propiedades numéricas de `config` o de la prop `theme` de cada componente:

| Propiedad | Significado | Valor inicial |
| --- | --- | --- |
| `elevation` | Elevación en reposo, en píxeles | `2` |
| `hoverElevation` | Elevación al pasar el cursor, en píxeles | `6` |
| `pressedOffset` | Desplazamiento hacia abajo al pulsar, en píxeles | `2` |
| `shadowOffset` | Posición fija de la sombra de Button y Card, en píxeles | `4` |
| `dropdownShadowOffset` | Desplazamiento de la sombra del panel del Dropdown, en píxeles | `8` |
| `borderWidth` | Grosor de los bordes, en píxeles | `2` |
| `borderRadius` | Radio de las esquinas principales, en píxeles | `0` |
| `animationDuration` | Duración de las transiciones, en milisegundos | `60` |

Por ejemplo, `theme={{ elevation: 0, hoverElevation: 2 }}` sobrescribe la elevación solo para ese componente. La sombra permanece en su posición durante la animación; usa valores no negativos y mantén `pressedOffset` menor o igual que `shadowOffset` para evitar que la sombra se desplace hacia arriba a la izquierda al pulsar. Se respeta la preferencia del sistema de reducir el movimiento.

## Table

`Table` muestra datos con el estilo de la tabla de referencia y permite desplazamiento horizontal en pantallas estrechas. Importa `sneo-brutalism/styles.css` una vez en tu aplicación.

```tsx
import { Table } from 'sneo-brutalism';

const rows = [{ id: 'json', formato: 'JSON', tokens: 12500 }];

<Table
  caption="Consumo por formato"
  rows={rows}
  getRowKey={(row) => row.id}
  columns={[
    { id: 'formato', header: 'Formato', render: (row) => row.formato },
    { id: 'tokens', header: 'Tokens', render: (row) => row.tokens },
  ]}
  emptyMessage="No hay resultados"
/>
```

Cada columna necesita un `id` único, una cabecera y una función `render`. `getRowKey` debe devolver una clave estable y única por fila. `caption` muestra el título encima de la tabla y la identifica para lectores de pantalla; cuando no haya filas se mostrará `emptyMessage`. La prop `theme` permite sobrescribir la configuración compartida de borde y tipografía para esta tabla.

## Modal

`Modal` es un diálogo controlado que oscurece el fondo. Se cierra mediante el botón cuadrado, Escape o un clic fuera; el navegador mantiene el foco dentro mientras está abierto.

```tsx
import { useState } from 'react';
import { Button, Modal } from 'sneo-brutalism';
import 'sneo-brutalism/styles.css';

function Ejemplo() {
  const [open, setOpen] = useState(false);
  return <>
    <Button onClick={() => setOpen(true)}>Abrir</Button>
    <Modal open={open} onClose={() => setOpen(false)} title="Configuración">
      <p>Contenido del diálogo.</p>
    </Modal>
  </>;
}
```

`onClose` debe actualizar `open` a `false`. Usa `closeOnBackdrop={false}` para desactivar el cierre al hacer clic fuera y `closeLabel` para cambiar el texto accesible del botón de cierre. `theme` permite sobrescribir el borde, la tipografía y el color principal compartidos.

## Tooltip

`Tooltip` muestra ayuda breve mediante un botón cuadrado con un signo de interrogación. Aparece al pasar el cursor o enfocar el botón y se puede ocultar con Escape.

```tsx
import { Tooltip } from 'sneo-brutalism';
import 'sneo-brutalism/styles.css';

<p>Tokens totales <Tooltip label="Información sobre tokens" content="Suma de los tokens de entrada y salida." /></p>
```

`content` contiene la explicación y `label` da un nombre accesible al botón (por defecto, «Más información»). Utiliza texto breve sin controles interactivos. La prop `theme` permite sobrescribir el color principal, el borde y la tipografía compartidos.

## Formularios y alertas

`Input`, `Select` y `Checkbox` admiten los atributos y eventos nativos de sus elementos HTML, así como referencias y la prop `theme`. `Field` conecta la etiqueta, la ayuda y el error con el control mediante las props que proporciona a su función hija.

```tsx
import { Alert, Checkbox, Field, Input, Select } from 'sneo-brutalism';
import 'sneo-brutalism/styles.css';

<>
  <Field label="Nombre" hint="Escribe tu nombre" error={undefined}>
    {props => <Input {...props} name="nombre" />}
  </Field>
  <Field label="Formato">
    {props => <Select {...props} name="formato"><option value="json">JSON</option><option value="xml">XML</option></Select>}
  </Field>
  <label><Checkbox name="acepto" /> Acepto las condiciones</label>
  <Alert variant="success">Los cambios se guardaron.</Alert>
</>
```

`Field` acepta `id`, `label`, `hint` y `error`; propaga `aria-invalid` cuando hay un error. `Alert` acepta las variantes `info`, `success`, `warning` y `error` y permite personalizar su `role`. Todos respetan el tema compartido y admiten sobrescribirlo con `theme`.

Las opciones de `Select` utilizan el estilo del dropdown en navegadores compatibles con select personalizable; en los demás se muestra el menú nativo del navegador.
