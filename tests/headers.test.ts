import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

interface Header {
  key: string
  value: string
}
const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf-8')) as {
  headers: { source: string; headers: Header[] }[]
}
const headers = Object.fromEntries(config.headers.find((h) => h.source === '/(.*)')!.headers.map((h) => [h.key, h.value]))
const csp = Object.fromEntries(
  headers['Content-Security-Policy'].split(';').map((d) => {
    const [name, ...values] = d.trim().split(/\s+/)
    return [name, values]
  }),
) as Record<string, string[]>

describe('vercel.json: заголовки безопасности', () => {
  it('заданы обязательные заголовки', () => {
    for (const key of [
      'Content-Security-Policy',
      'Strict-Transport-Security',
      'X-Content-Type-Options',
      'X-Frame-Options',
      'Referrer-Policy',
      'Permissions-Policy',
      'Cross-Origin-Opener-Policy',
    ]) {
      expect(headers[key], key).toBeTruthy()
    }
  })

  it('CSP: скрипты только со своего домена, без unsafe-inline/unsafe-eval', () => {
    expect(csp['script-src']).toEqual(["'self'"])
    expect(headers['Content-Security-Policy']).not.toContain("'unsafe-eval'")
    expect(csp['style-src']).toEqual(["'self'"])
  })

  it('CSP: закрыты плагины, чужие <base>, формы наружу и встраивание сайта', () => {
    expect(csp['object-src']).toEqual(["'none'"])
    expect(csp['base-uri']).toEqual(["'self'"])
    expect(csp['form-action']).toEqual(["'self'"])
    expect(csp['frame-ancestors']).toEqual(["'none'"])
    expect(csp['default-src']).toEqual(["'self'"])
  })

  it('CSP: единственный внешний источник — YouTube (nocookie) для iframe', () => {
    expect(csp['frame-src']).toEqual(['https://www.youtube-nocookie.com'])
    for (const [name, values] of Object.entries(csp)) {
      if (name === 'frame-src') continue
      expect(values.filter((v) => v.startsWith('http')), name).toEqual([])
    }
  })

  it('Permissions-Policy отключает камеру, микрофон и геолокацию', () => {
    for (const f of ['camera=()', 'microphone=()', 'geolocation=()']) expect(headers['Permissions-Policy']).toContain(f)
  })
})
