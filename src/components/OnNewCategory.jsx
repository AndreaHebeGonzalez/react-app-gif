import { useState } from "react";


export const OnNewCategory = ({ onCategory }) => { 
    
    const [newCategory, setNewCategory] = useState('');

    const handleNewCategory = ({ target }) => { 
        setNewCategory(target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(newCategory.trim().length <= 1) return;
        onCategory( newCategory.trim().toLowerCase() );
        setNewCategory('');
    }

    return (
        <form onSubmit={ onSubmit }>
            <input 
                onChange= { handleNewCategory }
                type="text" 
                value={ newCategory }
                placeholder="Buscar gif" 
            />
        </form>
    );
};
