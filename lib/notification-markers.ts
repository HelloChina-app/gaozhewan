import { get, put } from "@vercel/blob";

type NotificationMarker = {
  createdAt: string;
  key: string;
  v: 1;
};

function markerPath(key: string) {
  return `notifications/${key.replace(/[^a-zA-Z0-9/_-]/g, "-")}.json`;
}

export async function notificationAlreadySent(key: string) {
  const result = await get(markerPath(key), { access: "private" });
  return Boolean(result && result.statusCode === 200);
}

export async function markNotificationSent(key: string) {
  const marker: NotificationMarker = {
    createdAt: new Date().toISOString(),
    key,
    v: 1
  };

  try {
    await put(markerPath(key), JSON.stringify(marker), {
      access: "private",
      addRandomSuffix: false,
      contentType: "application/json"
    });
  } catch (error) {
    if (await notificationAlreadySent(key)) return;
    throw error;
  }
}
