import { useEffect, useState } from 'react';
import './Style.css'

export default function LoadMoreProjects()
{
    const [loading, setLoading]=useState(false);
    const [products, setProducts]=useState([]);
    const [count, setCount]=useState(0);
    const [disabled, setDisabled]=useState(false);
    async function fetchProducts()
    {
        try{
            const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${
                count === 0 ? 0 : count * 20}`);

                const result = await response.json();

                if(result && result.products && result.products.length)
                {
                    setProducts((preData) => [...preData, ...result.products]);
                    setLoading(false);
                }
                console.log(result);
        }
        catch(err){
            console.log(err);
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchProducts();
    }, [count]);

    useEffect(()=>{
        if(products.length === 100) setDisabled(true);
    },[products]); //
    if(loading)
        return <div>Loading...</div>
    
    return(<>
    <h2>Products List</h2>
    <div className="load-more-container">
        <div className='product-container'>
            {
                products && products.length 
                ? products.map((product, index)=>(
                    <div key={index} className="product">
                        <img src={product.thumbnail} alt={product.title}/>
                        <p>{product.title}</p>
                    </div> 
                )) : null
            }
        </div>
        <div className='button-container'>
            <button disabled={disabled} onClick={()=>setCount(count+1)}>
                Load More Products
            </button>
            {
                disabled && <p>No more products to load</p>  // Show a message when no more products to load
            }
        </div>
    </div>
    </>);
}