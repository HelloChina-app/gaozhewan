import { get, put } from "@vercel/blob";
import type { LabSelectionId } from "@/lib/lab";

export type StoredLabIdea = {
  audience: string;
  budget: string;
  contactEmail: string;
  contactHandle: string;
  createdAt: string;
  ideaId: string;
  outcome: string;
  problem: string;
  publicConsent: boolean;
  selectedPackageId: LabSelectionId;
  stage: string;
  title: string;
  v: 1;
};

function ideaPath(ideaId: string) {
  return `lab/ideas/${ideaId}.json`;
}

export function labIdeaStoreEnabled() {
  return Boolean(
    process.env.USDT_ORDER_STORE === "vercel-blob" ||
      process.env.BLOB_READ_WRITE_TOKEN
  );
}

export async function readLabIdea(ideaId: string) {
  const result = await get(ideaPath(ideaId), { access: "private" });
  if (!result || result.statusCode !== 200 || !result.stream) return null;

  try {
    return (await new Response(result.stream).json()) as StoredLabIdea;
  } catch {
    return null;
  }
}

export async function saveLabIdea(idea: StoredLabIdea) {
  await put(ideaPath(idea.ideaId), JSON.stringify(idea), {
    access: "private",
    addRandomSuffix: false,
    contentType: "application/json"
  });
  return idea;
}
