"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Provider } from "@supabase/supabase-js";

const signInWith = (provider: Provider) => async () => {
  const supabase = await createClient();

  // Ensure SITE_URL is defined, otherwise fallback to localhost or handle error
  const auth_callback_url = `${process.env.SITE_URL}/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callback_url,
    },
  });

  console.log({ data });

  if (error) {
    throw new Error(error.message);
  }

  // TypeScript requires us to verify data.url is not null before passing it to redirect
  if (data.url) {
    redirect(data.url);
  }
};

const signInWithGoogle = signInWith("google");
