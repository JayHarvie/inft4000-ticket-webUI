import { useState } from 'react';
import { useForm } from 'react-hook-form';

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [serverError, setServerError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const currentYear = new Date().getFullYear() % 100; // Get the current year last two digits

  const handleFormSubmit = async (data) => {
    setServerError("");
  
    // Ensure month and year are in MM/YY format
    const formattedMonth = String(data.expirationMonth).padStart(2, "0");
    const formattedYear = String(data.expirationYear).padStart(2, "0");
  
    const apiUrl = "https://nscc-0491179-ticketapi-f8cya2h8hxcsbea5.canadacentral-01.azurewebsites.net/api/tickets";

    const requestData = { 
      email: data.email,
      name: data.name,
      phone: data.phone,
      quantity: String(data.quantity), // convert to string
      creditCard: data.creditCard,
      expiration: `${formattedMonth}/${formattedYear}`, // rename to match working JSON
      securityCode: data.securityCode,
      address: data.address,
      city: data.city,
      province: data.province,
      postalCode: data.postalCode,
      country: data.country,
      concertId: "6", // string
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
          setFieldErrors(errorData.errors || {});
          setServerError("Please correct the highlighted errors.");
        } else {
          throw new Error("Error occurred while submitting the form.");
        }
        return;
      }
    
      // Success
      setFieldErrors({});
      setServerError("");
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
          {fieldErrors.Email && <span className="text-danger">{fieldErrors.Email[0]}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            {...register("name", { required: "Name is required." })}
            type="text"
            className="form-control"
          />
          {errors.name && <span className="text-danger">{errors.name.message}</span>}
          {fieldErrors.Name && <span className="text-danger">{fieldErrors.Name[0]}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            {...register("phone", { required: "Phone number is required." })}
            type="tel"
            className="form-control"
          />
          {errors.phone && <span className="text-danger">{errors.phone.message}</span>}
          {fieldErrors.Phone && <span className="text-danger">{fieldErrors.Phone[0]}</span>}
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
          {fieldErrors.Quantity && <span className="text-danger">{fieldErrors.Quantity[0]}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Credit Card</label>
          <input
            {...register("creditCard", { required: "Credit Card is required." })}
            type="text"
            className="form-control"
          />
          {errors.creditCard && <span className="text-danger">{errors.creditCard.message}</span>}
          {fieldErrors.CreditCard && <span className="text-danger">{fieldErrors.CreditCard[0]}</span>}
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
          {fieldErrors.Expiration && <span className="text-danger">{fieldErrors.Expiration[0]}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Security Code</label>
          <input
            {...register("securityCode", { required: "Security code is required." })}
            type="text"
            className="form-control"
          />
          {errors.securityCode && <span className="text-danger">{errors.securityCode.message}</span>}
          {fieldErrors.SecurityCode && <span className="text-danger">{fieldErrors.SecurityCode[0]}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            {...register("address", { required: "Address is required." })}
            type="text"
            className="form-control"
          />
          {errors.address && <span className="text-danger">{errors.address.message}</span>}
          {fieldErrors.Address && <span className="text-danger">{fieldErrors.Address[0]}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">City</label>
          <input
            {...register("city", { required: "City is required." })}
            type="text"
            className="form-control"
          />
          {errors.city && <span className="text-danger">{errors.city.message}</span>}
          {fieldErrors.City && <span className="text-danger">{fieldErrors.City[0]}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Province</label>
          <input
            {...register("province", { required: "Province is required." })}
            type="text"
            className="form-control"
          />
          {errors.province && <span className="text-danger">{errors.province.message}</span>}
          {fieldErrors.Province && <span className="text-danger">{fieldErrors.Province[0]}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Postal Code</label>
          <input
            {...register("postalCode", { required: "Postal code is required." })}
            type="text"
            className="form-control"
          />
          {errors.postalCode && <span className="text-danger">{errors.postalCode.message}</span>}
          {fieldErrors.PostalCode && <span className="text-danger">{fieldErrors.PostalCode[0]}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Country</label>
          <input
            {...register("country", { required: "Country is required." })}
            type="text"
            className="form-control"
          />
          {errors.country && <span className="text-danger">{errors.country.message}</span>}
          {fieldErrors.Country && <span className="text-danger">{fieldErrors.Country[0]}</span>}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default App;
