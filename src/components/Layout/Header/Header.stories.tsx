import { Button } from "@mui/material";
import Header from "./Header";

const Meta = {
  title: "Layout/Header",
  component: Header,

  tags: ["autodocs"],
};

export default Meta;

export const Default = () => (
  <Header
    title="取引先管理"
    actions={
      <Button variant="contained" color="primary">
        新規追加
      </Button>
    }
  />
);

export const Detail = () => (
  <Header
    title="取引先管理 / 取引先詳細"
    actions={
      <>
        <Button variant="outlined" color="error">
          削除する
        </Button>
        <Button variant="contained" color="primary">
          編集する
        </Button>
      </>
    }
  />
);

export const TitleOnly = () => <Header title="取引先管理 / 取引先登録" />;
