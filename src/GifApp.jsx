import { useState } from "react";
import { OnNewCategory, GifGrid } from "./components";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";


function capitalizeWords(category) {
  return category.split(' ') 
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
    .join(' '); 
};

export const GifApp = () => {
  const [categories, setCategories] = useState([ 'Friends' ]);


  useGSAP(()=>{
    let tl = gsap.timeline();

    tl.from(".heading, input, .header-grid > p, .header-grid > h2, .header-grid > img, .card-grid", {
      duration: 1,
      opacity: 0,
      ease: "power1.inOut"
    });
    tl.from (".heading", {
      duration: 1,
      y: -200,
      ease: "bounce"
    });


  }, []);

  const onCategory = (newCategory) => {
    const category = capitalizeWords(newCategory);
    if( categories.includes(category) ) return; 
    setCategories([ category, ...categories ]);
  };

  const deleteCategory = (category) => {
    if( !categories.includes(category) ) return;
    const categoriesFilter = categories.filter((c) => c != category);
    setCategories([...categoriesFilter]);
  };

  return (
    <div className="flex-c-3">
      <div className="header flex-r">
        <h1 className="heading">Elije tus Gifs favoritos!</h1> 
        <img className="logo" src="./logo-gifApp.png" alt="Logo gifApp"/>
      </div>
      

      <OnNewCategory  
        onCategory= { onCategory } 
      />

      {
        categories.map((category) => (
          <GifGrid 
            key={ category } 
            category={ category }
            deleteCategory = { deleteCategory }
          />
        ))
      }
    </div>
  );
};

