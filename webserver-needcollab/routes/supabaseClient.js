const fetch = require('node-fetch');

const SUPABASE_URL = 'https://iogwknftoxufdyqgdksd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvZ3drbmZ0b3h1ZmR5cWdka3NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5NTg4NjgsImV4cCI6MjA4OTUzNDg2OH0.YmwIJzl0XTogDFpmwIY8OpAUOho2G_qQQeNIcrfJGmc';

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
  const data = await response.json();
  return { data, status: response.status };
}

module.exports = { callEdgeFunction };
