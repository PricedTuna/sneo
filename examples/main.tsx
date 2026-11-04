import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Button } from '../src/index';
import '../src/styles.css';
import './styles.css';

function App() {
  const [clicks, setClicks] = useState(0);

  return (
    <main>
      <p className="eyebrow">SNEO BRUTALISM / COMPONENTES</p>
      <h1>Botones</h1>
      <p>Prueba los colores y pasa el cursor por cada botón para ver su animación.</p>
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
