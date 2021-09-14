import React from 'react';
import styles from "./Carousel.module.css";
import { Image, Carousel as AntCarousel } from "antd";
import carouselImage1 from "../../assets/images/carousel_1.jpg";
import carouselImage2 from "../../assets/images/carousel_2.jpg";
import carouselImage3 from "../../assets/images/carousel_3.jpg";

export const Carousel: React.FC = () => {
    return (
        <AntCarousel autoplay className={styles.slider}>
            <Image height = {250} width={850} src={carouselImage1} />
            <Image height = {250} width={850} className={styles.img2} src={carouselImage2} />
            <Image height = {250} width={850}  className={styles.img3} src={carouselImage3} />
        </AntCarousel>        
    )
}