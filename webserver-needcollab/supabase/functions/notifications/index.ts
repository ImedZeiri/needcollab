import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  const { method } = req;
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  const user_id = url.searchParams.get('user_id');

  try {
    switch (method) {
      case 'GET': {
        let query = supabase.from('notifications').select('*').order('created_at', { ascending: false });
        if (id) query = query.eq('id', id);
        else if (user_id) query = query.eq('user_id', user_id);
        const { data: getResult, error: getError } = await query;
        if (getError) throw getError;
        return new Response(JSON.stringify(getResult), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 });
      }

      case 'POST':
        const postBody = await req.json();
        const { data: postResult, error: postError } = await supabase.from('notifications').insert(postBody).select();
        if (postError) throw postError;
        return new Response(JSON.stringify(postResult), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 201 });

      case 'PUT':
        const putBody = await req.json();
        const { data: putResult, error: putError } = await supabase.from('notifications').update(putBody).eq('id', id).select();
        if (putError) throw putError;
        return new Response(JSON.stringify(putResult), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 });

      case 'DELETE':
        const { error: deleteError } = await supabase.from('notifications').delete().eq('id', id);
        if (deleteError) throw deleteError;
        return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 });

      default:
        return new Response('Method not allowed', { headers: corsHeaders, status: 405 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 });
  }
});
