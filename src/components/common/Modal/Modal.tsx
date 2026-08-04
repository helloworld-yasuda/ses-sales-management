import { Button, Dialog, Stack, Typography } from "@mui/material";
import Image from "next/image";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  cancelLabel?: string;
  confirmLabel?: string;
  withIcon?: boolean;
};

const Modal = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  cancelLabel = "キャンセル",
  confirmLabel = "削除する",
  withIcon = true,
}: ModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: 358,
            borderRadius: "12px",
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
          },
        },
      }}
    >
      <Stack
        sx={{
          p: 4,
          gap: 3,
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {withIcon && (
          <Image
            src="/warning-icon.png"
            alt=""
            width={56}
            height={56}
            aria-hidden
          />
        )}

        <Typography sx={{ color: "#0F172A", fontSize: 18, fontWeight: 600 }}>
          {title}
        </Typography>

        <Typography sx={{ color: "#64748B", fontSize: 14, fontWeight: 400 }}>
          {description}
        </Typography>

        <Stack direction="row" spacing={1.5} sx={{ justifyContent: "center" }}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              color: "#475569",
              borderColor: "#E2E8F0",
              borderRadius: "8px",
              px: 3,
              py: 1.25,
              height: "37px",
            }}
          >
            {cancelLabel}
          </Button>
          <Button
            onClick={onConfirm}
            color="error"
            variant="contained"
            sx={{ borderRadius: "8px", px: 3, py: 1.25, height: "37px" }}
          >
            {confirmLabel}
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default Modal;
