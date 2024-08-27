import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';


export const Footer = () => {
  return (
    <footer className="bg-[#351966] text-white py-6">
  <div className="container mx-auto text-center">
    <p>&copy; {new Date().getFullYear()} JobQuest. All rights reserved.</p>
    <div className="flex justify-center space-x-4 mt-4">
      <a href="/about" className="hover:text-gray-400">About Us</a>
      <a href="/contact" className="hover:text-gray-400">Contact</a>
      <a href="/privacy" className="hover:text-gray-400">Privacy Policy</a>
      <a href="/terms" className="hover:text-gray-400">Terms of Service</a>
    </div>
    <div className="mt-4">
      <p>Follow us on:</p>
      <div className="flex justify-center space-x-4 mt-2">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400"
        >
          <i className="fab fa-facebook-f"></i>
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400"
        >
          <i className="fab fa-twitter"></i>
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400"
        >
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>
    </div>
  </div>
</footer>


  )
}
