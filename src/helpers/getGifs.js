
export const getGifs = async (category) => {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=MZpXeDckpO1wjLjuQUk3MBcsb6JwPQqj&q=${category}&limit=15`;
    const respuesta = await fetch( url );
    if(!respuesta.ok) return;
    const { data } = await respuesta.json();
    
    const gifs = data.map(img => ({
        id: img.id,
        title: img.title,
        url: img.images.downsized_medium.url
    }))

    return gifs;
}