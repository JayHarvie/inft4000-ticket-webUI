import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import './App.css';

function App() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [serverError, setServerError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const currentYear = new Date().getFullYear() % 100;

  const handleFormSubmit = async (data) => {
    setServerError("");
    setFieldErrors({});

    const formattedMonth = String(data.expirationMonth).padStart(2, "0");
    const formattedYear = String(data.expirationYear).padStart(2, "0");

    const apiUrl = "https://nscc-0491179-ticketapi-f8cya2h8hxcsbea5.canadacentral-01.azurewebsites.net/api/tickets";

    const requestData = {
      email: data.email,
      name: data.name,
      phone: data.phone,
      quantity: String(data.quantity),
      creditCard: data.creditCard,
      expiration: `${formattedMonth}/${formattedYear}`,
      securityCode: data.securityCode,
      address: data.address,
      city: data.city,
      province: data.province,
      postalCode: data.postalCode,
      country: data.country,
      concertId: "6",
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        if (response.status === 400) {
          const errorData = await response.json();
          const normalizedErrors = {};
          for (const key in errorData.errors) {
            const normalizedKey = key.charAt(0).toLowerCase() + key.slice(1);
            normalizedErrors[normalizedKey] = errorData.errors[key];
          }
          setFieldErrors(normalizedErrors);
          setServerError("Please correct the highlighted errors.");
        } else {
          throw new Error("Error occurred while submitting the form.");
        }
        return;
      }

      // ✅ Success
      setFieldErrors({});
      setServerError("");
      Swal.fire({
        icon: 'success',
        title: 'Ticket Purchase Successful!',
        text: 'You will receive your tickets via email within the next 2 weeks.',
        confirmButtonColor: '#3085d6'
      });
      reset(); // Reset the form fields
    } catch (error) {
      setServerError(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="app-container">
      {/* Event Header at the top */}
      <h2 className="event-header">
        Tickets to see Matt Rife at the Great Outdoors Comedy Festival, August 7-8th.
      </h2>
    
      {/* The Form */}
      <form onSubmit={handleSubmit(handleFormSubmit)} className="ticket-form" noValidate>
        <h1 className="form-title">EchoPass</h1>
        {serverError && <div className="error-msg">{serverError}</div>}

        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <input type="email" {...register("email", { required: "Email is required." })} />
          {errors.email && <span>{errors.email.message}</span>}
          {fieldErrors.email && <span>{fieldErrors.email[0]}</span>}
        </div>

        {/* Name */}
        <div className="form-group">
          <label>Name</label>
          <input {...register("name", { required: "Name is required." })} />
          {errors.name && <span>{errors.name.message}</span>}
          {fieldErrors.name && <span>{fieldErrors.name[0]}</span>}
        </div>

        {/* Phone */}
        <div className="form-group">
          <label>Phone</label>
          <input {...register("phone", { required: "Phone number is required." })} />
          {errors.phone && <span>{errors.phone.message}</span>}
          {fieldErrors.phone && <span>{fieldErrors.phone[0]}</span>}
        </div>

        {/* Quantity */}
        <div className="form-group">
          <label># of Tickets</label>
          <select {...register("quantity", { required: "Quantity is required." })}>
            <option value="">-- Select Quantity --</option>
            {[...Array(6)].map((_, i) => (
              <option key={i} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          {errors.quantity && <span>{errors.quantity.message}</span>}
          {fieldErrors.quantity && <span>{fieldErrors.quantity[0]}</span>}
        </div>

        {/* Credit Card */}
        <div className="form-group">
          <label>Credit Card</label>
          <input {...register("creditCard", { required: "Credit Card number is required." })} />
          {errors.creditCard && <span>{errors.creditCard.message}</span>}
          {fieldErrors.creditCard && <span>{fieldErrors.creditCard[0]}</span>}
        </div>

        {/* Expiration Month and Year */}
        <div className="form-group expiration-group">
          <div className="expiration-month">
            <label>Expiration Month</label>
            <select {...register("expirationMonth", { required: "Month is required." })}>
              <option value="">-- Select Month --</option>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            {errors.expirationMonth && <span>{errors.expirationMonth.message}</span>}
          </div>
          <div className="expiration-year">
            <label>Expiration Year</label>
            <select {...register("expirationYear", { required: "Year is required." })}>
              <option value="">-- Select Year --</option>
              {[...Array(10)].map((_, i) => (
                <option key={i} value={currentYear + i}>{currentYear + i}</option>
              ))}
            </select>
            {errors.expirationYear && <span>{errors.expirationYear.message}</span>}
          </div>
        </div>

        {/* Security Code */}
        <div className="form-group">
          <label>Security Code</label>
          <input {...register("securityCode", { required: "Security Code is required." })} />
          {errors.securityCode && <span>{errors.securityCode.message}</span>}
          {fieldErrors.securityCode && <span>{fieldErrors.securityCode[0]}</span>}
        </div>

        {/* Address */}
        <div className="form-group">
          <label>Address</label>
          <input {...register("address", { required: "Address is required." })} />
          {errors.address && <span>{errors.address.message}</span>}
          {fieldErrors.address && <span>{fieldErrors.address[0]}</span>}
        </div>

        {/* City */}
        <div className="form-group">
          <label>City</label>
          <input {...register("city", { required: "City is required." })} />
          {errors.city && <span>{errors.city.message}</span>}
          {fieldErrors.city && <span>{fieldErrors.city[0]}</span>}
        </div>

        {/* Province */}
        <div className="form-group">
          <label>Province</label>
          <input {...register("province", { required: "Province is required." })} />
          {errors.province && <span>{errors.province.message}</span>}
          {fieldErrors.province && <span>{fieldErrors.province[0]}</span>}
        </div>

        {/* Postal Code */}
        <div className="form-group">
          <label>Postal Code</label>
          <input {...register("postalCode", { required: "Postal Code is required." })} />
          {errors.postalCode && <span>{errors.postalCode.message}</span>}
          {fieldErrors.postalCode && <span>{fieldErrors.postalCode[0]}</span>}
        </div>

        {/* Country */}
        <div className="form-group">
          <label>Country</label>
          <input {...register("country", { required: "Country is required." })} />
          {errors.country && <span>{errors.country.message}</span>}
          {fieldErrors.country && <span>{fieldErrors.country[0]}</span>}
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default App;
