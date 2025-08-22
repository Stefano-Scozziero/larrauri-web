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
          <h2 className="font-medium text-brand-blue text-3xl md:text-4xl items-start">
            Nuestra marca
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
                  Nuestra marca es mucho más que un nombre: es el resultado de más de un siglo de trabajo, 
                  iniciado por Francisco Larrauri tras su llegada desde Bilbao en 1910.
                </p>
                <p className="font-medium text-brand-blue/90 text-lg md:text-xl leading-8 text-center md:text-left">
                  Inspirados en ese legado familiar, desarrollamos un escudo que representa nuestra identidad. 
                  No es solo un símbolo: es nuestra forma de honrar el trabajo de cuatro generaciones comprometidas 
                  con la calidad, la integridad y la pasión por la carne.

                </p>
                <p className="font-medium text-brand-blue/90 text-lg md:text-xl leading-8 text-center md:text-left">
                  En sus orígenes, las marcas eran grabadas en los animales para identificar la pertenencia de cada ganado. 
                  Para los ganaderos, esos signos no eran solo marcas comerciales: eran emblemas de reputación, historia y pertenencia.
                </p>
                <p className="font-medium text-brand-blue/90 text-lg md:text-xl leading-8 text-center md:text-left">
                  Hoy, nuestro escudo recoge ese mismo espíritu. Toma elementos de la heráldica tradicional de Bilbao y los combina con símbolos 
                  propios de nuestra historia ganadera, creando un emblema que representa tanto a nuestra familia como al origen mismo de nuestra actividad.
                </p>
                <p className="font-medium text-brand-blue/90 text-lg md:text-xl leading-8 text-center md:text-left">
                  Nuestra marca es nuestra historia, nuestra reputación y nuestro compromiso con el futuro.
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

