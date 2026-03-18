import Navbar from "./navbar";

function Layout({ children }){
    return (
        <>
        <Navbar />
        <main className="container mt-4">
        {children}
        </main>
     
        </>
    );
}

export default Layout