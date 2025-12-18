export const cities = [
    // Georgia
    { city: 'Duluth', state: 'Georgia', stateCode: 'GA', slug: 'duluth-staffing-agency' },
    { city: 'Atlanta', state: 'Georgia', stateCode: 'GA', slug: 'atlanta-staffing-agency' },
    { city: 'Savannah', state: 'Georgia', stateCode: 'GA', slug: 'savannah-staffing-agency' },
    { city: 'Monroe', state: 'Georgia', stateCode: 'GA', slug: 'monroe-staffing-agency' }, // Monroe (Walton County)

    // Alabama
    { city: 'Birmingham', state: 'Alabama', stateCode: 'AL', slug: 'birmingham-staffing-agency' },
    { city: 'Montgomery', state: 'Alabama', stateCode: 'AL', slug: 'montgomery-staffing-agency' },
    { city: 'Huntsville', state: 'Alabama', stateCode: 'AL', slug: 'huntsville-staffing-agency' },

    // Texas
    { city: 'Dallas', state: 'Texas', stateCode: 'TX', slug: 'dallas-staffing-agency' },
    { city: 'Houston', state: 'Texas', stateCode: 'TX', slug: 'houston-staffing-agency' },
    { city: 'Austin', state: 'Texas', stateCode: 'TX', slug: 'austin-staffing-agency' },


    // Tennessee
    { city: 'Nashville', state: 'Tennessee', stateCode: 'TN', slug: 'nashville-staffing-agency' },
    { city: 'Memphis', state: 'Tennessee', stateCode: 'TN', slug: 'memphis-staffing-agency' },
    { city: 'Chattanooga', state: 'Tennessee', stateCode: 'TN', slug: 'chattanooga-staffing-agency' },
]

export const getCityBySlug = (slug) => {
    return cities.find(c => c.slug === slug)
}

export const getCitiesByState = (stateCode) => {
    return cities.filter(c => c.stateCode.toLowerCase() === stateCode.toLowerCase())
}
