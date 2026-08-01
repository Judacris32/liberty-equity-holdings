import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "@/components/settings/profile-form";
import { PasswordForm } from "@/components/settings/password-form";
import { DangerZone } from "@/components/settings/danger-zone";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const fullName = (user?.user_metadata?.full_name as string | undefined) ?? "";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-[rgb(var(--foreground))]">Settings</h1>
        <p className="mt-1 text-sm text-[rgb(var(--muted))]">
          Manage your profile and account security.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ProfileForm email={user?.email ?? ""} defaultFullName={fullName} />
        <PasswordForm />
      </div>

      <DangerZone />
    </div>
  );
}
