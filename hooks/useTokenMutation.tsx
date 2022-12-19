import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";
import { useMutation } from "@tanstack/react-query";

export function useTokenMutation() {
  return useMutation(
    async ({
      auth,
      type,
    }: {
      auth: SupabaseAuthClient;
      type: "set" | "remove";
    }) => {
      switch (type) {
        case "set":
          const session = await auth.getSession();
          if (session.error) {
            throw new Error(session.error.message);
          }
          localStorage.setItem("token", session.data.session?.access_token);
          break;
        case "remove":
          localStorage.removeItem("token");
      }
    }
  );
}
