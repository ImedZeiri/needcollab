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
        let query = supabase.from('offers').select('*, vendor:profiles(full_name, vendor_company_name)');
        if (id) query = query.eq('id', id);
        else if (need_id) query = query.eq('need_id', need_id);
        const { data, error } = await query;
        if (error) throw error;
        return new Response(JSON.stringify(data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 });
      }

      case 'POST': {
        const postBody = await req.json();
        // Ensure profile exists for vendor_id before insert
        if (postBody.vendor_id) {
          await supabase.from('profiles').upsert(
            { id: postBody.vendor_id, is_vendor: true, vendor_status: 'verified' },
            { onConflict: 'id', ignoreDuplicates: true }
          );
        }
        const { data, error } = await supabase.from('offers').insert(postBody).select('*, vendor:profiles(full_name, vendor_company_name)');
        if (error) throw error;
        return new Response(JSON.stringify(data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 201 });
      }

      case 'PUT': {
        const putBody = await req.json();
        const { data, error } = await supabase.from('offers').update(putBody).eq('id', id).select('*, vendor:profiles(full_name, vendor_company_name)');
        if (error) throw error;
        return new Response(JSON.stringify(data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 });
      }

      case 'DELETE': {
        const { error } = await supabase.from('offers').delete().eq('id', id);
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
