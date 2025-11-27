# Exa Context API Reference

Complete reference for the Exa Context (Exa Code) API.

## Endpoint

POST https://api.exa.ai/context

## Authentication

Include your API key in the request header:
```
x-api-key: YOUR-EXA-API-KEY
```

Get your API key at: https://dashboard.exa.ai/api-keys

## Request Parameters

### query (required)
- **Type**: string
- **Min Length**: 1 character
- **Max Length**: 2000 characters
- **Description**: Search query to find relevant code snippets

**Example Queries**:
- "use Exa search in python and make sure content is always livecrawled"
- "use correct syntax for vercel ai sdk to call gpt-5 nano asking it how are you"
- "how to set up a reproducible Nix Rust development environment"
- "React hooks for state management examples"
- "authentication patterns in NextJS applications"

### tokensNum (optional)
- **Type**: string | integer
- **Default**: "dynamic"
- **Range**: 50-100000

**Options**:
- `"dynamic"`: Automatically determine optimal response length (recommended)
- `5000`: Good default for most queries
- `10000`: When 5k doesn't provide enough context
- Custom value: Any number between 50-100000

**Token Management Tips**:
- Use "dynamic" for most queries to get optimal, token-efficient responses
- Specify exact token counts when you need precise output length control
- Higher token counts return more comprehensive examples but cost more

## Response Format

```json
{
  "requestId": "req_12345",
  "query": "how to use React hooks for state management",
  "response": "## State Management with useState Hook...\n[formatted code snippets]",
  "resultsCount": 502,
  "costDollars": "0.0025",
  "searchTime": 3112.29,
  "outputTokens": 4805
}
```

## Error Handling

Common error scenarios:
- Missing API key: 401 Unauthorized
- Invalid query: 400 Bad Request
- Rate limit exceeded: 429 Too Many Requests

## Use Cases

The Context API excels at finding practical code examples for:

1. **Framework Usage**: How to use specific frameworks and their features
2. **API Syntax**: Correct syntax for calling APIs and SDKs
3. **Development Setup**: Configuration and setup instructions
4. **Library Implementation**: Real-world usage of libraries
5. **Best Practices**: Common patterns and best practices

## Cost Optimization

- Start with "dynamic" token count
- Use 5000 tokens for standard queries
- Use 10000 tokens only when more context is needed
- Monitor `costDollars` in responses to track usage
