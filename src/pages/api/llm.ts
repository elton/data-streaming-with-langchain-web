import type { APIRoute } from "astro";

// 服务端API，接收Prompt后发送给服务端
export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const prompt = await data.get("prompt");

  const response = await fetch("http://localhost:6677/stream_chat/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: prompt }),
  });

  return new Response(response.body.getReader());
};
