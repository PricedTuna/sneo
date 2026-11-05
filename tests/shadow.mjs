import assert from 'node:assert/strict';
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as sneo from '../dist/index.js';

const cases = [
  ['Button', {}], ['Badge', {}], ['Card', {}], ['Accordion', { title: 'Question' }],
  ['BottomNavbar', {}], ['TopNavbar', {}], ['BottomNavbarItem', {}], ['TopNavbarItem', {}],
  ['Dropdown', { label: 'Menu', items: [] }], ['Modal', { open: false, onClose() {}, title: 'Title' }],
  ['Tooltip', { content: 'Help' }], ['Input', {}], ['Select', {}], ['Checkbox', {}],
  ['Field', { label: 'Label', children: () => null }], ['Alert', {}],
  ['Table', { rows: [], columns: [], getRowKey: () => 'key' }], ['HelloWorld', {}],
];
for (const [name, props] of cases) {
  const html = renderToStaticMarkup(h(sneo.ThemeProvider, { config: { shadowOffset: 9 } },
    h(sneo[name], { ...props, theme: { shadowOffset: 7 }, shadowOffset: 0 })));
  assert.match(html, /--sneo-shadow-offset:0px/, `${name} must honor a zero prop override`);
  assert.doesNotMatch(html, /shadowOffset=/, `${name} must not forward the prop to the DOM`);
}
for (const name of ['Button', 'Card', 'Dropdown']) {
  const props = name === 'Dropdown' ? { label: 'Menu', items: [] } : {};
  const html = renderToStaticMarkup(h(sneo.ThemeProvider, { config: { elevation: 8, hoverElevation: 8, pressedOffset: 8 } },
    h(sneo[name], { ...props, theme: { elevation: 7 }, elevation: 0, hoverElevation: 1, pressedOffset: 2 })));
  assert.match(html, /--sneo-elevation:0px/);
  assert.match(html, /--sneo-hover-elevation:1px/);
  assert.match(html, /--sneo-pressed-offset:2px/);
}
console.log('Shadow and elevation prop precedence verified for all components.');
