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
import TextAreaComponent from "../common/TextArea/TextArea";
import useCreateMember from "@/hooks/useCreateMember";
import type { CreateMemberFormValues } from "@/hooks/useCreateMember";

type CreateMemberFormProps = {
  onCreateMember?: (data: CreateMemberFormValues) => void;
  onCancel?: () => void;
};

const CreateMemberForm = ({
  onCreateMember,
  onCancel,
}: CreateMemberFormProps) => {
  const {
    control,
    StatusOptions,
    UnitPriceOptions,
    SkillsOptions2,
    SkillsOptions,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
  } = useCreateMember({ onCreateMember });

  return (
    <Card
      elevation={0}
      sx={{
        width: "800px",
        p: 4,
        my: 4,
        mx: "auto",
        border: "1px solid #E2E8F0",
        borderRadius: 2,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={3}>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 18 }}>
            要員プロファイル基本情報の入力{" "}
          </Typography>
          <Stack spacing={2.5}>
            <Stack direction="row" spacing={3}>
              <Stack spacing={1} sx={{ width: "50%" }}>
                <LabelComponent label="氏名" required />
                <TextFieldComponent
                  placeholder="例：山田 太郎"
                  {...register("memberName")}
                  error={!!errors.memberName}
                  helperText={errors.memberName?.message}
                />
              </Stack>
              <Stack spacing={1} sx={{ width: "50%" }}>
                <LabelComponent label="フリガナ" required />
                <TextFieldComponent
                  placeholder="例：ヤマダ タロウ"
                  {...register("nameKana")}
                  error={!!errors.nameKana}
                  helperText={errors.nameKana?.message}
                />
              </Stack>
            </Stack>
            <Stack direction="row" spacing={3}>
              <Stack spacing={1} sx={{ width: "50%" }}>
                <LabelComponent label="所属会社 / 属性" required />
                <TextFieldComponent
                  placeholder="例：パートナーA または 自社社員"
                  {...register("affiliation")}
                  error={!!errors.affiliation}
                  helperText={errors.affiliation?.message}
                />
              </Stack>
              <Stack spacing={1} sx={{ width: "50%" }}>
                <LabelComponent label="最寄駅" required />
                <TextFieldComponent
                  placeholder="例：新宿駅"
                  {...register("nearestStation")}
                  error={!!errors.nearestStation}
                  helperText={errors.nearestStation?.message}
                />
              </Stack>
            </Stack>
            <Stack direction="row" spacing={3}>
              <FormControl sx={{ width: "50%" }}>
                <Stack spacing={1}>
                  <LabelComponent label="稼働ステータス " required />
                  <Controller
                    control={control}
                    name="availability"
                    render={({ field }) => (
                      <SelectBoxComponent
                        aria-label="availability "
                        options={StatusOptions}
                        placeholder="例：稼働中"
                        value={field.value ?? undefined}
                        onChange={field.onChange}
                        error={!!errors.availability}
                      />
                    )}
                  />
                </Stack>
                <FormHelperText error={!!errors.availability}>
                  {errors.availability?.message}
                </FormHelperText>
              </FormControl>
              <Stack spacing={1} sx={{ width: "50%" }}>
                <LabelComponent label="上位会社" required />
                <TextFieldComponent
                  placeholder="例：ABC商事株式会社"
                  {...register("upperCompany")}
                  error={!!errors.upperCompany}
                  helperText={errors.upperCompany?.message}
                />
              </Stack>
            </Stack>
            <Stack direction="row" spacing={3}>
              <Stack spacing={1} sx={{ width: "50%" }}>
                <LabelComponent label="支払サイト" required />
                <TextFieldComponent
                  placeholder="例：月末締め翌月末払い"
                  sx={{ height: "42px" }}
                  {...register("paymentTerms")}
                  error={!!errors.paymentTerms}
                  helperText={errors.paymentTerms?.message}
                />
              </Stack>
              <Stack spacing={1} sx={{ width: "50%" }}>
                <LabelComponent label="更新頻度" required />
                <TextFieldComponent
                  placeholder="例：3ヶ月"
                  sx={{ height: "42px" }}
                  {...register("renewal")}
                  error={!!errors.renewal}
                  helperText={errors.renewal?.message}
                />
              </Stack>
            </Stack>

            <Stack direction="row" spacing={3}>
              <FormControl sx={{ width: "50%" }}>
                <Stack spacing={1}>
                  <LabelComponent label="主要スキル1 (タグ) " required />
                  <Controller
                    control={control}
                    name="skills"
                    render={({ field }) => (
                      <SelectBoxComponent
                        aria-label="skills"
                        options={SkillsOptions}
                        placeholder="例：React, TypeScript, AWS"
                        value={field.value ?? undefined}
                        onChange={field.onChange}
                        error={!!errors.skills}
                      />
                    )}
                  />
                </Stack>
                <FormHelperText error={!!errors.skills}>
                  {errors.skills?.message}
                </FormHelperText>
              </FormControl>

              <FormControl sx={{ width: "50%" }}>
                <Stack spacing={1}>
                  <LabelComponent label="主要スキル2 (タグ) " required />
                  <Controller
                    control={control}
                    name="skills2"
                    render={({ field }) => (
                      <SelectBoxComponent
                        aria-label="skills2 "
                        options={SkillsOptions2}
                        placeholder="例：Java, Spring Boot, Docker"
                        value={field.value ?? undefined}
                        onChange={field.onChange}
                        error={!!errors.skills2}
                      />
                    )}
                  />
                  <FormHelperText error={!!errors.skills2}>
                    {errors.skills2?.message}
                  </FormHelperText>
                </Stack>
              </FormControl>
            </Stack>
            <Stack direction="row" spacing={3}>
              <Stack spacing={1} sx={{ width: "50%" }}>
                <LabelComponent label="経験年数" required />
                <TextFieldComponent
                  placeholder="例：５年"
                  sx={{ height: "42px" }}
                  {...register("experienceYears")}
                  error={!!errors.experienceYears}
                  helperText={errors.experienceYears?.message}
                />
              </Stack>
              <FormControl sx={{ width: "50%" }}>
                <Stack spacing={1}>
                  <LabelComponent label="提案単価 (万)" required />
                  <Controller
                    control={control}
                    name="unitPrice"
                    render={({ field }) => (
                      <SelectBoxComponent
                        aria-label="unitPrice"
                        options={UnitPriceOptions}
                        placeholder="例：80万円"
                        value={field.value ?? undefined}
                        onChange={field.onChange}
                        error={!!errors.unitPrice}
                      />
                    )}
                  />
                  <FormHelperText error={!!errors.unitPrice}>
                    {errors.unitPrice?.message}
                  </FormHelperText>
                </Stack>
              </FormControl>
            </Stack>
            <Stack spacing={1}>
              <LabelComponent label="スキルシートURL" required />
              <TextFieldComponent
                placeholder="例：https://example.com/skillsheet"
                sx={{ height: "42px" }}
                {...register("skillSheet")}
                error={!!errors.skillSheet}
                helperText={errors.skillSheet?.message}
              />
            </Stack>
            <Stack spacing={1} sx={{ height: "124px" }}>
              <LabelComponent label="備考・その他コメント" />
              <TextAreaComponent
                placeholder="例：希望アサインエリア、得意なドメイン、英語対応可など"
                sx={{ height: "42px" }}
                {...register("remarks")}
              />
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
              要員を保存する
            </ButtonComponent>
          </Stack>
        </Stack>
      </form>
    </Card>
  );
};

export default CreateMemberForm;
