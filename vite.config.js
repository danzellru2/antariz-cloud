import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";
import handler from "./api/send.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  
  // Hacer que la API Key esté disponible en el backend local
  process.env.RESEND_API_KEY = env.RESEND_API_KEY;

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "serverless-mock",
        configureServer(server) {
          // Middleware para interceptar /api/send y ejecutar directamente api/send.js en local
          server.middlewares.use(async (req, res, next) => {
            if (req.url === "/api/send" && req.method === "POST") {
              let body = "";
              req.on("data", (chunk) => {
                body += chunk;
              });
              req.on("end", async () => {
                try {
                  req.body = JSON.parse(body);
                } catch (e) {
                  req.body = {};
                }

                // Simular el objeto Response de Express/Vercel
                const mockRes = {
                  setHeader(name, value) {
                    res.setHeader(name, value);
                  },
                  status(code) {
                    res.statusCode = code;
                    return this;
                  },
                  json(data) {
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify(data));
                  },
                  end() {
                    res.end();
                  }
                };

                try {
                  await handler(req, mockRes);
                } catch (err) {
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: err.message }));
                }
              });
              return;
            }
            next();
          });
        },
      },
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
