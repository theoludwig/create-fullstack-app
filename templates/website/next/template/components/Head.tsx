import HeadTag from 'next/head'

interface HeadProps {
  title?: string
  image?: string
  description?: string
  url?: string
}

export const Head: React.FC<HeadProps> = (props) => {
  const {
    title = '{{ projectName }}',
    image = '/images/icons/icon-96x96.png',
    description = '{{ projectDescription }}',
    url = 'https://{{ domainName }}/'
  } = props

  return (
    <HeadTag>
      <title>{title}</title>
      <link rel='icon' type='image/png' href={image} />

      {/* Meta Tag */}
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='description' content={description} />
      <meta name='Language' content='en' />
      <meta name='theme-color' content='#27B05E' />

      {/* Open Graph Metadata */}
      <meta property='og:title' content={title} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={url} />
      <meta property='og:image' content={image} />
      <meta property='og:description' content={description} />
      <meta property='og:locale' content='en_EN' />
      <meta property='og:site_name' content={title} />

      {/* Twitter card Metadata */}
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:image:src' content={image} />

      {/* PWA Data */}
      <link rel='manifest' href='/manifest.json' />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='mobile-web-app-capable' content='yes' />
      <link rel='apple-touch-icon' href={image} />
    </HeadTag>
  )
}
