import Account from '@/components/account'
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function AccountPage() {
  const supabase = createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: account } = await supabase
    .from('guests')
    .select()
    .eq('email', user.email)
    .single()


  return <Account user={account} />
}