
export const GifItem = ({ title, url }) => {
    
    return (
        <div className='card'>
            <div className='img-box'>
                <img src={ url } alt={title} />
            </div>
            <p>{ title }</p>
        </div>
    );
};