import React from "react";
import { Divider } from "antd";
import { Filter } from "./Filter";
import styles from "./FilterArea.module.css";

export const FilterArea: React.FC = () => {
  return (
    <>
      <Filter title="路線評價" tags={["1星", "2星", "3星", "4星", "5星"]} />
      <Divider dashed className={styles["filter-divider"]} />
      <Filter title="出發城市" tags={["北京", "上海", "廣州", "深圳"]} />
      <Divider dashed className={styles["filter-divider"]} />
      <Filter title="行程天數" tags={["2日", "3日", "4日", "5日", "6日"]} />
      <Divider dashed />
      <Filter
        title="旅遊類型"
        tags={["跟團遊", "自由行", "自駕遊", "高端定制"]}
      />
      <Divider dashed />
      <Filter title="出發時間" tags={["春節", "清明", "勞動節"]} />
    </>
  );
};
