'use client';
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);



export default function CheckoutForm({amount}) {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch the client secret from the API when the component mounts
    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: amount, username, email }), // Send username and email to backend
        });
        const data = await response.json();
        //console.log('Stripe return data', data);
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setError('Failed to create payment intent');
        }
      } catch (err) {
        setError('Failed to create payment intent');
      }
    };

    if (username && email) {
      createPaymentIntent();
    }
  }, [username, email]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements || !clientSecret) {
      setError('Stripe has not loaded or client secret is missing');
      setLoading(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
      receipt_email: email, // Send receipt to this email
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Handle successful payment here
      setLoading(false);
      console.log('Payment successful:', paymentIntent);
      router.push(`/success`);
    }
  };

  return (
    <div className="w-[550px] flex flex-col justify-center items-center m-auto p-4">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="p-2 border rounded w-full"
          />
        </div>
        <CardElement className="p-2 border rounded mb-4" />
        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          Pay
        </button>
        {error && <div className="mt-4 text-red-500">{error}</div>}
      </form>
    </div>
  );
}
