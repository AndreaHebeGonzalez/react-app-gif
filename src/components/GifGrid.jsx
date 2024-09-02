import { useFetchGifs } from "../hooks/useFetchGifs";
import { GifItem } from "./GifItem";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const GifGrid =  ({ category, deleteCategory }) => {

    const { images, isLoading } = useFetchGifs( category ); 

    useGSAP(()=>{
        ScrollTrigger.batch(".card", { 
            interval: 0.2,
            batchMax: 5,
            onEnter: (batch) => 
                gsap.to(batch, { autoAlpha: 1, stagger: 0.15, overwrite: true  }),
            onLeave: (batch) => gsap.set(batch, { autoAlpha: 0, overwrite: true }),
            onEnterBack: (batch) => 
                gsap.to(batch, { autoAlpha: 1, stagger: 0.15, overwrite: true }),
            onLeaveBack: (batch) => gsap.set(batch, { autoAlpha: 0, overwrite: true })
        });
        
        ScrollTrigger.refresh();
    }, [isLoading]);


    const handleDelete = () => {
        deleteCategory(category);
    }

    return (
        <div className= "grid flex-c-2">
            <div className="header-grid flex-r">
                <h2>{ category }</h2>
                <img onClick={ handleDelete } src="./ico-round-delete.svg" alt="borrar-tema"/>
            </div>
            
            {isLoading && <p>Cargando...</p>}
            
            <div className="card-grid">
                {
                    images.map((img) => (
                        <GifItem 
                            key={ img.id } 
                            { ...img }
                        />
                    )) 
                }
            </div>
        </div>
    );
};


/*
    useGSAP(()=>{ //Es un hook proporcionado por el paquete @gsap/react que se usa en componentes de React Permite ejecutar código GSAP en un entorno React, gestionando automáticamente el ciclo de vida de las animaciones.
        El hook toma una función como argumento. Esta función se ejecuta cuando el componente se monta y se limpia cuando el componente se desmonta.

        ScrollTrigger.batch(".card", { //ScrollTrigger.batch(".card", { ... });:
            Qué Hace: ScrollTrigger.batch es una funcionalidad del plugin ScrollTrigger que agrupa elementos para aplicar animaciones en función del desplazamiento.
            Cómo Funciona: Selecciona elementos con la clase .card y aplica las configuraciones proporcionadas a todos esos elementos en lotes o grupos.
            interval: 0.2,
            batchMax: 6,
            onEnter: (batch) => 
                gsap.to(batch, { autoAlpha: 1, stagger: 0.15, overwrite: true  }),
            onLeave: (batch) => gsap.set(batch, { autoAlpha: 0, overwrite: true }),
            onEnterBack: (batch) => 
                gsap.to(batch, { autoAlpha: 1, stagger: 0.15, overwrite: true }),
            onLeaveBack: (batch) => gsap.set(batch, { autoAlpha: 0, overwrite: true })
        });
    });
*/