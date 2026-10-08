import { prisma } from "@/lib/prisma";
import { INFINITY_NUMBER, PLANS } from "@dub/utils";
import "dotenv-flow/config";
import { parseArgs } from "node:util";

// Usage:
//   pnpm script set-workspace-plan --workspace=<slug> --plan=enterprise
//   pnpm script set-workspace-plan --workspace=<slug> --plan=business --unlimited
//   pnpm script set-workspace-plan --workspace=<slug> --plan=pro --dry-run

const PLAN_NAMES = ["free", "pro", "business", "advanced", "enterprise"];

const { values } = parseArgs({
  options: {
    workspace: { type: "string" },
    plan: { type: "string" },
    unlimited: { type: "boolean", default: false },
    "dry-run": { type: "boolean", default: false },
  },
});

async function main() {
  const { workspace: slug, unlimited } = values;
  const planName = values.plan?.toLowerCase();
  const dryRun = values["dry-run"];

  if (!slug || !planName || !PLAN_NAMES.includes(planName)) {
    console.error(
      `Usage: pnpm script set-workspace-plan --workspace=<slug> --plan=<${PLAN_NAMES.join("|")}> [--unlimited] [--dry-run]`,
    );
    process.exit(1);
  }

  const plan = PLANS.find((p) => p.name.toLowerCase() === planName)!;
  const limit = (value: number) => (unlimited ? INFINITY_NUMBER : value);

  // Partner-program limits (payouts, partners, groups, partnerTags,
  // networkInvites) are left untouched: they need QStash + Stripe.
  const data = {
    plan: planName,
    usageLimit: limit(plan.limits.clicks!),
    linksLimit: limit(plan.limits.links!),
    domainsLimit: limit(plan.limits.domains!),
    tagsLimit: limit(plan.limits.tags!),
    foldersLimit: limit(plan.limits.folders!),
    usersLimit: limit(plan.limits.users!),
    aiLimit: limit(plan.limits.ai!),
  };

  const workspace = await prisma.project.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      ...Object.fromEntries(Object.keys(data).map((key) => [key, true])),
    },
  });

  if (!workspace) {
    console.error(`Workspace "${slug}" not found.`);
    process.exit(1);
  }

  console.table(
    Object.entries(data).map(([field, next]) => ({
      field,
      current: workspace[field],
      next,
    })),
  );

  if (dryRun) {
    console.log("Dry run, nothing written.");
    return;
  }

  await prisma.project.update({ where: { id: workspace.id }, data });

  console.log(
    `Updated ${workspace.name} (${slug}) to ${planName}${unlimited ? " with unlimited limits" : ""}.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
