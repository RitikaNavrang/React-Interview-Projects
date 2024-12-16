import { useState, useEffect } from "react";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";
import './Style.css';

export default function ImageSlider({url, page=1 , limit=5})
{
    const [images, setImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    function handlePrevious(){
        setCurrentSlide(currentSlide === 0 ? images.length-1 : currentSlide-1);
    }

    function handleNext(){
        setCurrentSlide(currentSlide === images.length-1 ? 0 : currentSlide + 1);
    }

    async function fetchImages(getUrl)
    {
        try{
            const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
            const data = await response.json();

            if(data)
            {
                setImages(data);
                setLoading(false);
            }
        }catch(e){
            setErrorMsg(e.errorMsg);
            setLoading(false);
        }
    }

    useEffect(() => {
        if(url !== '') fetchImages(url);
    },[url])

    console.log(images);
    if(loading)
    {
        return <div>Loading...</div>;
    }

    if(errorMsg !== null)
        return <div>Error occured! {errorMsg}</div>;

    return (
        <div className="container">
            <BsArrowLeftCircleFill onClick={handlePrevious} className="arrow arrow-left"/>
            {
                images && images.length ? images.map((image, index) => (
                    <img 
                    key={index} 
                    src={image.download_url} 
                    alt={image.download_url} 
                    className={currentSlide === index ? 'current-image' : 'current-image hide-current-image'}
                    />
                )) : null
            }
            <BsArrowRightCircleFill onClick={handleNext} className="arrow arrow-right"/>
            <span className="circle-indicator">
            {
                images && images.length ? images.map((image, index) => (<button 
                key={index}
                className={currentSlide === index ? 'current-indicator' : 'current-indicator inactive-indicator'}
                onClick={()=> setCurrentSlide(index)}
                ></button>)) : null
            }
            </span>
        </div>
    );
}