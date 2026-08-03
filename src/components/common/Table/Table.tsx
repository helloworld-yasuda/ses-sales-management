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
};

export type TableColumn<T extends TableRowData> = {
  label: string;
  key: keyof T;
  render?: (row: T) => ReactNode;
};

type TableComponentProps<T extends TableRowData> = {
  columns: TableColumn<T>[];
  rows: T[];
};

export const TableComponent = <T extends TableRowData>({
  columns,
  rows,
}: TableComponentProps<T>) => {
  return (
    <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={String(column.key)}
                sx={{
                  bgcolor: "#F1F5F9",
                  color: "#666666",
                  fontWeight: 500,
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
                  key={String(column.key)}
                  sx={{
                    borderBottom: "1px solid #E2E8F0",
                  }}
                >
                  {column.render
                    ? column.render(row)
                    : String(row[column.key])}
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
