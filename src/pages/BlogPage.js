import React from 'react';
import GridBackground from '../components/GridBackground';
import Header from '../components/Header';
import Blog from '../components/Blog';
import Footer from '../components/Footer';

//love for cooking, science based lifting, startupshell idea maybe photography

const BlogPage = () => {
  return (
    <div className="blog-page">
      <GridBackground />
      <Header />

      <div className="blog-container container">
        <main className="blog-main" role="main">
          <Blog />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default BlogPage;
