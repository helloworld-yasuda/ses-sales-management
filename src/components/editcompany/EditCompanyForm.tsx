"use client";

import {
  Card,
  Stack,
  Typography,
  FormControl,
  FormHelperText,
} from "@mui/material";
import LabelComponent from "@/components/common/Label/Label";
import TextFieldComponent from "@/components/common/TextField/TextField";
import SelectBoxComponent from "@/components/common/SelectBox";
import ButtonComponent from "../common/Button/Button";
import { Controller } from "react-hook-form";
import useEditCompanyDetail from "@/hooks/useEditCompanyDetail";
import type { EditCompanyFormValues } from "@/hooks/useEditCompanyDetail";
type EditCompanyFormProps = {
  onEditCompany?: (data: EditCompanyFormValues) => Promise<void> | void;
  onCancel?: () => void;
};

const EditCompanyForm = ({ onEditCompany, onCancel }: EditCompanyFormProps) => {
  const {
    control,
    RankOptions,
    InterviewOptions,
    DeliveryOptions,
    LineOptions,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
  } = useEditCompanyDetail({ onEditCompany });

  return (
    <Card
      elevation={0}
      sx={{
        width: "800px",
        p: 4,
        mt: 4,
        mx: "auto",
        border: "1px solid #E2E8F0",
        borderRadius: 2,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={3}>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 18 }}>
            取引先基本情報の変更
          </Typography>
          <Stack spacing={2.5}>
            <Stack direction="row" spacing={3}>
              <Stack spacing={1} sx={{ width: "50%" }}>
                <LabelComponent label="会社名" required />
                <TextFieldComponent
                  placeholder="株式会社〇〇〇"
                  {...register("companyName")}
                  error={!!errors.companyName}
                  helperText={errors.companyName?.message}
                />
              </Stack>
              <Stack spacing={1} sx={{ width: "50%" }}>
                <LabelComponent label="相手企業担当者" required />
                <TextFieldComponent
                  placeholder="山田 太郎"
                  {...register("contactPerson")}
                  error={!!errors.contactPerson}
                  helperText={errors.contactPerson?.message}
                />
              </Stack>
            </Stack>
            <Stack direction="row" spacing={3}>
              <Stack spacing={1} sx={{ width: "50%" }}>
                <LabelComponent label="営業共通メールアドレス" />
                <TextFieldComponent
                  placeholder="company"
                  {...register("email")}
                />
              </Stack>
              <Stack spacing={1} sx={{ width: "50%" }}>
                <LabelComponent label="企業担当者メールアドレス" />
                <TextFieldComponent
                  placeholder="example@company.co.jp"
                  {...register("companyEmail")}
                />
              </Stack>
            </Stack>
            <Stack direction="row" spacing={3}>
              <Stack spacing={1} sx={{ width: "50%" }}>
                <LabelComponent label="自社営業担当" required />
                <TextFieldComponent
                  placeholder="山田 花子"
                  sx={{ height: "42px" }}
                  {...register("salesPerson")}
                  error={!!errors.salesPerson}
                  helperText={errors.salesPerson?.message}
                />
              </Stack>
              <Stack spacing={1} sx={{ width: "50%" }}>
                <LabelComponent label="ランク" />
                <Controller
                  control={control}
                  name="rank"
                  render={({ field }) => (
                    <SelectBoxComponent
                      aria-label="ランク"
                      options={RankOptions}
                      placeholder="A / B / C"
                      value={field.value ?? undefined}
                      onChange={field.onChange}
                      error={!!errors.rank}
                    />
                  )}
                />
                <FormHelperText error={!!errors.rank}>
                  {errors.rank?.message}
                </FormHelperText>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={3}>
              <Stack spacing={1} sx={{ width: "50%" }}>
                <LabelComponent label="主要領域" />
                <TextFieldComponent
                  placeholder="Java / React / AWS など"
                  sx={{ height: "42px" }}
                  {...register("mainArea")}
                />
              </Stack>
              <Stack spacing={1} sx={{ width: "50%" }}>
                <LabelComponent label="面談実績" />
                <Controller
                  control={control}
                  name="interviewAchievement"
                  render={({ field }) => (
                    <SelectBoxComponent
                      aria-label="面談実績"
                      options={InterviewOptions}
                      placeholder="選択してください"
                      value={field.value ?? undefined}
                      onChange={field.onChange}
                    />
                  )}
                />
              </Stack>
            </Stack>

            <Stack direction="row" spacing={3}>
              <FormControl sx={{ width: "50%" }}>
                <Stack spacing={1}>
                  <LabelComponent label="配信の有無" required />
                  <Controller
                    control={control}
                    name="deliveryAvailability"
                    render={({ field }) => (
                      <SelectBoxComponent
                        aria-label="配信の有無"
                        options={DeliveryOptions}
                        placeholder="選択してください"
                        value={field.value ?? undefined}
                        onChange={field.onChange}
                        error={!!errors.deliveryAvailability}
                      />
                    )}
                  />
                </Stack>
                <FormHelperText error={!!errors.deliveryAvailability}>
                  {errors.deliveryAvailability?.message}
                </FormHelperText>
              </FormControl>

              <FormControl sx={{ width: "50%" }}>
                <Stack spacing={1}>
                  <LabelComponent label="Lineの有無" required />
                  <Controller
                    control={control}
                    name="lineAvailability"
                    render={({ field }) => (
                      <SelectBoxComponent
                        aria-label="Lineの有無"
                        options={LineOptions}
                        placeholder="選択してください"
                        value={field.value ?? undefined}
                        onChange={field.onChange}
                        error={!!errors.lineAvailability}
                      />
                    )}
                  />
                  <FormHelperText error={!!errors.lineAvailability}>
                    {errors.lineAvailability?.message}
                  </FormHelperText>
                </Stack>
              </FormControl>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ justifyContent: "end" }}>
            <ButtonComponent
              type="button"
              onClick={() => {
                onCancel?.();
              }}
              variant="outlined"
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
              sx={{ backgroundColor: "#2563EB", borederRadius: 2 }}
            >
              更新する
            </ButtonComponent>
          </Stack>
        </Stack>
      </form>
    </Card>
  );
};

export default EditCompanyForm;
