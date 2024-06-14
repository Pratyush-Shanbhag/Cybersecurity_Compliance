import React, { useState } from 'react';
import './SurveyForm.css'; // Create and import a CSS file for styles

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    experience: "",
    age: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value,
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to server)
    console.log('Form data submitted:', formData);
  };

  return (
    <div>
      <h1>Survey Form</h1>
      <form id="form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name" id="label-name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="email" id="label-email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="experience" id="label-experience">
            Which option best describes your experience?
          </label>
          <select
            name="experience"
            id="experience"
            value={formData.experience}
            onChange={handleChange}
            required
          >
            <option value="">Please select</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="form-control">
          <label>Age</label>
          <label htmlFor="teen">
            <input
              type="radio"
              id="teen"
              name="age"
              value="Teen"
              checked={formData.age === 'Teen'}
              onChange={handleChange}
              required
            />
            Teen
          </label>
          <label htmlFor="adult">
            <input
              type="radio"
              id="adult"
              name="age"
              value="Adult"
              checked={formData.age === 'Adult'}
              onChange={handleChange}
            />
            Adult
          </label>
          <label htmlFor="senior">
            <input
              type="radio"
              id="senior"
              name="age"
              value="Senior"
              checked={formData.age === 'Senior'}
              onChange={handleChange}
            />
            Senior
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default SurveyForm;
