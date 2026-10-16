"use client";

import useWorkspace from "@/lib/swr/use-workspace";
import { PageContent } from "@/ui/layout/page-content";
import { PageWidthWrapper } from "@/ui/layout/page-width-wrapper";
import { ChevronRight } from "@dub/ui";
import Link from "next/link";
import { ReactNode } from "react";
import { InvoicesNav } from "./invoices-nav";

export default function WorkspaceInvoicesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { slug } = useWorkspace();

  return (
    <PageContent
      title={
        <div className="flex items-center gap-1.5">
          <Link
            href={`/${slug}/settings/billing`}
            className="transition-all duration-150 hover:text-neutral-600 active:scale-95"
          >
            Billing
          </Link>
          <ChevronRight className="size-2.5 shrink-0 text-content-muted [&_*]:stroke-2" />
          <h1>Invoices</h1>
        </div>
      }
    >
      <PageWidthWrapper>
        <div className="mb-10 overflow-hidden rounded-xl border border-border-subtle bg-neutral-100">
          <InvoicesNav />
          <div className="-mx-px -mb-px overflow-hidden rounded-xl border border-border-subtle bg-white">
            <div className="grid divide-y divide-neutral-200">{children}</div>
          </div>
        </div>
      </PageWidthWrapper>
    </PageContent>
  );
}
