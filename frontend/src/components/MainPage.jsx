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
              Welcome to Dev Tinder
            </h1>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">
              Connecting developers, one swipe at a time.
            </p>
            <Link
              to="/login"
              className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition shadow-lg"
            >
              Get Started
            </Link>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100 drop-shadow-md">
              Why Dev Tinder?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-white dark:bg-gray-700 shadow-xl rounded-xl p-8 text-center transform transition hover:-translate-y-2 hover:shadow-2xl">
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  Connect with Like-minded Developers
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Discover and connect with developers who share your passion, skills, and interests.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-700 shadow-xl rounded-xl p-8 text-center transform transition hover:-translate-y-2 hover:shadow-2xl">
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  Expand Your Network
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Build lasting relationships, collaborate on projects, and grow your career.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-700 shadow-xl rounded-xl p-8 text-center transform transition hover:-translate-y-2 hover:shadow-2xl">
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  Smart Matching Algorithm
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our advanced algorithm helps you find the best matches based on your unique profile.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-900 dark:to-blue-900 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 drop-shadow-md">
              Ready to Level Up Your Network?
            </h2>
            <p className="mb-8 drop-shadow-md">
              Join Dev Tinder today and start connecting with amazing developers.
            </p>
            <Link
              to="/signup"
              className="inline-block bg-white text-indigo-600 dark:text-indigo-900 font-semibold px-8 py-4 rounded-full hover:bg-gray-100 dark:hover:bg-gray-200 transition shadow-lg"
            >
              Sign Up Now
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MainPage;

