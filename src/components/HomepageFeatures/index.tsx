import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

function getFeatureList(isZh: boolean): FeatureItem[] {
  return [
    {
      title: isZh ? '项目文档集中管理' : 'Centralized Project Docs',
      Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
      description: isZh ? (
        <>
          统一维护各个项目的使用说明、部署记录和开发笔记，避免信息分散。
        </>
      ) : (
        <>
          Keep usage guides, deployment records, and development notes for all projects in one place.
        </>
      ),
    },
    {
      title: isZh ? '中英双语支持' : 'Bilingual Support',
      Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
      description: isZh ? (
        <>
          站点支持 <code>zh-CN</code> 与 <code>en</code>，方便不同读者快速查阅。
        </>
      ) : (
        <>
          The site supports <code>zh-CN</code> and <code>en</code> for different readers.
        </>
      ),
    },
    {
      title: isZh ? '持续迭代与归档' : 'Continuous Iteration',
      Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
      description: isZh ? (
        <>
          通过 GitHub 持续更新文档，沉淀问题排查经验和版本变更历史。
        </>
      ) : (
        <>
          Continuously update docs through GitHub and archive troubleshooting experience and release history.
        </>
      ),
    },
  ];
}

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  const {i18n} = useDocusaurusContext();
  const isZh = i18n.currentLocale === 'zh-CN';
  const featureList = getFeatureList(isZh);

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {featureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

