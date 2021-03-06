import { Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface PropTypes {
  children: JSX.Element;
  title?: string;
  url?: string;
  image?: string;
  description?: string;
}

const Seo = ({
    children,
    title,
    url,
    image,
    description,
}: PropTypes) => {
    const router = useRouter();
    const { pathname } = router;

    return (
        <Fragment>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <meta name="author" content="Shalom Effiom" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />

                <meta property="og:title" content={title || `Welcome | RepꙨꙨs 🧑‍🚀`} />
                <meta property="og:description" content={description || `Your one-stop page for popular repos`} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={url || `https://repoos.vercel.app/${pathname}`} />
                <meta property="og:image" content={image || `https://repoos.vercel.app/preview.png`} />
                <meta property="og:site_name" content="RepꙨꙨs 🧑‍🚀" />
                <meta property="og:locale" content="en_US" />

                <link rel="shortcut icon" type="image/png" href="/favicon.ico" />

                <title>{title || `Welcome | RepꙨꙨs 🧑‍🚀`}</title>
            </Head>

            {children}

        </Fragment>
    );
};

export default Seo;
