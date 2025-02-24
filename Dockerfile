FROM registry.cn-shanghai.aliyuncs.com/fisschl/bun:latest AS builder
WORKDIR /root
COPY bun.lock .
COPY package.json .
RUN bun install --production
COPY . .
RUN bun run build

FROM registry.cn-shanghai.aliyuncs.com/fisschl/bun:latest AS runner
WORKDIR /root
COPY --from=builder /root/public ./public
COPY --from=builder /root/.next/standalone ./
COPY --from=builder /root/.next/static ./.next/static
CMD bun server.js
