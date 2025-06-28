# Fast MCP Example

This project demonstrates a simple API in TypeScript using Express and PostgreSQL. It stores prompts and their responses so that previous context can influence future requests.

## Setup
1. Install dependencies (requires Node 18 and npm):
   ```bash
   npm install
   ```
2. Provide a `.env` file with a `DATABASE_URL` connection string.
3. Build and start the server:
   ```bash
   npm run build
   npm start
   ```

The API exposes `/prompts` where you can `POST` new prompts and `GET` stored prompts.
