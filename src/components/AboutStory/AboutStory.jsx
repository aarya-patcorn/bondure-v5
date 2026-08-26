"use client";

import "./AboutStory.css";

export default function AboutStory() {
  return (
    <section className="about-story" aria-labelledby="about-story-title">
      <div className="about-story__wave" aria-hidden="true" />

      <div className="container about-story__container">
        <div className="about-story__grid">
          <div className="about-story__copy">
            <h2 className="about-story__title" id="about-story-title">
              Our story
            </h2>

            <div className="about-story__body">
              <p>
                Long ago and far away, in{" "}
                <mark className="about-story__highlight">Germany</mark>, a young Dr. Elias Weber stood at a
                construction site, watching workers mix cement. While everyone else saw grey powder, he saw
                chemistry — and he was hooked.
              </p>
              <p>
                He became fascinated by one question:{" "}
                <em className="about-story__emphasis">what actually makes things hold together?</em> He studied
                the science of cement, the behaviour of binders, the invisible forces at work in every wall and
                floor. But the deeper he went, the more he kept wondering,{" "}
                <em className="about-story__emphasis">
                  &ldquo;Why do tiles crack and lift after just a few years?&rdquo;
                </em>{" "}
                and{" "}
                <em className="about-story__emphasis">
                  &ldquo;If cement was invented over a century ago... why hasn&apos;t bonding evolved since?&rdquo;
                </em>
              </p>
              <p>
                So, he went beyond cement. Back in his lab, Dr. Weber turned to the chemistry of adhesives —
                testing formulation after formulation, failing, learning, and testing again.
              </p>
            </div>
          </div>

          <figure className="about-story__map">
            <img
              src="/about-story/germany-map.svg"
              alt="Map of Europe with Germany highlighted, where Bondure's story began"
            />
          </figure>

          <div className="about-story__aside">
            <div className="about-story__body">
              <p>
                Then came the eureka moment. After years of failed prototypes, he perfected an adhesive recipe
                that didn&apos;t just stick — it bonded at the molecular level. Builders who tried it
                wouldn&apos;t go back. They started asking,{" "}
                <em className="about-story__emphasis">&ldquo;Hey... can we get more of this?&rdquo;</em>
              </p>
              <p>And Bondure was born.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
