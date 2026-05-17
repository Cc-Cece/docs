import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig, i18n} = useDocusaurusContext();
  const isZh = i18n.currentLocale === 'zh-CN';

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">
          {isZh
            ? 'Prism-Committee 的项目文档、开发笔记与技术记录。'
            : siteConfig.tagline}
        </p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/intro">
            {isZh ? '鏌ョ湅鏂囨。鍏ュ彛' : 'Open Docs'}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig, i18n} = useDocusaurusContext();
  const isZh = i18n.currentLocale === 'zh-CN';

  return (
    <Layout
      title={siteConfig.title}
      description={
        isZh
          ? 'Prism-Committee 的项目文档与技术笔记。'
          : 'Project documentation and technical notes by Prism-Committee.'
      }>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}


