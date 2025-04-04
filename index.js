import { createTransport } from "@smithery/sdk/transport.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import WebSocket from "ws"; // ✅ Import WebSocket for Node.js

// ✅ Polyfill WebSocket for Node.js environment
global.WebSocket = WebSocket;

const transport = createTransport(
  "https://server.smithery.ai/@smithery-ai/server-sequential-thinking",
  {},
  "50cdc465-0002-4f20-8dcc-9ea9f5a41856"
);

(async () => {
  try {
    const client = new Client({
      name: "Test client",
      version: "1.0.0"
    });
    console.log(transport);

    await client.connect(transport);
    console.log("Connecting to transport...");

    const tools = await client.listTools();
    console.log(tools["tools"]);
    console.log(`Available tools: ${tools["tools"].map(t => t.name).join(", ")}`);

    // Call the tool with error handling
    const result = await client.callTool("sequentialthinking", { 
      thought: "Hello, starting analysis...", 
      next_thought_needed: true,
      thought_number: 1,
      total_thoughts: 5,
      is_revision: false,
      revises_thought: null, 
      branch_from_thought: null,
      branch_id: null,
      needs_more_thoughts: false 
    });
    console.log(result);
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();