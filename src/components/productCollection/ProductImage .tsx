import React from 'react';
import { Image, Typography } from "antd";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import styles from "./ProductImage.module.css";
interface PropsType extends RouteComponentProps{
    id: string | number,
    size: "small" | "large",
    title: string,
    imageSrc: string,
    price: string | number,
}

const ProductImageComponent: React.FC<PropsType>  = ({id, size, title, imageSrc, price, history, location, match}) => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    
    return ( //點擊組件可透過onClick事件用history.push把下個頁面推進導航中
        <Link to={`detail/${id}`} >
        {size=="large" ? ( <Image src={imageSrc} height={300} className={styles.bigImg}  /> )
        :  ( <Image src={imageSrc} className={styles.smallImg} />
        )}
        <div>
            <Typography.Text type="secondary">{title.slice(0,20)}</Typography.Text>
            <Typography.Text type="danger" strong>＄ {price} {t("home_page.start_from")} </Typography.Text>
        </div>
        </Link>
    );
}

export const ProductImage= withRouter(ProductImageComponent);