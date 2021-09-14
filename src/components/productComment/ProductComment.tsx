import React from 'react'
import styles from "./ProductComment.module.css";
import { List, Comment, Tooltip } from 'antd';

interface PropsType{
    data: {author: string,
    avatar: string,
    content:  string,
    createDate: string 
    }[];
}
export const ProductComment: React.FC<PropsType> = ({data}) => {
    
    return (
        <List   
        dataSource={data}
        itemLayout="horizontal"
        renderItem={(item) => {
            return( 
                <li>
                <Comment
                    author={item.author}
                    avatar={item.avatar}
                    content={item.content}
                    datetime={item.createDate}
                />
                </li>
                );
            }}>
        </List>
    );
};