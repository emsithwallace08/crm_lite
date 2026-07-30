import { DealCard } from "./DealCard";
import { STAGE_ORDER, STAGE_LABELS } from "@/lib/format";

type DealWithContact = {
  id: string;
  title: string;
  valueCents: number;
  stage: string;
  expectedCloseDate: Date | string | null;
  contact: { name: string };
};

export function PipelineBoard({ deals }: { deals: DealWithContact[] }) {
  return (
    <div className="pipeline">
      {STAGE_ORDER.map((stage) => {
        const stageDeals = deals.filter((d) => d.stage === stage);
        return (
          <div key={stage} className="pipeline-column">
            <h3>{STAGE_LABELS[stage]}</h3>
            {stageDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        );
      })}
    </div>
  );
}
