import Image from "next/image";

import { siteContent } from "@/content/site-content";

import styles from "./photo-gallery.module.css";

export function PhotoGallery() {
  return (
    <section
      aria-labelledby="gallery-title"
      className={styles.section}
      id="instalaciones"
    >
      <div className={styles.shell}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>Ver · tocar · descubrir · recordar</p>
          <h2 id="gallery-title">
            El campo no se explica. <span>Se vive.</span>
          </h2>
          <p>
            Una mirada editorial a todo lo que inspira una experiencia Orea:
            naturaleza, animales, movimiento y personas que aprenden juntas.
          </p>
        </header>

        <div className={styles.gallery}>
          {siteContent.gallery.map((image, index) => (
            <figure className={styles.figure} data-index={index + 1} key={image.id}>
              <div className={styles.media}>
                <Image
                  alt={image.alt}
                  className={styles.image}
                  fill
                  quality={82}
                  sizes={image.sizes}
                  src={image.src}
                />
              </div>
              <figcaption>
                <span aria-hidden="true">0{index + 1}</span>
                {image.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className={styles.disclaimer}>
          Imágenes editoriales de naturaleza y actividades utilizadas para
          representar el tipo de experiencias. Consulta la propuesta concreta
          de Orea para tu fecha y grupo.
        </p>
      </div>
    </section>
  );
}
