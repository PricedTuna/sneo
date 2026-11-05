import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Accordion, Alert, Badge, BottomNavbar, BottomNavbarItem, Button, Card, Checkbox, Dropdown, Field, Input, Modal, Select, Table, Tabs, ThemeProvider, Tooltip, TopNavbar, TopNavbarItem } from '../src/index';
import '../src/styles.css';
import './styles.css';

function App() {
  const [clicks, setClicks] = useState(0);
  const [selection, setSelection] = useState('Ninguna');
  const [selectedCard, setSelectedCard] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [activePage, setActivePage] = useState('inicio');

  return (
    <main>
      <TopNavbar aria-label="Navegación superior de ejemplo" brand={<strong>SNEO /</strong>} action={<Button padding={4} onClick={() => setModalOpen(true)}>Crear +</Button>}>
        {['Inicio', 'Explorar', 'Ayuda'].map((label) => (
          <TopNavbarItem key={label} href={`#${label.toLowerCase()}`} active={activePage === label.toLowerCase()} onClick={(event) => { event.preventDefault(); setActivePage(label.toLowerCase()); }}>{label}</TopNavbarItem>
        ))}
      </TopNavbar>
      <BottomNavbar aria-label="Navegación de ejemplo">
        {[
          { id: 'inicio', icon: '⌂' },
          { id: 'buscar', icon: '⌕' },
          { id: 'perfil', icon: '●' },
        ].map((item) => (
          <BottomNavbarItem key={item.id} href={`#${item.id}`} active={activePage === item.id} onClick={(event) => { event.preventDefault(); setActivePage(item.id); }}>
            <span aria-hidden="true">{item.icon}</span>{item.label}
          </BottomNavbarItem>
        ))}
      </BottomNavbar>
      <p className="eyebrow">SNEO BRUTALISM / COMPONENTES</p>
      <h1>Botones</h1>
      <p>Prueba los colores y pasa el cursor por cada botón para ver su animación.</p>
      <section>
        <h2>Navegación flotante</h2>
        <p>Prueba las barras flotantes superior e inferior. Seleccionada: {activePage}.</p>
      </section>
      <section>
        <h2>Tabs</h2>
        <Tabs label="Ejemplo de pestañas" items={[
          { id: 'resumen', label: 'Resumen', content: 'Una vista general del proyecto.' },
          { id: 'actividad', label: 'Actividad', content: 'Consulta los cambios recientes.' },
          { id: 'ajustes', label: 'Ajustes', content: 'Personaliza tu espacio.' },
        ]} />
      </section>
      <section>
        <h2>Preguntas frecuentes</h2>
        <Accordion title="¿Qué es sneo?" open>Una librería de componentes React con estilo neobrutalista.</Accordion>
        <Accordion title="¿Puedo personalizar los colores?">Sí, puedes usar ThemeProvider o la propiedad theme de cada componente.</Accordion>
        <Accordion title="¿Funciona con teclado?">Sí, puedes abrir y cerrar cada pregunta con Enter o Espacio.</Accordion>
      </section>
      <section>
        <h2>Badges</h2>
        <div className="examples">
          <Badge>Nuevo</Badge>
          <Badge variant="blue">En progreso</Badge>
          <Badge variant="green">Listo</Badge>
          <Badge variant="pink" padding="6px 12px">Destacado</Badge>
        </div>
      </section>
      <section>
        <h2>Formulario y alertas</h2>
        <div className="form-example">
          <Field label="Nombre" hint="Escribe al menos dos caracteres." error={name.length === 1 ? 'El nombre es demasiado corto.' : undefined}>
            {field => <Input {...field} value={name} onChange={event => setName(event.target.value)} placeholder="Tu nombre" />}
          </Field>
          <Field label="Formato">{field => <Select {...field} defaultValue="json"><option value="json">JSON</option><option value="xml">XML</option></Select>}</Field>
          <label><Checkbox checked={accepted} onChange={event => setAccepted(event.target.checked)} /> Acepto las condiciones</label>
          <Alert variant={accepted ? 'success' : 'info'}>{accepted ? 'Condiciones aceptadas.' : 'Selecciona la casilla para continuar.'}</Alert>
        </div>
      </section>
      <section>
        <h2>Tooltip</h2>
        <p>Tokens totales <Tooltip label="Información sobre tokens" content="Suma de los tokens de entrada y salida." /> </p>
        <p>Pasa el cursor por el signo o selecciónalo con Tab.</p>
      </section>
      <section>
        <h2>Modal</h2>
        <div className="examples"><Button onClick={() => setModalOpen(true)}>Abrir modal</Button></div>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Configuración del proyecto">
          <p>Este es un ejemplo de contenido dentro del modal.</p>
          <Button onClick={() => setModalOpen(false)}>Entendido</Button>
        </Modal>
      </section>
      <section>
        <h2>Tabla</h2>
        <Table caption="Consumo por formato" rows={[{ id: 'json', formato: 'JSON', tokens: 12500 }, { id: 'xml', formato: 'XML', tokens: 14800 }]} getRowKey={row => row.id} columns={[
          { id: 'formato', header: 'Formato', render: row => row.formato },
          { id: 'tokens', header: 'Total tokens', render: row => row.tokens.toLocaleString('es') },
        ]} />
      </section>
      <section>
        <h2>Configuración compartida y cambio individual</h2>
        <ThemeProvider config={{ primaryColor: '#ffadad', accentColor: '#7235b8', borderColor: '#34214d', elevation: 4, hoverElevation: 10, shadowOffset: 6, borderRadius: 6, animationDuration: 120 }}>
          <div className="examples">
            <Button>Color compartido</Button>
            <Button theme={{ primaryColor: '#a8e6a3', elevation: 0, hoverElevation: 2 }}>Elevación propia</Button>
            <Card title="Configuración">Tarjeta con los colores compartidos</Card>
            <Dropdown label="Acciones" items={[{ id: 'demo', label: 'Elegir', onSelect: () => setSelection('Ejemplo personalizado') }]} />
          </div>
        </ThemeProvider>
      </section>
      <section>
        <h2>Cards</h2>
        <div className="examples">
          <Card title="Resumen"><span>Una tarjeta para mostrar contenido.</span></Card>
          <Card title="JSON" selectable selected={selectedCard} onClick={() => setSelectedCard((value) => !value)}>
            <span>Selecciona esta tarjeta para compararla.</span>
          </Card>
        </div>
      </section>
      <section>
        <h2>Dropdown</h2>
        <p>El menú se abre junto a su botón aunque esté al lado de una tarjeta más alta.</p>
        <div className="examples">
          <Dropdown label="Cargar resultados" items={[
            { id: 'latest', label: 'Cargar últimos resultados', icon: '↻', onSelect: () => setSelection('Últimos resultados') },
            { id: 'local', label: 'Cargar JSON local', icon: '⭱', onSelect: () => setSelection('JSON local') },
          ]} />
          <Card title="Tarjeta alta"><span>Primera línea<br />Segunda línea<br />Tercera línea<br />Cuarta línea</span></Card>
        </div>
        <p>Última opción elegida: {selection}</p>
      </section>
      <section>
        <h2>Variantes</h2>
        <div className="examples">
          <Button variant="yellow">Amarillo</Button>
          <Button variant="blue">Azul</Button>
          <Button variant="green">Verde</Button>
          <Button variant="pink">Rosa</Button>
        </div>
      </section>
      <section>
        <h2>Interacción</h2>
        <div className="examples">
          <Button onClick={() => setClicks((count) => count + 1)}>Clics: {clicks}</Button>
          <Button disabled>Deshabilitado</Button>
        </div>
        <p>Usa la tecla Tab para probar también el foco del teclado.</p>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
