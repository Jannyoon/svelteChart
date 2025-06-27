import type { Handle } from "@sveltejs/kit";

export const handle:Handle = async ({event, resolve}) => {
  if (event.url.pathname === '/.well-known/appspecific/com.chrome.devtools.json') {
    // (1) 여기서 끝내면, DevTools는 204/200 응답 받고 만족
    return new Response('{}', { status: 200 });
  }

  // (2) 나머지 요청은 평소처럼 진행
  return resolve(event);
};