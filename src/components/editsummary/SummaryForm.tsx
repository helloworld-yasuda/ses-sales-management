"use client";

import { Card, Stack, Typography } from "@mui/material";
import ButtonComponent from "@/components/common/Button/Button";
import useSummaryForm, {
  type SummaryFormValues,
} from "@/hooks/useSummaryForm";
import SummaryOptionalFields from "./SummaryOptionalFields";
import SummaryRequiredFields from "./SummaryRequiredFields";

type SummaryFormProps = {
  defaultValues: SummaryFormValues;
  onSave?: (data: SummaryFormValues) => void;
  onCancel?: () => void;
};

const SummaryForm = ({ defaultValues, onSave, onCancel }: SummaryFormProps) => {
  const { control, register, handleSubmit, errors, isSubmitting, onSubmit } =
    useSummaryForm({ defaultValues, onSave });

  return (
    <Card
      elevation={0}
      sx={{ p: 4, m: 4, border: "1px solid #E2E8F0", borderRadius: 2 }}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={3}>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 18 }}>
            営業サマリー情報の入力
          </Typography>
          <Stack spacing={2.5}>
            <SummaryRequiredFields
              control={control}
              register={register}
              errors={errors}
            />
            <SummaryOptionalFields register={register} errors={errors} />
          </Stack>
          <Stack direction="row" spacing={2} sx={{ justifyContent: "end" }}>
            <ButtonComponent
              type="button"
              variant="outlined"
              onClick={() => onCancel?.()}
              sx={{
                borderColor: "#E2E8F0",
                color: "#64748B",
                fontWeight: 600,
                borderRadius: 2,
              }}
            >
              キャンセル
            </ButtonComponent>
            <ButtonComponent
              type="submit"
              disabled={isSubmitting}
              sx={{ backgroundColor: "#2563EB", borderRadius: 2 }}
            >
              保存する
            </ButtonComponent>
          </Stack>
        </Stack>
      </form>
    </Card>
  );
};

export default SummaryForm;
