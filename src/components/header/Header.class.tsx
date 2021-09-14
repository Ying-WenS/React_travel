import React from 'react';
import logo from "../../assets/logo.svg";
import styles from './Header.module.css';
import { Layout, Typography, Button, Input,Dropdown, Menu} from "antd";
import {GlobalOutlined} from "@ant-design/icons";
import { withRouter, RouteComponentProps } from "react-router-dom";
import {RootState} from "../../redux/store";
import { withTranslation, WithTranslation } from 'react-i18next';
import { changeLanguageActionCreator, addLanguageActionCreator, CHANGE_LANGUAGE } from "../../redux/language/languageActions";
import { connect } from "react-redux";
import {  Dispatch } from "redux";

const mapStateToProps =(state:RootState)=>{ //參數是從store傳出來的state
      return { //輸出是與props綁定的數據 //輸出方式是以對象綁定輸出
        language: state.language.language , //當前要輸出的數據有兩個 //因為state是store的state所以可以直接拿來用
        languageList: state.language.languageList
      } 
}
const mapDispatchToProps = (dispatch: Dispatch)=>{ //store中的dispatch
    return {
      changeLanguage: (code: "zh" | "en")=>{
        const action = changeLanguageActionCreator(code); //使用工廠action
        dispatch(action);
      },
      addLanguage: (name: string, code: string)=>{
        const action = addLanguageActionCreator(name, code)
        dispatch(action);
      }
    }
};

type PropsType = RouteComponentProps & //react-router路由props的定義型別
  WithTranslation & //i18n定義型別
  ReturnType<typeof mapStateToProps> & //redux store的state定義型別
  ReturnType<typeof mapDispatchToProps> 

class HeaderComponent extends React.Component<PropsType> {
//語言更換按鈕
  menuClickHandler =(e)=>{
    // console.log(e)
    if (e.key === "new"){ //處理新語言
      this.props.addLanguage("新語言","new_language")
    } else
      this.props.changeLanguage(e.key)
  };
  
  render(){
    const {history , t } = this.props;
    return ( 
      <div className={styles["app-header"]}>
      {/* top-header */}
      <div className={styles["top-header"]}>
        <div className={styles.inner}>
        <Typography.Text>{t("header.slogan")} </Typography.Text>
        <Dropdown.Button
          style={{ marginLeft: 15 }}
          overlay={
             <Menu onClick={this.menuClickHandler} >
              { this.props.languageList.map((l)=>{
                return <Menu.Item key={l.code}>{l.name}</Menu.Item>})}
                <Menu.Item key={"new"}>{t("header.add_new_language")}</Menu.Item>
              </Menu>
            } 
          icon={<GlobalOutlined />}> {this.props.language === "zh" ? "中文" : "English" }
        </Dropdown.Button>
          <Button.Group className={styles["button-group"]} >
            <Button onClick={()=> history.push("register")}>{t("header.register")}</Button>
            <Button onClick={()=>history.push("signin")}>{t("header.signin")}</Button>
          </Button.Group>
        </div>  
      </div>
      <Layout.Header className={styles["main-header"]}>
        <span onClick={()=>history.push("/")}>
          <img src={logo} className={styles["App-logo"]} alt="logo"/>
          <Typography.Title level={3} className={styles.title}>{t("header.title")}</Typography.Title>
          <Input.Search 
          placeholder="Search..."
          className={styles["search-input"]} />
        </span>
      </Layout.Header>
      {/* 使用menu組件 */}
      <Menu mode={"horizontal"} className={styles["main-menu"]}>
      <Menu.Item key="1"> {t("header.home_page")} </Menu.Item>
          <Menu.Item key="2"> {t("header.weekend")} </Menu.Item>
          <Menu.Item key="3"> {t("header.group")} </Menu.Item>
          <Menu.Item key="4"> {t("header.backpack")} </Menu.Item>
          <Menu.Item key="5"> {t("header.private")} </Menu.Item>
          <Menu.Item key="6"> {t("header.cruise")} </Menu.Item>
          <Menu.Item key="7"> {t("header.hotel")} </Menu.Item>
          <Menu.Item key="8"> {t("header.local")} </Menu.Item>
          <Menu.Item key="9"> {t("header.theme")} </Menu.Item>
          <Menu.Item key="10"> {t("header.custom")} </Menu.Item>
          <Menu.Item key="11"> {t("header.study")} </Menu.Item>
          <Menu.Item key="12"> {t("header.visa")} </Menu.Item>
          <Menu.Item key="13"> {t("header.enterprise")} </Menu.Item>
          <Menu.Item key="14"> {t("header.high_end")} </Menu.Item>
          <Menu.Item key="15"> {t("header.outdoor")} </Menu.Item>
      </Menu>
    </div>
    );
  }
}
  export const Header = connect(mapStateToProps, mapDispatchToProps)(withTranslation() (withRouter(HeaderComponent)));
 