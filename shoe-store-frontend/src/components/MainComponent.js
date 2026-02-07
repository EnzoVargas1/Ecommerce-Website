import {Component} from 'react';
import Header from './HeaderComponent';
import Welcome from './HomeComponent';
import Store from './StoreComponent';
import Footer from './FooterComponent';
import ShoePage from './ShoeComponent';
import AboutUs from './AboutUsComponent';
import Login from './LoginComponent';
import Contact from './ContactComponent';
import Cart from './CartComponent';
import PaymentForm from './PaymentFormComponent';
import SignUp from './SignUpComponent';
import User from './UserComponent';
import Admin from './AdminComponent';
import AddShoe from './AddShoeComponent';
import EditProfile from './EditProfile';
import ShippingAddress from './EditShippingInfo';
import {Route, Routes, Link, useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreators from '../redux/Actions';


const mapStateToProps = (state) => {
      return{
          shoes: state.shoes.shoes,
          customer: state.customer.customer,
          cart: state.cart.cart,
          orders: state.orders.orders,
          shippingInfo: state.shippingInfo.shippingInfo
      }
}


const mapDispatchToProps = (dispatch) => ({
    getDifferentShoes:() => {dispatch(actionCreators.getDifferentShoes())},
    addProductToStore:(shoe) => dispatch(actionCreators.addProductToStore(shoe)),
    getCustomer:() => {dispatch(actionCreators.getCustomer())},
    getCart: () => {dispatch(actionCreators.getCart(dispatch))},
    addShoeToCart: (shoe) => dispatch(actionCreators.addShoeToCart(shoe)),
    removeShoeFromCart: (shoe) => dispatch(actionCreators.removeShoeFromCart(shoe)),
    clearCart: () => dispatch(actionCreators.clearAllFromCart()),
    getOrders: () => dispatch(actionCreators.getOrders()),
    makeOrder: (paymentForm) => dispatch(actionCreators.makeOrder(paymentForm)),
    removeOrder: (orderId) => dispatch(actionCreators.removeOrder(orderId)),
    editShippingInfo: (shippingInfo) => dispatch(actionCreators.editShippingInfo(shippingInfo))
});




class Main extends Component {

    componentDidMount(){
        this.props.getDifferentShoes();
        this.props.getCustomer();
        this.props.getCart();
        this.props.getOrders();
     }

    render(){

        const ShoeWithIdWrapper = () => {
            const params = useParams();
            return(
              <ShoePage shoe={this.props.shoes[0].filter((shoe) => shoe.id === parseInt(params.shoeId,10))}
              addShoeToCart = {this.props.addShoeToCart} shoes={this.props.shoes}
              />
            );
          };

        return(
            <>
            <div>
                <Header/>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route exact path="/" element={<Welcome/>}/>
                    <Route path="/shop" element={<Store shoes = {this.props.shoes} addShoeToCart = {this.props.addShoeToCart}/>}/>
                    <Route path="/shoe/:shoeId" element={<ShoeWithIdWrapper/>}/>
                    <Route path="/aboutus" element={<AboutUs/>}/> 
                    <Route path="/contactus" element={<Contact/>}/> 
                    <Route path="/cart" element={<Cart cart = {this.props.cart} 
                    removeShoeFromCart={this.props.removeShoeFromCart} clearCart ={this.props.clearCart}/>}/> 
                    <Route path="/paymentform" element={<PaymentForm cart ={this.props.cart} 
                    makeOrder ={this.props.makeOrder}/>}/>
                    <Route path="/signupform" element={<SignUp/>}/>
                    <Route path="/user" element={<User customer = {this.props.customer} 
                    orders={this.props.getOrders} removeOrder={this.props.removeOrder}/>}/>
                    <Route path="/editprofile" element={<EditProfile/>} />
                    <Route path="/editshipping" element={<ShippingAddress editShippingInfo={this.props.editShippingInfo}/>} />
                    <Route path="/admin" element={<Admin/>}/>
                    <Route path="/addshoe" element={<AddShoe addProductToStore={this.props.addProductToStore} />} />
                </Routes>
                <Footer/>             
            </div>
            </>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Main);