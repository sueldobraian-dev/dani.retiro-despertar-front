FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG SUPABASE_MANAGEMENT_PAT
ARG CLOUDINARY_CLOUD_NAME
ARG CLOUDINARY_CLIENT_ID
ARG CLOUDINARY_CLIENT_SECRET
ARG NEXT_PUBLIC_SHOW_DETAILED_ERRORS

ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV SUPABASE_MANAGEMENT_PAT=$SUPABASE_MANAGEMENT_PAT
ENV CLOUDINARY_CLOUD_NAME=$CLOUDINARY_CLOUD_NAME
ENV CLOUDINARY_CLIENT_ID=$CLOUDINARY_CLIENT_ID
ENV CLOUDINARY_CLIENT_SECRET=$CLOUDINARY_CLIENT_SECRET
ENV NEXT_PUBLIC_SHOW_DETAILED_ERRORS=$NEXT_PUBLIC_SHOW_DETAILED_ERRORS


RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Copiar el output standalone generado por Next.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
