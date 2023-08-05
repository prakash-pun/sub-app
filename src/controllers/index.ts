import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_PROJECT_URL || "",
  import.meta.env.VITE_SUPABASE_PUBLIC_KEY || ""
);

export const registerUser = async ({
  username,
  email,
}: {
  username: string;
  email: string;
}) => {
  const { data, error } = await supabase
    .from("users")
    .insert({ username: username, email: email })
    .select();

  return { data, error };
};
