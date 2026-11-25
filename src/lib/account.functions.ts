import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { DELETE_CONFIRMATION } from "@/lib/account-rules";

/** Deletes the caller's own account immediately. The user id comes from the verified session, never from input. */
export const deleteMyAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { confirmation: string }) => {
    if (input?.confirmation !== DELETE_CONFIRMATION) throw new Error("Confirmação inválida.");
    return input;
  })
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await supabase.from("lesson_progress").delete().eq("user_id", userId);
    await supabase.from("quiz_results").delete().eq("user_id", userId);
    const { data: files } = await supabase.storage.from("avatars").list(userId);
    if (files?.length) {
      await supabase.storage.from("avatars").remove(files.map((f) => `${userId}/${f.name}`));
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (error) {
      console.error("deleteUser failed", error.message);
      throw new Error("Não foi possível excluir a conta.");
    }
    return { ok: true };
  });
