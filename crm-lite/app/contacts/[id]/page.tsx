import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatCents, formatDate, STAGE_LABELS } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function ContactDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const contact = await prisma.contact.findUnique({
    where: { id },
    include: { deals: { orderBy: { createdAt: "desc" } } },
  });

  if (!contact) notFound();

  return (
    <>
      <h1>{contact.name}</h1>
      <p className="muted">
        {contact.company ?? "—"} {contact.email ? `· ${contact.email}` : ""}{" "}
        {contact.phone ? `· ${contact.phone}` : ""}
      </p>
      {contact.notes && <p>{contact.notes}</p>}

      <h2>Deals</h2>
      <ul className="contact-list">
        {contact.deals.map((deal) => (
          <li key={deal.id} className="card">
            <div className="contact-row">
              <strong>{deal.title}</strong>
              <span className="muted">{STAGE_LABELS[deal.stage]}</span>
            </div>
            <div className="muted">
              {formatCents(deal.valueCents)} · closes{" "}
              {formatDate(deal.expectedCloseDate)}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
