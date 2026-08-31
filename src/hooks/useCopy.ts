import { SalesSummary } from "@/components/member/SalesSummary.mock";
import { formatUnitPrice } from "@/utils/unitPrice";

const useCopy = () => {
  const handleCopy = async (memberSummary: SalesSummary | null) => {
    if (!memberSummary) return;
    try {
      const copyText = `${memberSummary?.initial} (${memberSummary?.age}歳) | ${memberSummary?.mainskills}\n${memberSummary?.experience}\n■特徴\n${memberSummary?.features}\n■基本情報\n稼働開始    ${memberSummary?.startDate}\n単価       ${formatUnitPrice(memberSummary.unitPrice)}\n最寄駅     ${memberSummary?.nearestStation}\n所属      ${memberSummary?.affiliation}\n■得意領域・対応可能領域\n${memberSummary?.avaiableAreas}\n■主要技術\nFront End   ${memberSummary?.frontendSkills}\nBack End   ${memberSummary?.backendSkills}\nDatabase   ${memberSummary?.databaseSkills}\n生成AI   ${memberSummary?.aiSkills}\n      ■希望条件\n${memberSummary?.desiredConditions}\n■並行状況\n${memberSummary?.parallelStatus}\n■可能日程\n${memberSummary?.availableDate}
    `;
      await navigator.clipboard.writeText(copyText);
    } catch (error) {
      throw new Error("Failed to copy text");
    }
  };

  return { handleCopy };
};

export default useCopy;
