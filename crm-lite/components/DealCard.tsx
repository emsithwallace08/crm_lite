import { formatCents, formatDate } from "@/lib/format";

type DealWithContact = {
  id: string;
  title: string;
  valueCents: number;
  expectedCloseDate: Date | string | null;
  contact: { name: string };
};

export function DealCard({ deal }: { deal: DealWithContact }) {
  return (
    <div className="deal-card">
      <div>
        <strong>{deal.title}</strong>
      </div>
      <div className="muted">{deal.contact.name}</div>
      <div className="muted">
        {formatCents(deal.valueCents)} · closes {formatDate(deal.expectedCloseDate)}
      </div>
    </div>
  );
}
