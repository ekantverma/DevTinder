import React from "react";
import { Link } from "react-router-dom";
import bgImg from "../assets/bg-img.jpg";

const MainPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <main className="flex-grow">
        <section
          className="h-screen flex items-center justify-center text-white bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${bgImg})` }}
        >
          <div className="container mx-auto px-4 text-center p-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              Welcome to Dev Tinder 👨‍💻
            </h1>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">
              Connecting developers, one swipe at a time.
            </p>
            <Link to="/login" className="inline-block">
              <div
                className="flex rounded-full mx-auto bg-gradient-to-tr from-red-400 via-orange-400 to-rose-400 p-px shadow-lg"
                style={{ maxWidth: "240px" }}
              >
                <span className="flex-1 font-bold text-xl bg-white text-blue-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  Get Started
                </span>
              </div>
            </Link>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100 drop-shadow-sm">
              Why Dev Tinder?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="bg-white dark:bg-gray-700 rounded-xl p-8 text-center shadow-lg transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  Connect with Like-minded Developers
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Discover and connect with developers who share your passion,
                  skills, and interests.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-700 rounded-xl p-8 text-center shadow-lg transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  Expand Your Network
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Build lasting relationships, collaborate on projects, and grow
                  your career.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-700 rounded-xl p-8 text-center shadow-lg transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  Smart Matching Algorithm
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our advanced algorithm helps you find the best matches based
                  on your unique profile.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-black text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 drop-shadow-md">
              Ready to Level Up Your Network?
            </h2>
            <p className="mb-8 drop-shadow-md">
              Join Dev Tinder today and start connecting with amazing
              developers.
            </p>
            <Link
              to="/signup"
              className="inline-block bg-white text-indigo-600 dark:text-indigo-900 font-semibold px-8 py-4 rounded-full hover:bg-gray-100 dark:hover:bg-gray-200 transition shadow-lg"
            >
              Sign Up Now
            </Link>
          </div>
        </section>
        <div className="max-w-xl mx-auto space-y-4 mt-10 mb-5">
          <div className="collapse collapse-plus border border-base-300 bg-base-200 rounded-box">
            <input type="radio" name="dev-tinder-accordion" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              What is Dev Tinder?
            </div>
            <div className="collapse-content">
              <p>
                Dev Tinder is a platform designed to connect developers for
                networking, collaboration, and career growth. It helps you find
                like-minded professionals and build meaningful relationships.
              </p>
            </div>
          </div>

          <div className="collapse collapse-plus border border-base-300 bg-base-200 rounded-box">
            <input type="radio" name="dev-tinder-accordion" />
            <div className="collapse-title text-xl font-medium">
              How do I sign up for Dev Tinder?
            </div>
            <div className="collapse-content">
              <p>
                You can sign up by clicking on the "Sign Up Now" button on our
                homepage, filling out your profile details, and verifying your
                email address.
              </p>
            </div>
          </div>

          <div className="collapse collapse-plus border border-base-300 bg-base-200 rounded-box">
            <input type="radio" name="dev-tinder-accordion" />
            <div className="collapse-title text-xl font-medium">
              Is Dev Tinder free to use?
            </div>
            <div className="collapse-content">
              <p>
                Yes, Dev Tinder is free to use with optional premium features
                available for enhanced functionality and networking
                opportunities.
              </p>
            </div>
          </div>

          <div className="collapse collapse-plus border border-base-300 bg-base-200 rounded-box">
            <input type="radio" name="dev-tinder-accordion" />
            <div className="collapse-title text-xl font-medium">
              What benefits do premium users get?
            </div>
            <div className="collapse-content">
              <p>
                Premium users enjoy exclusive features such as advanced search
                filters, priority matchmaking, and access to special networking
                events, helping you get the most out of your experience.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
