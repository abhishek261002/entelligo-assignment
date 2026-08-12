import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Briefcase, MapPin, CreditCard, Shield } from "lucide-react";
import { Container } from "@/components/layout/container";
import { UserProfileHeader } from "@/components/profile/user-profile-header";
import { UserInfoCard } from "@/components/profile/user-info-card";
import { fetchUserById } from "@/lib/api/users";
import type { Metadata } from "next";

interface UserPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: UserPageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const user = await fetchUserById(Number(id));
    return {
      title: user.fullName,
      description: `View ${user.fullName}'s profile information, contact details, and work history.`,
    };
  } catch {
    return {
      title: "User Not Found",
    };
  }
}

export default async function UserPage({ params }: UserPageProps) {
  const { id } = await params;
  const userId = Number(id);

  if (isNaN(userId) || userId < 1) {
    notFound();
  }

  let user;
  try {
    user = await fetchUserById(userId);
  } catch (err) {
    if ((err as Error).message === "USER_NOT_FOUND") {
      notFound();
    }
    throw err; // Re-throw for error boundary
  }

  return (
    <main className="flex-1 py-8">
      <Container>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Directory
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Users
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-slate-900 dark:text-white" aria-current="page">
              {user.fullName}
            </li>
          </ol>
        </nav>

        {/* Back button */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back to Directory
        </Link>

        {/* Profile header */}
        <UserProfileHeader user={user} />

        {/* Info cards grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Work Information */}
          <UserInfoCard
            title="Work Information"
            icon={<Briefcase size={16} />}
            items={[
              { label: "Company", value: user.company },
              { label: "Department", value: user.department },
              { label: "Job Title", value: user.jobTitle },
              { label: "Role", value: user.role },
            ]}
          />

          {/* Contact & Location */}
          <UserInfoCard
            title="Contact & Location"
            icon={<MapPin size={16} />}
            items={[
              {
                label: "Email",
                value: (
                  <a
                    href={`mailto:${user.email}`}
                    className="text-indigo-600 hover:underline dark:text-indigo-400"
                  >
                    {user.email}
                  </a>
                ),
              },
              {
                label: "Phone",
                value: user.phone ? (
                  <a
                    href={`tel:${user.phone}`}
                    className="text-indigo-600 hover:underline dark:text-indigo-400"
                  >
                    {user.phone}
                  </a>
                ) : null,
              },
              { label: "Address", value: user.address },
              { label: "City", value: user.city },
              { label: "Postal Code", value: user.postalCode },
              { label: "Country", value: user.country },
            ]}
          />

          {/* Personal Details */}
          {(user.age || user.birthDate || user.bloodGroup) && (
            <UserInfoCard
              title="Personal Details"
              icon={<Shield size={16} />}
              items={[
                { label: "Age", value: user.age },
                { label: "Birth Date", value: user.birthDate },
                { label: "Blood Group", value: user.bloodGroup },
              ]}
            />
          )}

          {/* Crypto & Banking (if available) */}
          {(user.crypto || user.bank || user.ein || user.ssn) && (
            <UserInfoCard
              title="Financial & Crypto"
              icon={<CreditCard size={16} />}
              items={[
                { label: "Crypto Wallet", value: user.crypto?.wallet, hidden: !user.crypto },
                { label: "Crypto Coin", value: user.crypto?.coin, hidden: !user.crypto },
                { label: "Network", value: user.crypto?.network, hidden: !user.crypto },
                { label: "Card Type", value: user.bank?.cardType, hidden: !user.bank },
                { label: "Card Number", value: user.bank?.cardNumber, hidden: !user.bank },
                { label: "IBAN", value: user.bank?.iban, hidden: !user.bank },
                { label: "EIN", value: user.ein },
                { label: "SSN", value: user.ssn },
              ]}
            />
          )}
        </div>
      </Container>
    </main>
  );
}
