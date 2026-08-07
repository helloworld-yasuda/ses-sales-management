"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

// ページヘッダーの状態
export type PageHeaderState = {
  title: string;
  actions?: ReactNode;
};

// Contextの型
type PageHeaderContextValue = {
  header: PageHeaderState; // ページヘッダーの状態
  setPageHeader: (header: PageHeaderState) => void; // ページヘッダーの情報を変更する関数
  resetPageHeader: () => void; // ページヘッダーの情報をリセットする関数
};

// デフォルトのページヘッダーの状態
const defaultHeader: PageHeaderState = {
  title: "",
  actions: undefined,
};

// Contextの作成
const PageHeaderContext = createContext<PageHeaderContextValue | null>(null);

// ページヘッダーのプロバイダー
export const PageHeaderProvider = ({ children }: { children: ReactNode }) => {
  const [header, setHeader] = useState<PageHeaderState>(defaultHeader);

  const setPageHeader = useCallback((next: PageHeaderState) => {
    setHeader(next);
  }, []);

  const resetPageHeader = useCallback(() => {
    setHeader(defaultHeader);
  }, []);

  return (
    <PageHeaderContext.Provider
      value={{ header, setPageHeader, resetPageHeader }}
    >
      {children}
    </PageHeaderContext.Provider>
  );
};

// ページヘッダーのコンテキストを使用するためのフック
export const usePageHeaderContext = () => {
  const context = useContext(PageHeaderContext);
  if (!context) {
    throw new Error(
      "usePageHeaderContext must be used within PageHeaderProvider",
    );
  }
  return context;
};
