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
          {siteContent.gallery.map((image) => (
            <figure className={styles.figure} key={image.id}>
              <div className={styles.media}>
                <Image
                  alt={image.alt}
                  className={styles.image}
                  fill
                  loading="lazy"
                  quality={82}
                  sizes={image.sizes}
                  src={image.src}
                />
              </div>
              <figcaption>{image.caption}</figcaption>
            </figure>
          ))}
        </div>

        <p className={styles.disclaimer}>
          Fotografías editoriales de Unsplash utilizadas para representar el
          tipo de experiencia.{" "}
          <a href="#creditos-fotograficos">Ver créditos fotográficos</a>
        </p>
      </div>
    </section>
  );
}
