import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';


const Layout = ({children}) => {
  return (
    <React.Fragment>
        <Navbar className="has-border-white"/>
        <div className="columns mt-6 has-background-white" style={{ minHeight: "100vh" }}>
            <div className="column is-2"><Sidebar /></div>
            <div className="column has-background-light">
            <main>
                {children}
            </main>
            </div>
        </div>
    </React.Fragment>
  );
};

export default Layout;