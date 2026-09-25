import { Stack } from "@mui/material";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import LabelComponent from "@/components/common/Label/Label";
import TextAreaComponent from "@/components/common/TextArea/TextArea";
import TextFieldComponent from "@/components/common/TextField/TextField";
import type { SummaryFormValues } from "@/hooks/useSummaryForm";

type SummaryOptionalFieldsProps = {
  register: UseFormRegister<SummaryFormValues>;
  errors: FieldErrors<SummaryFormValues>;
};

const SummaryOptionalFields = ({
  register,
  errors,
}: SummaryOptionalFieldsProps) => {
  return (
    <>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ width: "50%" }}>
          <LabelComponent label="最寄駅" />
          <TextFieldComponent
            placeholder="例: 渋谷駅"
            {...register("nearestStation")}
          />
        </Stack>
        <Stack spacing={1} sx={{ width: "50%" }}>
          <LabelComponent label="所属" />
          <TextFieldComponent
            placeholder="例: 弊社正社員, パートナー"
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
            "・Javaを用いたWebアプリケーション開発に5年間従事\n・設計からテスト、リリースまで一貫した実務経験あり"
          }
          {...register("features")}
        />
      </Stack>
      <Stack spacing={1}>
        <LabelComponent label="得意領域・対応可能領域（箇条書き）" />
        <TextAreaComponent
          placeholder={
            "・バックエンド開発（Spring Boot / Node.js）\n・AWSを使用したクラウドインフラ構築支援"
          }
          {...register("avaiableAreas")}
        />
      </Stack>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ width: "50%" }}>
          <LabelComponent label="主要技術（カテゴリ別）" />
          <TextFieldComponent
            placeholder="フロント: React, Vue / バックエンド: Java, Go"
            {...register("frontendSkills")}
          />
        </Stack>
        <Stack spacing={1} sx={{ width: "50%" }}>
          <LabelComponent label="希望条件" />
          <TextFieldComponent
            placeholder="リモートワーク推奨、週5日稼働"
            {...register("desiredConditions")}
          />
        </Stack>
      </Stack>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ width: "50%" }}>
          <LabelComponent label="並行状況" />
          <TextFieldComponent
            placeholder="面談1件、結果待ち1件"
            {...register("parallelStatus")}
          />
        </Stack>
        <Stack spacing={1} sx={{ width: "50%" }}>
          <LabelComponent label="面談可能日程" />
          <TextFieldComponent
            placeholder="平日 18時以降可能"
            {...register("availableDate")}
          />
        </Stack>
      </Stack>
    </>
  );
};

export default SummaryOptionalFields;
