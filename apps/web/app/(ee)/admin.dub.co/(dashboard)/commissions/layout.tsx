import { PageWidthWrapper } from "@/ui/layout/page-width-wrapper";
import { Suspense } from "react";
import { CommissionsNav } from "./commissions-nav";

export default function AdminCommissionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageWidthWrapper className="pb-12 pt-4">
      <div className="overflow-hidden rounded-xl border border-border-subtle bg-neutral-100">
        <Suspense>
          <CommissionsNav />
          <div className="-mx-px -mb-px space-y-4 rounded-xl border border-border-subtle bg-white p-4">
            {children}
          </div>
        </Suspense>
      </div>
    </PageWidthWrapper>
  );
}
