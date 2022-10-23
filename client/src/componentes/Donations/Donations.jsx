import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios"
import NavBar from "../NavBar/NavBar"
import { useNavigate } from "react-router-dom"
import Footer from "../Footer/Footer";
const stripePromise = loadStripe("pk_test_51LhhasEmp5dtE89LxdcOsJb9GWkTB6Zjcq9fl5Igf3CcmhwJs01BuokKEfJnF9LTbhSRjSyBoweMaUvMtBW3ZlWO00R9ldzf45")



const CheckoutForm = () => {

    const history = useNavigate()
    const element = useElements()
    const stripe = useStripe()
    let cantidad

    function handleChange(e) {
        cantidad = e.target.value
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: element.getElement(CardElement)
        })
        if (!error) {
            const { id } = paymentMethod
            const token = localStorage.getItem("token")

            try {
                const { data } = await axios.post("/payments/checkout", {
                    id,
                    // amount: cantidad * 100
                    amount: cantidad
                },
                    { headers: { "Authorization": `Bearer ${token}` } })

                if(data.token !== undefined && data.token.length > 0){
                    localStorage.setItem('token', data.token)
                }

                const errorData = Object.entries(data)
                const errorAlert = errorData[0].toString().slice(8)
                alert(errorAlert)
                element.getElement(CardElement).clear()
                history("/Home")
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <CardElement />
                <div className="inputs">
                    <input className="form-control" type="number" value={cantidad} onChange={e => handleChange(e)} placeholder="Donation Amount (dollars)"></input>
                    <button className="btn btn-primary">
                        Donate!
                    </button>
                </div>
            </form>
        </div>
    )
}
const Donations = () => {
    return (
        <div>
            <NavBar />
            <div className="Donaciones text-center">

                <div className="container text-center">
                    <h1 className="text-danger my-2">WARNING!</h1>
                    <h4 className="my-2">Making a donation may cause the following side effects:</h4>
                    <p className="">Increased other user attention</p>
                    <p className="">Feeding hungry developers in 3rd world countries</p>
                    <p className="">Increased quality in this website</p>
                    <p className="">Better functions</p>
                    <p className="">Your answers will have more likes</p>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Donations