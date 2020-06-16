  
import React, {useState} from 'react';
import {FaArrowCircleUp} from 'react-icons/fa';
import './ScrollTopArrow.css';


const ScrollTopArrow = (props) =>{

  const [showScroll, setShowScroll] = useState(false)
  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400){
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 400){
      setShowScroll(false)
    }
  };

  const scrollTop = () =>{
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  window.addEventListener('scroll', checkScrollTop)

  return (
        <FaArrowCircleUp className="scrollTop" onClick={scrollTop} style={{height: 40, display: showScroll ? 'flex' : 'none',  color: props.darkTheme ? "white" : "black"}}/>
  );
}

export default ScrollTopArrow;