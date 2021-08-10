package com.ShoeStore.ShoeStore.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ShoeStore.ShoeStore.models.Cart;
import com.ShoeStore.ShoeStore.models.Customer;
import com.ShoeStore.ShoeStore.models.Order;
import com.ShoeStore.ShoeStore.models.ShippingInfo;
import com.ShoeStore.ShoeStore.repository.CartRepository;
import com.ShoeStore.ShoeStore.repository.CustomerRepository;
import com.ShoeStore.ShoeStore.repository.ShippingInfoRepository;
import com.ShoeStore.exceptions.NoResourceFoundException;
import com.ShoeStore.exceptions.ProductNotFoundException;

@Service
public class CustomerServiceImpl implements CustomerService{
	
	@Autowired
	CustomerRepository customerRepository;
	
	@Autowired
	ShippingInfoRepository shippingInfoRepository;
	
	@Autowired
	CartRepository cartRepository;

	@Override
	public Customer addCustomer(Customer customer) {
		// TODO Auto-generated method stub
		ShippingInfo shippingInfo = customer.getShippingInfo();
		
		if(shippingInfo != null) {
			shippingInfo.setCustomer(customer);
			shippingInfoRepository.save(shippingInfo);
		}
		Cart cart = new Cart();
		customer.setCart(cart);
		cart.setCustomer(customer);
		
		cartRepository.save(cart);
		customerRepository.save(customer);
		return customer;
	}

	@Override
	public List<Customer> getCustomers() {
		// TODO Auto-generated method stub
		return customerRepository.findAll();
	}

	@Override
	public Customer getCustomerById(int id) throws NoResourceFoundException {
		// TODO Auto-generated method stub
		Customer customer = customerRepository.findById(id).orElse(null);
		if(customer == null) {
			throw new NoResourceFoundException("No Resource Found Exception");
		}
		return customer;
	}

	@Override
	public Customer updateCustomer(int id, Customer customer) {
		// TODO Auto-generated method stub
		Customer currentCustomer = customerRepository.findById(id).orElse(null);
		
		currentCustomer.setFirstName(customer.getFirstName()); currentCustomer.setLastName(customer.getLastName());
		currentCustomer.setEmail(customer.getEmail());currentCustomer.setNumber(customer.getNumber());
		return customerRepository.save(currentCustomer);
		
	}

	@Override
	public Cart getCart(int id) throws NoResourceFoundException {
		// TODO Auto-generated method stub\
		Customer customer = customerRepository.findById(id).orElse(null);
		if(customer == null) {
			throw new NoResourceFoundException("No Resource Found Exception");
		}
		return customer.getCart();
	}

	@Override
	public List<Order> getOrders(int id) throws NoResourceFoundException {
		// TODO Auto-generated method stub
		Customer customer = customerRepository.findById(id).orElse(null);
		if(customer == null) {
			throw new NoResourceFoundException("No Resource Found Exception");
		}
		return customer.getOrders();
	}

	@Override
	public ShippingInfo getShippingInfo(int id) throws NoResourceFoundException {
		// TODO Auto-generated method stub
		Customer customer = customerRepository.findById(id).orElse(null);
		if(customer == null) {
			throw new NoResourceFoundException("No Resource Found Exception");
		}
		return customer.getShippingInfo();
	}

	@Override
	public ShippingInfo updateShippingInfo(int id, ShippingInfo shippingInfo) throws NoResourceFoundException {
		// TODO Auto-generated method stub
		Customer customer = customerRepository.findById(id).orElse(null);
		if(customer == null) {
			throw new NoResourceFoundException("No Resource Found Exception");
		}
		if(customer.getShippingInfo() == null) {throw new NoResourceFoundException("No Resource Found Exception");}
		
		ShippingInfo currentSI = shippingInfoRepository.findById(customer.getShippingInfo().getId()).orElse(null);
		currentSI.setAddress(shippingInfo.getAddress()); currentSI.setCity(shippingInfo.getCity());
		currentSI.setState(shippingInfo.getState()); currentSI.setPostcode(shippingInfo.getPostcode());
		return shippingInfoRepository.save(currentSI);
	}

	@Override
	public ShippingInfo addShippingInfo(int id, ShippingInfo shippingInfo) throws NoResourceFoundException {
		// TODO Auto-generated method stub
		Customer customer = customerRepository.findById(id).orElse(null);
		if(customer == null) {
			throw new NoResourceFoundException("No Resource Found Exception");
		}
		customer.setShippingInfo(shippingInfo);
		shippingInfo.setCustomer(customer);

		return shippingInfoRepository.save(shippingInfo);
	}

}