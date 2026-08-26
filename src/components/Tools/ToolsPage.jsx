"use client";

import { useEffect, useMemo, useState } from "react";
import { useLenis } from "lenis/react";

import { useViewTransition } from "@/hooks/useViewTransition";
import { useLocale } from "@/components/LocaleProvider/LocaleProvider";
import {
  aacBags,
  adhesiveBags,
  cleanerDosage,
  getCategory,
  getLocalizedCategories,
  getLocalizedDisclaimer,
  getLocalizedRecommenderBranches,
  getLocalizedRecommenderStepNames,
  getLocalizedTools,
  getTool,
  groutBags,
  plasterBags,
  productsByCategory,
  recommend,
  screedBags,
} from "@/lib/tools-data";

import "./Tools.css";

const CALCULATORS = {
  adhesive: {
    title: "Tile adhesive coverage",
    category: "tile-adhesive",
    fields: [
      { id: "fl", label: "Floor length (ft)", min: 0, step: 0.1, defaultValue: "20" },
      { id: "fw", label: "Floor width (ft)", min: 0, step: 0.1, defaultValue: "15" },
      { id: "bed", label: "Adhesive bed thickness (mm)", min: 1, step: 0.5, defaultValue: "3" },
    ],
    rows: [["fl", "fw"], ["bed"]],
    calculate: (productId, values) =>
      adhesiveBags({
        productId,
        areaSqFt: Number(values.fl) * Number(values.fw),
        bedMm: Number(values.bed),
      }),
    format: (result) => ({
      metric: result.bags,
      unit: "bags",
      label: "Adhesive bags required",
      rows: [
        { label: "Product", value: result.product.name },
        { label: "Area", value: `${result.areaSqFt.toFixed(1)} sq.ft` },
        { label: "Bed thickness", value: `${result.bedMm} mm` },
        { label: "Coverage / bag", value: `${result.coverageSqFtPerBag} sq.ft` },
        { label: "Bag size", value: `${result.product.bagKg} kg` },
        { label: "Waste allowance", value: `${result.wastePercent}%` },
      ],
    }),
  },
  aac: {
    title: "AAC joining estimator",
    category: "aac-joining",
    fields: [
      { id: "fl", label: "Wall length (ft)", min: 0, step: 0.1, defaultValue: "30" },
      { id: "fw", label: "Wall height (ft)", min: 0, step: 0.1, defaultValue: "10" },
      { id: "joint", label: "Joint thickness (mm)", min: 1, step: 0.5, defaultValue: "3" },
    ],
    rows: [["fl", "fw"], ["joint"]],
    calculate: (productId, values) =>
      aacBags({
        productId,
        areaSqFt: Number(values.fl) * Number(values.fw),
        jointMm: Number(values.joint),
      }),
    format: (result) => ({
      metric: result.bags,
      unit: "bags",
      label: "AAC mortar bags required",
      rows: [
        { label: "Product", value: result.product.name },
        { label: "Wall area", value: `${result.areaSqFt.toFixed(1)} sq.ft` },
        { label: "Joint thickness", value: `${result.jointMm} mm` },
        { label: "Coverage / bag", value: `${result.coverageSqFtPerBag} sq.ft` },
        { label: "Bag size", value: `${result.product.bagKg} kg` },
        { label: "Waste allowance", value: `${result.wastePercent}%` },
      ],
    }),
  },
  grout: {
    title: "Grout coverage",
    category: "grout",
    fields: [
      { id: "tl", label: "Tile length (mm)", min: 1, step: 1, defaultValue: "600" },
      { id: "tw", label: "Tile width (mm)", min: 1, step: 1, defaultValue: "600" },
      { id: "joint", label: "Joint width (mm)", min: 0.5, step: 0.5, defaultValue: "3" },
      { id: "depth", label: "Joint depth (mm)", min: 1, step: 0.5, defaultValue: "6" },
      { id: "fl", label: "Floor length (ft)", min: 0, step: 0.1, defaultValue: "20" },
      { id: "fw", label: "Floor width (ft)", min: 0, step: 0.1, defaultValue: "15" },
    ],
    rows: [["tl", "tw"], ["joint", "depth"], ["fl", "fw"]],
    calculate: (productId, values) =>
      groutBags({
        productId,
        areaSqFt: Number(values.fl) * Number(values.fw),
        tileLMm: Number(values.tl),
        tileWMm: Number(values.tw),
        jointMm: Number(values.joint),
        depthMm: Number(values.depth),
      }),
    format: (result) => ({
      metric: result.bags,
      unit: "bags",
      label: "Grout bags required",
      rows: [
        { label: "Product", value: result.product.name },
        { label: "Approx. weight", value: `${result.kg} kg` },
        { label: "Area", value: `${result.areaSqFt.toFixed(1)} sq.ft` },
        { label: "Joint width", value: `${result.jointMm} mm` },
        { label: "Unit size", value: `${result.product.bagKg} kg` },
        { label: "Waste allowance", value: `${result.wastePercent}%` },
      ],
    }),
  },
  screed: {
    title: "Floor screed yield",
    category: "floor-screed",
    fields: [
      { id: "fl", label: "Floor length (ft)", min: 0, step: 0.1, defaultValue: "20" },
      { id: "fw", label: "Floor width (ft)", min: 0, step: 0.1, defaultValue: "15" },
      { id: "th", label: "Screed thickness (mm)", min: 5, step: 1, defaultValue: "40" },
    ],
    rows: [["fl", "fw"], ["th"]],
    calculate: (productId, values) =>
      screedBags({
        productId,
        areaSqFt: Number(values.fl) * Number(values.fw),
        thicknessMm: Number(values.th),
      }),
    format: (result) => ({
      metric: result.bags,
      unit: "bags",
      label: "Screed bags required",
      rows: [
        { label: "Product", value: result.product.name },
        { label: "Approx. weight", value: `${result.kg} kg` },
        { label: "Area", value: `${result.areaSqFt.toFixed(1)} sq.ft` },
        { label: "Thickness", value: `${result.thicknessMm} mm` },
        { label: "Bag size", value: `${result.product.bagKg} kg` },
        { label: "Waste allowance", value: `${result.wastePercent}%` },
      ],
    }),
  },
  plaster: {
    title: "Plaster coverage",
    category: "plaster",
    fields: [
      { id: "fl", label: "Wall length (ft)", min: 0, step: 0.1, defaultValue: "40" },
      { id: "fw", label: "Wall height (ft)", min: 0, step: 0.1, defaultValue: "10" },
      { id: "coat", label: "Coat thickness (mm)", min: 5, step: 1, defaultValue: "12" },
    ],
    rows: [["fl", "fw"], ["coat"]],
    calculate: (productId, values) =>
      plasterBags({
        productId,
        areaSqFt: Number(values.fl) * Number(values.fw),
        coatMm: Number(values.coat),
      }),
    format: (result) => ({
      metric: result.bags,
      unit: "bags",
      label: "Plaster bags required",
      rows: [
        { label: "Product", value: result.product.name },
        { label: "Wall area", value: `${result.areaSqFt.toFixed(1)} sq.ft` },
        { label: "Coat thickness", value: `${result.coatMm} mm` },
        { label: "Coverage / bag", value: `${result.coverageSqMPerBag} m²` },
        { label: "Bag size", value: `${result.product.bagKg} kg` },
        { label: "Waste allowance", value: `${result.wastePercent}%` },
      ],
    }),
  },
  cleaner: {
    title: "Tile cleaner dosage",
    category: "tile-cleaner",
    fields: [
      { id: "fl", label: "Floor length (ft)", min: 0, step: 0.1, defaultValue: "20" },
      { id: "fw", label: "Floor width (ft)", min: 0, step: 0.1, defaultValue: "15" },
    ],
    rows: [["fl", "fw"]],
    calculate: (productId, values) =>
      cleanerDosage({
        productId,
        areaSqFt: Number(values.fl) * Number(values.fw),
      }),
    format: (result) => ({
      metric: result.concentrateL,
      unit: "L",
      label: "Concentrate required",
      rows: [
        { label: "Product", value: result.product.name },
        { label: "Packs needed", value: `${result.packs} × ${result.product.packLitres} L` },
        { label: "Dilution", value: result.dilutionRatio },
        { label: "Area", value: `${result.areaSqFt.toFixed(1)} sq.ft` },
      ],
    }),
  },
};

const DE_UI = {
  "Tile adhesive coverage": "Fliesenkleber-Verbrauch",
  "Floor length (ft)": "Bodenlänge (ft)",
  "Floor width (ft)": "Bodenbreite (ft)",
  "Adhesive bed thickness (mm)": "Kleberbettdicke (mm)",
  bags: "Säcke",
  "Adhesive bags required": "Benötigte Klebersäcke",
  Product: "Produkt",
  Area: "Fläche",
  "Bed thickness": "Bettdicke",
  "Coverage / bag": "Ergiebigkeit / Sack",
  "Bag size": "Sackgröße",
  "Waste allowance": "Verschnittzuschlag",
  "AAC joining estimator": "Porenbeton-Fugenmörtel-Rechner",
  "Wall length (ft)": "Wandlänge (ft)",
  "Wall height (ft)": "Wandhöhe (ft)",
  "Joint thickness (mm)": "Fugendicke (mm)",
  "AAC mortar bags required": "Benötigte Porenbeton-Mörtelsäcke",
  "Wall area": "Wandfläche",
  "Joint thickness": "Fugendicke",
  "Grout coverage": "Fugenmörtel-Verbrauch",
  "Tile length (mm)": "Fliesenlänge (mm)",
  "Tile width (mm)": "Fliesenbreite (mm)",
  "Joint width (mm)": "Fugenbreite (mm)",
  "Joint depth (mm)": "Fugentiefe (mm)",
  "Grout bags required": "Benötigte Fugenmörtelsäcke",
  "Approx. weight": "Ungefähres Gewicht",
  "Joint width": "Fugenbreite",
  "Unit size": "Gebindegröße",
  "Floor screed yield": "Bodenestrich-Ergiebigkeit",
  "Screed thickness (mm)": "Estrichdicke (mm)",
  "Screed bags required": "Benötigte Estrichsäcke",
  Thickness: "Dicke",
  "Plaster coverage": "Putz-Verbrauch",
  "Coat thickness (mm)": "Schichtdicke (mm)",
  "Plaster bags required": "Benötigte Putzsäcke",
  "Coat thickness": "Schichtdicke",
  "Tile cleaner dosage": "Fliesenreiniger-Dosierung",
  "Concentrate required": "Benötigtes Konzentrat",
  "Packs needed": "Benötigte Gebinde",
  Dilution: "Verdünnung",
  "Tool progress": "Fortschritt des Tools",
  "Choose product": "Produkt auswählen",
  "Select the Bondure product for your project.": "Wählen Sie das Bondure Produkt für Ihr Projekt aus.",
  "Project details": "Projektdetails",
  "Enter area and application details.": "Geben Sie Fläche und Anwendungsdetails ein.",
  "Your estimate": "Ihre Schätzung",
  "Review coverage and material quantities.": "Prüfen Sie Ergiebigkeit und Materialmengen.",
  Step: "Schritt",
  "All tools": "Alle Tools",
  "Calculator progress": "Fortschritt des Rechners",
  "Select product": "Produkt auswählen",
  Next: "Weiter",
  Back: "Zurück",
  Calculate: "Berechnen",
  "Contact sales": "Vertrieb kontaktieren",
  Restart: "Neu starten",
  "Product line": "Produktlinie",
  "Site detail": "Einsatzdetail",
  Recommendation: "Empfehlung",
  "Product recommender": "Produktempfehlung",
  "Which Bondure line do you need?": "Welche Bondure Produktlinie benötigen Sie?",
  Cancel: "Abbrechen",
  "Recommended Bondure products": "Empfohlene Bondure Produkte",
  "No exact match — contact sales for a site-specific recommendation.": "Keine genaue Übereinstimmung. Kontaktieren Sie den Vertrieb für eine projektspezifische Empfehlung.",
  "Open coverage tool": "Verbrauchsrechner öffnen",
  "Site tools for every Bondure line": "Baustellen-Tools für jede Bondure Produktlinie",
  "Coverage and yield estimators for tile adhesive, AAC joining, grout, floor screed, plaster, and tile cleaner — plus a product recommender for site-ready picks.": "Verbrauchs- und Ergiebigkeitsrechner für Fliesenkleber, Porenbeton-Fugenmörtel, Fugenmörtel, Bodenestrich, Putz und Fliesenreiniger sowie eine Produktempfehlung für den direkten Baustelleneinsatz.",
  "Open tool": "Tool öffnen",
};

function localize(locale, text) {
  return locale === "de" ? DE_UI[text] || text : text;
}

function localizedCalculator(config, locale) {
  if (locale !== "de") return config;
  return {
    ...config,
    title: localize(locale, config.title),
    fields: config.fields.map((field) => ({ ...field, label: localize(locale, field.label) })),
    format: (result) => {
      const formatted = config.format(result);
      return {
        ...formatted,
        unit: localize(locale, formatted.unit),
        label: localize(locale, formatted.label),
        rows: formatted.rows.map((row) => ({
          ...row,
          label: localize(locale, row.label),
          value: typeof row.value === "string" ? row.value.replace(/ sq\.ft/g, " ft²") : row.value,
        })),
      };
    },
  };
}

function productMeta(product, locale) {
  if (product.bagKg != null) return `${product.bagKg} kg ${locale === "de" ? "Sack" : "bag"}`;
  if (product.packLitres != null) return `${product.packLitres} L ${locale === "de" ? "Gebinde" : "pack"}`;
  return "";
}

function defaultValues(config) {
  return Object.fromEntries(config.fields.map((field) => [field.id, field.defaultValue]));
}

function hashToTool(hash) {
  const id = (hash || "").replace(/^#/, "");
  if (!id || id === "hub") return null;
  return getTool(id) ? id : null;
}

function Progress({ labels, current, ariaLabel }) {
  return (
    <div className="tools-steps tools-steps--recommender" aria-label={ariaLabel}>
      {labels.map((label, index) => (
        <span
          key={`${label}-${index}`}
          className={`tools-step-dot${index === current ? " is-active" : ""}${index < current ? " is-done" : ""}`}
        >
          <b>{String(index + 1).padStart(2, "0")}</b>
          <em>{label}</em>
        </span>
      ))}
    </div>
  );
}

const CALCULATOR_STEPS = [
  { label: "Choose product", description: "Select the Bondure product for your project." },
  { label: "Project details", description: "Enter area and application details." },
  { label: "Your estimate", description: "Review coverage and material quantities." },
];

function ToolsStepper({ steps, current, ariaLabel, stepLabel }) {
  return (
    <ol className="tools-stepper" aria-label={ariaLabel}>
      {steps.map((item, index) => {
        const isDone = index < current;
        const isActive = index === current;

        return (
          <li
            key={item.label}
            className={`tools-stepper__item${isActive ? " is-active" : ""}${isDone ? " is-done" : ""}`}
            aria-current={isActive ? "step" : undefined}
          >
            <div className="tools-stepper__track" aria-hidden="true">
              <span className="tools-stepper__marker">
                {isDone ? (
                  <svg viewBox="0 0 16 16" focusable="false">
                    <path d="M3.5 8.5L6.5 11.5L12.5 4.5" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 16 16" focusable="false">
                    <circle cx="8" cy="8" r="5.25" />
                    <path d="M8 4.75V8.25L10.25 9.5" />
                  </svg>
                )}
              </span>
              {index < steps.length - 1 ? <span className="tools-stepper__line" /> : null}
            </div>

            <div className="tools-stepper__content">
              <span className="tools-stepper__meta">{stepLabel} {String(index + 1).padStart(2, "0")}</span>
              <strong>{item.label}</strong>
              {item.description ? <p>{item.description}</p> : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function ProductMedia({ product, className }) {
  if (product.image) {
    return <img src={product.image} alt="" />;
  }
  return <span className={className} aria-hidden="true" />;
}

function CalculatorPanel({ toolId, onHome, onContact }) {
  const { locale } = useLocale();
  const config = useMemo(() => localizedCalculator(CALCULATORS[toolId], locale), [toolId, locale]);
  const products = useMemo(() => productsByCategory(config.category), [config.category]);
  const tool = useMemo(() => getLocalizedTools(locale).find((item) => item.id === toolId), [locale, toolId]);
  const calculatorSteps = CALCULATOR_STEPS.map((item) => ({
    label: localize(locale, item.label),
    description: localize(locale, item.description),
  }));
  const [step, setStep] = useState(0);
  const [productId, setProductId] = useState(products[0]?.id || "");
  const [values, setValues] = useState(() => defaultValues(config));
  const [result, setResult] = useState(null);

  useEffect(() => {
    setStep(0);
    setProductId(products[0]?.id || "");
    setValues(defaultValues(config));
    setResult(null);
  }, [toolId]);

  const formatted = result ? config.format(result) : null;

  const calculate = () => {
    const next = config.calculate(productId, values);
    if (!next) return;
    setResult(next);
    setStep(2);
  };

  const restart = () => {
    setStep(0);
    setResult(null);
  };

  return (
    <section className="tools-panel is-active" aria-label={config.title}>
      <div className="tools-panel__inner">
        <div className="tools-panel__head">
          <div>
            <button type="button" className="tools-back" onClick={onHome}>
              ← {localize(locale, "All tools")}
            </button>
            <h2>{config.title}</h2>
          </div>
          {tool?.illustration ? <img className="tools-panel__art" src={tool.illustration} alt="" /> : null}
        </div>

        <div className="tools-panel__body">
          <ToolsStepper
            steps={calculatorSteps}
            current={step}
            ariaLabel={localize(locale, "Calculator progress")}
            stepLabel={localize(locale, "Step")}
          />

          <div className="tools-panel__content">
        {step === 0 && (
          <div className="tools-step is-active">
            <div className="tools-field">
              <label>{localize(locale, "Select product")}</label>
              <div className="tools-product-grid" role="radiogroup" aria-label={localize(locale, "Select product")}>
                {products.map((product) => {
                  const isSelected = product.id === productId;

                  return (
                    <button
                      key={product.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      className={`tools-product-option${isSelected ? " is-active" : ""}`}
                      onClick={() => setProductId(product.id)}
                    >
                      <span className="tools-product-option__check" aria-hidden="true">
                        {isSelected ? <span className="tools-product-option__check-mark">✓</span> : null}
                      </span>
                      <ProductMedia product={product} className="tools-product-option__swatch" />
                      <span className="tools-product-option__copy">
                        <strong>{product.name}</strong>
                        <span className="tools-product-option__meta">{productMeta(product, locale)}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="tools-actions">
              <button type="button" className="tools-btn tools-btn--primary" onClick={() => setStep(1)}>
                {localize(locale, "Next")}
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="tools-step is-active">
            {config.rows.map((row) => (
              <div key={row.join("-")} className={row.length > 1 ? "tools-field-row" : undefined}>
                {row.map((fieldId) => {
                  const field = config.fields.find((item) => item.id === fieldId);
                  return (
                    <div className="tools-field" key={field.id}>
                      <label htmlFor={`tools-${toolId}-${field.id}`}>{field.label}</label>
                      <input
                        id={`tools-${toolId}-${field.id}`}
                        type="number"
                        min={field.min}
                        step={field.step}
                        value={values[field.id]}
                        onChange={(event) =>
                          setValues((current) => ({ ...current, [field.id]: event.target.value }))
                        }
                      />
                    </div>
                  );
                })}
              </div>
            ))}
            <div className="tools-actions">
              <button type="button" className="tools-btn tools-btn--ghost" onClick={() => setStep(0)}>
                {localize(locale, "Back")}
              </button>
              <button type="button" className="tools-btn tools-btn--primary" onClick={calculate}>
                {localize(locale, "Calculate")}
              </button>
            </div>
          </div>
        )}

        {step === 2 && formatted && (
          <div className="tools-step is-active">
            <div className="tools-results">
              <p className="tools-results__metric">
                {formatted.metric}
                <small>{formatted.unit}</small>
              </p>
              <p className="tools-results__label">{formatted.label}</p>
              <ul className="tools-results__list">
                {formatted.rows.map((row) => (
                  <li key={row.label}>
                    <span>{row.label}</span>
                    <strong>{row.value}</strong>
                  </li>
                ))}
              </ul>
              <div className="tools-actions">
                <button type="button" className="tools-btn tools-btn--primary" onClick={onContact}>
                  {localize(locale, "Contact sales")}
                </button>
                <button type="button" className="tools-btn tools-btn--ghost" onClick={restart}>
                  {localize(locale, "Restart")}
                </button>
              </div>
            </div>
            <p className="tools-disclaimer">{getLocalizedDisclaimer(locale)}</p>
            <div className="tools-actions" style={{ marginTop: "1rem" }}>
              <button type="button" className="tools-btn tools-btn--ghost" onClick={() => setStep(1)}>
                {localize(locale, "Back")}
              </button>
            </div>
          </div>
        )}
          </div>
        </div>
      </div>
    </section>
  );
}

function RecommenderPanel({ onHome, onContact, onOpenTool, onProducts }) {
  const { locale } = useLocale();
  const categories = useMemo(() => getLocalizedCategories(locale), [locale]);
  const branches = useMemo(() => getLocalizedRecommenderBranches(locale), [locale]);
  const stepNames = useMemo(() => getLocalizedRecommenderStepNames(locale), [locale]);
  const [answers, setAnswers] = useState({});
  const [questionIndex, setQuestionIndex] = useState(-1);
  const branch = answers.category ? branches[answers.category] || [] : [];
  const category = categories.find((item) => item.id === answers.category) || getCategory(answers.category);
  const picks = questionIndex >= branch.length && answers.category ? recommend(answers) : [];
  const labels = [localize(locale, "Product line"), ...branch.map((item) => stepNames[item.key] || localize(locale, "Site detail")), localize(locale, "Recommendation")];
  const currentStep = questionIndex < 0 ? 0 : questionIndex >= branch.length ? labels.length - 1 : questionIndex + 1;
  const step = branch[questionIndex];

  const reset = () => {
    setAnswers({});
    setQuestionIndex(-1);
  };

  const chooseCategory = (categoryId) => {
    const nextBranch = branches[categoryId] || [];
    setAnswers({ category: categoryId });
    setQuestionIndex(nextBranch.length ? 0 : nextBranch.length);
  };

  const chooseAnswer = (value) => {
    setAnswers((current) => ({ ...current, [step.key]: value }));
    setQuestionIndex((current) => current + 1);
  };

  const goBack = () => {
    if (questionIndex <= 0) {
      reset();
      return;
    }
    const previous = branch[questionIndex - 1];
    setAnswers((current) => {
      const next = { ...current };
      delete next[previous.key];
      return next;
    });
    setQuestionIndex((current) => current - 1);
  };

  return (
    <section className="tools-panel is-active" aria-label={localize(locale, "Product recommender")}>
      <div className="tools-panel__inner">
        <div className="tools-panel__head">
          <div>
            <button type="button" className="tools-back" onClick={onHome}>
              ← {localize(locale, "All tools")}
            </button>
            <h2>{localize(locale, "Product recommender")}</h2>
          </div>
          <img className="tools-panel__art" src="/tools/tool-product-selector.svg" alt="" />
        </div>

        <Progress labels={labels} current={currentStep} ariaLabel={localize(locale, "Tool progress")} />

        {questionIndex < 0 && (
          <>
            <p className="tools-recommend-q">{localize(locale, "Which Bondure line do you need?")}</p>
            <div className="tools-choice-grid">
              {categories.map((item) => (
                <button key={item.id} type="button" className="tools-choice" onClick={() => chooseCategory(item.id)}>
                  {item.label}
                </button>
              ))}
            </div>
            <div className="tools-actions">
              <button type="button" className="tools-btn tools-btn--ghost" onClick={onHome}>
                {localize(locale, "Cancel")}
              </button>
            </div>
          </>
        )}

        {questionIndex >= 0 && step && (
          <>
            <p className="tools-recommend-q">{step.question}</p>
            <div className="tools-choice-grid">
              {step.choices.map((choice) => (
                <button
                  key={choice.value}
                  type="button"
                  className="tools-choice"
                  onClick={() => chooseAnswer(choice.value)}
                >
                  {choice.label}
                </button>
              ))}
            </div>
            <div className="tools-actions">
              <button type="button" className="tools-btn tools-btn--ghost" onClick={goBack}>
                {localize(locale, "Back")}
              </button>
              <button type="button" className="tools-btn tools-btn--ghost" onClick={reset}>
                {localize(locale, "Restart")}
              </button>
            </div>
          </>
        )}

        {questionIndex >= 0 && !step && (
          <>
            <p className="tools-recommend-q">{localize(locale, "Recommended Bondure products")}</p>
            <div className="tools-recommend-cards">
              {picks.length ? (
                picks.map((product) => (
                  <button key={product.id} type="button" className="tools-recommend-card" onClick={onProducts}>
                    <ProductMedia product={product} className="tools-recommend-card__swatch" />
                    <span>
                      <strong>{product.name}</strong>
                      <span>{category?.label || ""}</span>
                    </span>
                  </button>
                ))
              ) : (
                <p className="tools-disclaimer">{localize(locale, "No exact match — contact sales for a site-specific recommendation.")}</p>
              )}
            </div>
            <div className="tools-actions">
              <button type="button" className="tools-btn tools-btn--primary" onClick={onContact}>
                {localize(locale, "Contact sales")}
              </button>
              {category?.tool ? (
                <button type="button" className="tools-btn tools-btn--ghost" onClick={() => onOpenTool(category.tool)}>
                  {localize(locale, "Open coverage tool")}
                </button>
              ) : null}
              <button type="button" className="tools-btn tools-btn--ghost" onClick={reset}>
                {localize(locale, "Restart")}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default function ToolsPage() {
  const { locale } = useLocale();
  const { navigateWithTransition } = useViewTransition();
  const lenis = useLenis();
  const [activeTool, setActiveTool] = useState(null);
  const tools = useMemo(() => getLocalizedTools(locale), [locale]);

  const openTool = (id) => {
    const next = getTool(id) ? id : null;
    setActiveTool(next);
    const url = next ? `/tools#${next}` : "/tools";
    window.history.replaceState(null, "", url);
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo({ top: 0, behavior: "instant" });
  };

  useEffect(() => {
    const sync = () => setActiveTool(hashToTool(window.location.hash));
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <main className="tools-page">
      {!activeTool && (
        <section className="tools-hub" aria-labelledby="tools-hub-title">
          <div className="tools-hub__inner">
            <h1 id="tools-hub-title" className="tools-hub__title">
              {localize(locale, "Site tools for every Bondure line")}
            </h1>
            <p className="tools-hub__copy">
              {localize(locale, "Coverage and yield estimators for tile adhesive, AAC joining, grout, floor screed, plaster, and tile cleaner — plus a product recommender for site-ready picks.")}
            </p>
            <div className="tools-hub__grid">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  type="button"
                  className="tools-card"
                  data-tool-card={tool.id}
                  onClick={() => openTool(tool.id)}
                >
                  <span className="tools-card__art" aria-hidden="true">
                    <img src={tool.illustration} alt="" />
                  </span>
                  <span className="tools-card__content">
                    <h3 className="tools-card__title">{tool.title}</h3>
                    <p className="tools-card__copy">{tool.copy}</p>
                    <span className="tools-card__cta">{localize(locale, "Open tool")} →</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeTool && activeTool !== "recommend" && (
        <CalculatorPanel
          key={activeTool}
          toolId={activeTool}
          onHome={() => openTool(null)}
          onContact={() => navigateWithTransition("/connect")}
        />
      )}

      {activeTool === "recommend" && (
        <RecommenderPanel
          onHome={() => openTool(null)}
          onContact={() => navigateWithTransition("/connect")}
          onProducts={() => navigateWithTransition("/products")}
          onOpenTool={openTool}
        />
      )}
    </main>
  );
}
