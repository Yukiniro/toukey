import React from "react";
import styles from "./HomepageFeatures.module.css";
import Feature from "./Feature";

const FeatureList = [
  {
    title: "Easy to Use",
    description:
      "Turkey is built out of pure javascript. It is simple to use by the subscription API that could return a feature to unsubscribe the event."
  },
  {
    title: "Tiny and No-dependence",
    description:
      "Toukey has no dependencies and is tiny (minimum size: 2.81 KB)(Gzipped Size: 1.27 KB)."
  }
];

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomepageFeatures;
