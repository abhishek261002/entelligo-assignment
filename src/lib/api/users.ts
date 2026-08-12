import type {
  User,
  DummyUser,
  PlaceholderUser,
  DummyJSONResponse,
} from "@/types/user";

// ─── Constants ────────────────────────────────────────────────────────────────

const DUMMYJSON_BASE = "https://dummyjson.com";
const PLACEHOLDER_BASE = "https://jsonplaceholder.typicode.com";
const FETCH_TIMEOUT_MS = 10_000;

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Fetch with an AbortController timeout */
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      next: { revalidate: 300 }, // ISR: revalidate every 5 min
    });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

/** Map a DummyJSON user → normalised User */
function normaliseDummyUser(u: DummyUser): User {
  return {
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName,
    fullName: `${u.firstName} ${u.lastName}`,
    email: u.email,
    phone: u.phone,
    username: u.username,
    avatar: u.image,
    role: u.role ?? "user",
    company: u.company?.name ?? "",
    department: u.company?.department ?? "",
    jobTitle: u.company?.title ?? "",
    city: u.address?.city ?? "",
    address: u.address?.address ?? "",
    postalCode: u.address?.postalCode ?? "",
    country: u.address?.country ?? "",
    age: u.age,
    birthDate: u.birthDate,
    bloodGroup: u.bloodGroup,
    crypto: u.crypto,
    bank: u.bank,
    ein: u.ein,
    ssn: u.ssn,
  };
}

/** Map a JSONPlaceholder user → normalised User */
function normalisePlaceholderUser(u: PlaceholderUser): User {
  const [firstName = "", ...rest] = u.name.split(" ");
  const lastName = rest.join(" ");
  return {
    id: u.id,
    firstName,
    lastName,
    fullName: u.name,
    email: u.email,
    phone: u.phone,
    username: u.username,
    avatar: `https://i.pravatar.cc/150?u=${u.email}`,
    role: "user",
    company: u.company?.name ?? "",
    department: "",
    jobTitle: u.company?.catchPhrase ?? "",
    city: u.address?.city ?? "",
    address: `${u.address?.street ?? ""}, ${u.address?.suite ?? ""}`,
    postalCode: u.address?.zipcode ?? "",
    country: "USA",
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────

/** Fetch all users — tries DummyJSON first, falls back to JSONPlaceholder */
export async function fetchAllUsers(): Promise<User[]> {
  try {
    const res = await fetchWithTimeout(
      `${DUMMYJSON_BASE}/users?limit=100&select=id,firstName,lastName,email,phone,username,image,role,company,address,age`
    );

    if (!res.ok) {
      throw new Error(`DummyJSON responded with HTTP ${res.status}`);
    }

    const data = (await res.json()) as DummyJSONResponse;
    return data.users.map(normaliseDummyUser);
  } catch (primaryError) {
    console.warn("DummyJSON failed, falling back to JSONPlaceholder:", primaryError);

    const res = await fetchWithTimeout(`${PLACEHOLDER_BASE}/users`);
    if (!res.ok) {
      throw new Error(`JSONPlaceholder responded with HTTP ${res.status}`);
    }

    const data = (await res.json()) as PlaceholderUser[];
    return data.map(normalisePlaceholderUser);
  }
}

/** Fetch a single user by id — tries DummyJSON first, falls back */
export async function fetchUserById(id: number): Promise<User> {
  try {
    const res = await fetchWithTimeout(`${DUMMYJSON_BASE}/users/${id}`);

    if (res.status === 404) {
      throw new Error("USER_NOT_FOUND");
    }
    if (!res.ok) {
      throw new Error(`DummyJSON responded with HTTP ${res.status}`);
    }

    const data = (await res.json()) as DummyUser;
    return normaliseDummyUser(data);
  } catch (primaryError) {
    if ((primaryError as Error).message === "USER_NOT_FOUND") {
      throw primaryError;
    }

    console.warn("DummyJSON failed for user detail, falling back:", primaryError);

    const res = await fetchWithTimeout(`${PLACEHOLDER_BASE}/users/${id}`);
    if (res.status === 404) {
      throw new Error("USER_NOT_FOUND");
    }
    if (!res.ok) {
      throw new Error(`JSONPlaceholder responded with HTTP ${res.status}`);
    }

    const data = (await res.json()) as PlaceholderUser;
    return normalisePlaceholderUser(data);
  }
}
