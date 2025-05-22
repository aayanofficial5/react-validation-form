import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    showPassword: false,
    phoneNumber: "",
    country: "",
    city: "",
    pan: "",
    aadhar: "",
    dialCode: "+91",
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [countryCodes, setCountryCodes] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countryRes = await fetch(
          "https://countriesnow.space/api/v0.1/countries"
        );
        const countryData = await countryRes.json();
        setCountryList(countryData.data || []);

        const codeRes = await fetch(
          "https://countriesnow.space/api/v0.1/countries/codes"
        );
        const codeData = await codeRes.json();
        setCountryCodes(codeData.data || []);
      } catch (err) {
        console.error(err);
        alert("Failed to load country and dial code data.");
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCountryChange = (e) => {
    const selected = e.target.value;
    const match = countryList.find((c) => c.country === selected);
    setFormData((prev) => ({
      ...prev,
      country: selected,
      city: "",
    }));
    setCityOptions(match?.cities || []);
  };

  useEffect(() => {
    const validate = () => {
      const newErrors = {};

      if (!formData.firstName.trim())
        newErrors.firstName = "First name is required";
      if (!formData.lastName.trim())
        newErrors.lastName = "Last name is required";
      if (!formData.username.trim())
        newErrors.username = "Username is required";

      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


      if (!emailPattern.test(formData.email))
        newErrors.email = "Enter a valid email";

      const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      if (!passwordPattern.test(formData.password))
        newErrors.password =
          "Password must have 8+ chars, uppercase, lowercase, number & symbol";

      if (!/^\d{7,15}$/.test(formData.phoneNumber))
        newErrors.phoneNumber = "Phone number must be between 7 to 15 digits";

      if (!formData.dialCode) newErrors.dialCode = "Country code is required";
      if (!formData.country) newErrors.country = "Country is required";
      if (!formData.city) newErrors.city = "City is required";

      if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.pan))
        newErrors.pan = "Invalid PAN format (e.g. ABCDE1234F)";

      if (!/^\d{12}$/.test(formData.aadhar))
        newErrors.aadhar = "Aadhar must be 12 digits";

      setErrors(newErrors);
      setIsValid(Object.keys(newErrors).length === 0);
    };

    validate();
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      navigate("/success", { state: { form: formData } });
    }
  };

  return (
    <div className="main">
      <h3>Registration Form</h3>
      <form onSubmit={handleSubmit}>
        {[
          { name: "firstName", placeholder: "First Name" },
          { name: "lastName", placeholder: "Last Name" },
          { name: "username", placeholder: "Username" },
          { name: "email", placeholder: "Email", type: "email" },
        ].map(({ name, placeholder, type = "text" }) => (
          <div key={name}>
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              value={formData[name]}
              onChange={handleChange}
            />
            {errors[name] && <div className="errorMsg">{errors[name]}</div>}
          </div>
        ))}

        <div>
          <input
            type={formData.showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <label className="toggle-password">
            <input
              type="checkbox"
              name="showPassword"
              checked={formData.showPassword}
              onChange={handleChange}
            />
            <p>Show_Password</p>
          </label>
          {errors.password && <div className="errorMsg">{errors.password}</div>}
        </div>

        <div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <select
              name="dialCode"
              value={formData.dialCode}
              onChange={handleChange}
              style={{ maxWidth: "100px" }}
            >
              {countryCodes.map((item) => (
                <option key={item.name} value={item.dial_code}>
                  {item.dial_code}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          {errors.phoneNumber && (
            <div className="errorMsg">{errors.phoneNumber}</div>
          )}
        </div>

        <div>
          <select
            name="country"
            value={formData.country}
            onChange={handleCountryChange}
          >
            <option value="">Select Country</option>
            {countryList.map(({ country }) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && <div className="errorMsg">{errors.country}</div>}
        </div>

        <div>
          <select name="city" value={formData.city} onChange={handleChange}>
            <option value="">Select City</option>
            {cityOptions.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && <div className="errorMsg">{errors.city}</div>}
        </div>

        <div>
          <input
            type="text"
            name="pan"
            placeholder="PAN No."
            value={formData.pan}
            onChange={handleChange}
          />
          {errors.pan && <div className="errorMsg">{errors.pan}</div>}
        </div>

        <div>
          <input
            type="text"
            name="aadhar"
            placeholder="Aadhar No."
            value={formData.aadhar}
            onChange={handleChange}
          />
          {errors.aadhar && <div className="errorMsg">{errors.aadhar}</div>}
        </div>

        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
