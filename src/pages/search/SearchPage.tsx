import React, { useEffect } from 'react';
import styles from "./SearchPage.module.css"
import { MainLayout } from '../../layouts/mainlayout';
import { ProductList, FilterArea } from '../../components';
import { useLocation, useParams } from 'react-router-dom';
import { Spin } from 'antd';
import { searchProduct } from '../../redux/productSearch/slice';
import { useSelector } from '../../redux/hook';
import { useDispatch } from 'react-redux';

interface MatchParams{
    keywords: string;
}

export const SearchPage: React.FC = () => {
    const {keywords} = useParams<MatchParams>(); //取得url的參數

    const loading = useSelector((state) => state.productSearch.loading)
    const error = useSelector((s) => s.productSearch.error)
    const pagination = useSelector((s) => s.productSearch.pagination)
    const productList = useSelector((s)=> s.productSearch.data)

    const dispatch = useDispatch(); 
    const location = useLocation();//取得數據

    useEffect(()=>{
        dispatch(searchProduct({nextPage: 1, pageSize: 10, keywords})) //keywords從param取得的
    }, [location]); //盯著url的變化

    const onPageChange = (nextPage, pageSize)=>{ //用來切換
        dispatch(searchProduct({nextPage, pageSize, keywords}))
    };
    if (loading){
      return (
        <Spin
          size="large"
          style={{marginTop: 200,marginBottom: 200,
            marginLeft: "auto",marginRight: "auto",width: "100%",
          }} /> 
          );}
    if (error){
        <div>網站錯誤：{error} </div>
        ;}
    return (
        <MainLayout>
            <div className={styles["page-content"]}>
            <div className={styles["product-list-container"]}>
                <FilterArea />
            </div>
            <div className={styles["product-list-container"]}>
                <ProductList 
                data={productList} 
                paging={pagination}
                onPageChange={onPageChange} />
            </div>
        </div>
        </MainLayout>   
    );
};