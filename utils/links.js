const links = {
  home: '/',
  about: '/about',
  contact: '/contact',
  terms: '/terms-of-service',
  privacy: '/privacy-policy',

  // Dynamic links for slug-routes
  profile: (username) => `/profile/${username}`,
  product: (productId) => `/product/${productId}`,
  category: (categorySlug) => `/category/${categorySlug}`,

  // External links
  external: {
    github: 'https://github.com/yourproject',
    twitter: 'https://twitter.com/yourproject',
  },
}

export default links
