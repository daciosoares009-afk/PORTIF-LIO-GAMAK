export function Brand() {
  return (
    <a className="brand" href="#inicio" aria-label="GAMAK — voltar ao início">
      <span className="brand-logo-crop" aria-hidden="true">
        <img
          src="/images/brand/gamak-logo-header-480.webp"
          srcSet="/images/brand/gamak-logo-header-480.webp 480w, /images/brand/gamak-logo-header-960.webp 960w"
          sizes="(max-width: 600px) 155px, (max-width: 1160px) 195px, 220px"
          alt=""
          width="960"
          height="269"
          fetchPriority="high"
          decoding="async"
        />
      </span>
    </a>
  )
}
