"use client";

import { BILLING_ENABLED } from "@/lib/flags";
import useWorkspace from "@/lib/swr/use-workspace";

export function useDashboardBannerVisible() {
  const {
    exceededEvents,
    exceededLinks,
    paymentFailedAt,
    subscriptionCanceledAt,
    loading,
  } = useWorkspace();

  const subscriptionCanceled =
    subscriptionCanceledAt && new Date(subscriptionCanceledAt) < new Date();

  const isUpgradeBannerVisible =
    BILLING_ENABLED &&
    (exceededEvents ||
      exceededLinks ||
      !!paymentFailedAt ||
      subscriptionCanceled) &&
    !loading;

  return {
    isUpgradeBannerVisible,
    hasBanner: isUpgradeBannerVisible,
  };
}
