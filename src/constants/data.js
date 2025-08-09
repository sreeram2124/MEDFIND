export const SPECIALTY_LIST = [
    "General Physician", "Dentist", "Dermatologist", "Paediatrician", "Gynaecologist", "ENT", "Diabetologist",
    "Cardiologist", "Physiotherapist", "Endocrinologist", "Orthopaedic", "Ophthalmologist", "Gastroenterologist",
    "Pulmonologist", "Psychiatrist", "Urologist", "Dietitian/Nutritionist", "Psychologist", "Sexologist", "Nephrologist",
    "Neurologist", "Oncologist", "Ayurveda", "Homeopath"
  ];
  
  export const CONSULTATION_OPTIONS = [
    {label: "Video Consult", value: "video", icon: "fa-solid fa-video"},
    {label: "In Clinic", value: "clinic", icon: "fa-solid fa-house-medical"}
  ];
  
  export const DEFAULT_AVATAR = "https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/doctor.svg";
  
  // Normalize specialty names
  export const normalizeSpecialty = (spec) => {
    if (spec === "Gynaecologist and Obstetrician") return "Gynaecologist";
    return spec;
  };
  
  // Specialty icon mapping
  export const iconForSpecialty = (spec) => {
    const icons = {
      "Dentist": "fa-solid fa-tooth",
      "Dermatologist": "fa-solid fa-spa",
      "Gynaecologist": "fa-solid fa-female",
      "Cardiologist": "fa-solid fa-heart-pulse",
      "ENT": "fa-solid fa-ear-listen",
      "Paediatrician": "fa-solid fa-child-reaching",
      "Orthopaedic":"fa-solid fa-bone",
      "Physiotherapist":"fa-solid fa-dumbbell",
      "General Physician":"fa-solid fa-stethoscope",
      "Diabetologist":"fa-solid fa-syringe",
      "Endocrinologist":"fa-solid fa-vial",
      "Neurologist": "fa-solid fa-brain",
      "Oncologist":"fa-solid fa-ribbon",
      "Psychiatrist":"fa-solid fa-brain",
      "Urologist":"fa-solid fa-venus-mars",
      "Homeopath":"fa-solid fa-leaf",
      "Ayurveda": "fa-solid fa-seedling",
      "Gastroenterologist":"fa-solid fa-apple-whole",
      "Pulmonologist":"fa-solid fa-lungs",
      "Ophthalmologist":"fa-solid fa-eye",
      "Dietitian/Nutritionist":"fa-solid fa-carrot",
      "Psychologist":"fa-solid fa-user-nurse",
      "Sexologist":"fa-solid fa-heart",
      "Nephrologist":"fa-solid fa-disease"
    };
    
    if (icons[spec]) return <i className={`${icons[spec]} mr-1.5`}></i>;
    return <i className="fa-solid fa-user-md mr-1"></i>;
  };
  
  // Clean fee string
  export const cleanFee = (fee) => {
    let v = String(fee).replace(/^\s*₹\s*/,'').replace(/^\s*Rs[.]?\s*/i,'').replace(/^\s*INR\s*/i,'');
    return v.trim();
  };
  
  // Highlight text based on search query
  export const highlight = (txt, query) => {
    if (!query) return txt;
    
    const parts = txt.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <span key={index} className="bg-indigo-100 rounded px-1">{part}</span> : part
    );
  };
  
  export const API_URL = 'https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json';
  