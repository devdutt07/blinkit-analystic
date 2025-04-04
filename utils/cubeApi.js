export async function fetchCubeData(query) {
    // The actual endpoint + token from your environment:
    const CUBEJS_URL = 'https://amaranth-muskox.aws-us-east-1.cubecloudapp.dev/dev-mode/feat/frontend-hiring-task/cubejs-api/v1/load';
    const CUBEJS_TOKEN = 'YOUR_JWT_TOKEN_HERE';
  
    const body = {
      query: query,
      queryType: 'multi'
    };
  
    const res = await fetch(CUBEJS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${CUBEJS_TOKEN}`
      },
      body: JSON.stringify(body)
    });
    const json = await res.json();
  
    return json.results;
  }
  