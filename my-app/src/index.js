import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import React from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'
import List from './ListFolder/list';
import Nav from './component/nav';
import Register from './component/register';
import SignIn from './component/login';
import Home from './component/Home';
import Editlist from './ListFolder/editlist';
import AuthContextProvider from './Context/authContext';
import AddProducts from './ListFolder/addpruduc';




const queryClient = new QueryClient()

class App extends React.Component {


    render() {
        return (
            <QueryClientProvider client={queryClient}>

            <Router>
                <AuthContextProvider>

                    <div className='container'>

                        <Nav />

                        <Routes>
                            <Route path='list' element={<List />} />
                            <Route path='register' element={<Register />} />
                            <Route path='signin' element={<SignIn />} />
                            <Route path='/' element={<Home />} />
                            <Route path='/addproduct' element={<AddProducts />} />
                            <Route path='/products/:id' element={<Editlist/>} />

                        </Routes>

                    </div>

                </AuthContextProvider>

            </Router>

            </QueryClientProvider>
        )



    }


}









const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App tab="home" />);