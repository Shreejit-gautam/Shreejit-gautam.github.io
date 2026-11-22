export function normalizeHostname(hostname) {
  return hostname.trim().toLowerCase().replace(/\.$/, '').replace(/^www\./, '')
}

export function getSiteHostname() {
  const previewDomain = import.meta.env.DEV && new URLSearchParams(window.location.search).get('previewDomain')
  return normalizeHostname(previewDomain || window.location.hostname)
}
