import "../Sidebar.css"

function Sidebar() {
    return (
        <aside className="sidebar">
            <h2 className="logo">ERP</h2>
            <ul className="menu">
                <li>Dashboard</li>
                <li>HRM</li>
                <li>Accounts</li>
                <li>Inventory</li>
                <li>Reports</li>
            </ul>
        </aside>
    );
}

export default Sidebar;