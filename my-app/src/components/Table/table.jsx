import "./style.css";

export const Table = ({ list }) => {
  const tableKeys = Object.keys(list[0]);
  return (
    <table className="table_list">
      <thead>
        {tableKeys.map((row, index) => (
          <th key={index}>{row.replace("_", " ")}</th>
        ))}
      </thead>
      <tbody>
        {list.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <>
              {tableKeys.map((headerKey, index) => (
                <td key={`${row[headerKey]}_${index}`}>{row[headerKey]}</td>
              ))}
            </>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
