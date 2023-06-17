import { useState, useEffect } from "react";
import { rewardPoints, monthNames } from "../utils";
const dataMap = new Map();
const useCalculatePoints = (list) => {
  const [data, setData] = useState(false);
  const [totalEarningpoints, setTotalEarningpoints] = useState(0);

  useEffect(() => {
    dataMap.clear();
  }, []);

  useEffect(() => {
    let rewards = 0;
    list.forEach((element) => {
      const date = new Date(element.transaction_date);
      const getMonths = date.getMonth();
      const re = rewardPoints(element.price);
      rewards = rewards + re;
      const elm = {
        transaction_id: element.transaction_id,
        customer_name: element.customer_name,
        price: element.price,
        rewards: re,
      };
      if (dataMap.has(monthNames[getMonths])) {
        const info = dataMap.get(monthNames[getMonths]);
        info.push(elm);
        dataMap.set(monthNames[getMonths], info);
      } else {
        dataMap.set(monthNames[getMonths], [elm]);
      }
    });
    setTotalEarningpoints(rewards);
    setData(true);
  }, [list]);

  return { dataMap, data, monthNames, totalEarningpoints };
};

export default useCalculatePoints;
