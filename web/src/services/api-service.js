import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
});

http.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error),
);

//auth

export function register(user) {
    return http.post("/users", user);
}

export function login(credentials) {
    return http.post("/sessions", credentials);
}

export function logout() {
    return http.delete("/sessions");
}

// users

export function getProfile() {
    return http.get("/users/me");
}

export function getUser(id) {
    return http.get(`/users/${id}`);
}

//properties

export function getProperties(params) {
    return http.get("/properties", { params }); // params = { ria, checkin, checkout, ....}
}

export function getProperty(id) {
    return http.get(`/properties/${id}`);
}

export function createProperty(data) {
    return http.post("/properties", data);
}

export function updateProperty(id, data) {
    return http.patch(`/properties/${id}`, data);
}

export function deleteProperty(id) {
    return http.delete(`/properties/${id}`);
}

//Bookings

export function getMyBookings(role) {
    return http.get("/bookings/me", { params: role ? { role } : {} });
}

export function createBooking(data) {
    return http.post("/bookings", data);
}

export function updateBookingStatus(id, status) {
    return http.put(`/bookings/${id}/status`, { status });
}

export function deleteBooking(id) {
    return http.delete(`/bookings/${id}`);
}

//Reviews

export function getPropertyReviews(propertyId) {
    return http.get(`/properties/${propertyId}/reviews`);
}

export function createReview(propertyId, data) {
    return http.post(`/properties/${propertyId}/reviews`, data);
}

