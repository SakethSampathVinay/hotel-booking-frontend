# 🏨 EasyStay – Hotel Booking App

A full-stack hotel booking platform where users can explore hotels, view details, and make secure bookings — all from a smooth and modern interface.

---

## 📌 Description

EasyStay is a feature-rich hotel booking web application developed with Angular, Flask, and MongoDB. It enables users to sort, filter, and book hotels based on real-time availability, view booking history, make secure payments via Razorpay, and get AI assistance through a smart chatbot. It’s mobile-responsive and integrates with Cloudinary for image hosting and Brevo for email notifications.

---

## 🔗 Repositories

- 🌐 **User Frontend** – [Main User App](https://github.com/SakethSampathVinay/hotel-booking-frontend)
- 🛠 **Admin Panel** – [Admin Dashboard](https://github.com/SakethSampathVinay/hotel-booking-admin)
- 🔙 **Backend** – [Flask API + MongoDB](https://github.com/SakethSampathVinay/hotel-booking-backend)

---

## 🔗 Live Demo

🌐 **Deployed Hotel Booking App Link**: [Click here to open](https://easystay-snowy.vercel.app/)  

---


## 🌟 Key Features

### 👤 User-Side Functionalities

- **User Authentication** – Secure JWT-based login & registration  
- **Hotel Listing** – Browse a collection of hotels with images, amenities, and price info  
- **Sort & Filter** – Filter hotels by price, amenities, and location  
- **Hotel Details Page** – View detailed hotel info, image gallery, amenities, and more  
- **Dynamic Pricing** – Auto-calculates price based on guests, number of days, and room type  
- **Booking System** – Book hotels with real-time availability and guest input  
- **Booking History** – View all past and upcoming bookings  
- **Cancellation Option** – Cancel bookings with one click  
- **Secure Razorpay Payments** – Integrated payment gateway for fast, safe transactions  
- **AI Chatbot Assistant** – Query-aware chatbot that fetches real hotel data from the database  
- **Real-time Reviews & Ratings** – Users can leave feedback and see others' opinions  
- **Email Notifications** – Get booking confirmations and updates via email  
- **Responsive Design** – Mobile and desktop friendly UI  

## 🧪 Tech Stack

| Layer        | Technology                                  |
|--------------|---------------------------------------------|
| Frontend     | Angular                                     |
| Backend      | Flask                                       |
| Database     | MongoDB (MongoDB Atlas)                     |
| Image Upload | Cloudinary                                  |
| Payments     | Razorpay                                    |
| Emails       | Brevo (SendinBlue)                          |
| Chatbot      | Dynamic AI Chatbot powered by Gemini API    |


## 🚀 Getting Started

### 🔧 Installation

```bash
# Clone the repository
git clone https://github.com/SakethSampathVinay/hotel-booking-frontend.git
cd hotel-booking-frontend

# Install frontend dependencies
cd app
npm install
ng serve
