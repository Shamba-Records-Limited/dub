import { PageWidthWrapper } from "@/ui/layout/page-width-wrapper";
import { AlertCircleFill } from "@/ui/shared/icons";
import { GridIcon, LoadingSpinner, UserCheck } from "@dub/ui";
import { Suspense } from "react";
import { PartnersNavTabs } from "./partners-nav-tabs";

const PARTNER_TABS = [
  { label: "Network Partners", icon: GridIcon },
  { label: "Trusted Partners", icon: UserCheck },
  { label: "Fraud Alerts", icon: AlertCircleFill },
];

export default function AdminPartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageWidthWrapper className="pb-12 pt-4">
      <div className="overflow-hidden rounded-xl border border-border-subtle bg-neutral-100">
        <Suspense fallback={<PartnersPageFallback />}>
          <PartnersNavTabs />
          <div className="-mx-px -mb-px space-y-4 rounded-xl border border-border-subtle bg-white p-4">
            {children}
          </div>
        </Suspense>
      </div>
    </PageWidthWrapper>
  );
}

function PartnersPageFallback() {
  return (
    <>
      <div className="flex items-center gap-1 p-2">
        {PARTNER_TABS.map(({ label, icon: Icon }) => (
          <div
            key={label}
            className="flex items-center gap-2 px-2.5 py-1 text-sm font-medium text-content-emphasis"
          >
            <Icon className="size-4" />
            <span>{label}</span>
          </div>
        ))}
      </div>
      <div className="-mx-px -mb-px rounded-xl border border-border-subtle bg-white p-4">
        <div className="flex h-96 items-center justify-center">
          <LoadingSpinner />
        </div>
      </div>
    </>
  );
}
