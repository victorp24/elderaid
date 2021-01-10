function Dashboard() {


}

export default Dashboard;

function PublicPage() {
    return(
        <div>
            <h1>Welcome to the Public Access Page</h1>
            <h1>You have NOT signed in!</h1>
        </div>
    );
}

function YouthPage() {
    return(
        <div>
            <h1>Welcome to the Youth Dashboard</h1>
            <h1>You have signed in as Youth</h1>
        </div>
    );
}

function ElderPage() {
    return(
        <div>
            <h1>Welcome to the Elder Dashboard</h1>
            <h1>You have signed in as Elder</h1>
        </div>
    );
}