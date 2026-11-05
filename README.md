# sneo-brutalism

React components with a neo-brutalist style, written in TypeScript. The package includes buttons, cards, menus, forms, tables, dialogs, and shared theme settings.

[Open the playground](https://sneo-showpage.vercel.app).

[GitHub repository](https://github.com/PricedTuna/sneo).

## Installation

```bash
npm install sneo-brutalism
```

React 18 or later is required as a peer dependency. Import the stylesheet once in your application:

```tsx
import 'sneo-brutalism/styles.css';
import { Button } from 'sneo-brutalism';

export function App() {
  return <Button onClick={() => console.log('Hello!')}>Continue</Button>;
}
```

The default font is JetBrains Mono, with system fallbacks. Load JetBrains Mono in your application if you want to use it.

## Components

### Button

`Button` accepts standard button attributes and a ref. Its default `type` is `button`, and `variant` can be `yellow` (default), `blue`, `green`, or `pink`.
Use `padding` to set any CSS padding value (or a number in pixels); the default is `10px 20px`. The `style` prop takes precedence if it also specifies padding.

```tsx
<Button variant="blue" padding="12px 24px" onClick={() => console.log('Saved')}>Save</Button>
```

### Tabs

`Tabs` renders connected tabs with a raised, colored active tab. Each item needs a unique `id`, a `label`, and `content`; `disabled` is optional. Use `defaultValue` for the initial selection or `value` and `onChange` to control it. Arrow keys, Home and End navigate and activate tabs; disabled tabs are skipped. Provide a descriptive `label` for the tab list. The active tab's `elevation` and `shadowOffset` can be set directly or through `theme` / `ThemeProvider`.

```tsx
import { Tabs } from 'sneo-brutalism';

<Tabs label="Project views" defaultValue="overview" items={[
  { id: 'overview', label: 'Overview', content: 'Project summary' },
  { id: 'activity', label: 'Activity', content: 'Recent changes' },
]} />
```

### Accordion

`Accordion` displays a question or heading that expands to reveal its children. It uses native `details` and `summary` elements for keyboard access. Pass `open` to start expanded, `name` to group mutually exclusive items in browsers that support it, and `onToggle` to observe changes. It also accepts a `theme`, native details attributes, and a ref.

```tsx
import { Accordion } from 'sneo-brutalism';

<Accordion title="Can I customize the colors?">
  Yes, use ThemeProvider or the component's theme prop.
</Accordion>
```

### Badge

`Badge` is a non-interactive label with the appearance and color variants of a button (`yellow`, `blue`, `green`, and `pink`). It accepts a `theme`, native span attributes, a ref, and an optional `padding` value. The `style` prop takes precedence over `padding`.

```tsx
import { Badge } from 'sneo-brutalism';

<Badge variant="green">Ready</Badge>
```

### Top navbar

`TopNavbar` floats at the top of the viewport with optional `brand` and `action` slots and a scrollable row of `TopNavbarItem` links. Set `active` on the current link and provide an accessible name for icon-only links. The shadow is enabled by default; pass `shadow={false}` to disable it. Its color and offset follow the theme. The bar accepts a `theme`, native navigation attributes, and a ref; items accept native anchor attributes and refs. Leave space above page content for the fixed bar.

```tsx
import { Button, TopNavbar, TopNavbarItem } from 'sneo-brutalism';

<TopNavbar aria-label="Main navigation" brand={<strong>SNEO</strong>} action={<Button>Create</Button>}>
  <TopNavbarItem href="/" active>Home</TopNavbarItem>
  <TopNavbarItem href="/projects">Projects</TopNavbarItem>
</TopNavbar>
```

### Bottom navbar

`BottomNavbar` is a floating navigation landmark fixed above the bottom of the viewport. Add `BottomNavbarItem` links and set `active` on the current page. The bar supports `theme`, native navigation attributes, and a ref; items accept native anchor attributes and refs. Set `aria-label` to name the navigation for your application. Allow space at the bottom of your page so the bar does not cover content.

```tsx
import { BottomNavbar, BottomNavbarItem } from 'sneo-brutalism';

<BottomNavbar aria-label="Main navigation">
  <BottomNavbarItem href="/" active>Home</BottomNavbarItem>
  <BottomNavbarItem href="/projects">Projects</BottomNavbarItem>
  <BottomNavbarItem href="/settings">Settings</BottomNavbarItem>
</BottomNavbar>
```

### Dropdown

A dropdown displays a list of actions. Each item needs a unique `id`, a `label`, and an `onSelect` callback; `icon` and `disabled` are optional. Set `disabled` on the dropdown to disable the entire menu. It closes after selection, an outside click, loss of focus, or Escape; use Tab to navigate the items.

```tsx
import { Dropdown } from 'sneo-brutalism';

<Dropdown
  label="Actions"
  items={[
    { id: 'refresh', label: 'Refresh', icon: '↻', onSelect: () => console.log('Refresh') },
    { id: 'open', label: 'Open file', onSelect: () => console.log('Open') },
  ]}
/>
```

### Card

A card renders as an `article` by default. A selectable card renders as a button; control its state with `selected` and `onClick`. Do not place interactive elements inside a selectable card.

```tsx
import { useState } from 'react';
import { Card } from 'sneo-brutalism';

function Example() {
  const [selected, setSelected] = useState(false);
  return (
    <>
      <Card title="Summary">Card content</Card>
      <Card title="JSON" selectable selected={selected} onClick={() => setSelected(!selected)}>
        Select to compare
      </Card>
    </>
  );
}
```

### Table

Define columns with unique IDs, headers, and render functions. `getRowKey` must return a stable, unique key for each row. `caption` provides a visible title and an accessible table caption. The table scrolls horizontally on narrow screens.

```tsx
import { Table } from 'sneo-brutalism';

const rows = [{ id: 'json', format: 'JSON', tokens: 12500 }];

<Table
  caption="Tokens by format"
  rows={rows}
  getRowKey={(row) => row.id}
  columns={[
    { id: 'format', header: 'Format', render: (row) => row.format },
    { id: 'tokens', header: 'Tokens', render: (row) => row.tokens },
  ]}
  emptyMessage="No results"
/>
```

### Modal

`Modal` is a controlled native dialog. Its close button, Escape key, and backdrop call `onClose`; update `open` in that callback. Set `closeOnBackdrop={false}` to disable backdrop closing.

```tsx
import { useState } from 'react';
import { Button, Modal } from 'sneo-brutalism';

function Example() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open settings</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Settings" closeLabel="Close">
        <p>Dialog content.</p>
      </Modal>
    </>
  );
}
```

### Tooltip

`Tooltip` shows brief help on hover or focus and can be dismissed with Escape. Give its trigger an accessible name with `label`; keep the content brief and free of interactive controls.

```tsx
import { Tooltip } from 'sneo-brutalism';

<p>Total tokens <Tooltip label="Token information" content="The sum of input and output tokens." /></p>
```

### Forms and alerts

`Input`, `Select`, and `Checkbox` accept native attributes, events, and refs. `Field` connects its label, hint, and error to a control through its render function. It accepts `id`, `label`, `hint`, and `error`, and sets `aria-invalid` when an error is present. `Alert` supports `info` (default), `success`, `warning`, and `error` variants and an optional `role`.

```tsx
import { Alert, Checkbox, Field, Input, Select } from 'sneo-brutalism';

<>
  <Field label="Name" hint="Enter your name">
    {(props) => <Input {...props} name="name" />}
  </Field>
  <Field label="Format">
    {(props) => <Select {...props} name="format">
      <option value="json">JSON</option>
      <option value="xml">XML</option>
    </Select>}
  </Field>
  <label><Checkbox name="accepted" /> I accept the terms</label>
  <Alert variant="success">Changes saved.</Alert>
</>
```

Select options use the custom dropdown styling in browsers that support customizable selects; other browsers display their native menu.

### Default text

Some default text is currently in Spanish: `Modal` uses `Cerrar` for its close button, `Tooltip` uses `Más información` for its trigger, and `Table` uses `No hay datos disponibles` for an empty table. Pass `closeLabel`, `label`, and `emptyMessage` respectively to localize them. The exported `HelloWorld` component also renders Spanish text.

## Theming

Wrap components in `ThemeProvider` to share settings. Nested providers inherit their parent's settings, and a component's `theme` prop overrides the provider.

```tsx
import { Button, Card, ThemeProvider } from 'sneo-brutalism';

<ThemeProvider config={{ primaryColor: '#ffadad', borderColor: '#34214d', fontFamily: 'sans-serif' }}>
  <Button>Shared color</Button>
  <Button theme={{ primaryColor: '#a8e6a3' }}>Individual color</Button>
  <Card title="Summary">Content</Card>
</ThemeProvider>
```

`ThemeConfig` supports `primaryColor`, `accentColor`, `borderColor`, `fontFamily`, and the following numeric settings:

| Setting | Meaning | Default |
| --- | --- | --- |
| `elevation` | Resting elevation, in pixels | `2` |
| `hoverElevation` | Hover elevation, in pixels | `6` |
| `pressedOffset` | Downward offset when pressed, in pixels | `2` |
| `shadowOffset` | Default shadow offset, in pixels | `4` |
| `dropdownShadowOffset` | Dropdown panel shadow offset, in pixels | `8` |
| `borderWidth` | Border width, in pixels | `2` |
| `borderRadius` | Main corner radius, in pixels | `0` |
| `animationDuration` | Transition duration, in milliseconds | `60` |

Every component accepts a `shadowOffset` prop in pixels. It overrides `theme.shadowOffset` and the provider; `0` removes a stationary shadow. Components that normally have no shadow retain that default unless a value is provided. `Dropdown` applies the prop to its trigger and panel, overriding `dropdownShadowOffset`; `Select` applies it to the control and its custom picker. `TopNavbar` also supports `shadow={false}`, which hides its shadow regardless of the offset. Navbar items can override the inherited shadow independently. A `style` prop, where available, takes precedence over generated theme variables.

`Button`, selectable `Card`, and the `Dropdown` trigger also accept `elevation`, `hoverElevation`, and `pressedOffset` directly. These props override the same settings in `theme` and `ThemeProvider`. `shadowOffset` controls the resting shadow position, while elevation changes its apparent offset as the control moves.

```tsx
<ThemeProvider config={{ shadowOffset: 6, elevation: 2 }}>
  <Button shadowOffset={0} elevation={0} hoverElevation={0} pressedOffset={0}>Flat</Button>
  <Badge shadowOffset={2}>New</Badge>
  <Accordion title="Details" shadowOffset={4}>More information.</Accordion>
</ThemeProvider>
```

The primary color affects the yellow button, card title, and dropdown item hover; the accent color affects the blue button and selected card. Green and pink button variants retain their colors. Choose colors with sufficient text contrast. Use non-negative numeric values and keep `pressedOffset` at or below `shadowOffset` to avoid moving the shadow up and left when pressed. Reduced-motion preferences are respected.

## Development

```bash
npm install
npm run dev        # Run the example app from examples/
npm run typecheck  # Check TypeScript
npm run build      # Build JavaScript, declarations, and CSS into dist/
npm pack --dry-run # Check the package contents
```

The example app imports components from `src/`. The npm package includes the built `dist/` files.
