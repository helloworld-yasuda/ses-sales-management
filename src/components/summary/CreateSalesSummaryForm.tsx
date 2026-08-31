"use client";

import { Card, Stack, Typography, FormHelperText } from "@mui/material";
import LabelComponent from "@/components/common/Label/Label";
import TextFieldComponent from "@/components/common/TextField/TextField";
import SelectBoxComponent from "@/components/common/SelectBox";
import ButtonComponent from "../common/Button/Button";
import type { CreateSalesSummaryFormValues } from "@/hooks/useCreateSalesSummaryForm";
import { Controller } from "react-hook-form";
import useCreateSalesSummaryForm from "@/hooks/useCreateSalesSummaryForm";
import TextAreaComponent from "../common/TextArea/TextArea";

type CreateSalesSummaryFormProps = {
  onCreateSalesSummary?: (data: CreateSalesSummaryFormValues) => void;
  onCancel?: () => void;
};

const CreateSalesSummaryForm = ({
  onCreateSalesSummary,
  onCancel,
}: CreateSalesSummaryFormProps) => {
  const {
    control,
    unitPriceOptions,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
  } = useCreateSalesSummaryForm({ onCreateSalesSummary });

  return (
    <Card
      elevation={0}
      sx={{
        p: 4,
        m: 4,
        border: "1px solid #E2E8F0",
        borderRadius: 2,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={3}>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 18 }}>
            営業サマリー情報の入力
          </Typography>
          <Stack spacing={2.5}>
            <Stack direction="row" spacing={3}>
              <Stack spacing={1} sx={{ width: "50%" }}>
                <LabelComponent label="氏名（イニシャル）" required />
                <TextFieldComponent
                  placeholder="例: T.S"
                  {...register("initial")}
                  error={!!errors.initial}
                  helperText={errors.initial?.message}
                />
              </Stack>
              <Stack spacing={1} sx={{ width: "50%" }}>
                <LabelComponent label="年齢" required />
                <TextFieldComponent
                  placeholder="例: 28歳"
                  {...register("age")}
                  error={!!errors.age}
                  helperText={errors.age?.message}
                />
              </Stack>
            </Stack>
            <Stack direction="row" spacing={3}>
              <Stack spacing={1} sx={{ width: "50%" }}>
                <LabelComponent label="メイン技術" required />
                <TextFieldComponent
                  placeholder="例: Java, Spring Boot"
                  {...register("mainSkills")}
                  error={!!errors.mainSkills}
                  helperText={errors.mainSkills?.message}
                />
              </Stack>
              <Stack spacing={1} sx={{ width: "50%" }}>
                <LabelComponent label="実務経験年数" required />
                <TextFieldComponent
                  placeholder="例: 5年"
                  {...register("experience")}
                  error={!!errors.experience}
                  helperText={errors.experience?.message}
                />
              </Stack>
            </Stack>
            <Stack direction="row" spacing={3}>
              <Stack spacing={1} sx={{ width: "50%" }}>
                <LabelComponent label="稼働開始" required />
                <TextFieldComponent
                  placeholder="例: 即日〜, 8月〜"
                  sx={{ height: "42px" }}
                  {...register("startDate")}
                  error={!!errors.startDate}
                  helperText={errors.startDate?.message}
                />
              </Stack>
              <Stack spacing={1} sx={{ width: "50%" }}>
                <LabelComponent label="単価" required />
                <Controller
                  control={control}
                  name="unitPrice"
                  render={({ field }) => (
                    <SelectBoxComponent
                      aria-label="unitPrice"
                      options={unitPriceOptions}
                      placeholder="例: 60万円 "
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
            </Stack>
            <Stack direction="row" spacing={3}>
              <Stack spacing={1} sx={{ width: "50%" }}>
                <LabelComponent label="最寄駅" />
                <TextFieldComponent
                  placeholder="例: 渋谷駅"
                  sx={{ height: "42px" }}
                  {...register("nearestStation")}
                />
              </Stack>
              <Stack spacing={1} sx={{ width: "50%" }}>
                <LabelComponent label="所属" />
                <TextFieldComponent
                  placeholder="例: 弊社正社員, パートナー"
                  sx={{ height: "42px" }}
                  {...register("affiliation")}
                  error={!!errors.affiliation}
                  helperText={errors.affiliation?.message}
                />
              </Stack>
            </Stack>
            <Stack spacing={1}>
              <LabelComponent label="特徴（箇条書き）" />
              <TextAreaComponent
                placeholder={
                  "・Javaを用いたWebアプリケーション開発に5年間従事\n・設計からテスト、リリースまで一貫した実務経験あり\n・要件定義の経験も有し、顧客との折衝が得意"
                }
                {...register("features")}
                error={!!errors.features}
                helperText={errors.features?.message}
              />
            </Stack>
            <Stack spacing={1}>
              <LabelComponent label="得意領域・対応可能領域（箇条書き）" />
              <TextAreaComponent
                placeholder={
                  "・バックエンド開発（Spring Boot / Node.js）\n・AWSを使用したクラウドインフラ構築支援"
                }
                {...register("avaiableAreas")}
                error={!!errors.avaiableAreas}
                helperText={errors.avaiableAreas?.message}
              />
            </Stack>
            <Stack direction="row" spacing={3}>
              <Stack spacing={1} sx={{ width: "50%" }}>
                <LabelComponent label="主要技術（カテゴリ別）" />
                <TextFieldComponent
                  placeholder="フロント: React, Vue / バックエンド: Java, Go"
                  {...register("frontendSkills")} // TODO: フロントエンド技術を入力,バックエンドとデータベース技術、生成AIを選択肢から選択できるようにする
                  error={!!errors.frontendSkills}
                  helperText={errors.frontendSkills?.message}
                />
              </Stack>
              <Stack spacing={1} sx={{ width: "50%" }}>
                <LabelComponent label="希望条件" />
                <TextFieldComponent
                  placeholder="リモートワーク推奨、週5日稼働"
                  {...register("desiredConditions")}
                  error={!!errors.desiredConditions}
                  helperText={errors.desiredConditions?.message}
                />
              </Stack>
            </Stack>
            <Stack direction="row" spacing={3}>
              <Stack spacing={1} sx={{ width: "50%" }}>
                <LabelComponent label="並行状況" />
                <TextFieldComponent
                  placeholder="面談1件、結果待ち1件"
                  {...register("parallelStatus")}
                  error={!!errors.parallelStatus}
                  helperText={errors.parallelStatus?.message}
                />
              </Stack>
              <Stack spacing={1} sx={{ width: "50%" }}>
                <LabelComponent label="面談可能日程" />
                <TextFieldComponent
                  placeholder="平日 18時以降可能"
                  {...register("availableDate")}
                  error={!!errors.availableDate}
                  helperText={errors.availableDate?.message}
                />
              </Stack>
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
              保存する
            </ButtonComponent>
          </Stack>
        </Stack>
      </form>
    </Card>
  );
};

export default CreateSalesSummaryForm;
