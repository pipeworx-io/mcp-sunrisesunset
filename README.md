# mcp-sunrisesunset

MCP server for sunrise and sunset times via [sunrisesunset.io](https://sunrisesunset.io/). Free, no auth required.

## Tools

| Tool | Description |
|------|-------------|
| `get_times` | Get today's sunrise, sunset, dawn, dusk, solar noon, and golden hour |
| `get_times_date` | Get sun times for a specific date at a location |

## Quickstart (Pipeworx Gateway)

```bash
curl -X POST https://gateway.pipeworx.io/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "sunrisesunset_get_times",
      "arguments": { "lat": 40.7128, "lng": -74.006 }
    },
    "id": 1
  }'
```

## License

MIT
