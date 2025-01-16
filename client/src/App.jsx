import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import OTPverification from "./pages/OTPverification";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  return (
  //  <Router>
  //   <Routes>
  //     <Route path="/" element={<Home/>}/>
  //     <Route path="auth<" element={<Auth/>}/>
  //     <Route path="/otp-verification/:email/:phone" element={<OTPverification/>}/>
  //     <Route path="/password/forgot" element={<ForgotPassword/>}/>
  //     <Route path="/password/reset/:token" element={<ResetPassword/>}/>
  //   </Routes>
  //  </Router>
  <Auth/>
  );
};

export default App;
