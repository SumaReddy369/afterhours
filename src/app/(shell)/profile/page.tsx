import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { ProfileLocationControls } from "@/components/profile/ProfileLocationControls";

export const metadata: Metadata = {
  title: "Profile",
  description: "How you show up to people you meet on AfterHours.",
};

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/auth/signin?callbackUrl=/profile");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { preferences: true },
  });
  if (!user) {
    return (
      <div className="card-consumer mx-auto max-w-lg p-8 text-center">
        <p className="font-medium text-ah-ink">We couldn’t load your account.</p>
        <p className="mt-2 text-sm text-ah-muted">Try signing out and back in.</p>
      </div>
    );
  }

  let interests: string[] = [];
  try {
    interests = JSON.parse(user.preferences?.interestsJson ?? "[]") as string[];
  } catch {
    interests = [];
  }

  return (
    <div className="mx-auto max-w-[560px] space-y-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h1 className="font-display text-2xl font-bold text-ah-ink">Profile</h1>
          <p className="mt-1 text-xs text-ah-muted">Shown to people in your plans and chats.</p>
        </div>
        <Link href="/settings" className="text-sm font-medium text-ah-accent hover:underline">
          Settings
        </Link>
      </div>
      <ProfileForm
        initialName={user.name ?? ""}
        initialBio={user.bio ?? ""}
        city={user.city ?? ""}
        interests={interests}
        energy={user.preferences?.energyLevel ?? "MEDIUM"}
        groupStyle={user.preferences?.groupStyle ?? "MIXED"}
      />
      <ProfileLocationControls hasSavedLocation={user.latitude != null && user.longitude != null} />
    </div>
  );
}
