import React from 'react';
import Header from './components/Header';
import FilterPanel from './components/FilterPanel';
import DoctorSearch from './components/DoctorSearch';
import ActiveFilters from './components/ActiveFilters';
import DoctorList from './components/DoctorList';
import Footer from './components/Footer';
import useDoctors from './hooks/useDoctors';

function App() {
  const {
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
  } = useDoctors();

  return (
    <div className="min-h-screen pb-20">
      <div className="container mx-auto px-3 py-8 w-full">
        <Header />
        
        <div className="flex flex-col lg:flex-row lg:space-x-7">
          <FilterPanel 
            doctors={doctors}
            selectedType={selectedType} 
            setSelectedType={setSelectedType}
            selectedSpecialties={selectedSpecialties} 
            setSelectedSpecialties={setSelectedSpecialties}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onReset={resetFilters}
          />
          
          <main className="flex-1 w-full">
            <DoctorSearch 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery}
              doctors={doctors}
            />
            
            <ActiveFilters 
              searchQuery={searchQuery}
              selectedType={selectedType}
              selectedSpecialties={selectedSpecialties}
              sortBy={sortBy}
              onClearSearch={() => setSearchQuery('')}
              onClearType={() => setSelectedType('')}
              onClearSpecialty={(specialty) => 
                setSelectedSpecialties(selectedSpecialties.filter(s => s !== specialty))}
              onClearSort={() => setSortBy('none')}
            />
            
            <div className="flex items-center mb-3 flex-wrap">
              <h3 className="text-lg font-semibold text-indigo-700 mr-3 flex items-center">
                <i className="fa-solid fa-user-md mr-1"></i>
                {loading ? "Loading..." : `${filteredDoctors.length} Doctor${filteredDoctors.length !== 1 ? 's' : ''}`}
              </h3>
              <span id="active-summary" className="ml-1 text-sm text-gray-500"></span>
            </div>
            
            <DoctorList 
              doctors={filteredDoctors} 
              loading={loading} 
              error={error}
              searchQuery={searchQuery}
            />
          </main>
        </div>
        
        <Footer />
      </div>
    </div>
  );
}

export default App;
