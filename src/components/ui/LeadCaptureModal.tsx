"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import {
  X,
  CheckCircle,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

export default function LeadCaptureModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [errors, setErrors] = useState<{
    phone?: string;
    email?: string;
  }>({});

  const modalRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Listen for custom modal open event
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);

    window.addEventListener(
      "open-booking-modal",
      handleOpen
    );

    return () =>
      window.removeEventListener(
        "open-booking-modal",
        handleOpen
      );
  }, []);

  // GSAP Modal Animation
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.3,
        }
      );

      gsap.fromTo(
        contentRef.current,
        {
          y: 50,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
        }
      );
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const closeModal = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setIsOpen(false);
        setIsSuccess(false);
      },
    });
  };

  // Validation
  const validateForm = (formData: FormData) => {
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;

    const newErrors: {
      phone?: string;
      email?: string;
    } = {};

    // Indian Mobile Validation
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(phone)) {
      newErrors.phone =
        "Please enter a valid 10-digit mobile number.";
    }

    if (/^(\d)\1{9}$/.test(phone)) {
      newErrors.phone =
        "Sequential numbers are not allowed.";
    }

    if (phone === "1234567890") {
      newErrors.phone =
        "Please enter a real phone number.";
    }

    // Email Validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const blockedDomains = [
      "test.com",
      "mailinator.com",
      "10minutemail.com",
    ];

    const domain = email.split("@")[1];

    if (!emailRegex.test(email)) {
      newErrors.email =
        "Please enter a valid email address.";
    }

    if (
      domain &&
      blockedDomains.includes(domain.toLowerCase())
    ) {
      newErrors.email =
        "Disposable email addresses are not accepted.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Form Submit
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);

    // Honeypot Protection
    const honeypot =
      formData.get("website_url");

    if (honeypot) {
      setIsSuccess(true);
      return;
    }

    // Validation
    if (!validateForm(formData)) return;

    setIsSubmitting(true);

    try {
      // Web3Forms Config
      formData.append(
        "access_key",
        "79023ef4-deaf-4608-b861-ebce44da634c"
      );

      formData.append(
        "subject",
        "🚨 New Clinical Assessment Request | Omira Wellness"
      );

      formData.append(
        "from_name",
        "Omira Wellness"
      );

      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSuccess(true);

        form.reset();

        setErrors({});
      } else {
        console.error(result);

        alert(
          result.message ||
            "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error(error);

      alert(
        "Network error. Please check your connection."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#2A4032]/80 backdrop-blur-sm"
    >
      <div
        ref={contentRef}
        className="bg-[#FAF9F6] w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden relative"
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-6 right-6 text-[#2A4032]/50 hover:text-[#C47C5D] transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {isSuccess ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>

            <h3 className="font-cormorant text-4xl text-[#2A4032] mb-4">
              Request Received
            </h3>

            <p className="font-manrope text-[#2A4032]/70 leading-relaxed mb-8">
              Our clinical coordination team
              will contact you within 24
              hours to schedule your initial
              assessment and discuss your
              specific protocol.
            </p>

            <button
              onClick={closeModal}
              className="bg-[#2A4032] text-[#FAF9F6] font-manrope font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-full hover:bg-[#C47C5D] transition-colors"
            >
              Return to Website
            </button>
          </div>
        ) : (
          <div className="p-8 sm:p-12">
            <div className="flex items-center gap-2 text-[#C47C5D] font-manrope font-bold uppercase tracking-widest text-xs mb-4">
              <ShieldCheck className="w-4 h-4" />
              Secure Clinical Portal
            </div>

            <h2 className="font-cormorant text-4xl text-[#2A4032] leading-tight mb-2">
              Request an Assessment
            </h2>

            <p className="font-manrope text-sm text-[#2A4032]/60 mb-8">
              Please provide your details
              below. A certified Omira
              coordinator will reach out to
              verify your medical history.
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Honeypot */}
              <input
                type="text"
                name="website_url"
                tabIndex={-1}
                autoComplete="off"
                className="hidden absolute opacity-0 -z-50"
              />

              {/* Full Name */}
              <div>
                <label className="block font-manrope text-xs font-bold uppercase text-[#2A4032]/60 mb-2 tracking-wider">
                  Full Name
                </label>

                <input
                  required
                  type="text"
                  name="fullName"
                  placeholder="e.g., Ananya Sharma"
                  className="w-full bg-white border border-[#2A4032]/10 rounded-xl px-4 py-3.5 font-manrope text-[#2A4032] focus:outline-none focus:border-[#C47C5D] transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block font-manrope text-xs font-bold uppercase text-[#2A4032]/60 mb-2 tracking-wider">
                  Mobile Number
                </label>

                <input
                  required
                  type="tel"
                  name="phone"
                  placeholder="10-digit mobile number"
                  className={`w-full bg-white border ${
                    errors.phone
                      ? "border-red-500"
                      : "border-[#2A4032]/10"
                  } rounded-xl px-4 py-3.5 font-manrope text-[#2A4032] focus:outline-none focus:border-[#C47C5D] transition-colors`}
                />

                {errors.phone && (
                  <p className="text-red-500 text-xs font-manrope mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block font-manrope text-xs font-bold uppercase text-[#2A4032]/60 mb-2 tracking-wider">
                  Email Address
                </label>

                <input
                  required
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className={`w-full bg-white border ${
                    errors.email
                      ? "border-red-500"
                      : "border-[#2A4032]/10"
                  } rounded-xl px-4 py-3.5 font-manrope text-[#2A4032] focus:outline-none focus:border-[#C47C5D] transition-colors`}
                />

                {errors.email && (
                  <p className="text-red-500 text-xs font-manrope mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Condition */}
              <div>
                <label className="block font-manrope text-xs font-bold uppercase text-[#2A4032]/60 mb-2 tracking-wider">
                  Primary Condition
                </label>

                <select
                  name="condition"
                  className="w-full bg-white border border-[#2A4032]/10 rounded-xl px-4 py-3.5 font-manrope text-[#2A4032] focus:outline-none focus:border-[#C47C5D] transition-colors"
                >
                  <option value="hypertension">
                    Hypertension / BP
                  </option>

                  <option value="cancer-support">
                    Cancer Supportive Care
                  </option>

                  <option value="cardiac-rehab">
                    Cardiac Rehabilitation
                  </option>

                  <option value="neurological">
                    Parkinson's /
                    Neurological
                  </option>

                  <option value="addiction">
                    Addiction Recovery
                  </option>

                  <option value="other">
                    Other / General Wellness
                  </option>
                </select>
              </div>

              {/* Submit */}
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-[#2A4032] text-[#FAF9F6] font-manrope font-bold uppercase tracking-widest text-xs py-4 rounded-xl hover:bg-[#C47C5D] transition-colors mt-4 disabled:opacity-70"
              >
                {isSubmitting
                  ? "Securely Submitting..."
                  : "Submit Request"}
              </button>

              <p className="text-center text-[10px] text-[#2A4032]/40 font-manrope mt-4">
                Your data is securely
                transmitted. We do not share
                medical information.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}