export type Cut = {
  id: string;           
  name: string;
  desc: string;
  img: string;    
  regionKey: string;
};

export const CUTS: Cut[] = [
  { id: '01', name: 'Nalga', desc: 'Formada por músculos de la nalga de adentro, principalmente el recto interno.', img: '/cortes/01.jpg', regionKey: 'r01' },
  { id: '02', name: 'Cuadrada', desc: 'Ubicada junto al cuadril, la bola de lomo, el peceto y la nalga de adentro.', img: '/cortes/02.jpg', regionKey: 'r02' },
  { id: '03', name: 'Colita de Cuadril', desc: 'Corte triangular entre el cuadril, el vacío y la bola de lomo.', img: '/cortes/03.jpg', regionKey: 'r03' },
  { id: '04', name: 'Bola de Lomo', desc: 'En la parte frontal del muslo, limita con cuadril, nalga y colita de cuadril.', img: '/cortes/04.jpg', regionKey: 'r04' },
  { id: '05', name: 'Garrón', desc: 'Parte baja de la pierna, con músculos extensores y flexores.', img: '/cortes/05.jpg', regionKey: 'r05' },
  { id: '06', name: 'Tortuguita', desc: 'Corte de la pierna, similar al garrón.', img: '/cortes/06.jpg', regionKey: 'r06' },
  { id: '07', name: 'Centro de Carnaza de Paleta', desc: 'Músculos cercanos al húmero y la escápula.', img: '/cortes/07.jpg', regionKey: 'r07' },
  { id: '08', name: 'Cogote', desc: 'De la región cervical y dorsal, junto a la aguja.', img: '/cortes/08.jpg', regionKey: 'r08' },
  { id: '09', name: 'Roast Beef', desc: 'Parte anterior del dorso, cerca del cuello y costillas.', img: '/cortes/09.jpg', regionKey: 'r09' },
  { id: '10', name: 'Brasuelo / Osobuco', desc: 'Interno del muslo, entre bola de lomo, nalga y cuadril.', img: '/cortes/10.jpg', regionKey: 'r10' },
  { id: '11', name: 'Marucha', desc: 'En la escápula, detrás de la espina.', img: '/cortes/11.jpg', regionKey: 'r11' },
  { id: '12', name: 'Bife Angosto', desc: 'En la región dorso lumbar, junto al bife ancho y lomo.', img: '/cortes/12.jpg', regionKey: 'r12' },
  { id: '13', name: 'Bife Ancho', desc: 'En el dorso, entre aguja, bife angosto y asado.', img: '/cortes/13.jpg', regionKey: 'r13' },
  { id: '14', name: 'Cuadril', desc: 'Parte del cuadril, separada de la colita.', img: '/cortes/14.jpg', regionKey: 'r14' },
  { id: '15', name: 'Asado', desc: 'Incluye toda la parrilla costal, entre pecho, falda y vacío.', img: '/cortes/15.jpg', regionKey: 'r15' },
];

