"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import clsx from "clsx";

export const UserDetailsNavLinks = () => {
  const { id } = useParams();
  const pathname = usePathname();

  const menuItems = [
    {
      label: "Profile Details",
      href: `/admin/user-details/${id}/profile-details`,
    },
    {
      label: "Dietary Preferences",
      href: `/admin/user-details/${id}/dietary-preferences`,
    },
    {
      label: "Activity History",
      href: `/admin/user-details/${id}/activity-history`,
    },
    {
      label: "Subscription History",
      href: `/admin/user-details/${id}/subscriptions-history`,
    },
    {
      label: "Payment History",
      href: `/admin/user-details/${id}/payments-history`,
    },
    {
      label: "Medical History",
      href: `/admin/user-details/${id}/medical-history`,
    },
  ];

  return (
    <div className="flex flex-col gap-2 w-72">
      {menuItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <div
            key={item.href}
            data-state={isActive ? "Active" : "Default"}
            className={clsx(
              "text-base font-semibold leading-normal rounded-lg flex justify-start items-center gap-24",
              isActive
                ? "text-zinc-900 bg-zinc-100"
                : "text-gray-500 bg-neutral-50"
            )}
          >
            <Link className="flex px-4 py-2 w-full" href={item.href}>
              {item.label}
            </Link>
          </div>
        );
      })}
    </div>
  );
};
