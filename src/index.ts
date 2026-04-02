/**
 * Sunrise-Sunset MCP — wraps the sunrisesunset.io API (free, no auth)
 *
 * Tools:
 * - get_times: Get sunrise/sunset times for today at a given lat/lng
 * - get_times_date: Get sunrise/sunset times for a specific date at a given lat/lng
 */

interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

const BASE_URL = 'https://api.sunrisesunset.io';

// --- Raw API types ---

type SunTimes = {
  sunrise: string;
  sunset: string;
  first_light: string;
  last_light: string;
  dawn: string;
  dusk: string;
  solar_noon: string;
  golden_hour: string;
  day_length: string;
  timezone: string;
  utc_offset: number;
};

type ApiResponse = {
  results: SunTimes;
  status: string;
};

// --- Tool definitions ---

const tools: McpToolExport['tools'] = [
  {
    name: 'get_times',
    description:
      "Get today's sunrise, sunset, dawn, dusk, solar noon, and golden hour times for a location.",
    inputSchema: {
      type: 'object',
      properties: {
        lat: { type: 'number', description: 'Latitude of the location (e.g., 40.7128)' },
        lng: { type: 'number', description: 'Longitude of the location (e.g., -74.0060)' },
      },
      required: ['lat', 'lng'],
    },
  },
  {
    name: 'get_times_date',
    description:
      'Get sunrise, sunset, dawn, dusk, solar noon, and golden hour times for a specific date at a location.',
    inputSchema: {
      type: 'object',
      properties: {
        lat: { type: 'number', description: 'Latitude of the location (e.g., 40.7128)' },
        lng: { type: 'number', description: 'Longitude of the location (e.g., -74.0060)' },
        date: {
          type: 'string',
          description: 'Date in YYYY-MM-DD format (e.g., "2024-06-21")',
        },
      },
      required: ['lat', 'lng', 'date'],
    },
  },
];

// --- callTool dispatcher ---

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'get_times':
      return getTimes(args.lat as number, args.lng as number);
    case 'get_times_date':
      return getTimesDate(args.lat as number, args.lng as number, args.date as string);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

// --- Tool implementations ---

async function fetchSunTimes(lat: number, lng: number, date?: string): Promise<SunTimes> {
  const params = new URLSearchParams({
    lat: String(lat),
    lng: String(lng),
  });
  if (date) params.set('date', date);

  const res = await fetch(`${BASE_URL}/json?${params}`);
  if (!res.ok) throw new Error(`sunrisesunset.io error: ${res.status}`);

  const data = (await res.json()) as ApiResponse;
  if (data.status !== 'OK') throw new Error(`sunrisesunset.io error: status=${data.status}`);

  return data.results;
}

async function getTimes(lat: number, lng: number) {
  const times = await fetchSunTimes(lat, lng);
  return { lat, lng, date: 'today', ...times };
}

async function getTimesDate(lat: number, lng: number, date: string) {
  const times = await fetchSunTimes(lat, lng, date);
  return { lat, lng, date, ...times };
}

export default { tools, callTool } satisfies McpToolExport;
