const fetch = require('node-fetch');

const SUPABASE_URL = 'https://iwojzczrbozwfqulfwsa.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3b2p6Y3pyYm96d2ZxdWxmd3NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5NTc5MDEsImV4cCI6MjA4OTUzMzkwMX0.zt_Ds0rv52lqX6d7emmcWhz13q9k6T9_wSlbigsaTxg';

async function callEdgeFunction(functionName, method, body = null, queryParams = {}) {
  const url = new URL(`${SUPABASE_URL}/functions/v1/${functionName}`);
  Object.keys(queryParams).forEach(key => queryParams[key] && url.searchParams.append(key, queryParams[key]));

  const options = {
    method,
    headers: {
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };

  if (body && (method === 'POST' || method === 'PUT')) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url.toString(), options);
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    console.error(`Edge function ${functionName} returned non-JSON:`, text.substring(0, 200));
    throw new Error(`Edge function ${functionName} returned non-JSON response (status ${response.status})`);
  }
  return { data, status: response.status };
}

module.exports = { callEdgeFunction };
