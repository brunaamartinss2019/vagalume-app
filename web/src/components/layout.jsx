import Navbar from "./navbar";

function Layout({ children }){
    return (
        <>
        <Navbar />
        <main className="container mt-4" style={{ maxWidth: '1000px' }}>
        {children}
        </main>
     
        </>
    );
}

export default Layout