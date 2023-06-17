import { useState } from "react";
import { Table } from "../../components/Table/table";
import useCalculatePoints from "./hooks/useCalculatePoints";
import "./style.css";
import { useRef } from "react";
import { useEffect } from "react";
export const CustomerEarnPoints = ({ cutomerData }) => {
  const [showpointsTable, setShowpointsTable] = useState(false);

  const pointsRef = useRef(null);
  const { dataMap, monthNames, totalEarningpoints } =
    useCalculatePoints(cutomerData);

  const handleEarningPointsClick = () => {
    setShowpointsTable(true);
  };

  useEffect(() => {
    if (showpointsTable) {
      pointsRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [showpointsTable]);

  return (
    <div className="row_info">
      <Table list={cutomerData} />
      <button
        className="button"
        onClick={handleEarningPointsClick}
        data-testid="calculate"
      >
        Calculate earning points
      </button>
      <div
        className="month_wise_points"
        data_testid="month_wise_points"
        ref={pointsRef}
      >
        {showpointsTable && monthNames && (
          <>
            {monthNames &&
              monthNames.map((row) => (
                <>
                  {dataMap.has(row) && (
                    <div className="row-info" data_testid="month_info">
                      <h3 role="month_info">{row}</h3>
                      <Table list={dataMap.get(row)} />
                    </div>
                  )}
                </>
              ))}
          </>
        )}
      </div>
      {showpointsTable && totalEarningpoints && (
        <div className="total_points" data_testid="total_points">
          Total Toints: {totalEarningpoints}
        </div>
      )}
    </div>
  );
};
