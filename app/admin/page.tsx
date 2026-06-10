import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Admin",
  "Green Hub Assam Tea admin dashboard for inquiries and products.",
  "/admin"
);

export default function AdminPage() {
  return <AdminDashboard />;
}
