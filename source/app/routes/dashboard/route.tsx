import { Outlet } from "@remix-run/react";
import { DashboardLayout } from "~/shared/components/layout/Dashboard";

export default function DashBoardLayout() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
