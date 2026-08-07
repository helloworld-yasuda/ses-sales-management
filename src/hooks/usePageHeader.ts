"use client";

import { useEffect, type ReactNode } from "react";
import { usePageHeaderContext } from "@/components/Layout/PageHeaderContext";

type UsePageHeaderParams = {
  title: string;
  actions?: ReactNode;
};

export const usePageHeader = ({ title, actions }: UsePageHeaderParams) => {
  const { setPageHeader, resetPageHeader } = usePageHeaderContext();

  // ページヘッダーの状態を更新する
  useEffect(() => {
    setPageHeader({ title, actions });
  }, [title, setPageHeader]);

  // ページヘッダーの状態をリセットする
  useEffect(() => {
    return () => {
      resetPageHeader();
    };
  }, [resetPageHeader]);
};
