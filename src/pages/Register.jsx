import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "../components/Button";
import axiosInstance from "../api/axiosInstance";
import "./Register.css";

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    otp: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState("initial"); // 'initial' or 'otp'
  const [apiMessage, setApiMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateField = (name, value) => {
    let error = "";
    if (step === "initial") {
      switch (name) {
        case "first_name":
          if (!value.trim()) error = t('reg_error_first_name', "First name is required");
          else if (value.trim().length < 2) error = t('reg_error_name_min', "Min 2 characters required");
          break;
        case "last_name":
          if (!value.trim()) error = t('reg_error_last_name', "Last name is required");
          else if (value.trim().length < 2) error = t('reg_error_name_min', "Min 2 characters required");
          break;
        case "email":
          if (!value.trim()) error = t('reg_error_email_required', "Email is required");
          else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
            error = t('reg_error_email_invalid', "Invalid email address");
          break;
        case "phone_number":
          if (!value.trim()) error = t('reg_error_phone', "Mobile number is required");
          else if (!/^\d{10}$/.test(value.replace(/\D/g, '')))
            error = t('reg_error_phone_invalid', "Enter a valid 10-digit number");
          break;
        default:
          break;
      }
    } else if (name === "otp") {
      if (!value.trim()) error = t('reg_error_otp', "OTP is required");
      else if (value.length < 4) error = t('reg_error_otp_invalid', "Enter full code");
    }
    return error;
  };

  const validate = () => {
    let tempErrors = {};
    if (step === "initial") {
      const keys = ["first_name", "last_name", "email", "phone_number"];
      keys.forEach(key => {
        const error = validateField(key, formData[key]);
        if (error) tempErrors[key] = error;
      });
    } else {
      const error = validateField("otp", formData.otp);
      if (error) tempErrors.otp = error;
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Smooth error clearing and live validation
    if (errors[name]) {
      const fieldError = validateField(name, value);
      setErrors({ ...errors, [name]: fieldError });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const fieldError = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: fieldError }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setApiMessage("");

    try {
      if (step === "initial") {
        const response = await axiosInstance.post("/app/register/", {
          username: (formData.first_name + formData.last_name).toLowerCase().replace(/\s/g, ''),
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone_number: formData.phone_number,
          password: "Pass@123",
        });

        if (response.data.next_action === "verify_otp" || response.data.status === "verification_required") {
          setStep("otp");
          setApiMessage(response.data.message || "OTP sent to your email.");
        }
      } else {
        const response = await axiosInstance.post("/app/register/", {
          email: formData.email,
          otp: formData.otp,
          action: "verify_otp",
        });

        if (response.data.registration_complete || response.data.otp_verified || response.data.status === "success") {
          if (window.Swal) {
            window.Swal.fire({
              title: t('reg_complete_title', "Registration Complete!"),
              text: response.data.message || t('reg_complete_msg', "Your Agentic profile is now active."),
              icon: "success",
              background: '#ffffff',
              iconColor: '#A855F7',
              confirmButtonText: t('reg_swal_ok', 'Let\'s Go'),
              confirmButtonColor: "#A855F7",
              customClass: {
                popup: 'pro-swal-popup',
                title: 'pro-swal-title',
                confirmButton: 'pro-swal-button'
              },
              timer: 3500,
              timerProgressBar: true
            }).then(() => { navigate('/'); });
          }
          setSubmitted(true);
        }
      }
    } catch (error) {
      console.error("API Error Detail:", error.response?.data);
      const backendErrors = error.response?.data;
      let errorMsg = t('reg_error_connectivity', "Connectivity error. Please try again.");

      if (backendErrors) {
        if (typeof backendErrors === 'string') errorMsg = backendErrors;
        else if (backendErrors.message) errorMsg = backendErrors.message;
        else if (backendErrors.error) errorMsg = backendErrors.error;
        else if (typeof backendErrors === 'object') {
          const firstKey = Object.keys(backendErrors)[0];
          const firstVal = backendErrors[firstKey];
          errorMsg = `${firstKey}: ${Array.isArray(firstVal) ? firstVal[0] : firstVal}`;
        }
      }
      setErrors({ api: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="register-page-success">
        <div className="form-card-glass success-card reveal-up">
          <div className="success-lottie-wrapper">
            <div className="success-check-circle">
              <svg viewBox="0 0 52 52">
                <circle className="success-circle-path" cx="26" cy="26" r="25" fill="none" />
                <path className="success-check-path" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
              </svg>
            </div>
          </div>
          <h2 className="gradient-text">{t('reg_success', 'Profile Active')}</h2>
          <p>{t('reg_success_desc', 'Your innovation gateway is now ready. Redirecting...')}</p>
          <div className="success-progress-bar">
            <div className="progress-fill"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="register-page">
      <div className="container">
        {/* Compact Branding */}
        <div className="register-brand-compact reveal-down">
          <img src="/GraminAiLogo.jpeg" alt="Gramin AI Summit" style={{ height: '40px', objectFit: 'contain', marginRight: '15px' }} onClick={() => navigate('/')} />
          <img src="/LOGO.png" alt="TDTL Logo" className="compact-logo" onClick={() => navigate('/')} />
          <div className="brand-dot-separator"></div>
          <span className="brand-label">{t('reg_gateway', 'Innovation Gateway')}</span>
        </div>

        <div className="register-split-layout">
          <div className="register-info-panel reveal-up">
            <span className="section-tag">{t('reg_tag', 'GLOBAL ECOSYSTEM')}</span>
            <h1>{t('reg_title', 'The Future of')} <span className="gradient-text">{t('reg_highlight', 'Rural Tech')}</span>{t('reg_title_end', ' starts here.')}</h1>
            <p className="main-desc">{t('reg_desc', 'Join the Agentic AI network connecting village innovators with technical mentorship.')}</p>
            <div className="benefits-list-modern">
              <div className="benefit-item-m">
                <span>⚡</span>
                <div>
                  <h4>{t('reg_benefit_1_title', 'Gramin AI Network')}</h4>
                  <p>{t('reg_benefit_1_desc', 'Join 500+ rural innovators across villages.')}</p>
                </div>
              </div>
              <div className="benefit-item-m">
                <span>🎯</span>
                <div>
                  <h4>{t('reg_benefit_ai_title', 'Agentic Workflows')}</h4>
                  <p>{t('reg_benefit_ai_desc', 'Automate local productivity with expert mentorship.')}</p>
                </div>
              </div>
              <div className="benefit-item-m">
                <span>🌐</span>
                <div>
                  <h4>{t('reg_benefit_lang_title', 'Vernacular Access')}</h4>
                  <p>{t('reg_benefit_lang_desc', 'AI tools tailored for localized dialect and context.')}</p>
                </div>
              </div>
              <div className="benefit-item-m">
                <span>🛡️</span>
                <div>
                  <h4>{t('reg_benefit_2_title', 'Secure Identity')}</h4>
                  <p>{t('reg_benefit_2_desc', 'Encrypted digital profile for global recognition.')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="register-form-panel reveal-up reveal-delay-1">
            <div className="form-card-glass">
              <div className="form-head">
                <h3>{step === "initial" ? t('nav_register', "Register") : t('reg_otp_verify', "Verify OTP")}</h3>
                <p>{step === "initial" ? t('reg_start_desc', "Start your innovation journey.") : t('reg_otp_desc', "Enter the code sent to your email.")}</p>
              </div>

              {apiMessage && <div className="api-info-msg">{apiMessage}</div>}
              {errors.api && <div className="api-error-msg">{errors.api}</div>}

              <form className="register-form-actual" onSubmit={handleSubmit}>
                {step === "initial" ? (
                  <>
                    <div className="form-row-m">
                      <div className="form-group-m">
                        <label>{t('reg_first_name', 'First Name')}</label>
                        <input type="text" name="first_name" className={errors.first_name ? 'input-error' : ''} value={formData.first_name} onChange={handleChange} onBlur={handleBlur} placeholder={t('reg_first_name', 'First Name')} />
                        {errors.first_name && <span className="error-text">{errors.first_name}</span>}
                      </div>
                      <div className="form-group-m">
                        <label>{t('reg_last_name', 'Last Name')}</label>
                        <input type="text" name="last_name" className={errors.last_name ? 'input-error' : ''} value={formData.last_name} onChange={handleChange} onBlur={handleBlur} placeholder={t('reg_last_name', 'Last Name')} />
                        {errors.last_name && <span className="error-text">{errors.last_name}</span>}
                      </div>
                    </div>

                    <div className="form-group-m">
                      <label>{t('reg_email', 'Email Address')}</label>
                      <input type="email" name="email" className={errors.email ? 'input-error' : ''} value={formData.email} onChange={handleChange} onBlur={handleBlur} placeholder={t('reg_placeholder_email', "email@address.com")} />
                      {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    <div className="form-group-m">
                      <label>{t('reg_phone', 'Phone Number')}</label>
                      <input 
                        type="text" 
                        inputMode="numeric" 
                        name="phone_number" 
                        className={errors.phone_number ? 'input-error' : ''} 
                        value={formData.phone_number} 
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, ''); // Number only filter
                          if (val.length <= 10) { // Optional: cap at 10
                            handleChange({ target: { name: 'phone_number', value: val } });
                          }
                        }} 
                        onBlur={handleBlur} 
                        placeholder={t('reg_phone', 'Phone Number')} 
                      />
                      {errors.phone_number && <span className="error-text">{errors.phone_number}</span>}
                    </div>
                  </>
                ) : (
                  <div className="form-group-m">
                    <label>{t('reg_otp', 'One-Time Password (OTP)')}</label>
                    <input type="text" name="otp" className={errors.otp ? 'input-error' : ''} value={formData.otp} onChange={handleChange} onBlur={handleBlur} placeholder={t('reg_placeholder_otp', "XXXXXX")} />
                    {errors.otp && <span className="error-text">{errors.otp}</span>}
                    <p className="otp-hint">OTP sent to <strong>{formData.email}</strong></p>
                  </div>
                )}

                <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
                  {step === "initial" ? t('reg_btn_initial', "Register Profile") : t('reg_btn_otp', "Secure Account")}
                </Button>

                {step === "otp" && (
                  <Button variant="outline" fullWidth onClick={() => setStep("initial")}>{t('reg_edit', 'Edit Details')}</Button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;