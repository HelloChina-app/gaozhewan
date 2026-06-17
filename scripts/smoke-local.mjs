const baseUrl = process.env.SMOKE_BASE_URL || "http://localhost:3000";
const paths = [
  "/post",
  "/pricing",
  "/subscribe",
  "/projects",
  "/side-hustles",
  "/tools",
  "/weekly",
  "/api/health",
  "/icon.svg",
  "/manifest.webmanifest",
  "/global-signal-radar.jpg",
  "/sitemap.xml",
  "/robots.txt"
];
const securityHeaders = {
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
  "referrer-policy": "strict-origin-when-cross-origin"
};

async function assertOk(path) {
  const response = await fetch(`${baseUrl}${path}`);

  if (!response.ok) {
    throw new Error(`${path} returned ${response.status}`);
  }

  console.log(`${path} ${response.status}`);
  return response;
}

const homeResponse = await assertOk("/");

for (const [header, expected] of Object.entries(securityHeaders)) {
  const actual = homeResponse.headers.get(header);

  if (actual !== expected) {
    throw new Error(`Expected ${header}=${expected}, received ${actual}`);
  }
}

console.log("security headers ok");

for (const path of paths) {
  await assertOk(path);
}

const subscribeResponse = await fetch(`${baseUrl}/api/subscribe`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    email: "demo@example.com",
    source: "smoke-local",
    interest: "搞选题"
  })
});

if (!subscribeResponse.ok) {
  throw new Error(`/api/subscribe returned ${subscribeResponse.status}`);
}

console.log(`/api/subscribe ${subscribeResponse.status}`);
console.log("Smoke test passed.");
