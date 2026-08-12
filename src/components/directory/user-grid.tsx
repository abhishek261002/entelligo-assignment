import { UserCard } from "./user-card";
import type { User } from "@/types/user";

interface UserGridProps {
  users: User[];
}

export function UserGrid({ users }: UserGridProps)  {
  return (
    <section aria-label="User directory grid">
      <ul
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        role="list"
      >
        {users.map((user) => (
          <li key={user.id} role="listitem">
            <UserCard user={user} />
          </li>
        ))}
      </ul>
    </section>
  );
}
