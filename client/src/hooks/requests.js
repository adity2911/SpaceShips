const api_url = 'http://localhost:8000';

async function httpGetPlanets() {
  const response = await fetch(`${api_url}/planets`);
  return await response.json();
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const planetNames = await fetch(`${api_url}/launches`);
  const planets = await planetNames.json();
  return planets.sort((a, b) => a.launchDate - b.launchDate);
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${api_url}/launches`, {
      "method": "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch)
    });
  } catch (e) {
    return {
      ok: false,
    };
  }
}

// TODO: Once API is ready.
async function httpAbortLaunch(id) {
  try {
    return await fetch(`${api_url}/launches/${id}`, { "method": "delete", });
  } catch (e) {
    return {
      ok: false,
    };
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};