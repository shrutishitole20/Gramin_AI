import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "../components/Button";
import SuccessStack from "../components/SuccessStack";
import NewsCarousel from "../components/NewsCarousel";
import "./Home.css";

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedSpeaker, setSelectedSpeaker] = React.useState(null);
  const [selectedOffering, setSelectedOffering] = React.useState(null);
  const [showQR, setShowQR] = React.useState(false);
  const [downloadingQR, setDownloadingQR] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.2 },
    );

    const items = document.querySelectorAll(".agenda-modern-item");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const handleQRDownload = async () => {
    setDownloadingQR(true);
    const qrUrl =
      "https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=https://graminai.tdtl.world/register";
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "GraminAI_Registration_QR.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("QR Download failed:", error);
    } finally {
      setDownloadingQR(false);
    }
  };

  const speakers = [
    {
      name: t("speaker_1_name", "Dr. Amitji Andre"),
      role: t(
        "speaker_1_role",
        "Founder- CEO, The Data Tech Labs, Pune inc (India/USA/UAE/Malaysia)",
      ),
      topic: t(
        "speaker_1_topic",
        "Gramin AI: From Digital Inclusion to Intelligent Empowerment. From “Digital India” to “Intelligent India” democratizing intelligence, not just access",
      ),
      designation: t(
        "speaker_1_designation",
        "Founder - CEO, The Data Tech Labs, Pune inc (India/USA/UAE/Malaysia)",
      ),
      qualification: t(
        "speaker_1_bio",
        "Dr. Amit Andre is a Global Speaker | Researcher | Thought Leader in Artificial & Agentic Intelligence. Celebration for his pioneering work in integrating autonomous intelligent systems.",
      ),
      image: process.env.PUBLIC_URL + "/AmitAndre.jpeg",
    },
    {
      name: t("speaker_2_name", "Dr. Hon. Ridhima Dua"),
      role: t(
        "speaker_2_role",
        "Research Professor and Associate Director, Institute of Artificial Intelligence at the MIT-WPU.",
      ),
      topic: t(
        "speaker_2_topic",
        "AI in Industrial Revolution and Opportunities.",
      ),
      designation: t(
        "speaker_2_designation",
        "Research Professor & Assoc. Director, Institute of AI, MIT-WPU, Pune",
      ),
      qualification: t(
        "speaker_2_bio",
        "Dr Anand J Kulkarni holds a PhD in Artificial Intelligence from NTU Singapore. He is working as Research Professor and Associate Director of the Institute of Artificial Intelligence at MIT-WPU.",
      ),
      image: process.env.PUBLIC_URL + "/Riddhima Dua.jpeg",
    },
    {
      name: t("speaker_3_name", "Mr. Ravinder Pal Singh"),
      role: t("speaker_3_role", "Director, AMDOCS - Pune."),
      topic: t(
        "speaker_3_topic",
        "Ethical AI Adoption - Ethics, Data Security and Reposible AI Usage.",
      ),
      designation: t(
        "speaker_3_designation",
        "Director, Software Engineering AMDOCS · PUNE",
      ),
      qualification: t(
        "speaker_3_bio",
        "Ravinder Pal Singh is a Director of Software Engineering at AMDOCS Pune. He has extensive experience in computer applications and software engineering.",
      ),
      image: process.env.PUBLIC_URL + "/RavindraPal.png",
    },
    {
      name: t("speaker_4_name", "Dr. Smita Kale"),
      role: t(
        "speaker_4_role",
        "Founder - Sanovaskale Technologies Pvt Ltd. Advisor at The Venture Center.",
      ),
      topic: t(
        "speaker_4_topic",
        "AI for Rural entrepreneurship. AI powered Rural Businesses.",
      ),
      designation: t(
        "speaker_4_designation",
        "Founder of Sanovaskale Technologies | Advisor at Venture Center",
      ),
      qualification: t(
        "speaker_4_bio",
        "Dr. Smita Kale is the Founder of Sanovaskale Technologies and an Advisor at the Venture Center, Pune, with over 20 years of experience in entrepreneurship.",
      ),
      image: process.env.PUBLIC_URL + "/SumitaKale.png",
    },
    {
      name: t("speaker_5_name", "Dr. Niranjan Deshmukh"),
      role: t("speaker_5_role", "BDS."),
      topic: t("speaker_5_topic", "AI in heathcare sector"),
      designation: t("speaker_5_designation", "Medical Professional"),
      qualification: t(
        "speaker_5_bio",
        "Expert in rural healthcare diagnostics and AI integration.",
      ),
      image: process.env.PUBLIC_URL + "/DeshmukhNiranjanVijay.jpeg",
    },
    {
      name: t("speaker_6_name", "Mr. Amit Singh"),
      role: t("speaker_6_role", "Founder - AVatara Defence, New Delhi."),
      topic: t(
        "speaker_6_topic",
        "Profitable startups through AI. Rural Jobs and AI.",
      ),
      designation: t(
        "speaker_6_designation",
        "Founder - AVatara Defence, New Delhi",
      ),
      qualification: t(
        "speaker_6_bio",
        "Specialist in defense technologies and economic shifts.",
      ),
      image: process.env.PUBLIC_URL + "/AmitSinghji.jpeg",
    },
    {
      name: t("speaker_9_name", "Dadasaheb Bhagat"),
      role: t("speaker_9_role", "Indian filmmaker and entrepreneur"),
      topic: t("speaker_9_topic", "Media and AI film production."),
      designation: t(
        "speaker_9_designation",
        "Founder of Doographics Pvt. Ltd. and Bkatvasal Productions",
      ),
      qualification: t(
        "speaker_9_bio",
        "Dadasaheb Bhagat is an Indian filmmaker and entrepreneur from Beed, Maharashtra. He is the founder of Doographics Pvt. Ltd. and Bkatvasal Productions, working in Media and AI film production. Prime Minister Narendra Modi mentioned his work in “Mann Ki Baat”, bringing national recognition to his journey and innovation. He appeared on Shark Tank India, where Aman Gupta invested ₹1 crore for 10% equity in his platform. His journey from a small village to building creative and technology platforms inspires young entrepreneurs and creators.",
      ),
      image: process.env.PUBLIC_URL + "/Dadasaheb Bhagat.jpg",
    },
    {
      name: t("speaker_10_name", "Mr. Sudhir Shinde"),
      role: t("speaker_10_role", "Agri Dev. Officer ZP, Ahilyanagar"),
      topic: t("speaker_10_topic", "AI and Agriculture"),
      designation: t(
        "speaker_10_designation",
        "Agri Dev. Officer ZP, Ahilyanagar",
      ),
      qualification: t("speaker_10_bio", ""),
      image: process.env.PUBLIC_URL + "/Sudhir shinde.png",
    },
    {
      name: t("speaker_11_name", "Mr. Sukhdev Jamdadhe"),
      role: t("speaker_11_role", "Agri Officer, Dept of Agriculture"),
      topic: t("speaker_11_topic", "AI and Agriculture"),
      designation: t(
        "speaker_11_designation",
        "Agri Officer, Dept of Agriculture",
      ),
      qualification: t("speaker_11_bio", ""),
      image: process.env.PUBLIC_URL + "/Sulhadeo Jamdhade.jpg",
    },
  ];
  const chiefGuests = [
    {
      name: t("chief_guest_1_name", "Hon. Sangram Bhaiya Jagtap"),
      designation: t("chief_guest_1_designation", "MLA, Ahilyanagar"),
      image: process.env.PUBLIC_URL + "/SangramJagtap.jfif",
    },
    {
      name: t("chief_guest_2_name", "Hon. Somnathji Gharge (IPS)"),
      designation: t(
        "chief_guest_2_designation",
        "District Superintendent of Police, Ahilyanagar",
      ),
      image: process.env.PUBLIC_URL + "/Somnath Gharge.jfif",
    },
    {
      name: t("chief_guest_3_name", "Hon. Anandji Bhandari (IAS)"),
      designation: t(
        "chief_guest_3_designation",
        "CEO, Zilla Parishad, Ahilyanagar",
      ),
      image: process.env.PUBLIC_URL + "/Anand Bhandari.jfif",
    },
    {
      name: t("chief_guest_8_name", "Hon. Sharadji Jare"),
      designation: t(
        "chief_guest_8_designation",
        "Director, Agriculture Marketing, Maharashtra State",
      ),
      image: process.env.PUBLIC_URL + "/Sharadji Jare.jfif",
    },
    {
      name: t("chief_guest_4_name", "Hon. Sudhakarji Borale"),
      designation: t(
        "chief_guest_4_designation",
        "Superintendent Agriculture Officer, Ahilyanagar",
      ),
      image: process.env.PUBLIC_URL + "/Sudhakar borale.jpeg",
    },
    {
      name: t("chief_guest_5_name", "Hon. Rajendraji Patil"),
      designation: t(
        "chief_guest_5_designation",
        "Registrar, Mahatma Phule Krushi Vidyapeeth, Rahuri",
      ),
      initials: "RP",
    },
    {
      name: t("chief_guest_6_name", "Hon. Vijayji Mulik"),
      designation: t(
        "chief_guest_6_designation",
        "Addl. CEO, Zilla Parishad, Ahilyanagar",
      ),
      image: process.env.PUBLIC_URL + "/Vijay Mulik.jpeg",
    },
    {
      name: t("chief_guest_7_name", "Hon. Vaibhavji Kalubarme"),
      designation: t("chief_guest_7_designation", "Addl. SP, Ahilyanagar"),
      initials: "VK",
    },
  ];
  const chiefGuestPhotos = chiefGuests.filter((guest) => guest.image);
  const chiefGuestTextOnly = chiefGuests.filter((guest) => !guest.image);
  const agenda = [
    {
      type: "header",
      text: t("agenda_main_title", "Gramin AI Summit Program Schedule"),
    },
    {
      type: "span",
      time: t("agenda_time_9_00", "9.00am - 9.30am"),
      col1: t("agenda_item_0", "Registration & Networking"),
      col2: "",
    },
    {
      type: "subheader",
      cols: [
        t("agenda_table_time", "TIME"),
        t("agenda_table_speaker", "SPEAKER"),
        t("agenda_table_topic", "TOPIC"),
      ],
    },
    {
      time: t("agenda_time_10_30", "10.30am To 11.00am"),
      name: t("speaker_1_name"),
      desc: t("speaker_1_role"),
      topic: t("speaker_1_topic"),
    },
    {
      time: t("agenda_time_11_00", "11.00am To 11.30am"),
      name: t("speaker_3_name"),
      desc: t("speaker_3_role"),
      topic: t("speaker_3_topic"),
    },
    {
      time: t("agenda_time_11_30", "11.30am To 12.00pm"),
      name: t("speaker_2_name"),
      desc: t("speaker_2_role"),
      topic: t("speaker_2_topic"),
    },
    {
      time: t("agenda_time_12_00", "12.00pm To 12.30pm"),
      name: t("speaker_4_name"),
      desc: t("speaker_4_role"),
      topic: t("speaker_4_topic"),
    },
    {
      type: "lunch",
      time: t("agenda_time_12_30", "12.30pm To 1.30pm"),
      text: t("agenda_lunch", "Lunch Break"),
    },
    {
      time: t("agenda_time_1_30", "1.30pm To 2.00pm"),
      name: t("speaker_9_name"),
      desc: t("speaker_9_designation"),
      topic: t("agenda_topic_film"),
    },
    {
      time: t("agenda_time_2_00", "2.00pm To 2.30pm"),
      name: t("speaker_5_name"),
      desc: t("speaker_5_role"),
      topic: t("speaker_5_topic"),
    },
    {
      time: t("agenda_time_2_30", "2.30pm To 3.00pm"),
      name: t("speaker_6_name"),
      desc: t("speaker_6_role"),
      topic: t("speaker_6_topic"),
    },
    {
      time: t("agenda_time_3_00", "3.00pm To 3.30pm"),
      speakers: [
        {
          name: t("speaker_10_name", "Mr. Sudhirji Shinde"),
          role: t("speaker_10_role", "Agri Dev. Officer ZP, Ahilyanagar"),
        },
        {
          name: t("speaker_11_name", "Mr. Sukhdevji Jamdadhe"),
          role: t("speaker_11_role", "Agri Officer, Dept of Agriculture"),
        },
      ],
      topic: t("speaker_8_topic", "AI and Agriculture"),
    },
  ];

  const offerings = [
    {
      title: t("offering_1_title", "Neural Innovation Engine"),
      icon: "🧠",
      text: t(
        "offering_1_text",
        "Submit your rural project and let our NLP engines evaluate viability and market fit instantly.",
      ),
      detail: t(
        "offering_1_detail",
        "Our proprietary neural engine uses advanced Large Language Models and predictive algorithms to scan your project's technical feasibility, potential socio-economic impact, and alignment with global sustainable goals. Gain detailed insights before you start building.",
      ),
    },
    {
      title: t("offering_2_title", "Decentralized Mentorship"),
      icon: "🌍",
      text: t(
        "offering_2_text",
        "Direct access to global thought leaders like Dr. Amit Andre and PhD researchers for technical guidance.",
      ),
      detail: t(
        "offering_2_detail",
        "Bridge the expertise gap. Our platform connects you with industry veterans and triple-doctorate researchers. Receive one-on-one architectural reviews, strategic pivot suggestions, and direct technical mentorship to ensure your innovation is world-ready.",
      ),
    },
    {
      title: t("offering_3_title", "Autonomous Robotics"),
      icon: "🤖",
      text: t(
        "offering_3_text",
        "Dedicated support for integrating autonomous robotics into rural agricultural and industrial flows.",
      ),
      detail: t(
        "offering_3_detail",
        "From farm to factory. We provide blueprints and technical support for implementing autonomous robotic solutions. Whether it's crop harvesting, soil analysis, or decentralized manufacturing—we help you automate the heavy lifting with AI.",
      ),
    },
    {
      title: t("offering_4_title", "Responsible AI Framework"),
      icon: "⚖️",
      text: t(
        "offering_4_text",
        "Custom frameworks to ensure your AI solutions are ethical, secure, and socially responsible.",
      ),
      detail: t(
        "offering_4_detail",
        "Build with trust. Our framework focuses on data privacy, bias reduction in localized datasets, and ensuring that your AI implementations benefit the entire community. We specialize in responsible, ethical, and secure rural tech adoption.",
      ),
    },
    {
      title: t("offering_5_title", "Rural Cloud Computing"),
      icon: "☁️",
      text: t(
        "offering_5_text",
        "High-performance edge computing infrastructure specifically designed for limited-bandwidth rural zones.",
      ),
      detail: t(
        "offering_5_detail",
        "Deployment without barriers. We provide high-availability cloud and edge resources that function seamlessly in areas with low connectivity. No more server delays—scale your application directly where it is needed the most.",
      ),
    },
    {
      title: t("offering_6_title", "Market Connect & VC Access"),
      icon: "💰",
      text: t(
        "offering_6_text",
        "Seamlessly connect with global investors and venture capitalists interested in rural impact.",
      ),
      detail: t(
        "offering_6_detail",
        "Nurture to Scale. Once your innovation is validated, our platform gives you a direct bridge to impact investors and VCs. Present your pilot results on our dashboard and secure the funding required for rapid regional scaling.",
      ),
    },
  ];

  const steps = [
    {
      num: "01",
      title: t("step_1_title", "Submit Innovation"),
      desc: t(
        "step_1_desc",
        "Share your rural challenges or AI solutions through our simple secure portal.",
      ),
    },
    {
      num: "02",
      title: t("step_2_title", "AI-Powered Analysis"),
      desc: t(
        "step_2_desc",
        "Our neural engines evaluate viability, scalability, and socio-economic impact.",
      ),
    },
    {
      num: "03",
      title: t("step_3_title", "Expert Mentorship"),
      desc: t(
        "step_3_desc",
        "Get matched with global tech leaders and researchers for personalized guidance.",
      ),
    },
    {
      num: "04",
      title: t("step_4_title", "Deploy & Scale"),
      desc: t(
        "step_4_desc",
        "Execute pilot programs with our infrastructure partners and scale rapidly.",
      ),
    },
  ];

  const testimonials = [
    {
      quote: t(
        "testimonial_1_quote",
        "Gramin AI's mentorship helped us deploy agricultural drones that increased yield by over 40% across 5 villages in Vidarbha.",
      ),
      author: t("testimonial_1_author", "Rajesh Kumar"),
      role: t("testimonial_1_role", "AgriTech Leader, Vidarbha"),
      image:
        "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=150&h=150&auto=format&fit=crop",
    },
    {
      quote: t(
        "testimonial_2_quote",
        "The ethical AI framework ensured our predictive weather models were completely localized for farmers in Western Maharashtra.",
      ),
      author: t("testimonial_2_author", "Dr. Sunila Patil"),
      role: t("testimonial_2_role", "Healthcare Researcher"),
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=150&h=150&auto=format&fit=crop",
    },
    {
      quote: t(
        "testimonial_3_quote",
        "Seamless matching with global experts accelerated our rural tele-healthcare platform in UP by years.",
      ),
      author: t("testimonial_3_author", "Vikram Singh"),
      role: t("testimonial_3_role", "Logistics Expert, UP"),
      image:
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=150&h=150&auto=format&fit=crop",
    },
    {
      quote: t(
        "testimonial_4_quote",
        "Their accelerator program connected our rural supply chain project in Rajasthan with vital funding within just two months.",
      ),
      author: t("testimonial_4_author", "Priya Sharma"),
      role: t("testimonial_4_role", "Social Entrepreneur"),
      image:
        "https://images.unsplash.com/photo-1563237023-b1e970526dcb?q=80&w=150&h=150&auto=format&fit=crop",
    },
    {
      quote: t(
        "testimonial_5_quote",
        "Gramin AI provided the computing resources and localized Marathi LLMs needed to rapidly scale our crop disease detection.",
      ),
      author: t("testimonial_5_author", "Anil Deshmukh"),
      role: t("testimonial_5_role", "AI Scientist, Pune"),
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop",
    },
    {
      quote: t(
        "testimonial_6_quote",
        "An absolute game-changer for bringing sustainable, tech-driven entrepreneurship to the deep rural belts of South India.",
      ),
      author: t("testimonial_6_author", "Meena Venkatesh"),
      role: t("testimonial_6_role", "EdTech Innovator"),
      image:
        "https://images.unsplash.com/photo-1589386417686-0d34b5903d23?q=80&w=150&h=150&auto=format&fit=crop",
    },
  ];

  const projects = [
    {
      title: t("project_1_title", "Project Krishi"),
      desc: t(
        "project_1_desc",
        "AI-driven soil and crop analysis using drone imaging for predicting yields and managing pests in Vidarbha.",
      ),
      status: t("project_1_status", "Active in 12 villages"),
      image:
        "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&q=80&w=600",
    },
    {
      title: t("project_2_title", "Gramin Shiksha"),
      desc: t(
        "project_2_desc",
        "LLM-based personalized tutoring systems localized in Marathi and Hindi for rural schools without dedicated stem teachers.",
      ),
      status: t("project_2_status", "Deployed in 40 schools"),
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600",
    },
    {
      title: t("project_3_title", "Arogya Bot"),
      desc: t(
        "project_3_desc",
        "Tele-diagnostic kiosks powered by computer vision to detect early signs of common diseases, connected to city hospitals.",
      ),
      status: t("project_3_status", "Pilot Ph-II"),
      image:
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600",
    },
    {
      title: t("project_4_title", "Jal Rakshak"),
      desc: t(
        "project_4_desc",
        "Smart sensor networks deployed across local reservoirs forecasting water levels, detecting leakages, and optimizing irrigation schedules using predictive ML.",
      ),
      status: t("project_4_status", "Scaled to 5 Districts"),
      image:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600",
    },
    {
      title: t("project_5_title", "Vyapar Setu"),
      desc: t(
        "project_5_desc",
        "An AI-powered B2B matchmaking platform connecting rural artisans and farmers directly to urban bulk buyers, eliminating middlemen and increasing margins.",
      ),
      status: t("project_5_status", "Live Application"),
      image:
        "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80&w=600",
    },
    {
      title: t("project_6_title", "Urja Net"),
      desc: t(
        "project_6_desc",
        "Intelligent grid management software that allocates solar panel energy outputs dynamically across village clusters based on predicted consumption patterns.",
      ),
      status: t("project_6_status", "Testing Phase"),
      image:
        "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=600",
    },
  ];

  return (
    <div className="home">
      {/* SECTION 1: HERO - THE GROUNDED FRONTIER */}
      <section id="home" className="hero-landing">
        <video autoPlay loop muted playsInline className="hero-video-bg">
          <source
            src={process.env.PUBLIC_URL + "/13255746_3840_2160_60fps.mp4"}
            type="video/mp4"
          />
        </video>
        <div className="hero-landing-overlay"></div>

        <div className="hero-landing-content reveal reveal-up mt-6">
          <h1>
            {t("hero_title", "GRAMIN ")}
            <span className="brand-highlight">
              {t("hero_subtitle", "AI SUMMIT")}
            </span>
          </h1>
          <h3 className="hero-event-details">
            {t("hero_location", "AHILYANAGAR")}{" "}
            <span className="text-divider">|</span>{" "}
            {t("hero_date", "24 APRIL 2026")}
          </h3>
          <p className="hero-foundation-tag">
            {t("hero_foundation", "By : Nitin Udmale Foundation")}
          </p>
          <p>
            {t(
              "hero_desc",
              "Bridging the gap between grassroots innovation and global technology through ethical mentorship and scalable AI infrastructure.",
            )}
          </p>
          <div className="hero-landing-cta">
            <Button
              onClick={() => setShowQR(true)}
              variant="outline"
              size="lg"
              className="qr-trigger-btn"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: "0.75rem" }}
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
                <line x1="17" y1="7" x2="17.01" y2="7" />
                <line x1="7" y1="17" x2="7.01" y2="17" />
                <line x1="17" y1="17" x2="17.01" y2="17" />
              </svg>
              {t("hero_qr", "QR Code")}
            </Button>
            <Button
              onClick={() => navigate("/register")}
              size="lg"
              className="premium-btn"
            >
              {t("hero_register", "Register")}
            </Button>
            <Button
              onClick={() => document.getElementById("about").scrollIntoView()}
              variant="outline"
              size="lg"
            >
              {t("hero_vision", "Our Vision")}
            </Button>
          </div>
        </div>
      </section>

      <SuccessStack />

      {/* SECTION: GUESTS - FEATURED VISITORS */}
      <section id="guests" className="home-speakers container reveal reveal-up">
        <div className="section-header text-center">
          <h2 style={{ fontWeight: "800", marginTop: "4rem" }}>
            {t("guests_title", "Our")}{" "}
            <span className="gradient-text">
              {t("guests_highlight", "Chief Guest")}
            </span>
          </h2>
        </div>
        <div className="chief-guest-photo-grid">
          {chiefGuestPhotos.map((g, i) => (
            <div
              key={i}
              className={`leadership-card guest-static-card reveal reveal-delay-${i % 4}`}
            >
              <div className="leadership-img-wrapper">
                <img src={g.image} alt={g.name} />
              </div>
              <div className="leadership-info">
                <h3>{g.name}</h3>
                <div
                  style={{
                    color: "var(--secondary)",
                    fontSize: "0.85rem",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginTop: "0.25rem",
                  }}
                >
                  {g.designation}
                </div>
              </div>
            </div>
          ))}
        </div>
        {chiefGuestTextOnly.length > 0 && (
          <div className="chief-guest-text-grid">
            {chiefGuestTextOnly.map((g, i) => (
              <div
                key={g.name}
                className={`leadership-card guest-static-card guest-text-card reveal reveal-delay-${i % 4}`}
              >
                <div className="leadership-info">
                  <h3>{g.name}</h3>
                  <div
                    style={{
                      color: "var(--secondary)",
                      fontSize: "0.85rem",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginTop: "0.25rem",
                    }}
                  >
                    {g.designation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SECTION: SPEAKERS - GLOBAL VOICES */}
      <section
        id="speakers"
        className="home-speakers container reveal reveal-up"
      >
        <div className="section-header text-center">
          <h2 style={{ fontWeight: "800", marginTop: "4rem" }}>
            {t("speakers_title", "Prominent")}{" "}
            <span className="gradient-text">
              {t("speakers_highlight", "Speakers")}
            </span>
          </h2>
          <p
            className="mx-auto"
            style={{ maxWidth: "600px", marginBottom: "3rem" }}
          >
            {t(
              "speakers_desc",
              "Meet the global thought leaders and experts leading the rural AI revolution.",
            )}
          </p>
        </div>
        <div className="leadership-grid">
          {speakers.map((s, i) => (
            <div
              key={i}
              className={`leadership-card reveal reveal-delay-${i % 4}`}
              onClick={() => setSelectedSpeaker(s)}
              style={{ cursor: "pointer" }}
            >
              <div className="leadership-img-wrapper">
                <img src={s.image} alt={s.name} />
              </div>
              <div className="leadership-info">
                <h3>{s.name}</h3>
                <div
                  style={{
                    color: "var(--secondary)",
                    fontSize: "0.85rem",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: "0.5rem",
                  }}
                >
                  {s.role}
                </div>
                <div
                  className="card-topic-wrapper"
                  style={{
                    marginTop: "auto",
                    paddingTop: "1rem",
                    borderTop: "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  <label
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: "800",
                      textTransform: "uppercase",
                      color: "var(--primary)",
                      letterSpacing: "0.05em",
                      display: "block",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {t("agenda_table_topic", "Topic")}
                  </label>
                  <p
                    className="designation"
                    style={{
                      margin: 0,
                      fontSize: "0.9rem",
                      color: "#4b5563",
                      fontWeight: "500",
                    }}
                  >
                    {s.topic}
                  </p>
                </div>
                <div
                  className="click-indicator"
                  style={{ marginTop: "0.75rem" }}
                >
                  {t("speaker_view_profile", "View Profile →")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: NARRATIVE - THE IMPACT STORY */}
      <section id="about" className="narrative-modern">
        <div className="container">
          <div className="narrative-inner">
            <div className="narrative-text">
              <span className="section-tag-modern">
                {t("narrative_strategic", "STRATEGIC VISION")}
              </span>
              <h2 className="narrative-title">
                {t("narrative_democratizing", "Democratizing")} <br />
                <span className="highlight-blue">
                  {t("narrative_agentic", "Agentic Intelligence")}
                </span>
              </h2>
              <p className="narrative-p">{t("about_p1")}</p>
              <p className="narrative-p">{t("about_mission_desc")}</p>
            </div>
            <div
              className="narrative-visual-modern"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="vision-launch-section"
                style={{ marginTop: 0, padding: "2.5rem" }}
              >
                <h4
                  style={{
                    color: "var(--foreground)",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t(
                    "narrative_conclusion",
                    "Conclusion and vision Announcement",
                  )}
                </h4>
                <p
                  style={{
                    color: "var(--secondary)",
                    fontWeight: "700",
                    marginBottom: "2rem",
                  }}
                >
                  - {t("speaker_1_name", "Dr Amit Andre")}
                </p>

                <div
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    color: "var(--foreground)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {t("narrative_launch_tag", "- LAUNCH OF -")}
                </div>
                <h2
                  className="vision-launch-title"
                  style={{ fontSize: "1.8rem" }}
                >
                  {t(
                    "narrative_launch_mission",
                    "AI GRAMIN MAHARASHTRA MISSION",
                  )}
                </h2>

                <div className="vision-launch-icons">
                  <div className="vision-icon-item" style={{ width: "120px" }}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2635/2635293.png"
                      alt="AI Smart Villages"
                      style={{ width: "50px", height: "50px" }}
                    />
                    <span style={{ fontSize: "0.85rem" }}>
                      {t("narrative_villages", "AI SMART VILLAGES")}
                    </span>
                  </div>
                  <div className="vision-icon-item" style={{ width: "120px" }}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3676/3676059.png"
                      alt="Rural AI Startup"
                      style={{ width: "50px", height: "50px" }}
                    />
                    <span style={{ fontSize: "0.85rem" }}>
                      {t("narrative_startup", "RURAL STARTUP")}
                    </span>
                  </div>
                  <div className="vision-icon-item" style={{ width: "120px" }}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3356/3356064.png"
                      alt="Village AI Labs"
                      style={{ width: "50px", height: "50px" }}
                    />
                    <span style={{ fontSize: "0.85rem" }}>
                      {t("narrative_labs", "VILLAGE AI LABS")}
                    </span>
                  </div>
                </div>

                <div
                  className="vision-winner-box"
                  style={{ paddingTop: "1.5rem" }}
                >
                  <h4 style={{ fontSize: "1rem" }}>
                    {t("narrative_winner", "WINNER OF CONTEST")}
                  </h4>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--foreground)",
                      marginBottom: "0.2rem",
                    }}
                  >
                    {t("narrative_felicitation", "- Felicitation By -")}
                  </div>
                  <h3 style={{ fontSize: "1.2rem" }}>
                    {t("narrative_felicitator", "HON. SOMNATHJI GHARGE")}
                  </h3>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--foreground)",
                      fontWeight: "500",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {t("narrative_felicitator_role", "SP, Ahilyanagar.")}
                  </div>

                  <div
                    className="contact-minimal"
                    style={{
                      borderTop: "1px solid #f1f5f9",
                      paddingTop: "1.5rem",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: "800",
                        color: "#94a3b8",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {t("contact_label", "- CONTACT -")}
                    </div>
                    <h4
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: "800",
                        color: "#0f172a",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {t("contact_name", "NITIN UDMALE")}
                    </h4>
                    <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
                      {t("contact_call", "Call")}: 9112012291 |{" "}
                      {t("contact_email", "Email")}:
                      aisummitahilyanagar@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: EVENT SCHEDULE */}
      <section id="agenda" className="event-schedule reveal reveal-up">
        <div className="agenda-title-group">
          <div className="section-tag-modern">
            {t("agenda_tag", "Event Agenda")}
          </div>
          <h2 className="agenda-main-heading">
            {t("agenda_title", "Gramin AI")}{" "}
            <span className="highlight-purple">
              {t("agenda_highlight", "Summit 2026")}
            </span>
          </h2>
          <p className="agenda-quote">
            "
            {t(
              "agenda_banner_quote",
              "AI is shaping the future of Bharat, Ahilyanagar has the potential to emerge prominently on AI and startup map of country.",
            )}
            "
          </p>
          <div className="agenda-author">
            - {t("agenda_banner_author", "Nitin Udmale")}
          </div>
        </div>

        <div className="ahilyanagar-banner reveal-up">
          <div className="banner-title-text">
            {t("agenda_banner_title", "A H I L Y A N A G A R")
              .split(" ")
              .map(
                (part, index) =>
                  part.trim() !== "" && (
                    <span
                      key={index}
                      className="banner-letter"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      {part}
                    </span>
                  ),
              )}
          </div>
          <div className="banner-status-text">
            {t("agenda_banner_status", "AHILYANAGAR IS READY TO STAND OUT!")}
          </div>
        </div>

        <div className="event-info-container text-center">
          <div className="event-info-box">
            <div className="event-day">{t("agenda_friday", "FRIDAY")}</div>
            <div className="event-divider"></div>
            <div className="event-date">
              <span className="date-number">{t("agenda_date_val", "24")}</span>
              <div className="date-month-year">
                <span className="date-month">{t("agenda_april", "APRIL")}</span>
                <span className="date-year">
                  {t("agenda_year_val", "2026")}
                </span>
              </div>
            </div>
            <div className="event-divider"></div>
            <div className="event-time">
              <span className="time-label">
                {t("agenda_time_label", "TIME")}
              </span>
              <span className="time-value">
                {t("agenda_time_val", "9 AM TO 5 PM")}
              </span>
            </div>

            <div className="event-location-badge">
              {t("agenda_location_label", "- LOCATION -")}
            </div>
          </div>
          <h3 className="event-location-text">
            {t("agenda_location_val", "MAULI SANKUL, SAVEDI")}
          </h3>
        </div>
        <div
          className="pro-agenda-table-wrapper mx-auto mt-4"
          style={{ maxWidth: "1100px", padding: "0 1rem", overflowX: "auto" }}
        >
          <table
            style={{
              width: "100%",
              minWidth: "700px",
              borderCollapse: "collapse",
              backgroundColor: "#fff",
              fontSize: "0.95rem",
            }}
          >
            <tbody>
              {agenda.map((item, i) => {
                if (item.type === "header") {
                  return (
                    <tr key={i}>
                      <td
                        colSpan="3"
                        style={{
                          background:
                            "linear-gradient(90deg, #d946ef 0%, #0369a1 100%)",
                          color: "#ffffff",
                          padding: "1rem",
                          textAlign: "center",
                          fontSize: "1.25rem",
                          fontWeight: "500",
                          border: "1.5px solid #0369a1",
                          borderLeftColor: "#d946ef",
                        }}
                      >
                        {item.text}
                      </td>
                    </tr>
                  );
                }

                if (item.type === "span") {
                  return (
                    <tr key={i}>
                      <td
                        style={{
                          padding: "0.75rem 1rem",
                          border: "1.5px solid #0284c7",
                          borderLeftColor: "#d946ef",
                          borderBottomColor: "#d946ef",
                          fontWeight: "500",
                          color: "#1e293b",
                          textAlign: "center",
                          whiteSpace: "nowrap",
                          width: "22%",
                        }}
                      >
                        {item.time}
                      </td>
                      {item.col2 === "" ? (
                        <td
                          colSpan="2"
                          style={{
                            padding: "0.75rem 1rem",
                            border: "1.5px solid #0284c7",
                            color: "#0f172a",
                            fontWeight: "600",
                          }}
                        >
                          {item.col1}
                        </td>
                      ) : (
                        <>
                          <td
                            style={{
                              padding: "0.75rem 1rem",
                              border: "1.5px solid #0284c7",
                              color: "#0f172a",
                              fontWeight: "600",
                            }}
                          >
                            {item.col1}
                          </td>
                          <td
                            style={{
                              padding: "0.75rem 1rem",
                              border: "1.5px solid #0284c7",
                              color: "#0f172a",
                              fontWeight: "600",
                              textAlign: "center",
                            }}
                          >
                            {item.col2}
                          </td>
                        </>
                      )}
                    </tr>
                  );
                }

                if (item.type === "subheader") {
                  return (
                    <tr key={i}>
                      <td
                        style={{
                          background:
                            "linear-gradient(90deg, #d946ef 0%, #0369a1 100%)",
                          color: "#ffffff",
                          padding: "0.75rem 1rem",
                          textAlign: "center",
                          fontWeight: "600",
                          border: "1.5px solid #0369a1",
                          borderLeftColor: "#d946ef",
                        }}
                      >
                        {item.cols[0]}
                      </td>
                      <td
                        style={{
                          background:
                            "linear-gradient(90deg, #0369a1 0%, #0369a1 100%)",
                          color: "#ffffff",
                          padding: "0.75rem 1rem",
                          textAlign: "center",
                          fontWeight: "600",
                          border: "1.5px solid #0369a1",
                        }}
                      >
                        {item.cols[1]}
                      </td>
                      <td
                        style={{
                          background:
                            "linear-gradient(90deg, #0369a1 0%, #312e81 100%)",
                          color: "#ffffff",
                          padding: "0.75rem 1rem",
                          textAlign: "center",
                          fontWeight: "600",
                          border: "1.5px solid #0369a1",
                        }}
                      >
                        {item.cols[2]}
                      </td>
                    </tr>
                  );
                }

                if (item.type === "lunch") {
                  return (
                    <tr key={i}>
                      <td
                        style={{
                          padding: "1rem",
                          border: "1.5px solid #0284c7",
                          borderLeftColor: "#d946ef",
                          borderBottomColor: "#d946ef",
                          fontWeight: "500",
                          color: "#1e293b",
                          textAlign: "center",
                          whiteSpace: "nowrap",
                          width: "22%",
                        }}
                      >
                        {item.time}
                      </td>
                      <td
                        style={{
                          padding: "1rem",
                          border: "1.5px solid #0284c7",
                          borderBottomColor: "#0284c7",
                          color: "#d946ef",
                          fontWeight: "700",
                          textAlign: "center",
                        }}
                      >
                        {item.text}
                      </td>
                      <td
                        style={{
                          padding: "1rem",
                          border: "1.5px solid #0284c7",
                          borderBottomColor: "#0284c7",
                          color: "#d946ef",
                          fontWeight: "700",
                          textAlign: "center",
                        }}
                      >
                        {item.text}
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr key={i}>
                    <td
                      style={{
                        padding: "1.25rem 1rem",
                        border: "1.5px solid #0284c7",
                        borderLeftColor: "#d946ef",
                        borderBottomColor: "#d946ef",
                        fontWeight: "500",
                        color: "#1e293b",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                        width: "22%",
                      }}
                    >
                      {item.time}
                    </td>
                    <td
                      style={{
                        padding: "1rem",
                        border: "1.5px solid #0284c7",
                        width: "38%",
                      }}
                    >
                      {item.speakers ? (
                        item.speakers.map((s, idx) => (
                          <div
                            key={idx}
                            style={{
                              marginBottom:
                                idx < item.speakers.length - 1 ? "0.75rem" : 0,
                            }}
                          >
                            <div
                              style={{
                                fontWeight: "700",
                                color: "#0f172a",
                                marginBottom: "0.1rem",
                                whiteSpace: "pre-line",
                              }}
                            >
                              {s.name}
                            </div>
                            <div
                              style={{
                                fontSize: "0.7rem",
                                color: "#475569",
                                lineHeight: "1.3",
                                whiteSpace: "pre-line",
                              }}
                            >
                              {s.role}
                            </div>
                          </div>
                        ))
                      ) : (
                        <>
                          <div
                            style={{
                              fontWeight: "700",
                              color: "#0f172a",
                              marginBottom: "0.15rem",
                              whiteSpace: "pre-line",
                            }}
                          >
                            {item.name}
                          </div>
                          <div
                            style={{
                              fontSize: "0.7rem",
                              color: "#475569",
                              lineHeight: "1.3",
                              whiteSpace: "pre-line",
                            }}
                          >
                            {item.desc}
                          </div>
                        </>
                      )}
                    </td>
                    <td
                      style={{
                        padding: "1.25rem 1rem",
                        border: "1.5px solid #0284c7",
                        fontWeight: "500",
                        color: "#1e293b",
                        width: "40%",
                      }}
                    >
                      {item.topic}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 2: OFFERINGS - INDUSTRIAL REVOLUTION GRID */}
      <section id="features" className="offerings">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">
              {t("features_tag", "Core Capabilities")}
            </span>
            <h2>
              {t("features_heading", "What We")}{" "}
              <span className="gradient-text">
                {t("features_highlight", "Nurture")}
              </span>
            </h2>
            <p className="mx-auto" style={{ maxWidth: "600px" }}>
              {t(
                "features_desc",
                "Providing high-throughput services designed to nourish rural entrepreneurial ecosystems with professional-grade intelligence.",
              )}
            </p>
          </div>
          <div className="offerings-layout mt-10  ">
            {offerings.map((o, i) => (
              <div
                key={i}
                className={`offering-item reveal reveal-up reveal-delay-${i}`}
                onClick={() => setSelectedOffering(o)}
                style={{ cursor: "pointer" }}
              >
                <div className="offering-header">
                  <div className="offering-icon">{o.icon}</div>
                  <h3>{o.title}</h3>
                </div>
                <p>{o.text}</p>
                <div className="offering-action">
                  {t("offering_explore", "Explore Module →")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFERING DETAILS OVERLAY */}
      {selectedOffering && (
        <div
          className="speaker-modal-overlay"
          onClick={() => setSelectedOffering(null)}
        >
          <div
            className="speaker-modal-content offering-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-modal"
              onClick={() => setSelectedOffering(null)}
            >
              ×
            </button>
            <div className="modal-info" style={{ paddingTop: "3rem" }}>
              <div
                className="modal-header-inline"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div className="offering-icon" style={{ fontSize: "3.5rem" }}>
                  {selectedOffering.icon}
                </div>
                <div>
                  <span className="modal-tag">
                    {t("offering_tag", "Core Capability")}
                  </span>
                  <h2 style={{ margin: 0 }}>{selectedOffering.title}</h2>
                </div>
              </div>
              <p
                className="modal-topic"
                style={{ fontSize: "1.5rem", marginTop: "1rem" }}
              >
                {selectedOffering.text}
              </p>
              <div className="modal-desc" style={{ marginTop: "2rem" }}>
                <h5>{t("offering_overview", "Module Overview")}</h5>
                <p>{selectedOffering.detail}</p>
              </div>
              <div
                className="modal-designation"
                style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}
              >
                <Button onClick={() => navigate("/register")} size="lg">
                  {t("offering_apply", "Apply for Access")}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedOffering(null)}
                  size="lg"
                >
                  {t("offering_later", "Maybe Later")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: HOW IT WORKS */}
      <section className="how-it-works container reveal reveal-up">
        <div className="section-header text-center mt-6 mb-4">
          <span className="section-tag ">{t("process_tag", "Process")}</span>
          <h2>
            {t("process_title", "The")}{" "}
            <span className="gradient-text">
              {t("process_highlight", "Innovation Journey")}
            </span>
          </h2>
          <p
            className="mx-auto"
            style={{ maxWidth: "600px", marginBottom: "2rem" }}
          >
            {t(
              "process_desc",
              "Four structured steps to turn a conceptual rural AI project into a scalable, high-impact reality.",
            )}
          </p>
        </div>
        <div className="steps-container">
          {steps.map((step, i) => (
            <div key={i} className={`step-card reveal reveal-delay-${i}`}>
              <div className="step-number">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: RECOGNITION & MARKET ACCESS (NEW) */}
      <section className="benefits-section reveal reveal-up">
        <div className="container">
          <div className="section-header text-center mt-6 mb-6">
            <span className="section-tag">
              {t("benefits_tag", "Ecosystem Rewards")}
            </span>
            <h2 className="narrative-title">
              <span className="brand-highlight">
                {t("benefits_title", "Gramin AI")}
              </span>{" "}
              <span className="highlight-blue">
                {t("benefits_highlight", "Summit 2026")}
              </span>
            </h2>
            <p className="mx-auto" style={{ maxWidth: "700px" }}>
              {t(
                "benefits_desc",
                "Beyond mentorship, we ensure every innovator gains official recognition and a direct pipeline into the global AI business landscape.",
              )}
            </p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-header">
                <div className="benefit-icon">🎓</div>
                <h3>
                  {t(
                    "benefit_cert_title",
                    "Official AI Participation Certificate",
                  )}
                </h3>
              </div>
              <p>
                {t(
                  "benefit_cert_desc",
                  "Every submitted and validated project receives an official Gramin AI Participation Certificate, co-signed by our global research partners.",
                )}
              </p>
            </div>

            <div className="benefit-card secondary">
              <div className="benefit-header">
                <div className="benefit-icon">🏢</div>
                <h3>{t("benefit_hub_title", "AI Business Marketplace")}</h3>
              </div>
              <p>
                {t(
                  "benefit_hub_desc",
                  "Gain exclusive access to the 'Gramin AI Business Hub' where verified AI enterprises post recruitment calls.",
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: PROJECTS */}
      <section
        id="projects"
        className="projects-section py-20 reveal reveal-up"
      >
        <div className="container">
          <div className="section-header text-center mb-8">
            <span className="section-tag">
              {t("impact_tag", "Direct Action")}
            </span>
            <h2>
              {t("impact_title", "Live Rural")}{" "}
              <span className="gradient-text">
                {t("impact_highlight", "Impact")}
              </span>
            </h2>
            <p className="mx-auto" style={{ maxWidth: "600px" }}>
              {t(
                "impact_desc",
                "Explore the active technical implementations currently transforming village connectivity and industrial output.",
              )}
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2.5rem",
            }}
          >
            {projects.map((p, i) => (
              <div
                key={i}
                className="project-card-premium group"
                style={{
                  background: "#ffffff",
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(168, 85, 247, 0.08)",
                  border: "1px solid #d8b4fe",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.4s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-8px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <div
                  className="project-img-h"
                  style={{
                    height: "240px",
                    background: "linear-gradient(135deg, #f3f0ff, #ede9fe)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.transform = "scale(1.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.transform = "scale(1)")
                    }
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "1.5rem",
                      left: "1.5rem",
                      background: "rgba(255,255,255,0.2)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      padding: "0.5rem 1rem",
                      borderRadius: "100px",
                      color: "white",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                    }}
                  >
                    {p.status}
                  </div>
                </div>
                <div
                  className="project-body-p"
                  style={{
                    padding: "2.5rem",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      marginBottom: "1rem",
                      color: "#0f172a",
                      fontFamily: "var(--font-serif)",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      color: "#4b5563",
                      lineHeight: "1.6",
                      marginBottom: "2rem",
                      flex: 1,
                    }}
                  >
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS CAROUSEL */}
      <NewsCarousel />

      {/* SECTION: Global Stats - Grounded Separator */}
      <section className="stats-strip">
        <div className="container reveal reveal-up">
          <div className="section-header text-center mb-6">
            <span className="section-tag">
              {t("stats_tag", "ECOSYSTEM METRICS")}
            </span>
            <h2 style={{ marginBottom: "1rem" }}>
              {t("stats_title", "Global")}{" "}
              <span className="gradient-text">
                {t("stats_highlight", "Impact")}
              </span>
              {t("stats_title_end", " at Scale")}
            </h2>
            <p
              className="mx-auto"
              style={{ maxWidth: "600px", marginBottom: "4rem" }}
            >
              {t(
                "stats_desc",
                "Measuring our relentless growth across rural tech ecosystems and high-throughput innovation pipelines.",
              )}
            </p>
          </div>
          <div className="hero-stats-row reveal reveal-delay-1">
            <div className="stat-card-glass">
              <h2>{t("stat_interactions_val", "70K+")}</h2>
              <h4>{t("stat_interactions_label", "Total Interactions")}</h4>
              <p>
                {t(
                  "stat_interactions_desc",
                  "Total number of entries received in the last 30 days.",
                )}
              </p>
            </div>
            <div className="stat-card-glass">
              <h2>{t("stat_visitors_val", "2.9M+")}</h2>
              <h4>{t("stat_visitors_label", "Total Visitors")}</h4>
              <p>
                {t(
                  "stat_visitors_desc",
                  "Overall number of visitors to the system/portal.",
                )}
              </p>
            </div>
            <div className="stat-card-glass">
              <h2>{t("stat_pilots_val", "26")}</h2>
              <h4>{t("stat_pilots_label", "Active Pilots")}</h4>
              <p>
                {t(
                  "stat_pilots_desc",
                  "Total active rural pilot programs currently deployed.",
                )}
              </p>
            </div>
            <div className="stat-card-glass">
              <h2>{t("stat_innovators_val", "22K+")}</h2>
              <h4>{t("stat_innovators_label", "Registered Innovators")}</h4>
              <p>
                {t(
                  "stat_innovators_desc",
                  "Total number of innovators registered in the ecosystem.",
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SPEAKER DETAILS OVERLAY */}
      {selectedSpeaker && (
        <div
          className="speaker-modal-overlay"
          onClick={() => setSelectedSpeaker(null)}
        >
          <div
            className="speaker-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-modal"
              onClick={() => setSelectedSpeaker(null)}
            >
              ×
            </button>
            <div className="modal-body">
              <div className="modal-img">
                <img src={selectedSpeaker.image} alt={selectedSpeaker.name} />
              </div>
              <div className="modal-info">
                <span className="modal-tag">
                  {t("speaker_tag", "Featured Profile")}
                </span>
                <h2>{selectedSpeaker.name}</h2>
                <div
                  style={{
                    color: "var(--secondary)",
                    fontSize: "1rem",
                    fontWeight: "800",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "1rem",
                  }}
                >
                  {selectedSpeaker.role}
                </div>
                <h4 className="modal-topic">{selectedSpeaker.topic}</h4>
                {selectedSpeaker.qualification && (
                  <div className="modal-desc">
                    <h5>{t("speaker_bio_label", "Qualification & Bio")}</h5>
                    <p>{selectedSpeaker.qualification}</p>
                  </div>
                )}
                <div className="modal-designation">
                  {selectedSpeaker.designation}
                </div>
                <Button
                  onClick={() => setSelectedSpeaker(null)}
                  variant="primary"
                  style={{ marginTop: "2rem" }}
                >
                  {t("speaker_close", "Close Details")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: TESTIMONIALS */}
      <section className="testimonials parallax-section reveal reveal-up">
        <div className="container text-center">
          <span className="section-tag">
            {t("testimonials_tag", "Success Stories")}
          </span>
          <h2>
            {t("testimonials_title", "Voices of")}{" "}
            <span className="gradient-text">
              {t("testimonials_highlight", "Impact")}
            </span>
          </h2>
          <div className="marquee-container mt-10">
            <div className="marquee-track">
              {[...testimonials, ...testimonials].map((t, i) => (
                <div key={i} className="testimonial-card">
                  <div className="quote-mark">"</div>
                  <p className="quote-text">{t.quote}</p>
                  <div
                    className="quote-author"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      marginTop: "auto",
                    }}
                  >
                    <div>
                      <h4>{t.author}</h4>
                      <span>{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: FINAL CTA */}
      <section
        id="register"
        className="final-cta parallax-section reveal reveal-up"
      >
        <div className="container text-center">
          <span
            className="section-tag"
            style={{ background: "rgba(255,255,255,0.2)", color: "white" }}
          >
            {t("cta_tag", "ACTION HUB")}
          </span>
          <h2 style={{ color: "white" }}>
            {t("cta_title", "Ready to")}{" "}
            <span className="gradient-text">
              {t("cta_highlight", "Transform")}
            </span>
            {t("cta_title_end", " the Rural Future?")}
          </h2>
          <p
            className="mx-auto"
            style={{
              maxWidth: "600px",
              marginBottom: "3rem",
            }}
          >
            {t(
              "cta_desc",
              "Join thousands of innovators and mentors. Be part of the ecosystem that's defining the next industrial revolution.",
            )}
          </p>
          <Button
            onClick={() => navigate("/register")}
            size="lg"
            variant="primary"
            style={{
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            }}
          >
            {t("cta_btn", "Start Your Journey Today")}
          </Button>
        </div>
      </section>

      <section
        className="sponsors-section"
        style={{
          background: "#ffffff",
          padding: "4rem 0",
          textAlign: "center",
        }}
      >
        <div className="container">
          <div className="sponsor-divider-dark mb-12">
            <span className="divider-text-dark">{t("sponsors_label")}</span>
          </div>

          <div className="marquee-sponsors-container">
            <div className="marquee-sponsors">
              {[1, 2].map((loopIndex) => (
                <React.Fragment key={loopIndex}>
                  <div className="sponsor-marquee-item">
                    <label>{t("sponsor_co_title")}</label>
                    <img
                      src={process.env.PUBLIC_URL + "/COORGANISERS.png"}
                      alt={t("sponsor_co_title")}
                    />
                  </div>
                  <div className="sponsor-marquee-item">
                    <label>{t("sponsor_digital", "Digital Partner")}</label>
                    <img
                      src={process.env.PUBLIC_URL + "/DigitalPartner.jpg"}
                      alt={t("sponsor_digital", "Digital Partner")}
                    />
                  </div>
                  <div className="sponsor-marquee-item">
                    <label>{t("sponsor_tech", "Tech Partner")}</label>
                    <img
                      src={process.env.PUBLIC_URL + "/TechPartner.jpg"}
                      alt={t("sponsor_tech", "Tech Partner")}
                    />
                  </div>
                  <div className="sponsor-marquee-item">
                    <label>{t("sponsor_outdoor", "Outdoor Partner")}</label>
                    <img
                      src={process.env.PUBLIC_URL + "/OutdoorPartner.jpg"}
                      alt={t("sponsor_outdoor", "Outdoor Partner")}
                    />
                  </div>
                  <div className="sponsor-marquee-item">
                    <label>{t("sponsor_placement", "Placement Partner")}</label>
                    <img
                      src={process.env.PUBLIC_URL + "/PlacmentPartner.png"}
                      alt={t("sponsor_placement", "Placement Partner")}
                    />
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QR CODE MODAL */}
      {showQR && (
        <div
          className="speaker-modal-overlay"
          onClick={() => setShowQR(false)}
          style={{ zIndex: 10000 }}
        >
          <div
            className="speaker-modal-content qr-modal modern-glass"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "420px",
              background: "rgba(255, 255, 255, 0.98)",
              border: "1px solid rgba(168, 85, 247, 0.3)",
              borderRadius: "2rem",
              padding: "1.5rem",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <button className="close-modal" onClick={() => setShowQR(false)}>
              ×
            </button>
            <div
              className="modal-body"
              style={{ padding: "1rem 0 0.5rem", textAlign: "center" }}
            >
              <div className="qr-card-header" style={{ marginBottom: "1rem" }}>
                <span
                  className="modal-tag"
                  style={{
                    background: "rgba(124, 58, 237, 0.1)",
                    color: "var(--primary)",
                    padding: "4px 12px",
                    borderRadius: "50px",
                    fontSize: "0.7rem",
                    fontWeight: "800",
                  }}
                >
                  {t("hero_qr", "QR Code")}
                </span>
                <h2
                  style={{
                    marginTop: "0.5rem",
                    color: "#1e293b",
                    fontSize: "1.5rem",
                    fontWeight: "900",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {t("hero_register", "Register")} Now
                </h2>
              </div>

              <div
                className="qr-frame"
                style={{
                  background: "#ffffff",
                  padding: "1rem",
                  borderRadius: "1.5rem",
                  marginBottom: "1rem",
                  border: "1px solid #e2e8f0",
                  display: "inline-block",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
                }}
              >
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://graminai.tdtl.world/register"
                  alt="Registration QR Code"
                  className="qr-image"
                  style={{ width: "180px", height: "180px", display: "block" }}
                />
              </div>

              <div className="qr-modal-info" style={{ marginBottom: "1.5rem" }}>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: "0.85rem",
                    lineHeight: "1.5",
                    margin: "0 0 0.25rem 0",
                    padding: "0 1rem",
                  }}
                >
                  {t(
                    "hero_desc",
                    "Scan this code to instantly access the registration portal.",
                  )}
                </p>
                <div
                  style={{
                    fontWeight: "700",
                    color: "var(--primary)",
                    fontSize: "0.8rem",
                  }}
                >
                  graminai.tdtl.world/register
                </div>
              </div>

              <Button
                onClick={handleQRDownload}
                size="md"
                fullWidth
                loading={downloadingQR}
                className="premium-btn"
                style={{
                  borderRadius: "0.75rem",
                  height: "48px",
                  fontSize: "0.9rem",
                }}
              >
                {t("qr_download", "Download QR Image")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
