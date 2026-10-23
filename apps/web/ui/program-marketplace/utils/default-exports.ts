import { prisma } from "@/lib/prisma";
import { Category, WorkspaceEnvironment } from "@prisma/client";

export const revalidate = 3600;

export async function generateStaticParams() {
  let programs: { slug: string }[];

  try {
    programs = await prisma.program.findMany({
      where: {
        environment: WorkspaceEnvironment.production,
        addedToMarketplaceAt: {
          not: null,
        },
      },
      select: {
        slug: true,
      },
    });
  } catch (error) {
    // runs during `next build`, where there is no database to reach — prerender
    // nothing and let every marketplace page render on demand instead
    console.warn("[marketplace] database unreachable, skipping prerender");
    return [];
  }

  const categoryPages = Object.values(Category).map((category) => ({
    segments: ["c", category.toLowerCase()],
  }));

  const programPages = programs.map((program) => ({
    segments: [program.slug],
  }));

  return [
    { segments: [] },
    { segments: ["all"] },
    ...categoryPages,
    ...programPages,
  ];
}
