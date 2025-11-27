#!/usr/bin/env python3
"""
Get code context using Exa Context API
Loads API key from .env file in project root or /backend/.env

Usage:
    from scripts.get_code_context import get_code_context

    # Simple usage with dynamic tokens
    result = get_code_context("React hooks for state management")
    print(result["response"])

    # Specify token count
    result = get_code_context("pandas dataframe filtering", tokens_num=5000)
"""
import os
import requests
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env file
# Search strategy:
# 1. First check project root (.env)
# 2. Then check backend/.env
# 3. Walk up directory tree to find either location
current = Path(__file__).resolve()
env_path = None

while current.parent != current:
    # Check for .env at project root first
    root_env = current / '.env'
    if root_env.exists():
        env_path = root_env
        break

    # Then check for backend/.env
    backend_env = current / 'backend' / '.env'
    if backend_env.exists():
        env_path = backend_env
        break

    current = current.parent

# Fallback: try relative paths from script location
if env_path is None:
    script_parent = Path(__file__).parent.parent.parent.parent
    root_env = script_parent / '.env'
    backend_env = script_parent / 'backend' / '.env'

    if root_env.exists():
        env_path = root_env
    elif backend_env.exists():
        env_path = backend_env

if env_path:
    load_dotenv(env_path)

def get_code_context(query: str, tokens_num="dynamic"):
    """
    Search for relevant code context using Exa Context API
    
    Args:
        query (str): Search query (1-2000 characters)
            Examples:
            - "React hooks for state management"
            - "FastAPI async endpoints with dependencies"
            - "pandas dataframe filtering and groupby operations"
        
        tokens_num (str or int): Token limit for response
            - "dynamic": Automatically determine optimal length (default)
            - 5000: Good default for most queries
            - 10000: When 5k doesn't provide enough context
            - Range: 50-100000
    
    Returns:
        dict: API response containing:
            - requestId: Unique request identifier
            - query: Original query
            - response: Formatted code snippets and examples
            - resultsCount: Number of results found
            - costDollars: API call cost
            - searchTime: Time taken in milliseconds
            - outputTokens: Number of tokens in response
    
    Raises:
        ValueError: If EXA_API_KEY not found in .env file
        requests.exceptions.HTTPError: If API call fails
    """
    api_key = os.getenv("EXA_API_KEY")
    if not api_key:
        raise ValueError("EXA_API_KEY not found. Please create a .env file at project root with: EXA_API_KEY=your_key_here")
    
    response = requests.post(
        "https://api.exa.ai/context",
        headers={
            "Content-Type": "application/json",
            "x-api-key": api_key
        },
        json={
            "query": query,
            "tokensNum": tokens_num
        }
    )
    response.raise_for_status()
    
    result = response.json()
    return result

if __name__ == "__main__":
    # Example usage
    import sys

    if len(sys.argv) < 2:
        print("Usage: python get_code_context.py '<query>' [tokens_num]")
        print("\nExamples:")
        print("  python get_code_context.py 'React hooks for state management'")
        print("  python get_code_context.py 'FastAPI async endpoints' 5000")
        sys.exit(1)

    query = sys.argv[1]
    # Convert token argument to int if it's not "dynamic"
    if len(sys.argv) > 2:
        tokens = sys.argv[2]
        if tokens != "dynamic":
            try:
                tokens = int(tokens)
            except ValueError:
                pass
    else:
        tokens = "dynamic"

    print(f"Searching for: {query}")
    print(f"Token limit: {tokens}\n")

    result = get_code_context(query, tokens)
    
    print(f"Results: {result['resultsCount']}")
    print(f"Output tokens: {result['outputTokens']}")
    print(f"Cost: ${result['costDollars']}\n")
    print("=" * 80)
    print(result["response"])

