import Link from '@docusaurus/Link';
import React from 'react';

import styles from './styles.module.scss';

export default function CallingSection() {
  const gift = 'GIFT';
  return (
    <div className={styles.bgColor}>
      <div className="container">
        <div className={styles.header}>
          <h2>Calling developers, architects, and builders of all levels</h2>
          <p>
            Meet with our team to hear what’s ahead for AI-native applications,
            explore hands-on demos<br></br> and learn more about the power of
            Weaviate on Google Cloud.
          </p>
        </div>
        <div className={styles.features}>
          <div className={styles.box}>
            <div className={styles.icon1}></div>
            <h4 className={styles.title}>
              Attend our session with GCP on April 11!
            </h4>
            <p className={styles.subTitle}>
              Don’t miss our CEO, Bob van Luijt’s joint session with Google
              Cloud,{' '}
              <Link
                className={styles.eventLink}
                to="https://cloud.withgoogle.com/next?session=OPS209"
              >
                From RAG to autonomous apps with Weaviate and Gemini on Google
                Kubernetes Engine
              </Link>{' '}
              on April 11 at 10:15am PT.
            </p>
          </div>
          <div className={styles.box}>
            <div className={styles.icon2}></div>
            <h4 className={styles.title}>Meet with us</h4>
            <p className={styles.subTitle}>
              Book time to meet 1:1 with our team to learn about Weaviate and
              explore our latest offerings.{' '}
              <a className={styles.requestLink} href="#meetingForm">
                Request a time to meet
              </a>{' '}
              and we’ll get back to you to confirm your attendance.
            </p>
          </div>
        </div>
        <div id="meetForm"></div>
      </div>
    </div>
  );
}
