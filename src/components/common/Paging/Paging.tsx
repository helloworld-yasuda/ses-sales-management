import { Button, Pagination, Stack } from "@mui/material";

type PagingProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const navButtonSx = {
  color: "#0F172A",
  borderColor: "#E2E8F0",
  bgcolor: "#FFFFFF",
  minWidth: 48,
  width: 48,
  height: 27,
  padding: 0,
  fontSize: 12,
  fontWeight: 500,
  "&:hover": {
    borderColor: "#94A3B8",
    bgcolor: "#F8FAFC",
  },
  "&.Mui-disabled": {
    opacity: 1,
    color: "#64748B",
    borderColor: "transparent",
    bgcolor: "#F1F5F9",
  },
};

const pageButtonSx = {
  "& .MuiPaginationItem-root": {
    width: 30,
    minWidth: 30,
    height: 27,
    padding: 0,
    fontSize: 12,
    color: "#0F172A",
    border: "1px solid #E2E8F0",
    bgcolor: "#FFFFFF",
    borderRadius: "4px",

    "&:hover": {
      borderColor: "#94A3B8",
      bgcolor: "#F8FAFC",
    },
  },

  "& .MuiPaginationItem-root.Mui-selected": {
    color: "#FFFFFF",
    bgcolor: "primary.main",
    borderColor: "transparent",

    "&:hover": {
      bgcolor: "primary.dark",
      borderColor: "transparent",
    },
  },

  "& .MuiPaginationItem-ellipsis": {
    color: "#64748B",
  },
};

export const Paging = ({
  currentPage,
  totalPages,
  onPageChange,
}: PagingProps) => {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
      <Button
        variant="outlined"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        sx={navButtonSx}
      >
        前へ
      </Button>

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
        siblingCount={1}
        boundaryCount={1}
        hidePrevButton
        hideNextButton
        sx={pageButtonSx}
      />

      <Button
        variant="outlined"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        sx={navButtonSx}
      >
        次へ
      </Button>
    </Stack>
  );
};
