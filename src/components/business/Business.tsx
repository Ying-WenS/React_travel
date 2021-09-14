import React from 'react';
import styles from "./Business.module.css";
import { Row, Col, Typography, Divider } from "antd";
import image1 from '../../assets/images/microsoft-80658_640.png';
import image2 from '../../assets/images/icon-720944_640.png';
import image3 from '../../assets/images/follow-826033_640.png';
import image4 from '../../assets/images/facebook-807588_640.png';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

const companies = [
    { src: image1, title: "Microsoft"},
    { src: image2, title: "Youtube"},
    { src: image3, title: "Ins"},
    { src: image4, title: "Facebook"}
]

export const Business : React.FC= (props) => {
    // const { t } = props;
    const dispatch = useDispatch()
    const {t} = useTranslation();
    return (
        <div className={styles.content}>
            <Divider orientation="left">
                <Typography.Title level={3}>{t("home_page.joint_venture")}</Typography.Title>
            </Divider>
            <Row>
                { companies.map((c, index)=>(
                    <Col span={6} key={"business" + index }>
                        <img src={c.src} 
                        style={{ width: "80%",
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",}}
                        />
                    </Col>
                ))}              
            </Row>
        </div>
    )
}
