import React, { useState, useEffect } from "react";
import { publicApi } from "../../services/api";

const DynamicFormPopup = () => {
    const [form, setForm] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        // Check if the user has already seen/submitted the form in this session
        // Check if the user has already seen/submitted the form in this session
        // const hasSeenForm = sessionStorage.getItem("hasSeenDynamicForm");
        // if (hasSeenForm === "true") {
        //     return;
        // }

        const fetchPublishedForm = async () => {
            try {
                const response = await publicApi.getPublishedForm();
                if (response && response.data) {
                    setForm(response.data);
                    setIsOpen(true);
                }
            } catch (err) {
                console.error("Error fetching published form:", err);
            }
        };

        // Slight delay to not interrupt initial page load animations
        const timer = setTimeout(() => {
            fetchPublishedForm();
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        // sessionStorage.setItem("hasSeenDynamicForm", "true");
    };

    const handleChange = (questionId, value) => {
        setFormData((prev) => ({
            ...prev,
            [questionId]: value,
        }));
    };

    const handleCheckboxChange = (questionId, option, isChecked) => {
        setFormData((prev) => {
            const currentValues = prev[questionId] || [];
            if (isChecked) {
                return { ...prev, [questionId]: [...currentValues, option] };
            } else {
                return {
                    ...prev,
                    [questionId]: currentValues.filter((v) => v !== option),
                };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Basic Validation
        if (form && form.questions) {
            for (const q of form.questions) {
                if (q.isRequired) {
                    const val = formData[q.id];
                    if (
                        val === undefined ||
                        val === null ||
                        val === "" ||
                        (Array.isArray(val) && val.length === 0)
                    ) {
                        setError(`Please answer the required question: "${q.text}"`);
                        return;
                    }
                }
            }
        }

        setIsSubmitting(true);
        try {
            await publicApi.submitFormResponse(form.id, formData);
            setSubmitSuccess(true);
            setTimeout(() => {
                handleClose();
            }, 3000); // Close after 3 seconds of showing success message
        } catch (err) {
            console.error("Error submitting form:", err);
            setError("Failed to submit the form. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen || !form) return null;

    return (
        <>
            <style>{`
        .dfp-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(4px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: dfpFadeIn 0.3s ease-out forwards;
        }
        .dfp-modal {
          background: white;
          border-radius: 16px;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          position: relative;
          animation: dfpSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .dfp-header {
          background: linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%);
          color: white;
          padding: 1.5rem 2rem;
          border-radius: 16px 16px 0 0;
          position: relative;
        }
        .dfp-close {
          position: absolute;
          top: 1rem;
          right: 1.5rem;
          background: none;
          border: none;
          color: rgba(255,255,255,0.8);
          font-size: 1.5rem;
          cursor: pointer;
          transition: color 0.2s;
        }
        .dfp-close:hover { color: white; }
        .dfp-body { padding: 2rem; }
        .dfp-title { margin: 0 0 0.5rem 0; font-size: 1.5rem; font-weight: 600; }
        .dfp-desc { margin: 0; font-size: 0.95rem; opacity: 0.9; }
        
        .dfp-question { margin-bottom: 1.5rem; }
        .dfp-label {
          display: block;
          font-weight: 500;
          color: #1e293b;
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }
        .dfp-required { color: #ef4444; margin-left: 4px; }
        
        .dfp-input, .dfp-textarea, .dfp-select {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 1rem;
          font-family: inherit;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }
        .dfp-input:focus, .dfp-textarea:focus, .dfp-select:focus {
          outline: none;
          border-color: #0ea5e9;
          box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
        }
        
        .dfp-radio-group, .dfp-checkbox-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .dfp-radio-label, .dfp-checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          color: #475569;
        }
        
        .dfp-error {
          background: #fef2f2;
          color: #b91c1c;
          padding: 1rem;
          border-radius: 8px;
          border-left: 4px solid #ef4444;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }
        
        .dfp-submit {
          width: 100%;
          background: linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%);
          color: white;
          border: none;
          padding: 1rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .dfp-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
        }
        .dfp-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .dfp-success {
          text-align: center;
          padding: 3rem 2rem;
        }
        .dfp-success-icon {
          font-size: 4rem;
          color: #10b981;
          margin-bottom: 1rem;
        }
        .dfp-success h3 {
          margin: 0 0 0.5rem 0;
          color: #0f172a;
          font-size: 1.5rem;
        }
        .dfp-success p { color: #64748b; margin: 0; }

        @keyframes dfpFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes dfpSlideUp { 
          from { opacity: 0; transform: translateY(20px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
      `}</style>
            <div className="dfp-overlay" onClick={handleClose}>
                <div className="dfp-modal" onClick={(e) => e.stopPropagation()}>
                    <div className="dfp-header">
                        <button className="dfp-close" onClick={handleClose}>&times;</button>
                        <h2 className="dfp-title">{form.title}</h2>
                        {form.description && <p className="dfp-desc">{form.description}</p>}
                    </div>

                    <div className="dfp-body">
                        {submitSuccess ? (
                            <div className="dfp-success">
                                <div className="dfp-success-icon">✓</div>
                                <h3>Thank You!</h3>
                                <p>Your response has been successfully submitted.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                {error && <div className="dfp-error">{error}</div>}

                                {form.questions && form.questions.map((q) => {
                                    const options = q.options ? JSON.parse(q.options) : [];

                                    return (
                                        <div key={q.id} className="dfp-question">
                                            <label className="dfp-label">
                                                {q.text}
                                                {q.isRequired && <span className="dfp-required">*</span>}
                                            </label>

                                            {q.type === "TEXT" && (
                                                <input
                                                    type="text"
                                                    className="dfp-input"
                                                    value={formData[q.id] || ""}
                                                    onChange={(e) => handleChange(q.id, e.target.value)}
                                                    placeholder="Your answer"
                                                />
                                            )}

                                            {q.type === "PARAGRAPH" && (
                                                <textarea
                                                    className="dfp-textarea"
                                                    rows="4"
                                                    value={formData[q.id] || ""}
                                                    onChange={(e) => handleChange(q.id, e.target.value)}
                                                    placeholder="Your answer"
                                                />
                                            )}

                                            {q.type === "NUMBER" && (
                                                <input
                                                    type="number"
                                                    className="dfp-input"
                                                    value={formData[q.id] || ""}
                                                    onChange={(e) => handleChange(q.id, e.target.value)}
                                                    placeholder="ex: 10"
                                                />
                                            )}

                                            {q.type === "EMAIL" && (
                                                <input
                                                    type="email"
                                                    className="dfp-input"
                                                    value={formData[q.id] || ""}
                                                    onChange={(e) => handleChange(q.id, e.target.value)}
                                                    placeholder="you@example.com"
                                                />
                                            )}

                                            {q.type === "DATE" && (
                                                <input
                                                    type="date"
                                                    className="dfp-input"
                                                    value={formData[q.id] || ""}
                                                    onChange={(e) => handleChange(q.id, e.target.value)}
                                                />
                                            )}

                                            {q.type === "MCQ" && (
                                                <div className="dfp-radio-group">
                                                    {options.map((opt, i) => (
                                                        <label key={i} className="dfp-radio-label">
                                                            <input
                                                                type="radio"
                                                                name={`question_${q.id}`}
                                                                value={opt}
                                                                checked={formData[q.id] === opt}
                                                                onChange={(e) => handleChange(q.id, e.target.value)}
                                                            />
                                                            {opt}
                                                        </label>
                                                    ))}
                                                </div>
                                            )}

                                            {q.type === "TRUE_FALSE" && (
                                                <div className="dfp-radio-group">
                                                    <label className="dfp-radio-label">
                                                        <input
                                                            type="radio"
                                                            name={`question_${q.id}`}
                                                            value="True"
                                                            checked={formData[q.id] === "True"}
                                                            onChange={() => handleChange(q.id, "True")}
                                                        />
                                                        True
                                                    </label>
                                                    <label className="dfp-radio-label">
                                                        <input
                                                            type="radio"
                                                            name={`question_${q.id}`}
                                                            value="False"
                                                            checked={formData[q.id] === "False"}
                                                            onChange={() => handleChange(q.id, "False")}
                                                        />
                                                        False
                                                    </label>
                                                </div>
                                            )}

                                            {q.type === "MULTI_SELECT" && (
                                                <div className="dfp-checkbox-group">
                                                    {options.map((opt, i) => {
                                                        const isChecked = (formData[q.id] || []).includes(opt);
                                                        return (
                                                            <label key={i} className="dfp-checkbox-label">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={isChecked}
                                                                    onChange={(e) => handleCheckboxChange(q.id, opt, e.target.checked)}
                                                                />
                                                                {opt}
                                                            </label>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}

                                <button
                                    type="submit"
                                    className="dfp-submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Submitting..." : "Submit Form"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DynamicFormPopup;
