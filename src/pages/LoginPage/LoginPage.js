import {AuthForm} from "../../component";
import {Link} from "react-router-dom";

const LoginPage = () => {
    return (
        <div>
            <AuthForm/>
            <Link to={'/register'}>Register</Link>
        </div>
    );
};

export {LoginPage};