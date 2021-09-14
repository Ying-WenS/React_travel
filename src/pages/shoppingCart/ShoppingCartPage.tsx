import React from 'react';
import { MainLayout } from '../../layouts/mainlayout';
import { Col, Row, Affix } from "antd";
import { ProductList, PaymentCard } from '../../components';
import styles from "./ShoppingCart.module.css";
import { useSelector } from '../../redux/hook';
import { useDispatch } from 'react-redux';
import { clearShoppingCartItem, checkout } from '../../redux/shoppingCart/slice';
import { useHistory } from 'react-router-dom';

export const ShoppingCartPage = () => {
   const shoppingCartItems = useSelector(state=>state.shoppingCart.items);
   const shoppingCartLoading = useSelector(s => s.shoppingCart.loading);
    const jwt = useSelector(s=> s.user.token) as string;
    const dispatch = useDispatch();
    const history = useHistory();
    return (
    <div>
        <MainLayout>
            <Row>
                <Col span={16} className={styles["product-list-container"]}>
                    <ProductList data={shoppingCartItems.map((s)=> s.touristRoute )} />
                </Col>
                
                <Col span={8} >
                  <Affix>
                    <div className={styles["payment-card-container"]}>                    
                    <PaymentCard loading={shoppingCartLoading} 
                    originalPrice={shoppingCartItems
                        .map((s)=>s.originalPrice)
                        .reduce((a, b)=> a+ b, 0)}
                    price={shoppingCartItems
                        .map(
                            (s)=>s.originalPrice * 
                            (s.discountPresent ? s.discountPresent :1))
                        .reduce((a, b)=> a+ b, 0)}
                    onShoppingCartClear={()=> {dispatch(
                        clearShoppingCartItem({
                            jwt, 
                            itemIds: shoppingCartItems.map(s=>s.id)
                         })
                        );
                    }}
                    onCheckout={()=>{
                        if (shoppingCartItems.length <= 0 ){
                            return
                        }else{
                            dispatch(checkout(jwt))
                            history.push("/placeOrder")
                        }                      
                    }}
                      />
                      </div>
                    </Affix>
                </Col>
            </Row>
        </MainLayout>
    </div>
    )
}