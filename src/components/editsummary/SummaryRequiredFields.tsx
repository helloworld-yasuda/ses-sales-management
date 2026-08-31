import { FormHelperText, Stack } from "@mui/material";
import { Controller, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import LabelComponent from "@/components/common/Label/Label";
import SelectBoxComponent from "@/components/common/SelectBox/SelectBox";
import TextFieldComponent from "@/components/common/TextField/TextField";
import type { SummaryFormValues } from "@/hooks/useSummaryForm";
import { unitPriceOptions } from "@/utils/unitPrice";

type SummaryRequiredFieldsProps = {
  control: Control<SummaryFormValues>;
  register: UseFormRegister<SummaryFormValues>;
  errors: FieldErrors<SummaryFormValues>;
};

const SummaryRequiredFields = ({
  control,
  register,
  errors,
}: SummaryRequiredFieldsProps) => {
  return (
    <>
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
    </>
  );
};

export default SummaryRequiredFields;
