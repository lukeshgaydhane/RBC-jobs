import React, { useState, useEffect, useContext, forwardRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import JobCard from '../components/JobCard'
import SearchFilters from '../components/SearchFilters'
import SelectedFiltersBar from '../components/SelectedFiltersBar'
import MobileFilterDrawer from '../components/MobileFilterDrawer'
import InstantSearchSuggestions from '../components/InstantSearchSuggestions'
import SkeletonJobCard from '../components/SkeletonJobCard';
import { Search, MapPin, Filter, SortAsc, Grid, List, Bookmark, Share2 } from 'lucide-react'
import Button from '../components/Button';

const JobSearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState('grid')
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    location: searchParams.get('location') || '',
    jobTypes: [],
    experienceLevels: [],
    salaryRange: null,
    datePosted: null
  })
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [searchSuggestions, setSearchSuggestions] = useState([])
  const [suggestionsLoading, setSuggestionsLoading] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)

  // 1. Add mock filterOptions and filterCounts for demonstration
  const filterOptions = {
    jobTypes: [
      { value: 'FULL_TIME', label: 'Full Time' },
      { value: 'PART_TIME', label: 'Part Time' },
      { value: 'CONTRACT', label: 'Contract' },
      { value: 'INTERNSHIP', label: 'Internship' },
      { value: 'FREELANCE', label: 'Freelance' }
    ],
    experienceLevels: [
      { value: 'ENTRY', label: 'Entry Level' },
      { value: 'JUNIOR', label: 'Junior' },
      { value: 'MID', label: 'Mid Level' },
      { value: 'SENIOR', label: 'Senior' },
      { value: 'LEAD', label: 'Lead' },
      { value: 'EXECUTIVE', label: 'Executive' }
    ],
    salaryRanges: [
      { min: 0, max: 300000, label: 'Under ₹3L' },
      { min: 300000, max: 600000, label: '₹3L - ₹6L' },
      { min: 600000, max: 1000000, label: '₹6L - ₹10L' },
      { min: 1000000, max: 1500000, label: '₹10L - ₹15L' },
      { min: 1500000, max: 2500000, label: '₹15L - ₹25L' },
      { min: 2500000, max: null, label: '₹25L+' }
    ],
    dateRanges: [
      { value: '1', label: 'Last 24 hours' },
      { value: '3', label: 'Last 3 days' },
      { value: '7', label: 'Last week' },
      { value: '30', label: 'Last month' }
    ],
    popularLocations: [
      'Bangalore, Karnataka',
      'Mumbai, Maharashtra',
      'Delhi, NCR',
      'Hyderabad, Telangana',
      'Chennai, Tamil Nadu',
      'Pune, Maharashtra',
      'Noida, Uttar Pradesh',
      'Gurgaon, Haryana'
    ]
  }
  const filterCounts = {
    jobTypes: {
      FULL_TIME: 1250,
      PART_TIME: 340,
      CONTRACT: 180,
      INTERNSHIP: 95,
      FREELANCE: 220
    },
    experienceLevels: {
      ENTRY: 450,
      JUNIOR: 680,
      MID: 890,
      SENIOR: 520,
      LEAD: 210,
      EXECUTIVE: 85
    },
    // Add more as needed
  }
  const [loadingCounts, setLoadingCounts] = useState(false)
  const onFilterSearch = (group, searchTerm) => {
    setLoadingCounts(true)
    // Simulate async fetch
    setTimeout(() => {
      setLoadingCounts(false)
      // Would update filterOptions/filterCounts based on searchTerm
    }, 500)
  }

  // Mock suggestion fetcher
  const fetchSuggestions = (query) => {
    setSuggestionsLoading(true)
    setTimeout(() => {
      if (!query) {
        setSearchSuggestions([])
        setSuggestionsLoading(false)
        return
      }
      // Simulate job title, company, location suggestions
      setSearchSuggestions([
        { type: 'title', value: 'Senior Software Engineer' },
        { type: 'title', value: 'Frontend Developer' },
        { type: 'company', value: 'TCS (Tata Consultancy Services)' },
        { type: 'company', value: 'Infosys Limited' },
        { type: 'location', value: 'Bangalore, Karnataka' },
        { type: 'location', value: 'Mumbai, Maharashtra' }
      ].filter(s => s.value.toLowerCase().includes(query.toLowerCase())))
      setSuggestionsLoading(false)
    }, 300)
  }

  // Sync filter state with URL and localStorage
  useEffect(() => {
    localStorage.setItem('jobFilters', JSON.stringify(filters))
  }, [filters])

  useEffect(() => {
    const stored = localStorage.getItem('jobFilters')
    if (stored) {
      setFilters(JSON.parse(stored))
    }
  }, [])

  // Mock data - replace with API call
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true)
      // Simulate API call
      setTimeout(() => {
        const mockJobs = [
          {
            id: 1,
            title: 'Senior Software Engineer',
            company: 'TCS (Tata Consultancy Services)',
            location: 'Bangalore, Karnataka',
            jobType: 'FULL_TIME',
            experienceLevel: 'SENIOR',
            minSalary: 1200000,
            maxSalary: 1800000,
            description: 'We are looking for a Senior Software Engineer to join our team...',
            skills: 'Java, Spring Boot, React, AWS',
            postedDate: '2024-01-15T10:00:00',
            isActive: true
          },
          {
            id: 2,
            title: 'Data Scientist',
            company: 'Infosys Limited',
            location: 'Mumbai, Maharashtra',
            jobType: 'FULL_TIME',
            experienceLevel: 'MID',
            minSalary: 800000,
            maxSalary: 1200000,
            description: 'Join our data science team to build innovative AI solutions...',
            skills: 'Python, Machine Learning, SQL, TensorFlow',
            postedDate: '2024-01-14T10:00:00',
            isActive: true
          },
          {
            id: 3,
            title: 'Product Manager',
            company: 'Wipro Technologies',
            location: 'Hyderabad, Telangana',
            jobType: 'FULL_TIME',
            experienceLevel: 'SENIOR',
            minSalary: 1000000,
            maxSalary: 1500000,
            description: 'Lead product strategy and development for our platform...',
            skills: 'Product Management, Agile, User Research, Analytics',
            postedDate: '2024-01-13T10:00:00',
            isActive: true
          },
          {
            id: 4,
            title: 'UX Designer',
            company: 'HCL Technologies',
            location: 'Noida, Uttar Pradesh',
            jobType: 'FULL_TIME',
            experienceLevel: 'MID',
            minSalary: 600000,
            maxSalary: 900000,
            description: 'Create beautiful and intuitive user experiences...',
            skills: 'Figma, User Research, Prototyping, Design Systems',
            postedDate: '2024-01-12T10:00:00',
            isActive: true
          },
          {
            id: 5,
            title: 'DevOps Engineer',
            company: 'Tech Mahindra',
            location: 'Pune, Maharashtra',
            jobType: 'FULL_TIME',
            experienceLevel: 'MID',
            minSalary: 700000,
            maxSalary: 1100000,
            description: 'Build and maintain our cloud infrastructure...',
            skills: 'Docker, Kubernetes, AWS, CI/CD',
            postedDate: '2024-01-11T10:00:00',
            isActive: true
          },
          {
            id: 6,
            title: 'Frontend Developer',
            company: 'L&T Infotech',
            location: 'Chennai, Tamil Nadu',
            jobType: 'CONTRACT',
            experienceLevel: 'JUNIOR',
            minSalary: 400000,
            maxSalary: 600000,
            description: 'Build responsive and interactive web applications...',
            skills: 'React, JavaScript, CSS, HTML',
            postedDate: '2024-01-10T10:00:00',
            isActive: true
          }
        ]
        setJobs(mockJobs)
        setLoading(false)
      }, 1000)
    }

    fetchJobs()
  }, [])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleSearch = () => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value && (Array.isArray(value) ? value.length > 0 : true)) {
        if (Array.isArray(value)) {
          value.forEach(v => params.append(key, v))
        } else {
          params.append(key, value)
        }
      }
    })
    setSearchParams(params)
  }

  const handleSaveJob = (jobId) => {
    console.log('Saving job:', jobId)
    // TODO: Implement save functionality
  }

  const handleShareJob = (job) => {
    console.log('Sharing job:', job)
    // TODO: Implement share functionality
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      location: '',
      jobTypes: [],
      experienceLevels: [],
      salaryRange: null,
      datePosted: null
    })
  }

  // Remove individual filter
  const handleRemoveFilter = (key, value) => {
    setFilters(prev => {
      if (Array.isArray(prev[key])) {
        return { ...prev, [key]: prev[key].filter(v => v !== value) }
      }
      return { ...prev, [key]: '' }
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {[...Array(6)].map((_, i) => (
              <SkeletonJobCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Filters Button */}
        <div className="lg:hidden mb-4 flex justify-end">
          <Button
            variant="primary"
            onClick={() => setMobileFiltersOpen(true)}
            aria-label="Open filters"
          >
            <Filter className="w-4 h-4 mr-2" /> Filters
          </Button>
        </div>
        {/* Selected Filters Bar */}
        <SelectedFiltersBar
          filters={filters}
          onRemoveFilter={handleRemoveFilter}
          onClearAll={clearFilters}
        />
        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters (Desktop) */}
          <div className="hidden lg:block">
            <SearchFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
              filterOptions={filterOptions}
              filterCounts={filterCounts}
              onFilterSearch={onFilterSearch}
              loadingCounts={loadingCounts}
            />
          </div>
          {/* Job List */}
          <div className="lg:col-span-3">
            {/* Search Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-2 relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Search Jobs</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Job title, keywords, or company"
                      value={filters.search}
                      onChange={e => {
                        handleFilterChange('search', e.target.value)
                        fetchSuggestions(e.target.value)
                      }}
                      onFocus={() => setSearchFocused(true)}
                      onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      autoComplete="off"
                      aria-label="Search Jobs"
                    />
                    <InstantSearchSuggestions
                      query={filters.search}
                      suggestions={searchFocused ? searchSuggestions : []}
                      onSelect={s => {
                        handleFilterChange('search', s.value)
                        setSearchFocused(false)
                      }}
                      loading={suggestionsLoading}
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {/* Sort */}
                  <div className="flex items-center space-x-2">
                    <SortAsc className="w-4 h-4 text-gray-500" />
                    <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option>Most Recent</option>
                      <option>Salary High to Low</option>
                      <option>Salary Low to High</option>
                      <option>Experience Level</option>
                    </select>
                  </div>
                  
                  {/* View Mode */}
                  <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                    <Button
                      variant="secondary"
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-colors duration-200 ${
                        viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-colors duration-200 ${
                        viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Listings */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2' 
                : 'grid-cols-1'
            }`}>
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onSave={handleSaveJob}
                  onShare={handleShareJob}
                />
              ))}
            </div>

            {/* Pagination */}
            {jobs.length > 0 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <Button variant="secondary" className="px-3 py-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    Previous
                  </Button>
                  <Button variant="primary" className="px-3 py-2 bg-primary-600 text-white border border-primary-600 rounded-lg">
                    1
                  </Button>
                  <Button variant="secondary" className="px-3 py-2 text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    2
                  </Button>
                  <Button variant="secondary" className="px-3 py-2 text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    3
                  </Button>
                  <Button variant="secondary" className="px-3 py-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    Next
                  </Button>
                </nav>
              </div>
            )}

            {/* No Results */}
            {jobs.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or filters to find more opportunities.
                </p>
                <Button
                  variant="primary"
                  onClick={clearFilters}
                  className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
        {/* Mobile Filter Drawer */}
        <MobileFilterDrawer open={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)}>
          <SearchFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
            filterOptions={filterOptions}
            filterCounts={filterCounts}
            onFilterSearch={onFilterSearch}
            loadingCounts={loadingCounts}
          />
        </MobileFilterDrawer>
      </div>
    </div>
  )
}

export default JobSearchPage; 