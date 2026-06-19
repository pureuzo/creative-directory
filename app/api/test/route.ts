import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return Response.json({ error: 'Missing credentials' }, { status: 400 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { data, error } = await supabase.from('emirates').select('*').limit(5);
    if (error) throw error;
    return Response.json({ success: true, data });
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 500 });
  }
}