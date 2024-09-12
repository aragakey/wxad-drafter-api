export const dynamic = "force-dynamic" // 默认是静态，除非读取请求

export function OPTIONS(request: Request) {
  const response = new Response(null, {
    status: 204, // No Content
  })

  // 设置 CORS 头信息
  response.headers.set("Access-Control-Allow-Origin", "*") // 允许所有域名访问
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS") // 允许的请求方法
  response.headers.set("Access-Control-Allow-Headers", "Content-Type") // 允许的请求头

  return response
}

export function GET(request: Request) {
  const response = new Response(`Hello from ${process.env.VERCEL_REGION}`)

  // 设置 CORS 头信息
  response.headers.set("Access-Control-Allow-Origin", "*") // 允许所有域名访问
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS") // 允许的请求方法
  response.headers.set("Access-Control-Allow-Headers", "Content-Type") // 允许的请求头

  return response
}

export const runtime = "nodejs"
