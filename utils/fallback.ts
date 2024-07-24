import { SupabaseClient } from '@supabase/supabase-js';

const expiry = Math.floor(
  (new Date().getTime() + 14 * 24 * 60 * 60 * 1000) / 1000
);

export const getFallbackImageUrl = async (supabase: SupabaseClient) => {
  const { data, error } = await supabase.storage.from('images').createSignedUrl(`fallback.png`, expiry);
  return data?.signedUrl;
};