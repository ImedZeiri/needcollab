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
  const need_id = url.searchParams.get('need_id');

  try {
    switch (method) {
      case 'GET': {
        let query = supabase.from('collaborations').select('*, need:needs(title, status), user:profiles(full_name, avatar_url)');
        if (id) query = query.eq('id', id);
        else if (need_id) query = query.eq('need_id', need_id);
        const { data, error } = await query;
        if (error) throw error;
        return new Response(JSON.stringify(data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 });
      }

      case 'POST': {
        const postBody = await req.json();
        const { data, error } = await supabase.from('collaborations').insert(postBody).select('*, need:needs(title, status), user:profiles(full_name, avatar_url)');
        if (error) throw error;
        return new Response(JSON.stringify(data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 201 });
      }

      case 'PUT': {
        const putBody = await req.json();
        const { data, error } = await supabase.from('collaborations').update(putBody).eq('id', id).select('*, need:needs(title, status), user:profiles(full_name, avatar_url)');
        if (error) throw error;
        return new Response(JSON.stringify(data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 });
      }

      case 'DELETE': {
        const { error } = await supabase.from('collaborations').delete().eq('id', id);
        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 });
      }

      default:
        return new Response('Method not allowed', { headers: corsHeaders, status: 405 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 });
  }
});
