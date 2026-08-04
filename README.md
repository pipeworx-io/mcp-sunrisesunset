# mcp-sunrisesunset

Sunrise-Sunset MCP — wraps the sunrisesunset.io API (free, no auth)

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `get_times` | Get today's sunrise, sunset, dawn, dusk, solar noon, golden hour, and day length for a given latitude and longitude. Returns all times in the location's local timezone. |
| `get_times_date` | Get sunrise, sunset, dawn, dusk, solar noon, and golden hour times for a specific date at a location. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "sunrisesunset": {
      "url": "https://gateway.pipeworx.io/sunrisesunset/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Sunrisesunset data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
