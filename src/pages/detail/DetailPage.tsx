import React, {useEffect} from 'react'
import { RouteComponentProps, useParams } from "react-router-dom"; //給props的match定義型別
import { Anchor, Menu, Spin, Col, Row, DatePicker, Space, Divider, Typography, Button } from 'antd';
import styles from "./DetailPage.module.css";
import { ProductIntro, ProductComment } from '../../components';
import { MainLayout } from '../../layouts/mainlayout';
import {commentMockData} from "./mockup";
import { productDetailSlice, getProductDetail } from '../../redux/productDetail/slice';
import { useSelector } from '../../redux/hook';
import { useDispatch } from 'react-redux';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { addShoppingCartItem } from '../../redux/shoppingCart/slice';

const { RangePicker } = DatePicker;

interface MatchParams {
    touristRouteId: string;
  }

export const DetailPage: React.FC<RouteComponentProps<MatchParams>> = () => {
    const {touristRouteId} = useParams<MatchParams>(); //取得url旅遊參數
    const product = useSelector(state => state.productDetail.data);
    const loading = useSelector(state => state.productDetail.loading);
    const error = useSelector(state => state.productDetail.error);
    
    const dispatch = useDispatch();
    // //獲得jwt數據
    const jwt = useSelector(s => s.user.token) as string
    const shoppingCartLoading = useSelector(s => s.shoppingCart.loading)
  
    useEffect(()=>{
        dispatch(getProductDetail(touristRouteId))
    },[]);
    if (loading){
        return (
        <Spin
      size="large"
      style={{
        marginTop: 200,
        marginBottom: 200,
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
      }} /> 
      );
    }
    if (error){
        return  <div>網站錯誤：{error} </div>
    }
    return (
        <> 
            <MainLayout>
                {/* 產品簡介、日期  */}
                <div className={styles["product-intro-container"]}>
                    <Row>
                        <Col span={13}>
                          <ProductIntro
                            title= {product.title}
                            shortDescription={product.description}
                            price={product.originalPrice}
                            coupons={product.coupons}
                            points={product.points}
                            discount={product.price}
                            rating={product.rating}
                            pictures={product.touristRoutePictures.map((p) => p.url)}
                        />
                        </Col>
                        <Col span={11}>
                        <Button
                            style={{ marginTop: 50, marginBottom: 30, display: "block" }}
                            type="primary"
                            danger
                            loading={shoppingCartLoading}
                            onClick={() => {
                                dispatch(
                                addShoppingCartItem({ jwt, touristRouteId: product.id })
                                );
                            }}>
                                <ShoppingCartOutlined /> 加入購物車
                            </Button>
                            <RangePicker style={{marginTop: 25}} />
                        </Col>
                    </Row>
                </div>
                {/* 毛點功能菜單 */}
                <Anchor className={styles["product-detail-anchor"]}>
                    <Menu mode='horizontal'>
                        <Menu.Item key="1">
                            <Anchor.Link href="#feature" title="產品特色"> </Anchor.Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Anchor.Link href="#fees" title="產品費用"> </Anchor.Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Anchor.Link href="#notes" title="產品須知"> </Anchor.Link>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Anchor.Link href="#comments" title="用戶評價"> </Anchor.Link>
                        </Menu.Item>
                    </Menu>
                </Anchor>

                <div id="feature" className={styles["product-detail-container"]}>
                    <Divider>
                        <Typography.Title level={3}>產品特色</Typography.Title>
                    </Divider>
                    <div dangerouslySetInnerHTML={{__html: product.features}} 
                        style={{margin: 50}}>
                    </div>
                </div>
                <div id="fees" className={styles["product-detail-container"]}>
                <Divider>
                        <Typography.Title level={3}>產品費用</Typography.Title>
                    </Divider>
                    <div dangerouslySetInnerHTML={{__html: product.fees}} 
                        style={{margin: 50}}>
                    </div>
                </div>
                <div id="notes" className={styles["product-detail-container"]}>
                <Divider>
                    <Typography.Title level={3}>產品須知</Typography.Title>
                </Divider>
                    <div dangerouslySetInnerHTML={{__html: product.notes}} 
                        style={{margin: 50}}>
                    </div>
                </div>
                <div id="comments" className={styles["product-detail-container"]}>
                <Divider>
                    <Typography.Title level={3}>用戶評價</Typography.Title>
                </Divider>
                    <div style={{margin: 40}}>
                         <ProductComment data={commentMockData} />
                    </div>
                </div>
            </MainLayout>
        </>
    );
};