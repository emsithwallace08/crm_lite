import { prisma } from "@/lib/prisma";
import { PipelineBoard } from "@/components/PipelineBoard";

export const dynamic = "force-dynamic";

export default async function DealsPage() {
  const deals = await prisma.deal.findMany({
    include: { contact: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <h1>Pipeline</h1>
      <PipelineBoard deals={deals} />
    </>
  );
}
