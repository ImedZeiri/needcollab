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
  const creator_id = url.searchParams.get('creator_id');

  try {
    switch (method) {
      case 'GET': {
        let query = supabase.from('needs').select('*, creator:profiles(full_name, avatar_url)');
        if (id) {
          const { data, error } = await query.eq('id', id).single();
          if (error) throw error;
          return new Response(JSON.stringify(data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 });
        }
        if (creator_id) query = query.eq('creator_id', creator_id);
        query = query.order('created_at', { ascending: false });
        const { data, error } = await query;
        if (error) throw error;
        return new Response(JSON.stringify(data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 });
      }

      case 'POST': {
        const postBody = await req.json();
        // Ensure profile exists for creator_id before insert
        if (postBody.creator_id) {
          await supabase.from('profiles').upsert(
            { id: postBody.creator_id, email: postBody._email || null, full_name: postBody._name || null },
            { onConflict: 'id', ignoreDuplicates: true }
          );
          delete postBody._email;
          delete postBody._name;
        }
        const { data, error } = await supabase.from('needs').insert(postBody).select('*, creator:profiles(full_name, avatar_url)');
        if (error) throw error;
        return new Response(JSON.stringify(data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 201 });
      }

      case 'PUT': {
        const putBody = await req.json();
        const { data, error } = await supabase.from('needs').update(putBody).eq('id', id).select('*, creator:profiles(full_name, avatar_url)');
        if (error) throw error;
        return new Response(JSON.stringify(data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 });
      }

      case 'DELETE': {
        const { error } = await supabase.from('needs').delete().eq('id', id);
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
