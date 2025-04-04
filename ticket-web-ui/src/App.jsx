import { useState } from 'react';
import { useForm } from 'react-hook-form';

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [serverError, setServerError] = useState("");

  const currentYear = new Date().getFullYear() % 100; // Get the current year last two digits

  const handleFormSubmit = async (data) => {
    setServerError("");
  
    const apiUrl = "https://nscc-0491179-ticketapi-f8cya2h8hxcsbea5.canadacentral-01.azurewebsites.net/api/tickets";
  
    const requestData = { 
      ...data, 
      concertId: 6
    };
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        throw new Error('Error occurred while submitting the form.');
      }
  
      console.log("Form submitted successfully:", requestData);
    } catch (error) {
      setServerError(error.message || "An unexpected error occurred.");
    }
  };
  

  return (
    <div>
      <h1>Ticket Hub</h1>
      {serverError && <div className="alert alert-danger">{serverError}</div>}
      
      <form onSubmit={handleSubmit(handleFormSubmit)} className="w-50">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            {...register("email", { required: "Email is required." })}
            type="email"
            className="form-control"
          />
          {errors.email && <span className="text-danger">{errors.email.message}</span>}
        </div>

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            {...register("name", { required: "Name is required." })}
            type="text"
            className="form-control"
          />
          {errors.name && <span className="text-danger">{errors.name.message}</span>}
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            {...register("phone", { required: "Phone number is required." })}
            type="tel"
            className="form-control"
          />
          {errors.phone && <span className="text-danger">{errors.phone.message}</span>}
        </div>

        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <select
            {...register("quantity", { required: "Quantity is required." })}
            className="form-control"
          >
            {[...Array(6).keys()].map(i => (
              <option key={i} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          {errors.quantity && <span className="text-danger">{errors.quantity.message}</span>}
        </div>

        <div className="mb-3">
          <label className="form-label">Credit Card</label>
          <input
            {...register("creditCard", { required: "Credit Card is required." })}
            type="text"
            className="form-control"
          />
          {errors.creditCard && <span className="text-danger">{errors.creditCard.message}</span>}
        </div>

        <div className="mb-3">
          <label className="form-label">Expiration Date</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <select
              {...register("expirationMonth", { required: "Expiration month is required." })}
              className="form-control"
            >
              <option value="">Month</option>
              {[...Array(12).keys()].map(i => (
                <option key={i} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <select
              {...register("expirationYear", { required: "Expiration year is required." })}
              className="form-control"
            >
              <option value="">Year</option>
              {[...Array(20).keys()].map(i => {
                const year = currentYear + i;
                return <option key={i} value={year}>{year}</option>;
              })}
            </select>
          </div>
          {errors.expirationMonth && <span className="text-danger">{errors.expirationMonth.message}</span>}
          {errors.expirationYear && <span className="text-danger">{errors.expirationYear.message}</span>}
        </div>

        <div className="mb-3">
          <label className="form-label">Security Code</label>
          <input
            {...register("securityCode", { required: "Security code is required." })}
            type="text"
            className="form-control"
          />
          {errors.securityCode && <span className="text-danger">{errors.securityCode.message}</span>}
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            {...register("address", { required: "Address is required." })}
            type="text"
            className="form-control"
          />
          {errors.address && <span className="text-danger">{errors.address.message}</span>}
        </div>

        <div className="mb-3">
          <label className="form-label">City</label>
          <input
            {...register("city", { required: "City is required." })}
            type="text"
            className="form-control"
          />
          {errors.city && <span className="text-danger">{errors.city.message}</span>}
        </div>

        <div className="mb-3">
          <label className="form-label">Province</label>
          <input
            {...register("province", { required: "Province is required." })}
            type="text"
            className="form-control"
          />
          {errors.province && <span className="text-danger">{errors.province.message}</span>}
        </div>

        <div className="mb-3">
          <label className="form-label">Postal Code</label>
          <input
            {...register("postalCode", { required: "Postal code is required." })}
            type="text"
            className="form-control"
          />
          {errors.postalCode && <span className="text-danger">{errors.postalCode.message}</span>}
        </div>

        <div className="mb-3">
          <label className="form-label">Country</label>
          <input
            {...register("country", { required: "Country is required." })}
            type="text"
            className="form-control"
          />
          {errors.country && <span className="text-danger">{errors.country.message}</span>}
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default App;
