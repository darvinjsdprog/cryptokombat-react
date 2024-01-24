import "react-data-grid/lib/styles.css";

import DataGrid from "react-data-grid";

const columns = [
  { key: "id", name: "ID" },
  { key: "date", name: "Date" },
  { key: "status", name: "Status" },
  { key: "referredVia", name: "Referred Via" },
  { key: "rate", name: "Rate" },
];

const rows = [
  {
    id: 0,
    date: "07/24/2022",
    status: "Active",
    referredVia: "Email",
    rate: "723.00",
  },
  {
    id: 1,
    date: "01/03/2023",
    status: "Active",
    referredVia: "Unique referral link",
    rate: "123.00",
  },
  {
    id: 2,
    date: "01/10/2023",
    status: "Pending",
    referredVia: "Social Media",
    rate: "10000.00",
  },
  {
    id: 3,
    date: "01/11/2023",
    status: "Active",
    referredVia: "Email",
    rate: "87.00",
  },
  {
    id: 4,
    date: "01/09/2023",
    status: "PEnding",
    referredVia: "Email",
    rate: "435.00",
  },
];

// Grid Documentation https://github.com/adazzle/react-data-grid/blob/main/README.md
export function CryptoDataGrid() {
  return (
    <DataGrid
      rowHeight={70}
      style={{ borderRadius: 20 }}
      columns={columns}
      rows={rows}
    />
  );
}
