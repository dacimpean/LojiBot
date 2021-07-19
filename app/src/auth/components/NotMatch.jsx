import React from 'react';
import { Link } from 'react-router-dom';

export default function NotMatch() {
  return (
    <section
      className="d-flex
      flex-grow-1
      flex-column
      align-items-center
      justify-content-center
      bg-white
      st-404"
    >
      <h1 className="mb-0">404, Oops</h1>
      <h2 className="mb-3">Page not found</h2>
      <Link className="btn btn-outline-primary" to="/">
        Back to Loji
      </Link>
    </section>
  );
}
