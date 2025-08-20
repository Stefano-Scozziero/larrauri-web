export type Cut = {
  id: string;              // "01", "02", ...
  name: string;
  desc: string;
  img: string;             // ruta en /public
  regionKey: string;       // para vincular con el mapa
};

export const CUTS: Cut[] = [
  { id: '01', name: 'Nalga', desc: 'Músculos de la nalga de adentro sin tapa, ideal para milanesas y bifes magros.', img: '/cortes/01.jpg', regionKey: 'r01' },
  { id: '02', name: 'Cuadrada', desc: 'Corte magro de la pierna, excelente para milanesas y bifes finos.', img: '/cortes/02.jpg', regionKey: 'r02' },
  { id: '03', name: 'Colita de Cuadril', desc: 'Corte pequeño, muy tierno. Perfecto para horno o parrilla.', img: '/cortes/03.jpg', regionKey: 'r03' },
  { id: '04', name: 'Bola de Lomo', desc: 'Muy versátil: milanesas, bifes o cubos para guisos.', img: '/cortes/04.jpg', regionKey: 'r04' },
  { id: '05', name: 'Garrón', desc: 'Corte gelatinoso, ideal para cocciones largas y caldos.', img: '/cortes/05.jpg', regionKey: 'r05' },
  { id: '06', name: 'Tortuguita', desc: 'Corte sabroso de cocción lenta; guisos y estofados.', img: '/cortes/06.jpg', regionKey: 'r06' },
  { id: '07', name: 'Centro de Carnaza de Paleta', desc: 'Textura firme; excelente para mechados y cocciones largas.', img: '/cortes/07.jpg', regionKey: 'r07' },
  { id: '08', name: 'Cogote', desc: 'Para caldos y fondos por su colágeno natural.', img: '/cortes/08.jpg', regionKey: 'r08' },
  { id: '09', name: 'Roast Beef', desc: 'Clásico para horno o sandwichs calientes.', img: '/cortes/09.jpg', regionKey: 'r09' },
  { id: '10', name: 'Brasuelo / Osobuco', desc: 'Capita crocante a la parrilla; muy sabrosa.', img: '/cortes/10.jpg', regionKey: 'r10' },
  { id: '11', name: 'Marucha', desc: 'Finas láminas; a la pizza, arrollado o a la parrilla.', img: '/cortes/11.jpg', regionKey: 'r11' },
  { id: '12', name: 'Bife Angosto', desc: 'Corte noble para parrilla/bifera; gran terneza.', img: '/cortes/12.jpg', regionKey: 'r12' },
  { id: '13', name: 'Bife Ancho', desc: 'Marmolado y jugoso. Estrella de la parrilla.', img: '/cortes/13.jpg', regionKey: 'r13' },
  { id: '14', name: 'Cuadril', desc: 'Clásico de la parrilla; sabroso y tierno.', img: '/cortes/14.jpg', regionKey: 'r14' },
  { id: '15', name: 'Asado', desc: 'Para braseados y ahumados de larga cocción.', img: '/cortes/15.jpg', regionKey: 'r15' },
];
