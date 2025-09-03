import React, { useState, useEffect } from "react";

const Form = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const formInfo = [
  {
    label: "First Name",
    type: "text",
    required: true,
    isEditable: true,
    slug: "first_name",
  },
  {
    label: "Last Name",
    type: "text",
    required: true,
    isEditable: true,
    slug: "last_name",
  },
  {
    label: "Email",
    type: "email",
    required: true,
    isEditable: true,
    slug: "email",
  },
  {
    label: "Password",
    type: "password",
    required: true,
    isEditable: true,
    slug: "password",
  },
  {
    label: "Age",
    type: "number",
    required: false,
    isEditable: true,
    slug: "age",
  },
  {
    label: "Phone Number",
    type: "tel",
    required: false,
    isEditable: true,
    slug: "phone_number",
  },
  {
    label: "Skills",
    type: "select",
    required: true,
    isEditable: true,
    slug: "skills",
    options: [
      { label: "React.js", value: 1 },
      { label: "Node.js", value: 2 },
      { label: "Python", value: 3 },
      { label: "Java", value: 4 },
    ],
  },
  {
    label: "Gender",
    type: "radio",
    required: true,
    isEditable: true,
    slug: "gender",
    options: [
      { label: "Male", value: "M" },
      { label: "Female", value: "F" },
      { label: "Other", value: "O" },
    ],
  },
  {
    label: "Hobbies",
    type: "checkbox",
    required: false,
    isEditable: true,
    slug: "hobbies",
    options: [
      { label: "Reading", value: "reading" },
      { label: "Traveling", value: "traveling" },
      { label: "Music", value: "music" },
      { label: "Gaming", value: "gaming" },
    ],
  },
  {
    label: "Date of Birth",
    type: "date",
    required: true,
    isEditable: true,
    slug: "dob",
  },
  {
    label: "Profile Picture",
    type: "file",
    required: false,
    isEditable: true,
    slug: "profile_picture",
  },
  {
    label: "Address",
    type: "textarea",
    required: false,
    isEditable: true,
    slug: "address",
  },
  {
    label: "Country",
    type: "select",
    required: true,
    isEditable: true,
    slug: "country",
    options: [
      { label: "India", value: 1 },
      { label: "USA", value: 2 },
      { label: "UK", value: 3 },
      { label: "Canada", value: 4 },
    ],
    // options: [
    //   { label: "India", value: "IN" },
    //   { label: "USA", value: "US" },
    //   { label: "UK", value: "UK" },
    //   { label: "Canada", value: "CA" },
    // ],
  },
];


  const validate = () => {
    const newErrors = {};
    formInfo.map((field) => {
      if (!formData[field.slug] && field.required) {
        newErrors[field.slug] = `${field.label} is required`;
      }
    });
    return newErrors;
  };

  const handleChange = (slug, value,type) => {
    console.log("slug", slug, "value", value);
    if(type === 'number' || type === 'select' ){

      setFormData({ ...formData, [slug]: Number(value)});
    }
    else{
      setFormData({ ...formData, [slug]: value });
    }
    setErrors({ ...errors, [slug]: "" });
  };

  const submitHandler = (e) => {
      e.preventDefault();
    //   console.log("errors",errors);
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log("formData", formData);
    }
  };

  const renderField = (field) => {
    switch (field.type) {
      case "text":
      case "number":
      case "email":
        return (
          <div key={field.slug} className="form-group">
            <label htmlFor={field.slug}>
              {field.label}
              {field.required && <sup>*</sup>}
            </label>
            <input
              id={field.slug}
              type={field.type}
              disabled={!field.isEditable}
              onChange={(e) => handleChange(field.slug, e.target.value,field.type)}
            />
            {(field.required && errors[field.slug]) && (
              <p className="error-message">{errors[field.slug]}</p>
            )}
          </div>
        );
      case "password":
        return (
          <div key={field.slug} className="form-group">
            <label htmlFor={field.slug}>
              {field.label}
              {field.required && <sup>*</sup>}
            </label>
            <input
              id={field.slug}
              type={field.type}
              disabled={!field.isEditable}
              onChange={(e) => handleChange(field.slug, e.target.value,field.type)}
            />
            {(field.required && errors[field.slug]) && (
              <p className="error-message">{errors[field.slug]}</p>
            )}
          </div>
        );

      case "select":
        return (
          <div key={field.slug} className="form-group">
            <label htmlFor={field.slug}>
              {field.label}
              {field.required && <sup>*</sup>}
            </label>
            <select
              id={field.slug}
              type={field.type}
              disabled={!field.isEditable}
              onChange={(e) => handleChange(field.slug, e.target.value,field.type)}
            >
              <option value="">select skill</option>
              {field.options.map((option) => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                );
              })}
            </select>
            {(field.required && errors[field.slug]) && (
              <p className="error-message">{errors[field.slug]}</p>
            )}
          </div>
        );
    
      case "radio":
        return (
          <div key={field.slug} className="form-group">
            <label>{field.label}{field.required && <sup>*</sup>}</label>
            {field.options.map((option) => (
              <div className="form-group-2" key={option.value}>
                <label htmlFor={`${field.slug}_${option.value}`}>
                  {option.label}
                </label>
                <input
                  type="radio"
                  id={`${field.slug}_${option.value}`}
                  value={option.value}
                  disabled={!field.isEditable}
                  onChange={(e) => handleChange(field.slug, e.target.value,field.type)}
                />
              </div>
            ))}
            {(field.required && errors[field.slug]) && (
              <p className="error-message">{errors[field.slug]}</p>
            )}
          </div>
        );
      case "checkbox":
        return (
          <div className="form-group">
            <label>{field.label}{field.required && <sup>*</sup>}</label>
            {field.options.map((option) => (
              <div className="form-group-2" key={option.value}>
                <label htmlFor={`${field.slug}_${option.value}`} >
                  {option.label}
                </label>
                <input
                  type="checkbox"
                  id={`${field.slug}_${option.value}`}
                  value={option.value}
                  disabled={!field.isEditable}
                  onChange={(e) => handleChange(field.slug, e.target.value,field.type)}
                />
              </div>
            ))}
            {(field.required && errors[field.slug]) && (
              <p className="error-message">{errors[field.slug]}</p>
            )}
          </div>
        );
      case "textarea":
        return (
          <div key={field.slug} className="form-group">
            <label htmlFor={field.slug}>{field.label}{field.required && <sup>*</sup>}</label>
            <textarea
              id={field.slug}
              rows={4}
              disabled={!field.isEditable}
              onChange={(e) => handleChange(field.slug, e.target.value,field.type)}
            />
            {(field.required && errors[field.slug]) && (
              <p className="error-message">{errors[field.slug]}</p>
            )}
          </div>
        );

      case "date":
        return (
          <div key={field.slug} className="form-group">
            <label htmlFor={field.slug}>{field.label}{field.required && <sup>*</sup>}</label>
            <input
              type="date"
              id={field.slug}
              disabled={!field.isEditable}
              onChange={(e) => handleChange(field.slug, e.target.value,field.type)}
            />
            {(field.required && errors[field.slug]) && (
              <p className="error-message">{errors[field.slug]}</p>
            )}
          </div>
        );
        case "file":
          return (
            <div key={field.slug} className="form-group">
              <label htmlFor={field.slug}>{field.label}{field.required && <sup>*</sup>}</label>
              <input
                type="file"
                id={field.slug}
                disabled={!field.isEditable}
                onChange={(e) => handleChange(field.slug, e.target.files[0],field.type)}
              />
              {(field.required && errors[field.slug]) && (
                <p className="error-message">{errors[field.slug]}</p>
              )}
            </div>
          );

      default:
        break;
    }
  };

  return (
    <div className="form-div">
      <div className="title"><h2>Dynamic form</h2></div>
      <form onSubmit={submitHandler} style={{ width: "90%" }} className="form-container">
        {formInfo.map((field) => renderField(field))}
        <div className="btn-div">
          <div className="btn-div-2">
          <button type="submit" className="signup-btn">
            submit
          </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
