import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import type { ReactNode } from "react";

export type TableRowData = {
  id: number;
} & Record<string, string | number>;

export type TableColumn = {
  label: string;
  key: string;
  render?: (row: TableRowData) => ReactNode;
};

type TableComponentProps = {
  columns: TableColumn[];
  rows: TableRowData[];
};

export const TableComponent = ({ columns, rows }: TableComponentProps) => {
  return (
    <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.key}
                sx={{
                  bgcolor: "#F1F5F9",
                  color: "#64748B",
                  fontWeight: 600,
                  borderBottom: "1px solid #E2E8F0",
                }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} hover>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  sx={{ borderBottom: "1px solid #E2E8F0" }}
                >
                  {column.render ? column.render(row) : row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
