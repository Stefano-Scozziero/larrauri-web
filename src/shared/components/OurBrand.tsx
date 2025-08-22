import franc_l from '../../assets/franc_l.png'
import bilbao from '../../assets/bilbao.jpg'


export function OurBrand() {
  return (
    <section
      id="nuestra-marca"
      className="anchor-offset"
    >
      <div className="container-max py-12 md:py-16">
        <div className="card">
          <h2 className="font-medium text-brand-blue text-3xl md:text-4xl underline underline-offset-4 items-start">
            NUESTRA MARCA:
          </h2>


          {/* Bloque superior: textos a la izquierda + imagen circular arriba a la derecha */}
          <div className="mt-8 mx-auto max-w-5xl">
            <div className="relative after:content-[''] after:block after:clear-both">
              <figure
                className="
        md:float-right md:ml-6 md:mb-2
        mb-6 mx-auto md:mx-0
        w-40 h-40 md:w-80 md:h-80
        rounded-full overflow-hidden
        md:[shape-outside:circle()] md:[clip-path:circle()]
      "
              >
                <img
                  src={franc_l}
                  alt="Escudo Larrauri en estilo emblema"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </figure>

              <div className="space-y-4">
                <p className="font-medium text-brand-blue/90 text-lg md:text-xl leading-8 text-center md:text-left">
                  Este relato familiar comienza con la llegada de Francisco desde Bilbao a Argentina en 1910,
                  iniciando una actividad que fue transmitiendo, casi como un legado, a las generaciones futuras.
                </p>
                <p className="font-medium text-brand-blue/90 text-lg md:text-xl leading-8 text-center md:text-left">
                  Si pensamos en una marca como algo propio, como algo que nos pertenece, resulta inevitable
                  determinar que la mayor inspiración para desarrollar la identidad de Larrauri se encuentra y se
                  cuenta en su historia familiar.
                </p>
                <p className="font-medium text-brand-blue/90 text-lg md:text-xl leading-8 text-center md:text-left">
                  La expresión “marca comercial” que conocemos hoy en día, no es más que la derivación de la marca
                  impresa durante siglos en animales para determinar con claridad a quién pertenecían.
                </p>
                <p className="font-medium text-brand-blue/90 text-lg md:text-xl leading-8 text-center md:text-left">
                  Como la mayoría no sabía leer, esas marcas fueron letras durante mucho tiempo; eran cruces,
                  rayas, círculos o figuras simples en diversas combinaciones.
                </p>
                <p className="font-medium text-brand-blue/90 text-lg md:text-xl leading-8 text-center md:text-left">
                  Para los ganaderos de entonces la marca significaba mucho más que la identidad de sus reses. Era
                  también su reputación, su escudo de armas y su historia familiar, porque con el agregado de algún
                  símbolo al pasar de padres a hijos, las marcas se perpetuaban de generación en generación.
                </p>
                <p className="font-medium text-brand-blue/90 text-lg md:text-xl leading-8 text-center md:text-left">
                  Por lo anteriormente expresado decidimos comenzar este proceso desarrollando, no una marca
                  ganadera, sino “un escudo familiar como elemento identitario”.
                </p>
                <p className="font-medium text-brand-blue/90 text-lg md:text-xl leading-8 text-center md:text-left">
                  Basados en la heráldica, definimos como punto de partida el escudo de Bilbao.
                </p>
                <p className="mt-2 font-medium text-brand-blue/90 text-lg md:text-xl leading-8 text-center md:text-left">
                  A continuación presentamos el desarrollo completo.
                </p>
              </div>
            </div>
          </div>


          {/* Imagen inferior a todo el ancho (dentro de la tarjeta) */}
          <figure className="mt-10 mx-auto max-w-5xl rounded-2xl overflow-hidden border border-brand-blue/20 bg-white/60">
            <img
              src={bilbao}
              alt="Proceso de construcción del escudo: Escudo de Bilbao → forma del blasón → inicial L → cuatro generaciones"
              className="w-full h-auto"
              loading="lazy"
            />
          </figure>
        </div>
      </div>
    </section>
  )
}

