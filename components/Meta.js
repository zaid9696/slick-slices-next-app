import Head from 'next/head'

const Meta = ({ children,mainTitle, title ,keywords, description, location, image }) => {
  return (
    <Head>
     {/* <html lang="en"/>*/}
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='keywords' content={keywords} />
      <meta name='description' content={description} />
      <meta charSet='utf-8' />
      {location && <meta property={"og:url"} content={location.href} />}
      <meta property="og:image" content={image || '/logo.svg'} />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:site_name" content={mainTitle} key="ogsitename" />
      <meta property="og:description" content={description} key="ogdesc" />
      <link rel='icon' type="image/svg+xml" href='/favicon.svg' />
      <link rel='alernate icon' href='/favicon.ico' />
      <title>{title ? `${title} - ` : ""}{mainTitle}</title>
      {children}
    </Head>
  )
}

Meta.defaultProps = {
  mainTitle: 'Slick Slices',
  keywords: 'Pizza, restraunt',
  description: 'The best Pizza Place in Hamilton',
}

export default Meta