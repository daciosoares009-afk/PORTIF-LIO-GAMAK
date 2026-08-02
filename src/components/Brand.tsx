export function Brand() {
  return (
    <a className="brand" href="#inicio" aria-label="GAMAK — voltar ao início">
      <span className="brand-logo-crop" aria-hidden="true">
        <img
          src="/images/brand/gamak-logo-640.webp"
          srcSet="/images/brand/gamak-logo-640.webp 640w, /images/brand/gamak-logo-1200.webp 1200w"
          sizes="(max-width: 380px) 162px, 218px"
          alt=""
          width="1734"
          height="907"
        />
      </span>
    </a>
  )
}
