// import Anthropic from "@anthropic-ai/sdk"

// const client = new Anthropic({
//   apiKey: process.env["ANTHROPIC_API_KEY"], // This is the default and can be omitted
// })

import OpenAI from "openai"
export const dynamic = "force-dynamic" // 默认是静态，除非读取请求

export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 204, // No Content
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}

export async function GET(request: Request) {
  const openai = new OpenAI()
  // 获取 query params 的 text 参数
  const text = new URL(request.url).searchParams.get("text")

  // 构建请求的 prompt
  const prompt = `
请你根据我提供的规则对以下文本进行错别字、语法错误以及符号使用的检查。你只需要标出错误并解释原因，而不进行美化或修改。规则列表如下：

1. 中英文之间需要加空格
   错误示例：这是一个example。
   正确示例：这是一个 example。
2. 中文与数字之间需要加空格
   错误示例：这是一个100元的商品。
   正确示例：这是一个 100 元的商品。
3. 每句话的结尾如果没有句号，需要加句号。如果有其他标点符号，句号可以省略
   错误示例：这是一个 example
   正确示例：这是一个 example。
   正确示例：这是一个 example；
4. 标点符号的使用需要符合中文规范
   错误示例：这是一个错误使用半角逗号,和句号的例子.
   正确示例：这是一个正确使用半角逗号，和句号的例子。
5. 引号使用需要符合中文规范
   错误示例：这是一个错误使用‘半角引号’的例子。
   正确示例：这是一个正确使用“半角引号”的例子。
6. 检查错别字
   错误示例：这是一个有错别字的列子。
   正确示例：这是一个没有错别字的例子。
7. 检查句子结构和常见的语法错误（如主谓宾搭配不当）。

文本：${text}
`

  // const message = await client.messages.create({
  //   max_tokens: 1024,
  //   messages: [{ role: "user", content: "hello" }],
  //   model: "claude-3-opus-20240229",
  // })

  // console.log(message.content)

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: "Write a haiku about recursion in programming.",
      },
    ],
  })

  console.log("[yijie]", completion.choices[0].message)

  // 创建新的响应对象并设置 CORS 头信息
  const corsResponse = new Response(completion.choices[0].message.content, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // 允许所有域名访问
      "Access-Control-Allow-Methods": "POST, OPTIONS", // 允许的请求方法
      "Access-Control-Allow-Headers": "Content-Type", // 允许的请求头
    },
  })

  return corsResponse
}

export const runtime = "nodejs"
