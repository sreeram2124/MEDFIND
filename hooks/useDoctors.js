import { useState, useEffect } from 'react';
import { API_URL, normalizeSpecialty, DEFAULT_AVATAR } from '../constants/data';

const useDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [sortBy, setSortBy] = useState('none');

  // Fetch doctors data
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        // Process and normalize data
        const processedData = data.map(d => ({
          name: d.name || "",
          specialities: Array.isArray(d.specialities)
            ? d.specialities.filter(s => !!s && !!s.name).map(s => ({ name: normalizeSpecialty(s.name) }))
            : [],
          experience: d.experience || "",
          languages: Array.isArray(d.languages) ? d.languages : [],
          fees: d.fees || "",
          video_consult: !!d.video_consult,
          in_clinic: !!d.in_clinic,
          clinic: d.clinic || {},
          doctor_introduction: d.doctor_introduction || "",
          photo: (typeof d.photo === "string" && d.photo && !d.photo.startsWith('data:image')) 
            ? d.photo 
            : DEFAULT_AVATAR
        }));
        
        setDoctors(processedData);
        setFilteredDoctors(processedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchDoctors();
  }, []);

  // Apply filters whenever filter criteria change
  useEffect(() => {
    const applyFilters = () => {
      let filtered = doctors.filter(doc => {
        // Apply search filter
        if (searchQuery && !doc.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }
        
        // Apply consultation type filter
        if (selectedType && 
            ((selectedType === 'video' && !doc.video_consult) || 
             (selectedType === 'clinic' && !doc.in_clinic))) {
          return false;
        }
        
        // Apply specialty filter
        if (selectedSpecialties.length > 0) {
          let docSpecs = doc.specialities 
            ? doc.specialities.map(s => normalizeSpecialty(String(s.name))) 
            : [];
            
          if (!selectedSpecialties.every(sel => docSpecs.includes(sel))) {
            return false;
          }
        }
        
        return true;
      });
      
      // Apply sorting
      if (sortBy === "fee-asc") {
        filtered.sort((a, b) => Number(cleanFee(a.fees)) - Number(cleanFee(b.fees)));
      } else if (sortBy === "fee-desc") {
        filtered.sort((a, b) => Number(cleanFee(b.fees)) - Number(cleanFee(a.fees)));
      } else if (sortBy === "exp-asc") {
        filtered.sort((a, b) => {
          let ea = Number((String(a.experience).match(/\d+/) || [])[0] || 0);
          let eb = Number((String(b.experience).match(/\d+/) || [])[0] || 0);
          return ea - eb;
        });
      } else if (sortBy === "exp-desc") {
        filtered.sort((a, b) => {
          let ea = Number((String(a.experience).match(/\d+/) || [])[0] || 0);
          let eb = Number((String(b.experience).match(/\d+/) || [])[0] || 0);
          return eb - ea;
        });
      }
      
      setFilteredDoctors(filtered);
    };
    
    if (doctors.length) {
      applyFilters();
    }
  }, [doctors, searchQuery, selectedType, selectedSpecialties, sortBy]);

  const cleanFee = (fee) => {
    let v = String(fee).replace(/^\s*₹\s*/,'').replace(/^\s*Rs[.]?\s*/i,'').replace(/^\s*INR\s*/i,'');
    return v.trim();
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedType('');
    setSelectedSpecialties([]);
    setSortBy('none');
  };

  return {
    doctors,
    filteredDoctors,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedType,
    setSelectedType,
    selectedSpecialties,
    setSelectedSpecialties,
    sortBy,
    setSortBy,
    resetFilters
  };
};

export default useDoctors;
